/**
 * Class for creating grid, creating grid with row editing, http method get populate form, get populate grid,
 * post update form, post update grid, post insert record form
 * @class
 */
CodeReuse.Grid_Get_Post_Functions = function() {
	
};

CodeReuse.Grid_Get_Post_Functions.prototype = {

/**
 * Creates an html grid with sorting and paging
 * @function
 * @name Grid_Get_Post_Functions#grid
 * 
 * @param {string} divElement the html div id to use to attach the table to 
 * @param {string} phpFile php file name and location
 * @param {string} queryName the php query name for http method get
 * @param {string} gridIdField the primary key for the table rows
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} gridColumnsInfo grid object array of columns
 * @param {string} tableHtmlObjectId the html table object
 * @param {string} additionalArgs additional arguments to pass into the XMLHttpRequest get
 * @param {string} additionalArgsValue additional arguments value to pass into the XMLHttpRequest get
 * @param {function} callback the function to call when the XMLHttpRequest get method returns
 * @param {function} rowOnClick the handler to call when the user clicks on row in the table
 * @param {string} showEditColumn to show or hide the edit column in the table
 * @param {string} sortColumn the grid column which is currently sorted 
 * @param {string} sortDirection the direction which is currently sorted
 * @param {string} pageNumber the page number of the table we are currently showing
 * @param {string} highlightRowId the row in the table which is highlighted after editing and saving the row
 * @param {string} getPageNumber the function to call to get the page number after saving the edit grid
 */
grid: function(divElement, phpFile, queryName, gridIdField, fieldsInfo, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, callback, rowOnClick, showEditColumn, sortColumn, sortDirection, pageNumber, highlightRowId, getPageNumber) {

	var divTable = document.getElementById(divElement);
	
	window.gridXmlHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {

			var response = JSON.parse(this.responseText);				
						
			callback(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, rowOnClick, showEditColumn, sortColumn, sortDirection, pageNumber, highlightRowId, getPageNumber);
					
		}
	};
	
	var queryString;

	if(tableHtmlObjectId == "tableHomeTenant")
	{
		if(additionalArgs != "")
		{
			queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber;
		}
		else
		{
			queryString = "queryName" + "=" + queryName + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber;
		}
	}
	else if(tableHtmlObjectId == "tableSuite" || tableHtmlObjectId == "tableTenant")
	{
		if(additionalArgs != "")
		{
			queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue;
		}
		else
		{
			queryString = "queryName" + "=" + queryName;
		}
	}


	window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.gridXmlHttpRequest.send();
	
},

/**
 * Creates an html grid with row editing
 * @function
 * @name Grid_Get_Post_Functions#gridEdit
 * 
 * @param {string} divElement the html div id to use to attach the table to
 * @param {string} phpFile php file name and location
 * @param {string} queryName the php query name for http method get
 * @param {string} gridIdField the primary key for the table rows 
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} gridColumnsInfo grid object array of columns
 * @param {string} tableHtmlObjectId the html table object
 * @param {string} additionalArgs additional arguments to pass into the XMLHttpRequest get
 * @param {string} additionalArgsValue additional arguments value to pass into the XMLHttpRequest get
 * @param {function} callback the function to call when the XMLHttpRequest get method returns
 * @param {function} rowOnClick the handler to call when the user clicks on row in the table
 * @param {string} rowId the table row primary key
 * @param {string} sortColumn the grid column which is currently sorted 
 * @param {string} sortDirection the direction which is currently sorted
 * @param {string} pageNumber the page number of the table we are currently showing
 */
