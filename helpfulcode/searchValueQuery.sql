SET @searchValue = 'building2';

select fieldPrimaryKey,field1,field2, field3, field4 from tableGridGetPost2 where
date_format(field1, "%d-%b-%Y") like concat('%', @searchValue, '%') or
date_format(field2, "%d-%b-%Y") like concat('%', @searchValue, '%') or
(select buildingName from tableGridGetPostBuilding where buildingId = field3) like concat('%', @searchValue, '%')
or
(select firstname from tableGridGetPostTenant where tenantId = field4) like concat('%', @searchValue, '%')
or
(select lastname from tableGridGetPostTenant where tenantId = field4) like concat('%', @searchValue, '%')