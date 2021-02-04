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
								
			$sortColumn = $_GET["sortColumn"];
			$sortDirection = $_GET["sortDirection"];

			$buildingId = $_GET["building"];
			
			$fieldPrimaryKeySortSecondColumnDirection;
			if($sortDirection == "asc")
			{
				$fieldPrimaryKeySortSecondColumnDirection = "asc";
			}
			else if($sortDirection == "desc")
			{
				$fieldPrimaryKeySortSecondColumnDirection = "desc";
			}			

			$result = $mysqli->query("select fieldPrimaryKey,field1,field2,field3,field4, (select buildingName from tableGridGetPostBuilding where buildingId = field3) as buildingName, (select concat(firstname,' ',lastname) from tableGridGetPostTenant where tenantId = field4) as tenantName from tableGridGetPost2 where (select buildingId from tableGridGetPostBuilding where buildingId = field3)=" . $buildingId . " order by " . $sortColumn . " " . $sortDirection . ", fieldPrimaryKey " . $fieldPrimaryKeySortSecondColumnDirection);
						
		}
		else
		if($queryName == "gridtablehome") {
			
			$sortColumn = $_GET["sortColumn"];
			$sortDirection = $_GET["sortDirection"];

			$orderBy;

			if($sortColumn == "fieldPrimaryKey")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY fieldPrimaryKey asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY fieldPrimaryKey desc";
				}
			}
			else if($sortColumn == "buildingName")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY (select buildingName from tableGridGetPostBuilding where buildingId = field3) asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY (select buildingName from tableGridGetPostBuilding where buildingId = field3) desc";
				}
			}
			else if($sortColumn == "tenantName")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY (select concat(firstname,' ',lastname) as tenantName from tableGridGetPostTenant where tenantId = field4) asc";	
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY (select concat(firstname,' ',lastname) as tenantName from tableGridGetPostTenant where tenantId = field4) desc";	
				}					
			}
			else if($sortColumn == "field1")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY field1 asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY field1 desc";
				}
			}
			else if($sortColumn == "field2")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY field2 asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY field2 desc";
				}
			}

			if($_GET["savePrimaryKey"] != "")
			{
				$savePrimaryKey = $_GET["savePrimaryKey"];
				
				$fieldPrimaryKeySortSecondColumnDirection;
				if($sortDirection == "asc")
				{
					$fieldPrimaryKeySortSecondColumnDirection = "asc";
				}
				else if($sortDirection == "desc")
				{
					$fieldPrimaryKeySortSecondColumnDirection = "desc";
				}

				$mysqli->query('SET @row_number = 0;');
				$sql = "SELECT num, fieldPrimaryKey
					FROM
					(
					SELECT (@row_number:=@row_number + 1) AS num, 
					fieldPrimaryKey, 
					(select buildingName from tableGridGetPostBuilding where buildingId = field3) as buildingName,
					field3,
					(select concat(firstname,' ',lastname) from tableGridGetPostTenant where tenantId = field4) as tenantName,
					field4,
					field1,
					field2
				FROM
					tableGridGetPost2 " . $orderBy . " ," . " fieldPrimaryKey " . $fieldPrimaryKeySortSecondColumnDirection .
					") subqueryAddRowNumber
				WHERE fieldPrimaryKey = " . $savePrimaryKey;

				$stmt = $mysqli->prepare($sql);
				$stmt->execute();

				//$result = $stmt->fetch();

				$result = $stmt->get_result();

				$row = $result->fetch_object();

				$rowNumber = $row->num;
						
				$pageSize = $_GET["pageSize"];
				$pageNumber;

				if($rowNumber % $pageSize > 0)
				{
					$pageNumber = floor($rowNumber / $pageSize) + 1;
				}
				else if($rowNumber % $pageSize == 0)
				{
					$pageNumber = floor($rowNumber / $pageSize);
				}
					
				$limit = $pageSize;
				$offset = ($pageNumber - 1) * $pageSize;

				if($_GET["queryType"] == "getPageNumber")
				{
					echo $pageNumber;
					return;
				}
			}
			else
			{
				$primaryKeySortDirection = '';

				$pageNumber = $_GET["pageNumber"];

				$pageSize = $_GET["pageSize"];

				$limit = $pageSize;
				$offset = ($pageNumber - 1) * $pageSize;

				if($sortDirection == "asc")
				{
					$primaryKeySortDirection = "asc";
				}
				else if($sortDirection == "desc")
				{
					$primaryKeySortDirection = "desc";
				}

				$result = $mysqli->query("select fieldPrimaryKey,field1,field2,field3,field4, field3 as buildingId, field4 as tenantId, (select buildingName from tableGridGetPostBuilding where buildingId = field3) as buildingName, (select concat(firstname,' ',lastname) from tableGridGetPostTenant where tenantId = field4) as tenantName from tableGridGetPost2 " . $orderBy . ", fieldPrimaryKey " . $primaryKeySortDirection . " limit " . $limit . " offset " . $offset);
			}
		}
		else
		if($queryName == "gridtablehomeSearch")
		{			
			$sortColumn = $_GET["sortColumn"];
			$sortDirection = $_GET["sortDirection"];

			$orderBy;

			if($sortColumn == "fieldPrimaryKey")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY fieldPrimaryKey asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY fieldPrimaryKey desc";
				}
			}
			else if($sortColumn == "buildingName")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY (select buildingName from tableGridGetPostBuilding where buildingId = field3) asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY (select buildingName from tableGridGetPostBuilding where buildingId = field3) desc";
				}
			}
			else if($sortColumn == "tenantName")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY (select concat(firstname,' ',lastname) as tenantName from tableGridGetPostTenant where tenantId = field4) asc";	
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY (select concat(firstname,' ',lastname) as tenantName from tableGridGetPostTenant where tenantId = field4) desc";	
				}					
			}
			else if($sortColumn == "field1")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY field1 asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY field1 desc";
				}
			}
			else if($sortColumn == "field2")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY field2 asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY field2 desc";
				}
			}

			$searchValue = $_GET["searchValue"];


			if($_GET["savePrimaryKey"] != "")
			{
				$savePrimaryKey = $_GET["savePrimaryKey"];			

				$fieldPrimaryKeySortSecondColumnDirection;
				if($sortDirection == "asc")
				{
					$fieldPrimaryKeySortSecondColumnDirection = "asc";
				}
				else if($sortDirection == "desc")
				{
					$fieldPrimaryKeySortSecondColumnDirection = "desc";
				}

				$mysqli->query('SET @row_number = 0;');
				$mysqli->query('SET @searchValue = \'' . $searchValue . '\';');
				$sql = "SELECT num, fieldPrimaryKey
					FROM
					(
					SELECT (@row_number:=@row_number + 1) AS num, 
					fieldPrimaryKey, 
					(select buildingName from tableGridGetPostBuilding where buildingId = field3) as buildingName,
					field3,
					(select concat(firstname,' ',lastname) from tableGridGetPostTenant where tenantId = field4) as tenantName,
					field4,
					field1,
					field2
				FROM
					tableGridGetPost2 
					
				WHERE
					date_format(field1, '%d-%b-%Y') like concat('%', @searchValue, '%') or
					
					date_format(field2, '%d-%b-%Y') like concat('%', @searchValue, '%') or
					
					(select buildingName from tableGridGetPostBuilding where buildingId = field3) like concat('%', @searchValue, '%')
					
					or
					(select firstname from tableGridGetPostTenant where tenantId = field4) like concat('%', @searchValue, '%')
					
					or
					(select lastname from tableGridGetPostTenant where tenantId = field4) like concat('%', @searchValue, '%') " . $orderBy . " ," . " fieldPrimaryKey " . $fieldPrimaryKeySortSecondColumnDirection .
					") subqueryAddRowNumber
				WHERE fieldPrimaryKey = " . $savePrimaryKey;

				$stmt = $mysqli->prepare($sql);
				$stmt->execute();

				//$result = $stmt->fetch();

				$result = $stmt->get_result();

				$row = $result->fetch_object();

				$rowNumber = $row->num;

				$pageSize = $_GET["pageSize"];
				$pageNumber;

				if($rowNumber % $pageSize > 0)
				{
					$pageNumber = floor($rowNumber / $pageSize) + 1;
				}
				else if($rowNumber % $pageSize == 0)
				{
					$pageNumber = floor($rowNumber / $pageSize);
				}

				$limit = $pageSize;
				$offset = ($pageNumber - 1) * $pageSize;

				if($_GET["queryType"] == "getPageNumber")
				{
					echo $pageNumber;
					return;
				}
			}
			else
			{
				$primaryKeySortDirection = '';

				$pageNumber = $_GET["pageNumber"];

				$pageSize = $_GET["pageSize"];

				$limit = $pageSize;
				$offset = ($pageNumber - 1) * $pageSize;

				if($sortDirection == "asc")
				{
					$primaryKeySortDirection = "asc";
				}
				else if($sortDirection == "desc")
				{
					$primaryKeySortDirection = "desc";
				}

				$mysqli->query('SET @searchValue = \'' . $searchValue . '\'');
				$sql = "select fieldPrimaryKey,field1,field2, field3, field4, (select buildingName from tableGridGetPostBuilding where buildingId = field3) as buildingName, (select concat(firstname,' ',lastname) from tableGridGetPostTenant where tenantId = field4) as tenantName from tableGridGetPost2 where

				date_format(field1, '%d-%b-%Y') like concat('%', @searchValue, '%') or
				
				date_format(field2, '%d-%b-%Y') like concat('%', @searchValue, '%') or
				
				(select buildingName from tableGridGetPostBuilding where buildingId = field3) like concat('%', @searchValue, '%')
				
				or
				(select firstname from tableGridGetPostTenant where tenantId = field4) like concat('%', @searchValue, '%')
				
				or
				(select lastname from tableGridGetPostTenant where tenantId = field4) like concat('%', @searchValue, '%') " . $orderBy  . ", fieldPrimaryKey " . $primaryKeySortDirection . " limit " . $limit . " offset " . $offset;

				$stmt = $mysqli->prepare($sql);
				$stmt->execute();

				$result = $stmt->get_result();
			}

		}
		else
		if($queryName == "populateSuite") {
			
			$result = $mysqli->query("select suiteId, suiteNumber, tableGridGetPostSuite.buildingId, buildingName, location from tableGridGetPostSuite inner join tableGridGetPostBuilding on tableGridGetPostSuite.buildingId = tableGridGetPostBuilding.buildingId where suiteId = " . $_GET["htmlObjectPrimaryKeyValue"]);
		
		}
		else
		if($queryName == "populate") {
			
			$result = $mysqli->query("select fieldPrimaryKey,field1,field2,field3, (select buildingName from tableGridGetPostBuilding where buildingId = field3) as field3display, (select concat(firstname, ' ', lastname) from tableGridGetPostTenant inner join tableGridGetPostSuite on tableGridGetPostTenant.suiteId = tableGridGetPostSuite.suiteId where tenantId = field4) as field4display, field4 from tableGridGetPost2 where fieldPrimaryKey = " . $_GET["htmlObjectPrimaryKeyValue"]);
		
		}
		else
		if($queryName == "populategrid") {
		
			$searchValue = $_GET["searchValue"];
			
			if($searchValue  != "")
			{
				$mysqli->query('SET @searchValue = \'' . $searchValue . '\'');

				$result = $mysqli->query("select fieldPrimaryKey,field1,field2,field3, (select buildingName from tableGridGetPostBuilding where buildingId = field3) as field3display, (select concat(firstname, ' ', lastname) from tableGridGetPostTenant inner join tableGridGetPostSuite on tableGridGetPostTenant.suiteId = tableGridGetPostSuite.suiteId where tenantId = field4) as field4display, field4 from tableGridGetPost2 where fieldPrimaryKey = " . $_GET["htmlObjectPrimaryKeyValue"]);				
			}
			else
			{
				$result = $mysqli->query("select fieldPrimaryKey,field1,field2,field3, (select buildingName from tableGridGetPostBuilding where buildingId = field3) as field3display, (select concat(firstname, ' ', lastname) from tableGridGetPostTenant inner join tableGridGetPostSuite on tableGridGetPostTenant.suiteId = tableGridGetPostSuite.suiteId where tenantId = field4) as field4display, field4 from tableGridGetPost2 where fieldPrimaryKey = " . $_GET["htmlObjectPrimaryKeyValue"]);
			}
		
		}	
		else if($queryName == "buildings") {
		
			$filter = $_GET["filter"];		
				
	        $result = $mysqli->query("select buildingId, buildingName from tableGridGetPostBuilding where buildingName like '%" . $filter. "%' order by buildingName");			
			
		}
		else if($queryName == "suites") {
						
			$sortColumn = $_GET["sortColumn"];
			$sortDirection = $_GET["sortDirection"];

			$buildingId = $_GET["building"];
			
			$fieldPrimaryKeySortSecondColumnDirection;
			if($sortDirection == "asc")
			{
				$fieldPrimaryKeySortSecondColumnDirection = "asc";
			}
			else if($sortDirection == "desc")
			{
				$fieldPrimaryKeySortSecondColumnDirection = "desc";
			}
			
			$result = $mysqli->query("select suiteId, suiteNumber, tableGridGetPostSuite.buildingId, buildingName, location from tableGridGetPostSuite inner join tableGridGetPostBuilding on tableGridGetPostSuite.buildingId = tableGridGetPostBuilding.buildingId where tableGridGetPostBuilding.buildingId = " . $buildingId . " order by " . $sortColumn . " " . $sortDirection . ", suiteId " . $fieldPrimaryKeySortSecondColumnDirection);
		}		
		else if($queryName == "tenants") {

		$buildingId = $_GET["building"];
		$filter = $_GET["filter"];
		
        $result = $mysqli->query("select suiteNumber, tenantId, concat(firstname, ' ', lastname) as tenantName from tableGridGetPostTenant inner join tableGridGetPostSuite on tableGridGetPostTenant.suiteId = tableGridGetPostSuite.suiteId where tableGridGetPostSuite.buildingId = " . $buildingId . " and (suiteNumber like '%" . $filter. "%' or concat(firstname, ' ',  lastname) like '%" . $filter . "%') order by suiteNumber, concat(firstname, ' ', lastname)");
		
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
	 
		if($_POST["postType"] == "updateTableGridGetPostSuite")
	    {   		    
			$result = $mysqli->query("update tableGridGetPostSuite set " . $_POST["updateString"] . " where " . "suiteId = " . $_POST["htmlObjectPrimaryKeyValue"]);
	    }
	    else
		if($_POST["postType"] == "createRecordTableGridGetPostSuite")
	    {   		    
            if($mysqli->query("insert into tableGridGetPostSuite " . $_POST["insertString"]) === true);
            {
            	$last_id = $mysqli->insert_id;
				echo $last_id;
			}
	    }
	    else	    
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
