CodeReuse.Helper = function() {
	
};

CodeReuse.Helper.prototype = {

gridShow: function(divElement)
{
	var divTable = document.getElementById(divElement);
	
	if(document.getElementById(divElement).style.display == "none")
	{
		document.getElementById(divElement).style.display = "block";
	}
	
},
	
gridHide: function(divElement)
{
	var divTable = document.getElementById(divElement);
	
	if(document.getElementById(divElement).style.display == "block")
	{
		document.getElementById(divElement).style.display = "none";
	}
	
	//divTable.innerHTML = "";
},

validateHtmlObjectFieldsSuite: function(fieldsInfo)
{
	for(validate=0; validate<fieldsInfo.length; validate++)
	{
		if(fieldsInfo[validate].htmlObjectType != "primaryKey")
		{
			if(fieldsInfo[validate].htmlObjectId != "inputLocation")
			{
				if(document.getElementById(fieldsInfo[validate].htmlObjectId).value == "")
				{
					alert(fieldsInfo[validate].htmlObjectId + ' ' + 'cannot be empty');
					return false;
				}
			}
		}
	}
	
	return true;
},

validateHtmlObjectFieldsTenant: function(fieldsInfo)
{
	for(validate=0; validate<fieldsInfo.length; validate++)
	{
		if(fieldsInfo[validate].htmlObjectType != "primaryKey")
		{
			if(document.getElementById(fieldsInfo[validate].htmlObjectId).value == "")
			{
				alert(fieldsInfo[validate].htmlObjectId + ' ' + 'cannot be empty');
				return false;
			}
		}
	}
	
	return true;
},

validateHtmlObjectFieldsHomeTenantGrid: function(columnsInfo)
{
	for(validate=0; validate<columnsInfo.length; validate++)
	{
		if(columnsInfo[validate].id != "fieldPrimaryKey")
		{
			if(document.getElementById(columnsInfo[validate].htmlObjectId).value == "")
			{
				alert(columnsInfo[validate].htmlObjectId + ' ' + 'cannot be empty');
				return false;
			}
		}
	}
	
	return true;
},

updateGridPage: function(pageNumber)
{
	localStorage.setItem("homeTenantGridPageNumber", pageNumber);

	var pageNumberUpdate = localStorage.getItem("homeTenantGridPageNumber");

	var tenantModel = new CodeReuse.Tenant();

	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	var sortColumn = localStorage.getItem("arraySortColumn");

	var sortDirection = localStorage.getItem("arraySortDirection");

	home_tenant_grid.refreshTenantHomeGrid(home_tenant_grid.getPhpFile(), tenantModel.getFieldsInfo(), sortColumn, sortDirection, pageNumberUpdate);
},

updateGridPageArrows: function(direction, pageNumber)
{
	var pageNumberUpdate;

	if(direction == "left") {
		if(pageNumber == "1") {
			alert('You are on the first page');
			return;
		} else {
			pageNumberUpdate = parseInt(pageNumber) - 1;
			document.getElementById('gridGetPostHomePagingPageNumber').value = pageNumberUpdate;
		}
	} else if(direction == "right") {
		pageNumberUpdate = parseInt(pageNumber) + 1;
		document.getElementById('gridGetPostHomePagingPageNumber').value = pageNumberUpdate;
	}

	localStorage.setItem("homeTenantGridPageNumber", pageNumberUpdate.toString());

	var tenantModel = new CodeReuse.Tenant();

	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	var sortColumn = localStorage.getItem("arraySortColumn");

	var sortDirection = localStorage.getItem("arraySortDirection");

	home_tenant_grid.refreshTenantHomeGrid(home_tenant_grid.getPhpFile(), tenantModel.getFieldsInfo(), sortColumn, sortDirection, pageNumberUpdate.toString());
},

convertDateFromDatabase: function(date)
{	
	var dateFromDatabase = date;
	
	var year = dateFromDatabase.substring(0,4);
	var month = dateFromDatabase.substring(5,7);
	var day = dateFromDatabase.substring(8,10);
	
	var dateFormat = day + "-" + this.dateMonthNumberToStringConversion(month) + "-" + year;
	
	return dateFormat;

},

convertDateFromSystem: function(date)
{	
	var dateFromSystem = date;
	
	var day = dateFromSystem.substring(0,2);
	var month = dateFromSystem.substring(3,6);
	var year = dateFromSystem.substring(7,11);
	
	var dateFormat = year + "-" + this.dateMonthStringToNumberConversion(month) + "-" + day;
	
	return dateFormat;

},

dateMonthStringToNumberConversion: function(monthString)
{
	var monthArray = [];
	
	monthArray["jan"] = "01";
	monthArray["feb"] = "02";
	monthArray["mar"] = "03";
	monthArray["apr"] = "04";
	monthArray["may"] = "05";
	monthArray["jun"] = "06";
	monthArray["jul"] = "07";
	monthArray["aug"] = "08";
	monthArray["sep"] = "09";
	monthArray["oct"] = "10";
	monthArray["nov"] = "11";
	monthArray["dec"] = "12";
	
	return monthArray[monthString];
},

dateMonthNumberToStringConversion: function(monthNumber)
{
	var monthArray = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	
	return monthArray[parseInt(monthNumber) - 1];
}

}