gridEdit: function(divElement, phpFile, queryName, gridIdField, fieldsInfo, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, callback, rowOnClick, rowId, sortColumn, sortDirection, pageNumber, getPageNumber) {
	
	var divTable = document.getElementById(divElement);

	window.gridXmlHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {

			var response = JSON.parse(this.responseText);
						
			callback(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, rowOnClick, rowId, sortColumn, sortDirection, pageNumber);			
			
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

/**
 * Gets the page number after saving record
 * @function
 * @name Grid_Get_Post_Functions#getPageNumberAfterSaveRecord
 * 
 */
getPageNumberAfterSaveRecord_set: function(phpFile, queryName, queryType, savePrimaryKey, savePrimaryKeyValue, sortColumn, sortDirection, setOrReturn) 
{
	window.getPageNumberHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {

			var response = JSON.parse(this.responseText);

			document.getElementById("gridGetPostHomePagingPageNumber").value = response;
					
		}
	};
	
	var queryString;
	
	queryString = "queryName" + "=" + queryName + "&" + "queryType" + "=" + queryType + "&" + "savePrimaryKey" + "=" + savePrimaryKeyValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection;

	window.getPageNumberHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getPageNumberHttpRequest.send();
},

/**
 * Gets the page number after saving record
 * @function
 * @name Grid_Get_Post_Functions#getPageNumberAfterSaveRecord
 * 
 */
getPageNumberAfterSaveRecord_return: function(phpFile, queryName, queryType, savePrimaryKey, savePrimaryKeyValue, sortColumn, sortDirection, gridOrGridEdit) 
{
	window.getPageNumberHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {

			var response = JSON.parse(this.responseText);

			//return response;
			
			var tenantModel = new CodeReuse.Tenant();
			
			var home_tenant_grid = new CodeReuse.HomeTenantGrid();
			
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
			
			var callback = new CodeReuse.Callback();

			var column = localStorage.getItem("arraySortColumn");
			var direction = localStorage.getItem("arraySortDirection");
			
			//var pageNumber = localStorage.getItem("homeTenantGridPageNumber");

			var pageNumber = response;

			if(gridOrGridEdit == "gridEdit")
			{
				grid_get_post_functions.gridEdit(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridEditCallback, home_tenant_grid.getRowOnClick(), savePrimaryKeyValue, sortColumn, sortDirection, pageNumber);
			} 
			else if (gridOrGridEdit == "grid")
			{
				grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.rowOnClick, "showEdit", localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), pageNumber, '');
			}
			
		}
	};
	
	var queryString;
	
	queryString = "queryName" + "=" + queryName + "&" + "queryType" + "=" + queryType + "&" + "savePrimaryKey" + "=" + savePrimaryKeyValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection;

	window.getPageNumberHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getPageNumberHttpRequest.send();
},

/**
 * Populate html object form
 * @function
 * @name Grid_Get_Post_Functions#get_populateForm
 * 
 * @param {string} phpFile php file name and location
 * @param {string} queryName the php query name for http method get
 * @param {string} htmlObjectPrimaryKeyValue row onclick primary key
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} gridColumnsInfo grid object array of columns
 * @param {Array} autocompleteInputs array of autocomplete inputs
 * @param {Array} arrayOldValuesTable array to keep track of form old values used for updating fields
 * @param {function} callback the function to call when the XMLHttpRequest get method returns
 */
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

/**
 * Populate grid row when clicking on edit
 * @function
 * @name Grid_Get_Post_Functions#get_populateGrid
 * 
 * @param {string} phpFile php file name and location
 * @param {string} divElement the html div id to use to attach the table to
 * @param {string} queryName the php query name for http method get
 * @param {string} htmlObjectPrimaryKeyValue row onclick primary key
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {Array} autocompleteInputs array of autocomplete inputs
 * @param {Array} arrayOldValuesTableGridEdit array to keep track of row old values used for updating fields
 * @param {function} callback the function to call when the XMLHttpRequest get method returns 
 * @param {Object} tableHtml the html table object used to replace the row edited with form objects
 * @param {string} fieldPrimaryKey the table row primary key
 * @param {string} tableHtmlObjectId no need for this param
 */
get_populateGrid: function(phpFile, divElement, queryName, htmlObjectPrimaryKeyValue, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTableGridEdit, callback, tableHtml, fieldPrimaryKey, tableHtmlObjectId)
{	
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);

			callback(response, divElement, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTableGridEdit, tableHtml, fieldPrimaryKey, tableHtmlObjectId);
		
		}
	}
	
	var queryString = "queryName" + "=" + queryName + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue;
	
	window.getXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getXmlHttpRequest.send();
},

/**
 * Send updated form values to the server
 * @function
 * @name Grid_Get_Post_Functions#post_updateForm

 * @param {string} phpFile php file name and location
 * @param {string} postType php post query name
 * @param {string} htmlObjectPrimaryKeyValue the form primary key value
 * @param {Array} htmlObjectFieldsValuesUpdate the html objects updated values
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} arrayOldValuesTable array of old values before the update. is set to the new values after an update.
 * @param {function} refreshGridCallback refresh grid callback when the XMLHttpRequest post method returns
 */
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
	
	if(updateString == "")
	{
		alert("There are no changes to this record");

		return;
	}
	
	if(updateString != "")
	{
		var helper = new CodeReuse.Helper();

		helper.msgBox('confirm', 'There are changes to the fields. Continue with the update?', function (result) {

			if(result == true)
			{
				alert(updateString);

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
			else
			if(result == false)
			{
				return;
			}
		});		
	}
},

/**
 * Send updated edit grid row values to the server
 * @function
 * @name Grid_Get_Post_Functions#post_updateGrid
 * 
 * @param {string} phpFile php file name and location
 * @param {string} postType php post query name
 * @param {string} htmlObjectPrimaryKeyValue the form primary key value
 * @param {Array} htmlObjectFieldsValuesUpdate the html objects updated values
 * @param {Array} columnsInfo array of grid columns and properties
 * @param {Array} arrayOldValuesTableGridEdit array of old values before the update. is set to the new values after an update.
 * @param {function} refreshGridCallbackEditGrid no need for this param
 * @param {string} pageNumber the page number of the table we are currently showing
 */
