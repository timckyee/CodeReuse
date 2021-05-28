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


function verifyEmail($email, $con){

	$sql = "SELECT userId FROM `tableGridGetPostUsers` WHERE `email`=?";
	$stmt = $con->prepare($sql);
	$stmt->bind_param("s", $email);

	$stmt->execute();

	$result = $stmt->get_result();

	$user = $result->fetch_assoc();

	return $user["userId"];

}

$email = $_POST["email"];

$verifyEmail = verifyEmail($email, $mysqli);

if($verifyEmail == 0)
{
    echo 0;
	return;
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

$encrypt = encrypt($email);

$iv_hex = $encrypt["iv"];
//echo $iv_hex;
//echo "<br>";
$salt_hex = $encrypt["salt"];
//echo $salt_hex;
//echo "<br>";
$encrypted_string = $encrypt["encrypted_string"];
//echo $encrypted_string;
//echo "<br>";
//echo "<br>";

//$token = $encrypted_string . $iv_hex . $salt_hex;
$token = $iv_hex . $salt_hex . $encrypted_string;

/*
echo "length iv: " . strlen($iv_hex);
echo "<br>";
echo "length salt: " . strlen($salt_hex);
echo "<br>";
echo "length text: " . strlen($encrypted_string);
echo "<br>";
*/

//$serverUrl = $_POST["serverUrl"];
//$serverUrl = "http://localhost:8888";

$serverUrl = "https://staging.closedarea.com";

//$url = $serverUrl . "/codereuse/login/resetPasswordEmail/verifyEmailForm.php?token=";

$url = $serverUrl . "/login/resetPasswordEmail/verifyEmailForm.php?token=";

//echo $url . $token;

$urlToken = $url . $token;

//$urlToken = $url . urlencode($token);

//echo "<br>";
//echo "<br>";

echo $urlToken;


/*
// /etc/php.ini
// sendmail_path = /usr/sbin/sendmail -t -i -f "timckyee@gmail.com"

//ini_set('sendmail_from', 'timckyee@gmail.com');

$email = "timckyee@gmail.com";
$subject = "test subject";
$message = "test message";

//$header = "From: timckyee@gmail.com\r\n";
$header= "MIME-Version: 1.0\r\n";
$header.= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$header.= "X-Priority: 1\r\n";

$status = mail($email, $subject, $message, $header);

if($status)
{
    echo '<p>Your mail has been sent!</p>';
} else {
    echo '<p>Something went wrong. Please try again!</p>';
}
*/

?>