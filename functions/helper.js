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
	var tableHomeTenant = document.getElementById('tableHomeTenant');

	var tableRows = tableHomeTenant.rows[1];

	var countSave = 0;

	for(var i=1; i<tableHomeTenant.rows.length; i++)
	{
		if(tableHomeTenant.rows[i].cells[0].innerText == "save")
		{
			countSave = countSave + 1;
			break;
		}
	}

	if(countSave == 1)
	{
		alert('Please click on save to leave save mode');
		return;	
	}

	if(pageNumber == "")
	{
		alert('Page number has to be an integer');
		return;
	}

	localStorage.setItem("homeTenantGridPageNumber", pageNumber);

	var pageNumberUpdate = localStorage.getItem("homeTenantGridPageNumber");

	var tenantModel = new CodeReuse.Tenant();

	var home_tenant_grid = new CodeReuse.HomeTenantGrid();
	
	home_tenant_grid.refreshTenantHomeGrid(home_tenant_grid.getPhpFile(), tenantModel.getFieldsInfo(), localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), pageNumberUpdate);
},

updateGridPageArrows: function(direction, pageNumber)
{
	var tableHomeTenant = document.getElementById('tableHomeTenant');

	var tableRows = tableHomeTenant.rows[1];

	var countSave = 0;

	for(var i=1; i<tableHomeTenant.rows.length; i++)
	{
		if(tableHomeTenant.rows[i].cells[0].innerText == "save")
		{
			countSave = countSave + 1;
			break;
		}
	}

	if(countSave == 1)
	{
		alert('Please click on save to leave save mode');
		return;	
	}

	if(pageNumber == "")
	{
		alert('Page number has to be an integer');
		return;
	}

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

	home_tenant_grid.refreshTenantHomeGrid(home_tenant_grid.getPhpFile(), tenantModel.getFieldsInfo(), localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), pageNumberUpdate.toString());
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
},

msgBox: function (buttonType, msg, msgbox_callback) {

	var modal = document.getElementById("myModal");
	
	//var btn = document.getElementById("myBtn");
	
	document.getElementById('popupText').innerHTML = msg;
	
	if(buttonType == 'alert')
	{
	document.getElementById('buttonOK').style.display = 'block';
	document.getElementById('buttonCancel').style.display = 'none';
	}  
	else if(buttonType == 'confirm')
	{
	document.getElementById('buttonOK').style.display = 'block';
	document.getElementById('buttonCancel').style.display = 'block';
	}
	
	modal.style.display = "block";
	
	var buttonOK = document.getElementById("buttonOK");
	
	buttonOK.onclick = function() {

		modal.style.display = "none";
	
		//if(buttonType == "confirm")
		msgbox_callback(true);
	
	};
	
	var buttonCancel = document.getElementById("buttonCancel");
	
	buttonCancel.onclick = function() {

		localStorage.setItem("editMode", "false");

		modal.style.display = "none";

		//if(buttonType == "confirm")
		msgbox_callback(false);

		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var tenantModel = new CodeReuse.Tenant();
		
		var home_tenant_grid = new CodeReuse.HomeTenantGrid();
		
		var callback = new CodeReuse.Callback();

		//debugger
		
		grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.rowOnClick, "showEdit", localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), localStorage.getItem("homeTenantGridPageNumber"));
		
		/*
		var tablePrimaryKey;

		if(document.getElementById("inputPrimaryKey_grid") != null)
		{
			tablePrimaryKey = document.getElementById("inputPrimaryKey_grid").innerText;
		}
		else
		{
			tablePrimaryKey = document.getElementById("inputPrimaryKey").innerText;
		}
			
		var tableHomeTenant = document.getElementById("tableHomeTenant");
		
		var tableHomeTenantRows = tableHomeTenant.rows;
		
		var tableRowNumber = 0;
		
		for(var i=1; i<tableHomeTenantRows.length; i++)
		{
			var tableHomeTenantRowsCellValue = tableHomeTenantRows[i].cells[1].innerText;
			
			if(tableHomeTenantRowsCellValue == tablePrimaryKey)
			{					
				tableRowNumber = i
				break;
			}
		}

		grid_get_post_functions.post_updateGrid_reset(home_tenant_grid.getGridGetPostDivElement(), tableRowNumber, home_tenant_grid.getTableHtmlObjectId(), tablePrimaryKey);
		
		*/
	}
	
}

}
