<?php
	
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');

    $user = 'root';
    $password = 'root';
    $db = 'BuildingManagementSystem';
    $host = 'localhost';
    $port = 8889;

    $mysqli = new mysqli($host, $user, $password, $db, $port);

    if($mysqli->connect_error) {
        echo "connection error";
    }

    $myArray = array();
    $result;
	
	$queryName = $_GET["queryName"];
	
	$filter = $_GET["filter"];
	
	if($queryName == "buildings") {

    	$result = $mysqli->query("SELECT BuildingId, BuildingCode, BuildingName from Building");

	}
	else
	if($queryName == "tenants") {

		$buildingId = $_GET["building"];

        $result = $mysqli->query("select Suite.SuiteNumber, TenantId, concat(FirstName, ' ', LastName) as TenantName, FirstName, LastName from Tenant left outer join Suite on Tenant.SuiteId = Suite.SuiteId where Tenant.BuildingId = " . $buildingId . " and (SuiteNumber like '%" . $filter . "%' or concat(FirstName, ' ',  LastName) like '%" . $filter . "%') order by SuiteNumber, concat(FirstName, ' ', LastName)");
		
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
