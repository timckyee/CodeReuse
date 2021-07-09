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

			$buildingId = $_GET["buildingId"];
			
			$fieldPrimaryKeySortSecondColumnDirection;
			if($sortDirection == "asc")
			{
				$fieldPrimaryKeySortSecondColumnDirection = "asc";
			}
			else if($sortDirection == "desc")
			{
				$fieldPrimaryKeySortSecondColumnDirection = "desc";
			}

			$result = $mysqli->query("select tenantId, tableGridGetPostBuilding.buildingId, tableGridGetPostBuilding.buildingName, tableGridGetPostSuite.suiteId, tableGridGetPostSuite.suiteNumber, firstname, lastname from tableGridGetPostBuilding inner join tableGridGetPostSuite on tableGridGetPostBuilding.buildingId = tableGridGetPostSuite.buildingId inner join tableGridGetPostTenant on tableGridGetPostSuite.suiteId = tableGridGetPostTenant.suiteId where tableGridGetPostBuilding.buildingId=" . $buildingId . " order by " . $sortColumn . " " . $sortDirection . ", tenantId " . $fieldPrimaryKeySortSecondColumnDirection);
						
		}
		else
		if($queryName == "update_session")
		{	
			$userId = $_GET["userId"];

			$result = $mysqli->query("select count(UserId) as CountSessionId from tableGridGetPostSession where UserId = " . $userId);

			$row = $result->fetch_assoc();

			$sessionId = bin2hex(random_bytes(16));

			if($row["CountSessionId"] == "0")
			{
				$mysqli->query("insert into tableGridGetPostSession (UserId, SessionId) values (" . $userId . ",'" . $sessionId . "')");

				echo $sessionId;

				//echo "Logging in.";
			}
			else
			{
				$result = $mysqli->query("update tableGridGetPostSession set SessionId = '" . $sessionId . "' where UserId = " . $userId);
	
				echo $sessionId;

				//$result = $mysqli->query("update tableGridGetPostSession set SessionId = '" . $sessionId . "' where UserId = " . $userId); 
				
				//echo 'User is already logged in.';
			}

			return;

		}
		else
		if($queryName == "remove_session")
		{
			$userId = $_GET["userId"];

			$mysqli->query("delete from tableGridGetPostSession where UserId = " . $userId);

			return;
		}	
		else
		if($queryName == "verify_session")
		{	
			$sessionId = $_GET["sessionId"];

			$result = $mysqli->query("select count(UserId) as CountSessionId from tableGridGetPostSession where SessionId = '" . $sessionId . "'");

			$row = $result->fetch_assoc();

			if($row["CountSessionId"] == 0)
			{
				echo "Invalid Session Id. Redirecting to login page.";
			}
			else
			{
				$result = $mysqli->query("select UserId from tableGridGetPostSession where SessionId = '" . $sessionId . "'");

				$row = $result->fetch_assoc();

				echo $row["UserId"];
				
				//echo "Valid Session Id.";
			}

			return;

		}
		else
		if($queryName == "lock")
		{			
			$tableName = $_GET["tableName"];
			$primaryKey = $_GET["primaryKey"];
			$userId = $_GET["userId"];

			$mysqli->query("insert into tableGridGetPostLock (TableName, PrimaryKey, UserId) values ('" . $tableName . "'," . $primaryKey . "," . $userId . ")");

			echo "Record has been locked";
			return;
		}
		else		
		if($queryName == "unlock")
		{			
			$tableName = $_GET["tableName"];
			$primaryKey = $_GET["primaryKey"];
			$userId = $_GET["userId"];

			if($primaryKey != "")
			{
				$result = $mysqli->query("select count(UserId) as CountLockPrimaryKey from tableGridGetPostLock where TableName = '" . $tableName . "' and PrimaryKey = " . $primaryKey);

				$row = $result->fetch_assoc();

				if($row["CountLockPrimaryKey"] == "1")
				{	
					$mysqli->query("delete from tableGridGetPostLock where TableName='" . $tableName . "' and PrimaryKey=" . $primaryKey . " and UserId=" . $userId);
				}
			}

			return;
		}		
		else
		if($queryName == "form_unlock")
		{
			$tableName = $_GET["tableName"];
			$previousPrimaryKey = $_GET["previousPrimaryKey"];
			$primaryKey = $_GET["primaryKey"];
			$userId = $_GET["userId"];

			$result = $mysqli->query("select count(UserId) as CountLockPrimaryKey from tableGridGetPostLock where TableName = '" . $tableName . "' and PrimaryKey = " . $primaryKey);

			$row = $result->fetch_assoc();

			if($row["CountLockPrimaryKey"] != "1")
			{	
				$result = $mysqli->query("select count(UserId) as CountLockPreviousPrimaryKey from tableGridGetPostLock where TableName = '" . $tableName . "' and PrimaryKey = " . $previousPrimaryKey);

				$row = $result->fetch_assoc();
	
				if($row["CountLockPreviousPrimaryKey"] == "1")
				{	
					$mysqli->query("delete from tableGridGetPostLock where TableName='" . $tableName . "' and PrimaryKey=" . $previousPrimaryKey . " and UserId=" . $userId);
				}
			}
			else
			if($row["CountLockPrimaryKey"] == "1")
			{
				echo "Record locked by another user";
			}

			return;
		}
		else
		if($queryName == "checkdelete_checklock_lock") {

			$tableName = $_GET["tableName"];
			$primaryKeyFieldName = $_GET["primaryKeyFieldName"];
			$primaryKey = $_GET["primaryKey"];
			$userId = $_GET["userId"];

			$result = $mysqli->query("select count(" . $primaryKeyFieldName . ") as numberOfRecords from " . $tableName . " where " . $primaryKeyFieldName . "=" . $primaryKey);

			$row = $result->fetch_assoc();

			if($row["numberOfRecords"] == "0")
			{
				echo "Record no longer exists";
				return;
			}
			else
			{
				$result = $mysqli->query("select count(UserId) as CountLockPrimaryKey from tableGridGetPostLock where TableName = '" . $tableName . "' and PrimaryKey = " . $primaryKey);

				$row = $result->fetch_assoc();

				if($row["CountLockPrimaryKey"] == "1")
				{
					echo "Record is currently locked by another user";
					return;
				}
				else
				{
					//test transaction
					$mysqli->begin_transaction();

					try {
						/* Insert some values */
						$mysqli->query("insert into tableGridGetPostLock (TableName, PrimaryKey, UserId) values ('" . $tableName . "'," . $primaryKey . "," . $userId . ")");
										
						/* If code reaches this point without errors then commit the data in the database */
						$mysqli->commit();

					} catch (mysqli_sql_exception $exception) {

						$mysqli->rollback();

						throw $exception;

					} finally {

						echo "Record has been locked";

					}

					//echo "Record has been locked";

					return;


					//$mysqli->query("insert into tableGridGetPostLock (TableName, PrimaryKey, UserId) values ('" . $tableName . "'," . $primaryKey . "," . $userId . ")");

					//echo "Record has been locked";
					//return;
				}
			}
		}
		else
		if($queryName == "unlockRecordsOnExit") {

			//$tableName = $_GET["tableName"];
			//$primaryKey = $_GET["primaryKey"];
			$userId = $_GET["userId"];

			$result = $mysqli->query("select count(UserId) as CountLockPrimaryKey from tableGridGetPostLock where UserId=" . $userId);

			$row = $result->fetch_assoc();

			$CountLockPrimaryKey = intval($row["CountLockPrimaryKey"]);

			if($CountLockPrimaryKey >= 1)
			{
				$mysqli->query("delete from tableGridGetPostLock where UserId=" . $userId);
			}
		
			return;
		}
		else
		if($queryName == "gridtablehomePages") {
		
			$searchValue = $_GET["searchValue"];

			if($searchValue != "")
			{
				$pageSize = $_GET["pageSize"];
				
				$mysqli->query('SET @searchValue = \'' . $searchValue . '\'');
				$sql = "select count(fieldPrimaryKey) as gridRows from tableGridGetPost2 where

				date_format(field1, '%d-%b-%Y') like concat('%', @searchValue, '%') or
				
				date_format(field2, '%d-%b-%Y') like concat('%', @searchValue, '%') or
				
				(select buildingName from tableGridGetPostBuilding where buildingId = field3) like concat('%', @searchValue, '%')
				
				or
				(select firstname from tableGridGetPostTenant where tenantId = field4) like concat('%', @searchValue, '%')
				
				or
				(select lastname from tableGridGetPostTenant where tenantId = field4) like concat('%', @searchValue, '%')";

				$stmt = $mysqli->prepare($sql);
				$stmt->execute();

				$result = $stmt->get_result();

				$row = $result->fetch_object();

				$gridRows = $row->gridRows;

				$totalPagesRemainder = $gridRows % $pageSize;

				if($totalPagesRemainder >= 1)
				{
					$totalPages = floor($gridRows / $pageSize) + 1;
				}
				else
				{
					$totalPages = $gridRows / $pageSize;
				}

				echo $totalPages;
				
				return;				

			}			
			else
			{
				$pageSize = $_GET["pageSize"];

				$result = $mysqli->query("select count(fieldPrimaryKey) as gridRows from tableGridGetPost2");

				$row = $result->fetch_object();

				$gridRows = $row->gridRows;

				$totalPagesRemainder = $gridRows % $pageSize;

				if($totalPagesRemainder >= 1)
				{
					$totalPages = floor($gridRows / $pageSize) + 1;
				}
				else
				{
					$totalPages = $gridRows / $pageSize;
				}
				
				echo $totalPages;
				
				return;
			}

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
		if($queryName == "selectSuites") {
			
			$result = $mysqli->query("select suiteId, suiteNumber from tableGridGetPostSuite where buildingid = " . $_GET["buildingId"]);
		
		}		
		else
		if($queryName == "populateSuite") {
			
			$result = $mysqli->query("select suiteId, suiteNumber, tableGridGetPostSuite.buildingId, buildingName, location from tableGridGetPostSuite inner join tableGridGetPostBuilding on tableGridGetPostSuite.buildingId = tableGridGetPostBuilding.buildingId where suiteId = " . $_GET["htmlObjectPrimaryKeyValue"]);
		
		}
		else
		if($queryName == "populateTenant") {
			
			$result = $mysqli->query("select tenantId, tableGridGetPostBuilding.buildingId, tableGridGetPostBuilding.buildingName, tableGridGetPostSuite.suiteId, tableGridGetPostSuite.suiteNumber, firstname, lastname from tableGridGetPostBuilding inner join tableGridGetPostSuite on tableGridGetPostBuilding.buildingId = tableGridGetPostSuite.buildingId inner join tableGridGetPostTenant on tableGridGetPostSuite.suiteId = tableGridGetPostTenant.suiteId where tenantId = " . $_GET["htmlObjectPrimaryKeyValue"]);
		
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
		else if($queryName == "recordExistsHomeTenantFormGridPaging") {

			$result = $mysqli->query("select count(fieldPrimaryKey) as numberOfRecords from tableGridGetPost2 where fieldPrimaryKey = " . $_GET["inputPrimaryKey"]);

			$row = $result->fetch_assoc();

			echo $row["numberOfRecords"];

			return;
		}
		else if($queryName == "recordExistsHomeTenantGrid") {

			$result = $mysqli->query("select count(fieldPrimaryKey) as numberOfRecords from tableGridGetPost2 where fieldPrimaryKey = " . $_GET["inputPrimaryKey"]);

			$row = $result->fetch_assoc();

			echo $row["numberOfRecords"];

			return;
		}		
		else if($queryName == "recordExistsSuiteForm") {

			$result = $mysqli->query("select count(suiteId) as numberOfRecords from tableGridGetPostSuite where suiteId = " . $_GET["inputPrimaryKey"]);

			$row = $result->fetch_assoc();

			echo $row["numberOfRecords"];

			return;
		}
		else if($queryName == "recordExistsTenantForm") {

			$result = $mysqli->query("select count(tenantId) as numberOfRecords from tableGridGetPostTenant where tenantId = " . $_GET["inputPrimaryKey"]);

			$row = $result->fetch_assoc();

			echo $row["numberOfRecords"];

			return;
		}
		else if($queryName == "suiteNumberExists") {

			$inputSuiteNumber = $_GET["inputSuiteNumber"];

			if($inputSuiteNumber != "")
			{
				$result = $mysqli->query("select count(suiteId) as numberOfRecords from tableGridGetPostSuite where buildingId = " . $_GET["inputBuildingId"] . " and suiteNumber = '" . $inputSuiteNumber . "'");

				$row = $result->fetch_assoc();

				echo $row["numberOfRecords"];
			}

			return;
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
	 
		if($_POST["postType"] == "removeSessionAndLocks")
		{
			$userId = $_POST["userId"];

			$mysqli->query("delete from tableGridGetPostSession where UserId = " . $userId);

			$mysqli->query("delete from tableGridGetPostLock where UserId=" . $userId);
		}
		else
		if($_POST["postType"] == "updateTableGridGetPostSuite")
	    {   		    
			$sessionId = $_POST["sessionId"];

			$result = $mysqli->query("select count(UserId) as CountSessionId from tableGridGetPostSession where SessionId = '" . $sessionId . "'");

			$row = $result->fetch_assoc();

			if($row["CountSessionId"] == "1")
			{
				$result = $mysqli->query("update tableGridGetPostSuite set " . $_POST["updateString"] . " where " . "suiteId = " . $_POST["htmlObjectPrimaryKeyValue"]);
			}
			else
			{
				echo 'Session Id not valid';
			}
	    }
	    else
		if($_POST["postType"] == "createRecordTableGridGetPostSuite")
	    {   		
			$sessionId = $_POST["sessionId"];

			$result = $mysqli->query("select count(UserId) as CountSessionId from tableGridGetPostSession where SessionId = '" . $sessionId . "'");

			$row = $result->fetch_assoc();

			if($row["CountSessionId"] == "1")
			{
				if($mysqli->query("insert into tableGridGetPostSuite " . $_POST["insertString"]) === true);
				{
					$last_id = $mysqli->insert_id;
					echo $last_id;
				}
			}
			else
			{
				echo 'Session Id not valid';
			}
	    }
	    else
		if($_POST["postType"] == "updateTableGridGetPost")
	    {   		    
			$sessionId = $_POST["sessionId"];

			$result = $mysqli->query("select count(UserId) as CountSessionId from tableGridGetPostSession where SessionId = '" . $sessionId . "'");

			$row = $result->fetch_assoc();

			if($row["CountSessionId"] == "1")
			{
				$result = $mysqli->query("update tableGridGetPost2 set " . $_POST["updateString"] . " where " . "fieldPrimaryKey = " . $_POST["htmlObjectPrimaryKeyValue"]);
			}
			else
			{
				echo 'Session Id not valid';
			}
	    }
		else		
		if($_POST["postType"] == "updateTableTenant")
	    {   		
			$sessionId = $_POST["sessionId"];

			$result = $mysqli->query("select count(UserId) as CountSessionId from tableGridGetPostSession where SessionId = '" . $sessionId . "'");

			$row = $result->fetch_assoc();

			if($row["CountSessionId"] == "1")
			{
				$result = $mysqli->query("update tableGridGetPostTenant set " . $_POST["updateString"] . " where " . "tenantId = " . $_POST["htmlObjectPrimaryKeyValue"]);
			}
			else
			{
				echo 'Session Id not valid';
			}
	    }
	    else if($_POST["postType"] == "createRecordTableGridGetPost")
	    {
			$sessionId = $_POST["sessionId"];

			$result = $mysqli->query("select count(UserId) as CountSessionId from tableGridGetPostSession where SessionId = '" . $sessionId . "'");

			$row = $result->fetch_assoc();

			if($row["CountSessionId"] == "1")
			{
				if($mysqli->query("insert into tableGridGetPost2 " . $_POST["insertString"]) === true);
				{
					$last_id = $mysqli->insert_id;
					echo $last_id;
				}
			}
			else
			{
				echo 'Session Id not valid';
			}
	    }		
	    else if($_POST["postType"] == "createRecordTableGridGetPostTenant")
	    {
			$sessionId = $_POST["sessionId"];

			$result = $mysqli->query("select count(UserId) as CountSessionId from tableGridGetPostSession where SessionId = '" . $sessionId . "'");

			$row = $result->fetch_assoc();

			if($row["CountSessionId"] == "1")
			{
				if($mysqli->query("insert into tableGridGetPostTenant " . $_POST["insertString"]) === true);
				{
					$last_id = $mysqli->insert_id;
					echo $last_id;
				}
			}
			else
			{
				echo 'Session Id not valid';
			}
	    }
	}
	
	$mysqli->close();
    
?>
