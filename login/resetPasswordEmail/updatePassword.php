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

function login($email, $password, $con) {    

    $result = $con->query("select password from tableGridGetPostUsers where email = '" . $email . "'");

    $row = $result->fetch_assoc();

    //$sql = "SELECT password as UserPassword FROM `tableGridGetPostUsers` WHERE `email`=?";
    //$stmt = $con->prepare($sql);
    //$stmt->bind_param("s", $email);

    //$stmt->execute();

    //$result = $stmt->get_result();

    //$user = $result->fetch_assoc();

	$encrypted_password = $row['password'];

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

function updateUser($email, $password, $con) {

	$encrypt = encrypt($password);

	$iv_hex = $encrypt["iv"];

	$salt_hex = $encrypt["salt"];

	$encrypted_string = $encrypt["encrypted_string"];
	
	$encrypted_password = $iv_hex . $salt_hex . $encrypted_string;

    $sql = "UPDATE `tableGridGetPostUsers` SET `password`=? WHERE `email`=?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $encrypted_password, $email);

    $stmt->execute();

    echo "User with email: " . $email . " has been updated with encrypted password"; 
}

function loginUpdateUser($con) {

    $passwordInfo = $_POST["passwordInfo"];

    $newPassword = explode("=", explode("&", $passwordInfo)[0])[1];

    $token = explode("=", explode("&", $passwordInfo)[1])[1];


    $iv_hex = substr($token, 0, 32);

    $salt_hex = substr($token, 32, 512);

    $lengthOfTextPortion = strlen($token) - 32 - 512;

    $text_portion = substr($token, 544, $lengthOfTextPortion);

    $iv_bin = hex2bin($iv_hex);
    $salt_bin = hex2bin($salt_hex);

    $decrypt = decrypt($text_portion, $iv_bin, $salt_bin);

    $email = $decrypt;

    updateUser($email, $newPassword, $con);
}

loginUpdateUser($mysqli);

?>