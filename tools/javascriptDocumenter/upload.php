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

    $total = count($_FILES['myFile']['name']);

    // Loop through each file
    for( $i=0 ; $i < $total ; $i++ ) {
    
      //Get the temp file path
      $tmpFilePath = $_FILES['myFile']['tmp_name'][$i];
    
      //Make sure we have a file path
      if ($tmpFilePath != ""){
        //Setup our new file path
        $newFilePath = "./files/" . $_FILES['myFile']['name'][$i];
    
        //Upload the file into the temp dir
        if(move_uploaded_file($tmpFilePath, $newFilePath)) {
    
          //Handle other code here
    
        }
      }
    }

?>