CodeReuse.Grid_Get_Post_Functions = function() {
	
};

CodeReuse.Grid_Get_Post_Functions.prototype = {

grid: function(divElement, phpFile, queryName, gridIdField, fieldsInfo, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, callback, tenantGridRowOnClick, showEditColumn, rowId, sortColumn, sortDirection, tableRowNumber, tableFieldsValues, pageNumber) {

	var divTable = document.getElementById(divElement);
	
	window.gridXmlHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {

			var response = JSON.parse(this.responseText);				
						
			callback(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, tenantGridRowOnClick, showEditColumn, rowId, sortColumn, sortDirection, tableRowNumber, tableFieldsValues, pageNumber);
					
		}
	};
	
	var queryString;

	if(additionalArgs != "")
	{
		queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber;
	}
	else
	{
		queryString = "queryName" + "=" + queryName + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber;
	}

	window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.gridXmlHttpRequest.send();
	
},

//gridEdit: function(divElement, phpFile, queryName, gridIdField, fieldsInfo, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, callback, tenantGridRowOnClick, rowId, sortColumn, sortDirection, pageNumber) {
gridEdit: function(divElement, phpFile, queryName, gridIdField, fieldsInfo, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, callback, tenantGridRowOnClick, rowId, sortColumn, sortDirection, tableRowNumber, tableFieldsValue, pageNumber) {

	//return function() {

			var tableObject = document.getElementById(tableHtmlObjectId);
			
			var tablePrimaryKey = rowId;
			
			var tableHomeTenant = document.getElementById("tableHomeTenant");
			
			var tableHomeTenantRows = tableHomeTenant.rows;
			
			var tableRowNumber = 0;
			
			var building_option_grid;
			var buildingSelectOption;
			var tenant_input_grid;
			var tenant_input_grid_value;
			var inputCalendar_grid;
			var inputCalendarTesting_grid;

			for(var i=1; i<tableHomeTenantRows.length; i++)
			{
				if(tableHomeTenantRows[i].cells[1] != undefined)
				{
					var tableHomeTenantRowsCellValue = parseInt(tableHomeTenantRows[i].cells[1].innerText);
					
					if(tableHomeTenantRowsCellValue == tablePrimaryKey)
					{
						tableRowNumber = i;
						
						building_option_grid = tableHomeTenantRows[i].cells[2].innerText;			
						buildingSelectOption = tableHomeTenantRows[i].cells[2].value				
						tenant_input_grid = tableHomeTenantRows[i].cells[3].innerText;
						tenant_input_grid_value = tableHomeTenantRows[i].cells[3].value;					
						inputCalendar_grid = tableHomeTenantRows[i].cells[4].innerText;
						inputCalendarTesting_grid = tableHomeTenantRows[i].cells[5].innerText;
						break;
					}
				}
				
			}

			var tableFieldsValue = [];
			
			tableFieldsValue["fieldPrimaryKey"] = tablePrimaryKey;
			tableFieldsValue["buildingName"] = building_option_grid;
			tableFieldsValue["buildingId"] = buildingSelectOption;
			tableFieldsValue["tenantName"] = tenant_input_grid;
			tableFieldsValue["tenantId"] = tenant_input_grid_value;
			tableFieldsValue["field1"] = inputCalendar_grid;
			tableFieldsValue["field2"] = inputCalendarTesting_grid;

		
			tableRowNumber = i.toString();


		var divTable = document.getElementById(divElement);
		
		window.gridXmlHttpRequest.onreadystatechange = function() {
					
			if (this.readyState == 4 && this.status == 200) {
				
				var response = JSON.parse(this.responseText);
							
				callback(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, tenantGridRowOnClick, rowId, sortColumn, sortDirection, tableRowNumber, tableFieldsValue, pageNumber);			
				
			}
		};
		
		var queryString;
		
		if(additionalArgs != "")
		{
			queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber;
		}
		else
		{
			queryString = "queryName" + "=" + queryName + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber;
		}
	
			
		window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
		window.gridXmlHttpRequest.send();		
		
	//}
	
},

