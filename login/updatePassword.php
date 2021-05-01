<?php

session_start();

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

function decrypt($text_portion_of_password, $iv_bin, $salt_bin) {

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

function login($email, $password, $con){


    $sql = "SELECT password FROM `tableGridGetPostUsers` WHERE `email`=?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $email);

    $stmt->execute();

    $result = $stmt->get_result();
   
    $user = $result->fetch_assoc();

    return password_verify($password, $user['password']);
}

function updateUser($email, $password, $con) {

    $sql = "UPDATE `tableGridGetPostUsers` SET `password`=? WHERE `email`=?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $hash, $email);
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt->execute();

    echo "User with email: " . $email . " has been updated with encrypted password"; 
}

$token = $_SESSION["token"];

$iv_hex = substr($token, 0, 32);

$salt_hex = substr($token, 32, 512);

$lengthOfTextPortion = strlen($token) - 32 - 512;

$text_portion = substr($token, 544, $lengthOfTextPortion);

$iv_bin = hex2bin($iv_hex);
$salt_bin = hex2bin($salt_hex);

$decrypt = decrypt($text_portion, $iv_bin, $salt_bin);

$email = $decrypt;


$passwordInfo = $_POST["passwordInfo"];

$oldPassword = explode("=", explode("&", $passwordInfo)[0])[1];

$newPassword = explode("=", explode("&", $passwordInfo)[1])[1];

//$newPasswordConfirm = explode("=", explode("&", $passwordInfo)[2])[1];

$valid_user = login($email, $oldPassword, $mysqli);

if($valid_user != 1)
{
    echo "User old password is not correct";
    return;
}
else
{
    updateUser($email, $newPassword, $mysqli);
}


?>