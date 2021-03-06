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

function encrypt($name, $email, $password, $con) {
				
    $encrypt_method = "AES-256-CBC";
    $secret_key = 'mysecretkey1234';
    //$secret_iv = 'This is my secret iv';

    // hash
    $key = hash('sha256', $secret_key);
    
    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
    
    //$iv = substr(hash('sha256', $secret_iv), 0, 16);

	$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));
		

    $passwordEncrypt = openssl_encrypt($password, $encrypt_method, $key, 0, $iv);
    $passwordEncrypt = base64_encode($passwordEncrypt);
	

	$iv_hex = bin2hex($iv);
	
	$iv_password = $iv_hex . $passwordEncrypt;


  	$sql = "INSERT INTO `tableGridGetPostUsers` (`name`, `email`, `password`) VALUES ";
  	
  	$sql = $sql . "('" . $name . "','" . $email . "','" . $iv_password . "')";

  	$con->query($sql);

}


function decrypt($email, $con) {
	
	$sql = "SELECT * FROM `tableGridGetPostUsers` WHERE `email`='" . $email . "'";
		
	$result = $con->query($sql);
	
	$row = $result->fetch_assoc();
	
	$password_from_database = $row["password"];
	
	$iv_portion_of_password = substr($password_from_database, 0, 32);
	
	$text_portion_of_password = substr($password_from_database, 32, 64);
	
	$iv_bin = hex2bin($iv_portion_of_password);


    $encrypt_method = "AES-256-CBC";
    $secret_key = 'mysecretkey1234';
    //$secret_iv = 'This is my secret iv';

    // hash
    $key = hash('sha256', $secret_key);
    	 		   		    	    
    $passwordDecrypt = openssl_decrypt(base64_decode($text_portion_of_password), $encrypt_method, $key, 0, $iv_bin);

	return $passwordDecrypt;
	
}

encrypt("Jane Doe", "jane@doe.com", "password456", $mysqli);

/*
$decrypted_text = decrypt("jane@doe.com", $mysqli);

echo $decrypted_text;


if ( "password456" === $decrypted_text ) 
	echo "<br>SUCCESS";
else 
	echo "<br>FAILED";

echo "\n";
*/


?>