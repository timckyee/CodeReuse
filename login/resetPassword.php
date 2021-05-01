<?php

function encrypt($string_to_encrypt) {
				
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

//echo "<pre>";
//var_dump(encrypt("test string"));
//echo "</pre>";

$encrypt = encrypt("testuser@testing.com");

$iv_hex = $encrypt["iv"];
echo $iv_hex;
echo "<br>";
$salt_hex = $encrypt["salt"];
echo $salt_hex;
echo "<br>";
$encrypted_string = $encrypt["encrypted_string"];
echo $encrypted_string;
echo "<br>";
echo "<br>";

//$token = $encrypted_string . $iv_hex . $salt_hex;
$token = $iv_hex . $salt_hex . $encrypted_string;

echo "length iv: " . strlen($iv_hex);
echo "<br>";
echo "length salt: " . strlen($salt_hex);
echo "<br>";
echo "length text: " . strlen($encrypted_string);
echo "<br>";

$url = "localhost:8888/codereuse/login/verifyEmailForm.php?token=";

//echo $url . $token;

$urlToken = $url . urlencode($token);

echo "<br>";
echo "<br>";

echo $urlToken;

?>