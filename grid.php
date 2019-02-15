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
	
	$buildingId = $_GET["buildingId"];
	
	if($queryName == "tenants") {
		
		$buildingId = $_GET["buildingId"];

        $result = $mysqli->query("select Building.BuildingId, BuildingCode, Suite.SuiteId, Suite.SuiteNumber,
        Tenant.TenantId, Tenant.FirstName, Tenant.LastName, if(MoveInDate = '0000-00-00 00:00:00','',substring(
        MoveInDate, 1, 10)) as MoveInDate, if(MoveOutDate = '0000-00-00 00:00:00','',substring(MoveOutDate, 1, 10)) 
        as MoveOutDate, if((select max(Amount) from SuiteRent where TenantId = Tenant.TenantId) is null,'',(select 
        max(Amount) from SuiteRent where TenantId = Tenant.TenantId)) as CurrentRent from Building inner join Suite on 
        Building.BuildingId = Suite.BuildingId left outer join Tenant on Suite.SuiteId = Tenant.SuiteId where 
        Building.BuildingId = " . $buildingId . " and (Tenant.MoveOutDate >= curdate() or Tenant.MoveOutDate = '0000-00-00 
        00:00:00') order by Suite.SuiteId, Tenant.TenantId limit 10");
		
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