get_populateForm: function(phpFile, queryName, htmlObjectPrimaryKeyValue, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTable, callback)
{	
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
			
			callback(response, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTable);
		
		}
	}
	
	var queryString = "queryName" + "=" + queryName + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue;
	
	window.getXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getXmlHttpRequest.send();
},

post_updateForm:function (phpFile, postType, htmlObjectPrimaryKeyValue, htmlObjectFieldsValuesUpdate, fieldsInfo, arrayOldValuesTable, refreshGridCallback)
{		
	var updateString = "";
	
	for(update=0; update<fieldsInfo.length; update++)
	{		
		var htmlObjectField = fieldsInfo[update].htmlObjectId;
		var htmlObjectFieldValue = htmlObjectFieldsValuesUpdate[update];
		var databaseField = fieldsInfo[update].name;
				
		if(htmlObjectFieldValue != arrayOldValuesTable[htmlObjectField])
		{
			if(fieldsInfo[update].dbType == "date")
			{				
				var dateFromSystem = htmlObjectFieldValue;
								
				var helper = new CodeReuse.Helper();				
												
				var dateFormat = helper.convertDateFromSystem(dateFromSystem);
				
				var calendar = new CodeReuse.Calendar();
				
				if(calendar.validateDateFromString(dateFromSystem) == false)
				{
					alert("input format has to be dd-mmm-yyyy");
					return;
				}
				
				updateString = updateString + databaseField + "='" + dateFormat + "',";
			}
			else
			{
				updateString = updateString + databaseField + "='" + htmlObjectFieldValue + "',";
			}
		}
	}
	
	alert(updateString);
	
	if(updateString != "")
	{
		if(!confirm('There are changes to the fields. Continue with the update?'))
		{
			return;
		}
					
		updateString = updateString.substr(0, updateString.length - 1);
						
		window.postXmlHttpRequest.onreadystatechange = function() {
			
			if (this.readyState == 4 && this.status == 200) {
												
				for(update=0; update<fieldsInfo.length; update++)
				{			
					arrayOldValuesTable[fieldsInfo[update].htmlObjectId] = htmlObjectFieldsValuesUpdate[update];
				}
				
				if(refreshGridCallback != undefined)
					refreshGridCallback();
				
			}
		}
	
		var formVariables = "postType" + "=" + postType + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString);
			
		window.postXmlHttpRequest.open("POST", phpFile, true);
		window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		window.postXmlHttpRequest.send(formVariables);
	}
},

post_updateGrid: function(phpFile, postType, htmlObjectPrimaryKeyValue, htmlObjectFieldsValuesUpdate, columnsInfo, arrayOldValuesTableGridEdit, refreshGridCallbackEditGrid, tableRowNumber, tableFieldsValue, pageNumber)
{		
	var updateString = "";
	
	for(update=0; update<columnsInfo.length; update++)
	{			
		var htmlObjectField = columnsInfo[update].id;
		var htmlObjectFieldValue = htmlObjectFieldsValuesUpdate[update];
		var databaseField = columnsInfo[update].id;		
				
		var hiddenFieldFlag = columnsInfo[update].hasIdHiddenField;
		var hiddenField = columnsInfo[update].idDbField;	
				
		if(hiddenFieldFlag == true)
		{			
			if(htmlObjectFieldValue != arrayOldValuesTableGridEdit[hiddenField])
			{
				updateString = updateString + hiddenField + "='" + htmlObjectFieldValue + "',";
			}
		}
		else
		{
			if(htmlObjectFieldValue != arrayOldValuesTableGridEdit[htmlObjectField])
			{
				if(columnsInfo[update].colType == "date")
				{				
					var dateFromSystem = htmlObjectFieldValue;
									
					var helper = new CodeReuse.Helper();				
													
					var dateFormat = helper.convertDateFromSystem(dateFromSystem);
					
					var calendar = new CodeReuse.Calendar();
					
					if(calendar.validateDateFromString(dateFromSystem) == false)
					{
						alert("input format has to be dd-mmm-yyyy");
						return;
					}
					
					updateString = updateString + databaseField + "='" + dateFormat + "',";
				}
				else
				{
					updateString = updateString + databaseField + "='" + htmlObjectFieldValue + "',";
				}
			}			
		}
	}
	
	alert(updateString);
	
	if(updateString != "")
	{
		if(!confirm('There are changes to the fields. Continue with the update?'))
		{
			return;
		}
		
		updateString = updateString.substr(0, updateString.length - 1);
						
		window.postXmlHttpRequest.onreadystatechange = function() {
			
			if (this.readyState == 4 && this.status == 200) {

				/*
				for(update=0; update<columnsInfo.length; update++)
				{			
					arrayOldValuesTableGridEdit[columnsInfo[update].id] = htmlObjectFieldsValuesUpdate[update];
				}*/
								
				//debugger				
								
				//if(refreshGridCallbackEditGrid != undefined)
				//	refreshGridCallbackEditGrid();
				
				grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
				
				tenantModel = new CodeReuse.Tenant();
				
				home_tenant_grid = new CodeReuse.HomeTenantGrid();
				
				var callback = new CodeReuse.Callback();				
				
				//alert('post_updateGrid');

				//grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), "gridtablehome", "fieldPrimaryKey", tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.rowOnClick, "showEdit", document.getElementById("inputPrimaryKey_grid").innerHTML, localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), tableRowNumber, tableFieldsValue, pageNumber);

				//grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), "gridtablehome", "fieldPrimaryKey", tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.rowOnClick, "showEdit", htmlObjectPrimaryKeyValue, localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), tableRowNumber, tableFieldsValue, pageNumber);				
			}
		}
	
		var formVariables = "postType" + "=" + postType + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString);
			
		window.postXmlHttpRequest.open("POST", phpFile, true);
		window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		window.postXmlHttpRequest.send(formVariables);
	}
},