post_updateGrid: function(phpFile, postType, htmlObjectPrimaryKeyValue, htmlObjectFieldsValuesUpdate, columnsInfo, arrayOldValuesTableGridEdit, refreshGridCallbackEditGrid, pageNumber)
{	
	var updateString = "";
	
	for(update=0; update<columnsInfo.length; update++)
	{			
		var htmlObjectField = columnsInfo[update].htmlObjectId;
		var htmlObjectFieldValue = htmlObjectFieldsValuesUpdate[update];
		var databaseField = columnsInfo[update].id;		
		
		var hiddenFieldFlag = columnsInfo[update].hasIdHiddenField;
		var hiddenField = columnsInfo[update].idDbField;	
			
		/*
		if(hiddenFieldFlag == true)
		{			
			if(htmlObjectFieldValue != arrayOldValuesTableGridEdit[hiddenField])
			{
				updateString = updateString + hiddenField + "='" + htmlObjectFieldValue + "',";
			}
		}
		else
		{
		*/
			if(htmlObjectFieldValue != arrayOldValuesTableGridEdit[htmlObjectField])
			{
				if(hiddenFieldFlag == true)
				{			
						updateString = updateString + hiddenField + "='" + htmlObjectFieldValue + "',";
				}
				else
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
		//}
	}
	
	if(updateString == "")
	{
		var helper = new CodeReuse.Helper();

		helper.msgBox('alert', 'There are no changes to this record', function (result) {
		
			if(result == true)
			{	
				var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
					
				var tenantModel = new CodeReuse.Tenant();
					
				var home_tenant_grid = new CodeReuse.HomeTenantGrid();
		
				var callback = new CodeReuse.Callback();

				//grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.rowOnClick, "showEdit", localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), pageNumber);

			}
			else
			if(result == false)
			{
				return;
			}
		});
	}

	if(updateString != "")
	{
		var helper = new CodeReuse.Helper();

		helper.msgBox('confirm', 'There are changes to the fields. Continue with the update?', function (result) {

			if(result == true)
			{
				alert(updateString);

				updateString = updateString.substr(0, updateString.length - 1);
						
				window.postXmlHttpRequest.onreadystatechange = function() {
					
					if (this.readyState == 4 && this.status == 200) {
				
						grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
						tenantModel = new CodeReuse.Tenant();
							
						home_tenant_grid = new CodeReuse.HomeTenantGrid();
			
						var callback = new CodeReuse.Callback();

						grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), "savePrimaryKey", htmlObjectPrimaryKeyValue, callback.gridCallback, home_tenant_grid.rowOnClick, "showEdit", localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), pageNumber, htmlObjectPrimaryKeyValue, "getPageNumber");

						//grid_get_post_functions.getPageNumberAfterSaveRecord(home_tenant_grid.getPhpFile(), "gridtablehome", "getPageNumber", "savePrimaryKey", htmlObjectPrimaryKeyValue, localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"));

						localStorage.setItem("editMode", "false");

					}
				}
			
				var formVariables = "postType" + "=" + postType + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString);
					
				window.postXmlHttpRequest.open("POST", phpFile, true);
				window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				window.postXmlHttpRequest.send(formVariables);				
			}
			else
			if(result == false)
			{
				return;
			}
		});
	}
},

/**
 * Send form values of new record to the server
 * @function
 * @name Grid_Get_Post_Functions#post_insertRecordForm
 * 
 * @param {string} phpFile php file name and location
 * @param {string} postType php post query name
 * @param {Array} htmlObjectFieldsValuesInsert the html objects new values
 * @param {Array} fieldsInfo form object array of fields
 * @param {string} inputPrimaryKeyId the new primary key id generated after insert
 * @param {Array} arrayOldValuesTable array of old values before the insert. is set to the new values after an insert.
 * @param {function} refreshGridCallback refresh grid callback when the XMLHttpRequest post method returns
 */
post_insertRecordForm: function(phpFile, postType, htmlObjectFieldsValuesInsert, fieldsInfo, inputPrimaryKeyId, arrayOldValuesTable, refreshGridCallback)
{	
	var helper = new CodeReuse.Helper();

	helper.msgBox('confirm', 'Confirm to create new record?', function (result) {
	
		if(result == true)
		{
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
					
					document.getElementById(inputPrimaryKeyId).value = insertId;
					
					arrayOldValuesTable[inputPrimaryKeyId] = insertId;
					
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
		else
		if(result == false)
		{
			return;
		}
	});
}

}
