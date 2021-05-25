<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');

$user = 'root';
$password = 'root';
$db = 'codereuse';
$host = 'localhost';
$port = 8889;

$mysqli = new mysqli($host, $user, $password, $db, $port);

if($mysqli->connect_error) {
    echo "connection error";
}

function addUser($firstname, $lastname, $username, $email, $password, $con) {

	$sql = "SELECT count(userId) as UserId FROM `tableGridGetPostUsers` WHERE `email`='" . $email . "'";
	
	$result = $con->query($sql);
	
    $row = $result->fetch_assoc();

    if($row["UserId"] != 0)
    {
        echo "User already exists";
        return;
    }


	$encrypt = encrypt($password);

	$iv_hex = $encrypt["iv"];

	$salt_hex = $encrypt["salt"];

	$encrypted_string = $encrypt["encrypted_string"];

	$encrypted_password = $iv_hex . $salt_hex . $encrypted_string;
	

    $sql = "INSERT INTO `tableGridGetPostUsers` (`firstname`, `lastname`, `username`, `email`, `password`) VALUES (?,?,?,?,?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssss", $firstname, $lastname, $username, $email, $encrypted_password);


    $stmt->execute();

	$returnMessage = "User with username: " . $username . " has been created with encrypted password";

   	echo $returnMessage;
}

function encrypt($string_to_encrypt) {
				
    $encrypt_method = "AES-256-CBC";
    $secret_key = 'mysecretkey1234';
    
	//$iv_bin = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));
	
    $salt = random_bytes(256);
    $iterations = 999;

    // when flag is true, key is in binary
    $key = hash_pbkdf2("sha512", $secret_key, $salt, $iterations, 64, true);
    //$key = hash_pbkdf2("sha512", $secret_key, $salt, $iterations, 64); 

    $salt_hex = bin2hex($salt);

    $iv_bin = random_bytes(16);

    $iv_hex = bin2hex($iv_bin);

    $encrypted_string = openssl_encrypt($string_to_encrypt, $encrypt_method, $key, 0, $iv_bin);
        
    $encrypted_string = base64_encode($encrypted_string);

    $array["encrypted_string"] = $encrypted_string;
    $array["iv"] = $iv_hex;
    $array["salt"] = $salt_hex;

    return $array;
}

function decrypt($text_portion_of_password, $iv_bin, $salt_bin) {

    $encrypt_method = "AES-256-CBC";
    $secret_key = 'mysecretkey1234';

    $iterations = 999; //same as js encrypting 
    
    // when flag is true, key is in binary
    $key = hash_pbkdf2("sha512", $secret_key, $salt_bin, $iterations, 64, true);
    //$key = hash_pbkdf2("sha512", $secret_key, $salt_bin, $iterations, 64);
    
    $passwordDecrypt = openssl_decrypt(base64_decode($text_portion_of_password), $encrypt_method, $key, 0, $iv_bin);

	return $passwordDecrypt;
	
}


function login($username, $password, $con){
	
	$sql = "SELECT password FROM `tableGridGetPostUsers` WHERE `username`=?";
	$stmt = $con->prepare($sql);
	$stmt->bind_param("s", $username);

	$stmt->execute();

	$result = $stmt->get_result();

	$user = $result->fetch_assoc();

	$encrypted_password = $user['password'];

	$iv_hex = substr($encrypted_password, 0, 32);

	$salt_hex = substr($encrypted_password, 32, 512);
	
	$lengthOfTextPortion = strlen($encrypted_password) - 32 - 512;
	
	$text_portion = substr($encrypted_password, 544, $lengthOfTextPortion);

	$iv_bin = hex2bin($iv_hex);
	$salt_bin = hex2bin($salt_hex);

	$decrypt = decrypt($text_portion, $iv_bin, $salt_bin);

	$decrypted_password = $decrypt;

	if($decrypted_password == $password)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

$credentials = $_POST["credentials"];

$credentialsDecode = base64_decode($credentials);

$credentialsArray = explode("&", $credentialsDecode);

if($_POST["createOrVerify"] == "create") {

	$firstname = explode("=", $credentialsArray[0])[1];

    $lastname = explode("=", $credentialsArray[1])[1];

	$username = explode("=", $credentialsArray[2])[1];

	$email = explode("=", $credentialsArray[3])[1];

	$password = explode("=", $credentialsArray[4])[1];

	addUser($firstname, $lastname, $username, $email, $password, $mysqli);	
	
} else if($_POST["createOrVerify"] == "verify") {

	$username = explode("=", $credentialsArray[0])[1];

	$password = explode("=", $credentialsArray[1])[1];

  	$valid_user = login($username, $password, $mysqli);

	if($valid_user == 1)
	{		
		$sql = "SELECT UserId FROM `tableGridGetPostUsers` WHERE `username`='" . $username . "'";
	
		$result = $mysqli->query($sql);
		
		$row_userId = $result->fetch_assoc();
	
		$userId = $row_userId["UserId"];

		
		$sql = "SELECT count(SessionId) as SessionIdCount FROM `tableGridGetPostSession` WHERE `UserId`='" . $userId . "'";
	
		$result = $mysqli->query($sql);
		
		$row = $result->fetch_assoc();

		if($row["SessionIdCount"] == 1)
		{
			echo "messageType=0&userId=" . $userId;
			//echo "User is already logged in";
			return;
		}
		else
		{
			echo "messagType=1&userId=" . $userId;
			//echo "userId=" . $userId;
		}
	}
	else
	{
		echo "messageType=2&userId=none";
		//echo 0;
	}

}


?>