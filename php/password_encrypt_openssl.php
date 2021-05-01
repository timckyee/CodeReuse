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

function encrypt($string_to_encrypt, $con) {
				
    $encrypt_method = "AES-256-CBC";
    $secret_key = 'mysecretkey1234';
    //$secret_iv = 'This is my secret iv';

    // hash
    //$key = hash('sha256', $secret_key, true);

    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
    
    //$iv = substr(hash('sha256', $secret_iv), 0, 16);

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


function decrypt($email, $text_portion_of_password, $iv_bin, $salt_bin, $con) {

    $encrypt_method = "AES-256-CBC";
    $secret_key = 'mysecretkey1234';
    //$secret_iv = 'This is my secret iv';

    // hash
    //$key = hash('sha256', $secret_key, true);

    $iterations = 999; //same as js encrypting 
    
    // when flag is true, key is in binary
    $key = hash_pbkdf2("sha512", $secret_key, $salt_bin, $iterations, 64, true);
    //$key = hash_pbkdf2("sha512", $secret_key, $salt_bin, $iterations, 64);
    
    $passwordDecrypt = openssl_decrypt(base64_decode($text_portion_of_password), $encrypt_method, $key, 0, $iv_bin);

	return $passwordDecrypt;
	
}

function encrypt_to_database($firstname, $username, $lastname, $email, $password, $con) {

    $encrypt = encrypt($password, $con);

    $sql = "SELECT count(userId) as UserId FROM `tableGridGetPostUsers` WHERE `email`='" . $email . "'";
	
	$result = $con->query($sql);
	
    $row = $result->fetch_assoc();

    if($row["UserId"] != 0)
    {
        echo "User already exists";
        return;
    }

    $encrypted_string = $encrypt["encrypted_string"];
    $iv_hex = $encrypt["iv"];
    $salt_hex = $encrypt["salt"];


    echo "length: " . strlen($encrypted_string);
    echo "<br>";
    echo "length: " . strlen($iv_hex);
    echo "<br>";
    echo "length: " . strlen($salt_hex);
    echo "<br>";

    
	$iv_password = $iv_hex . $salt_hex . $encrypted_string;

  	$sql = "INSERT INTO `tableGridGetPostUsers` (`firstname`, `lastname`, `username`, `email`, `password`) VALUES ";

  	$sql = $sql . "('" . $firstname . "','" . $lastname . "','" . $username . "','" . $email . "','" . $iv_password . "')";

  	$con->query($sql);

    echo "User with email: " . $email . " has been created with encrypted password";
}

function decrypt_from_database($email, $con) {

	$sql = "SELECT * FROM `tableGridGetPostUsers` WHERE `email`='" . $email . "'";
		
	$result = $con->query($sql);
	
	$row = $result->fetch_assoc();
	
	$password_from_database = $row["password"];
	
	$iv_portion_of_password = substr($password_from_database, 0, 32);

    $salt_portion_of_password = substr($password_from_database, 32, 512);

    $lengthOfTextPortion = strlen($password_from_database) - 32 - 512;

    $text_portion_of_password = substr($password_from_database, 544, $lengthOfTextPortion);

	$iv_bin = hex2bin($iv_portion_of_password);
    $salt_bin = hex2bin($salt_portion_of_password);

    $decrypt = decrypt($email, $text_portion_of_password, $iv_bin, $salt_bin, $con);
    
    return $decrypt;

}


// instructions to encrypt data
//
// make sure tableGridGetPostUsers has no data
// navigate to codereuse/php/password_encrypt_openssl.php
// uncomment the line with: encrypt_to_database("Jane Doe", etc.. and save
// refresh the page
// there should now be an entry in the tableGridGetPostUsers
// password456

//encrypt_to_database("Jane", "Doe", "janedoe", "jane@doe.com", "password456", $mysqli);


// instructions to decrypt data
//
// make sure tableGridGetPostUsers has the Jane Doe entry
// recomment the line with: decrypt_from_database("Jane Doe", etc.. and save
// uncomment the lines starting with: $decrypted_text and ending with echo "\n";
// refresh the page
// there will be the decrypted text shown: password456 and a SUCCESS message if successful

/*
$decrypted_text = decrypt_from_database("jane@doe.com", $mysqli);

echo $decrypted_text;

if ( "password456" === $decrypted_text ) 
	echo "<br>SUCCESS";
else 
	echo "<br>FAILED";

echo "\n";
*/


?>