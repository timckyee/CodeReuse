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
		
		if($queryName == "gridtable") {
		
			$result = $mysqli->query("select " . $_GET["selectString"] . " from tableGridGetPost2");
			
		}
		else if($queryName == "populate")
		{
			$result = $mysqli->query("select " . $_GET["selectString"] . " from tableGridGetPost2 where fieldPrimaryKey = " . $_GET["htmlObjectPrimaryKeyValue"]);
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
			$result = $mysqli->query("update tableGridGetPost2 set " . $_POST["updateString"] . " where " . "fieldPrimaryKey = " . $_POST["htmlObjectPrimaryKeyValue"]);
	    }
	    else if($_POST["postType"] == "createRecordTableGridGetPost")
	    {
            if($mysqli->query("insert into tableGridGetPost2 " . $_POST["insertString"]) === true);
            {
            	$last_id = $mysqli->insert_id;
				echo $last_id;
			}
	    }
	}
	
	$mysqli->close();
    
?>