post_insertRecordForm: function(phpFile, postType, htmlObjectFieldsValuesInsert, fieldsInfo, inputPrimaryKey, arrayOldValuesTable, refreshGridCallback)
{		
	if(!confirm('Confirm to create new record?'))
	{
		return;
	}		
	
	var insertString = "";
	
	insertString = insertString + "(";
	
	for(insert=0; insert<fieldsInfo.length; insert++)
	{
		if(fieldsInfo[insert].htmlObjectType != "primaryKey")
			insertString = insertString + fieldsInfo[insert].name + ",";
	}
	
	insertString = insertString.substr(0, insertString.length - 1);
	
	insertString = insertString + ")";
	
	insertString = insertString + " values (";
	
	for(insert=0; insert<fieldsInfo.length; insert++)
	{	
		if(fieldsInfo[insert].htmlObjectType != "primaryKey")
		{
			var htmlObjectValueInsert = htmlObjectFieldsValuesInsert[insert];
		
			if(fieldsInfo[insert].dbType == "date")
			{
				var dateFromSystem = htmlObjectValueInsert;
								
				var helper = new CodeReuse.Helper();				
												
				var dateFormat = helper.convertDateFromSystem(dateFromSystem);
				
				var calendar = new CodeReuse.Calendar();
				
				if(calendar.validateDateFromString(dateFromSystem) == false)
				{
					alert("input format has to be dd-mmm-yyyy");
					return;
				}				
				
				insertString = insertString + "'" + dateFormat + "',";
			}
			else
			{
				insertString = insertString + "'" + htmlObjectValueInsert + "',";
			}
		}
	}
	
	insertString = insertString.substr(0, insertString.length - 1);
	
	insertString = insertString + ")";
		
	window.postXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {	
		
			var insertId = this.responseText;
			
			document.getElementById(inputPrimaryKey).value = insertId;
			
			arrayOldValuesTable[inputPrimaryKey] = insertId;
			
			for(insert=0; insert<fieldsInfo.length; insert++)
			{									
				if(fieldsInfo[insert].htmlObjectType != "primaryKey")				
					arrayOldValuesTable[fieldsInfo[insert].htmlObjectId] = htmlObjectFieldsValuesInsert[insert];
			}		
			
			if(refreshGridCallback != undefined)
				refreshGridCallback();

		}
	}	
	
	var formVariables = "postType" + "=" + postType + "&" + "insertString" + "=" + encodeURIComponent(insertString);
		
	window.postXmlHttpRequest.open("POST", phpFile, true);
	window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	window.postXmlHttpRequest.send(formVariables);
}

}
