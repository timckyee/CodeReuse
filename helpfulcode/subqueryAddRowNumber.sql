SET @row_number = 0;

SELECT num, fieldPrimaryKey
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
    tableGridGetPost2 ORDER BY (select concat(firstname,' ',lastname) from tableGridGetPostTenant where tenantId = field4) desc, fieldPrimaryKey desc
    ) subqueryAddRowNumber
/*
WHERE fieldPrimaryKey = 4
*/