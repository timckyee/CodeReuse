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

function addUser($name, $email, $password, $con){


	$sql = "SELECT count(userId) as UserId FROM `tableGridGetPostUsers` WHERE `email`='" . $email . "'";
	
	$result = $con->query($sql);
	
    $row = $result->fetch_assoc();

    if($row["UserId"] != 0)
    {
        echo "User already exists";
        return;
    }


    $sql = "INSERT INTO `tableGridGetPostUsers` (`name`, `email`, `password`) VALUES (?,?,?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sss", $name, $email, $hash);
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt->execute();

    echo "User with email: " . $email . " has been created with encrypted password"; 
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


  // instructions to encrypt data
  //
  // make sure tableGridGetPostUsers has no data
  // navigate to codereuse/php/password_encrypt_hash_verify.php
  // uncomment the line with: $pass = addUser, etc.. and save
  // refresh the page
  // there should now be an entry in the tableGridGetPostUsers

  //$pass = addUser("John Doe", "john@doe.com", "password123", $mysqli);


  // instructions to decrypt data
  //
  // make sure tableGridGetPostUsers has the John Doe entry
  // recomment the line with: $pass = addUser, etc.. and save
  // uncomment the lines starting with: $valid_user = login until end of file
  // refresh the page
  // there will be text either: password verified or password not correct

  /*
  $valid_user = login("john@doe.com", "password123", $mysqli);

  if($valid_user == 1)
  {
      echo 'password verified';
  }
  else
  {
      echo 'password not correct';
  }
  */

?>