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

define ("SECRETKEY", "mysecretkey1234");

function addUser($name, $email, $password, $con) {
	    
  $sql = "INSERT INTO `tableGridGetPostUsers` (`name`, `email`, `password`) VALUES ";
    
  //$hash = openssl_encrypt($password, "AES-128-ECB", SECRETKEY);
  
  $hash = openssl_encrypt($password, "aes-256-cbc", SECRETKEY);
  
  $sql = $sql . "('" . $name . "','" . $email . "','" . $hash . "')";
  
  $con->query($sql);
 
}

$pass = addUser("Jane Doe", "jane@doe.com", "password456", $mysqli);

return;

function login($email, $password, $con) {
  
  $sql = "SELECT * FROM `tableGridGetPostUsers` WHERE `email`='" . $email . "'";
 
  $myArray = array();
  $result; 
  $json_array = array();
  
  $result = $con->query($sql);
  
  $row = $result->fetch_assoc();
  
  	/*
	if (!is_null($result)) {
		
	    $tempArray = array();
	    while($row = $result->fetch_object()) {
	 	    		 	    	        
	            $tempArray = $row;
	            array_push($myArray, $tempArray);
	    }
		
	    $json_array = json_encode($myArray);
	}
	*/

  //$plain = openssl_decrypt($row['password'], "AES-128-ECB", SECRETKEY);
  
  $plain = openssl_decrypt($row['password'], "aes-256-cbc", SECRETKEY);

  return $password == $plain;
  
  //while($row = $result->fetch_object()) {
  //	   var_dump($row);
  //}
  
}

$valid_user = login('jane@doe.com', 'password456', $mysqli);

echo var_dump($valid_user);

?>


