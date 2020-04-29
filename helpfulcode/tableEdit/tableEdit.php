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
	
		if($queryName == "gridtablehome") {
		
			$result = $mysqli->query("select fieldPrimaryKey,field1,field2,field3,field4, field3 as buildingId, field4 as tenantId, (select buildingName from tableGridGetPostBuilding where buildingId = field3) as buildingName, (select concat(firstname,' ',lastname) from tableGridGetPostTenant where tenantId = field4) as tenantName from tableGridGetPost2" . " order by " . $_GET["sortColumn"] . " " . $_GET["sortDirection"]);
		}
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
	
	$mysqli->close();
    
?>