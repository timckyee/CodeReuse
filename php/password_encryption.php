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

$iv_save;

function encrypt($action, $string, &$iv_save) {
		
    $encrypt_method = "AES-256-CBC";
    $secret_key = 'mysecretkey1234';
    //$secret_iv = 'This is my secret iv';

    // hash
    $key = hash('sha256', $secret_key);
    
    
    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
    
    //$iv = substr(hash('sha256', $secret_iv), 0, 16);

	$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));
	
	$iv_save = $iv;
	
	//$iv = hex2bin("0e73d81b8f8ae818e0d3f61b657632b6");	

    $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
    $output = base64_encode($output);
	
	return $output;	
}


function decrypt($action, $string, $iv_bin) {
		
    $encrypt_method = "AES-256-CBC";
    $secret_key = 'mysecretkey1234';
    //$secret_iv = 'This is my secret iv';

    // hash
    $key = hash('sha256', $secret_key);
    
    
    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
    
    //$iv = substr(hash('sha256', $secret_iv), 0, 16);

	//$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));
	
	//$iv_save = $iv;
	
	//$iv = hex2bin("0e73d81b8f8ae818e0d3f61b657632b6");
	
	$iv = $iv_bin;
	 		   		    	    
    $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);

	return $output;
	
}


function encrypt_to_database($name, $email, $password, $con, &$iv_save)
{
	
	$encrypted_txt = encrypt("encrypt", $password, $iv_save);
	
	$iv_save_hex = bin2hex($iv_save);
	
	$iv_password = $iv_save_hex . $encrypted_txt;
	
	//echo 'iv_save_hex = ' . $iv_save_hex . "<br>" . ' length = ' . strlen($iv_save_hex);
	
  	$sql = "INSERT INTO `tableGridGetPostUsers` (`name`, `email`, `password`) VALUES ";
  	
  	$sql = $sql . "('" . $name . "','" . $email . "','" . $iv_password . "')";
  	
  	$con->query($sql);
}


function decrypt_from_database($email, $con)
{
	$sql = "SELECT * FROM `tableGridGetPostUsers` WHERE `email`='" . $email . "'";
		
	$result = $con->query($sql);
	
	$row = $result->fetch_assoc();
	
	$password_from_database = $row["password"];
	
	$iv_portion_of_password = substr($password_from_database, 0, 32);
	
	$text_portion_of_password = substr($password_from_database, 32, 64);
	
	$iv_bin = hex2bin($iv_portion_of_password);
	
	//echo 'iv_portion = ' . $iv_portion_of_password . '; length = ' . strlen($iv_portion_of_password) . '<br>' . 'text_portion = ' . $text_portion_of_password . '; length = ' . strlen($text_portion_of_password);
	
	$decrypted_text = decrypt("decrypt", $text_portion_of_password, $iv_bin);
	
	return $decrypted_text;
}


//encrypt_to_database("Jane Doe", "jane@doe.com", "password456", $mysqli, $iv_save);

$decrypted_text = decrypt_from_database("jane@doe.com", $mysqli);

echo $decrypted_text;


if ( "password456" === $decrypted_text ) 
	echo "<br>SUCCESS";
else 
	echo "<br>sFAILED";

echo "\n";

?>