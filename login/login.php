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

/*
Please take note that password_hash() is a one-way encryption.
There is no way you can decrypt that easily, so you will have
to ask the user for a new password for password recovery.
*/

function addUser($firstname, $lastname, $username, $email, $password, $con) {

	$sql = "SELECT count(userId) as UserId FROM `tableGridGetPostUsers` WHERE `email`='" . $email . "'";
	
	$result = $con->query($sql);
	
    $row = $result->fetch_assoc();

    if($row["UserId"] != 0)
    {
        echo "User already exists";
        return;
    }


    $sql = "INSERT INTO `tableGridGetPostUsers` (`firstname`, `lastname`, `username`, `email`, `password`) VALUES (?,?,?,?,?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssss", $firstname, $lastname, $username, $email, $hash);
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt->execute();

	$returnMessage = "User with username: " . $username . " has been created with encrypted password";

   	echo $returnMessage;
}

function login($username, $password, $con){
      
	$sql = "SELECT password FROM `tableGridGetPostUsers` WHERE `username`=?";
	$stmt = $con->prepare($sql);
	$stmt->bind_param("s", $username);

	$stmt->execute();

	$result = $stmt->get_result();

	$user = $result->fetch_assoc();

	return password_verify($password, $user['password']);
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