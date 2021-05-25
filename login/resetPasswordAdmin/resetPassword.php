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

function updateUser($email, $password, $con) {

	$encrypt = encrypt($password);

	$iv_hex = $encrypt["iv"];

	$salt_hex = $encrypt["salt"];

	$encrypted_string = $encrypt["encrypted_string"];
	
	$encrypted_password = $iv_hex . $salt_hex . $encrypted_string;
	
    $result = $con->query("update tableGridGetPostUsers set password = '" . $encrypted_password . "' where email = '" . $email . "'");

	$returnMessage = "User with username: " . $email . " has been updated with encrypted password";

   	echo $returnMessage;
}

$email = $_POST["email"];
$password = $_POST["password"];

updateUser($email, $password, $mysqli);


?>