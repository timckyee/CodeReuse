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

    $myArray = array();
    $result;
	
	if($_SERVER["REQUEST_METHOD"] == "GET") {	
	
		$queryName = $_GET["queryName"];
		
		if($queryName == "table") {
			
			$result = $mysqli->query("select fieldPrimaryKey, field2, field3, field4, field5, selectField, selectField2 from " . $_GET["tableName"]);
			
		}
		else if($queryName == "populate")
		{
			$result = $mysqli->query("select fieldPrimaryKey, field2, field3, field4, field5, selectField, selectField2 from " . $_GET["tableName"] . " where fieldPrimaryKey = " . $_GET["htmlObjectPrimaryKeyValue"]);
		}
	
	    if (!is_null($result)) {
	        $tempArray = array();
	        while($row = $result->fetch_object()) {
		    	        
	                $tempArray = $row;
	                array_push($myArray, $tempArray);
	        }
	
	        echo json_encode($myArray);
	    }
	    
	    $result->close();
    
    }
    else if($_SERVER["REQUEST_METHOD"] == "POST") {
	 
		if($_POST["postType"] == "updateTableGridGetPost")
	    {   		    
			$result = $mysqli->query("update " . $_POST["tableName"] . " set " . $_POST["updateString"] . " where " . "fieldPrimaryKey = " . $_POST["htmlObjectPrimaryKeyValue"]);
	    }
	    else if($_POST["postType"] == "createRecordTableGridGetPost")
	    {
			$result = $mysqli->query("insert into " . $_POST["tableName"] . " " . $_POST["insertString"]);
	    }
	}
	
	$mysqli->close();
    
?>
