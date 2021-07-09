/**
 * Class for creating grid with or without row editing, http method get populate form, get populate grid, post update form, post update grid, post insert record form
 * @class
 **/
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
 * @param {string} showEditRow show the edit row html objects - not using this field
 * @param {string} savePrimaryKeyValue the primary key value of the edit row were are saving
 * @param {string} highlightRow flag to highlight the row after save
 * @param {string} showPagingFooter if there is a grid footer for paging
 * @param {string} divPagingFooter the paging footer div
 * @param {string} pageSize paging size for the grid
 * @param {string} onload whether this is the first time loading grid to load second grid
 **/
grid: function(divElement, phpFile, queryName, gridIdField, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, callback, rowOnClick, showEditColumn, sortColumn, sortDirection, pageNumber, highlightRowId, showEditRow, savePrimaryKeyValue, highlightRow, showPagingFooter, divPagingFooter, pageSize, onload) {

	var divTable = document.getElementById(divElement);

	window.gridXmlHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {

			var response = JSON.parse(this.responseText);				
						
			callback(phpFile, response, divTable, tableHtmlObjectId, gridIdField, gridColumnsInfo, rowOnClick, showEditColumn, sortColumn, sortDirection, pageNumber, highlightRowId, showEditRow, savePrimaryKeyValue, highlightRow, showPagingFooter, divPagingFooter, onload);
					
		}
	};
	
	var queryString;

	if(tableHtmlObjectId == "tableHomeTenant" || tableHtmlObjectId == "tableHomeTenantFormGridPaging")
	{
		if(additionalArgs != "")
		{
			queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber + "&" + "pageSize=" + pageSize;
		}
		else
		{
			queryString = "queryName" + "=" + queryName + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber + "&" + "pageSize=" + pageSize;
		}
	}
	else if(tableHtmlObjectId == "tableSuite" || tableHtmlObjectId == "tableTenant")
	{
		if(additionalArgs != "")
		{
			queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection;
		}
	}


	window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.gridXmlHttpRequest.send();
	
},

 /**
  * Shows the grid after saving record with updated page number and highlight.
  * @function
  * @name Grid_Get_Post_Functions#showTheGridAfterSaveRecord
  * 
  * @param {string} phpFile the php query name for http method get
  * @param {string} queryName the php query name for http method get
  * @param {string} queryType the php query type - either getPageNumber or result set
  * @param {string} savePrimaryKey the primary key field name we are saving
  * @param {string} savePrimaryKeyValue the primary key value we are saving
  * @param {string} sortColumn column of the sort to find the page of the savePrimaryKeyValue
  * @param {string} sortDirection direction of the sort to find the page of the savePrimaryKeyValue
  * @param {string} searchValueField the field name of the search value
  * @param {string} searchValue the value of the search field
  * @param {string} tableHtmlObjectId table name of the form grid
  * @param {string} pageSize paging size for the grid
  **/
showTheGridAfterSaveRecord: function(phpFile, queryName, queryType, savePrimaryKey, savePrimaryKeyValue, sortColumn, sortDirection, searchValueField, searchValue, tableHtmlObjectId, pageSize) 
{
	window.getPageNumberHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {

			var response = JSON.parse(this.responseText);
			
			if(tableHtmlObjectId == "tableHomeTenant")
			{
				var home_tenant_grid = new CodeReuse.HomeTenantGrid();

				var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
				
				var callback = new CodeReuse.Callback();

				var column = sessionStorage.getItem("arraySortColumn");
				var direction = sessionStorage.getItem("arraySortDirection");

				var pageNumber = response;
				
				var pageNumberString = pageNumber.toString();

				sessionStorage.setItem("editMode", "false");
			
				if(pageNumberString == "0")
				{
					var pageNumberHomeTenantGrid = sessionStorage.getItem("homeTenantGridPageNumber");
			
					if(searchValue == "" || searchValue == undefined)
					{
						grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.getRowOnClick(), "showEdit", column, direction, pageNumberHomeTenantGrid, '', "false", '', '', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPagSize(), '');
					}
					else
					{
						grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, home_tenant_grid.getRowOnClick(), "showEdit", column, direction, pageNumberHomeTenantGrid, '', "false", '', '', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
					}				

					document.getElementById("gridGetPostHomePagingPageNumber").value = pageNumberHomeTenantGrid;

					sessionStorage.setItem("homeTenantGridPageNumber", pageNumberHomeTenantGrid);
				}
				else
				{
					if(searchValue == "" || searchValue == undefined)
					{			
						grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.getRowOnClick(), "showEdit", column, direction, pageNumberString, savePrimaryKeyValue, "false", '', "true", "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
					}
					else
					{
						grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, home_tenant_grid.getRowOnClick(), "showEdit", column, direction, pageNumberString, savePrimaryKeyValue, "false", '', "true", "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
					}

					document.getElementById("gridGetPostHomePagingPageNumber").value = pageNumberString;

					sessionStorage.setItem("homeTenantGridPageNumber", pageNumberString);				
				}
			}
			else if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
			{
				var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

				var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
				
				var callback = new CodeReuse.Callback();

				var column = sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging");
				var direction = sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging");

				var pageNumber = response;
				
				var pageNumberString = pageNumber.toString();

				//sessionStorage.setItem("editMode", "false");
			
				if(pageNumberString == "0")
				{
					var formObject = new CodeReuse.TenantFormGridPaging();
					var tableNameInDb = formObject.getTableNameInDb();
				
					var lock = new CodeReuse.Lock();
				
					// this unlock function is using get request which is synchronous
					lock.unlock(tableNameInDb, savePrimaryKeyValue, sessionStorage.getItem("userId"));


					var pageNumberHomeTenantGrid = sessionStorage.getItem("homeTenantFormGridPagingPageNumber");
			
					if(searchValue == "" || searchValue == undefined)
					{
						grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryName(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberHomeTenantGrid, '', "false", '', '', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
					}
					else
					{
						grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberHomeTenantGrid, '', "false", '', '', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
					}

					document.getElementById("gridGetPostHomeFormGridPagingPageNumber").value = pageNumberHomeTenantGrid;

					sessionStorage.setItem("homeTenantFormGridPagingPageNumber", pageNumberHomeTenantGrid);
				}
				else
				{
					if(searchValue == "" || searchValue == undefined)
					{			
						grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryName(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberString, savePrimaryKeyValue, "false", '', "true", "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
					}
					else
					{
						grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberString, savePrimaryKeyValue, "false", '', "true", "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
					}

					document.getElementById("gridGetPostHomeFormGridPagingPageNumber").value = pageNumberString;

					sessionStorage.setItem("homeTenantFormGridPagingPageNumber", pageNumberString);				
				}
			}
		}
	};

	var queryString;

	if(searchValue != "")
	{
		queryString = "queryName" + "=" + queryName + "&" + "queryType" + "=" + queryType + "&" + savePrimaryKey + "=" + savePrimaryKeyValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + searchValueField + "=" + searchValue + "&" + "pageSize=" + pageSize;
	}
	else
	{
		queryString = "queryName" + "=" + queryName + "&" + "queryType" + "=" + queryType + "&" + savePrimaryKey + "=" + savePrimaryKeyValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageSize=" + pageSize;
	}

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
 * @param {Array} autocompleteInputs array of autocomplete inputs
 * @param {Array} arrayOldValuesTable array to keep track of form old values used for updating fields
 * @param {function} callback the function to call when the XMLHttpRequest get method returns
 **/
get_populateForm: function(phpFile, queryName, htmlObjectPrimaryKeyValue, fieldsInfo, autocompleteInputs, arrayOldValuesTable, callback)
{	
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
			
			callback(response, fieldsInfo, autocompleteInputs, arrayOldValuesTable);
		
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
 * @param {string} queryName the php query name for http method get 
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {Array} arrayOldValuesTableGridEdit array to keep track of row old values used for updating fields
 * @param {function} callback the function to call when the XMLHttpRequest get method returns 
 * @param {Object} tableHtml the html table object used to replace the row edited with form objects
 * @param {string} htmlObjectPrimaryKeyValue the table row primary key
 * @param {string} tableHtmlObjectId the html table object
 **/
get_populateGrid: function(phpFile, queryName, gridColumnsInfo, arrayOldValuesTableGridEdit, callback, tableHtml, htmlObjectPrimaryKeyValue, tableHtmlObjectId)
{	
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);

			callback(response, gridColumnsInfo, arrayOldValuesTableGridEdit, tableHtml, htmlObjectPrimaryKeyValue, tableHtmlObjectId);
		
		}
	}
	
	var queryString = "queryName" + "=" + queryName + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue;
	
	window.getXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getXmlHttpRequest.send();
},

/**
 * Get the total page numbers
 * @function
 * @name Grid_Get_Post_Functions#get_pageNumbers
 * 
 * @param {string} phpFile php file name and location
 * @param {string} divPagingFooter the html div object containing the footer
 * @param {string} queryName the php query name for http method get 
 * @param {string} pageSize paging size for the grid
 * @param {string} tableHtmlObjectId table name of the form grid
 * @param {string} searchValueField the field name of the search value
 * @param {string} searchValue the value of the search field
 * @param {string} onload whether this is the first time loading grid to preload second grid
 **/
get_pageNumbers: function(phpFile, divPagingFooter, queryName, pageSize, tableHtmlObjectId, searchValueField, searchValue, onload)
{	
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
			
			if(tableHtmlObjectId == "tableHomeTenant")
			{
				document.getElementById("gridGetPostHomePagingPages").innerText = "of " + response;
			}
			else
			if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
			{
				document.getElementById("gridGetPostHomeFormGridPagingPages").innerText = "of " + response;
			}

			document.getElementById(divPagingFooter).style.display = "block";
			
			// to preload the second grid, HomeTenantFormGridPaging
			if(onload == "true")
			{
				var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
				var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();
			
				var callback = new CodeReuse.Callback();
			
				var sortColumn = sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging");
			
				var sortDirection = sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging");
			
				var pageNumber = sessionStorage.getItem("homeTenantFormGridPagingPageNumber");
			
				grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryName(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', sortColumn, sortDirection, pageNumber, '', "false", '' ,'', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
			}
		}
	}
	
	var queryString;

	if(searchValue != "")
	{
		queryString = "queryName" + "=" + queryName + "&" + "pageSize=" + pageSize + "&" + searchValueField + "=" + searchValue;
	}
	else
	{
		queryString = "queryName" + "=" + queryName + "&" + "pageSize=" + pageSize;
	}
	
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
 * @param {string} tableHtmlObjectId table name of the form grid
 **/
post_updateForm:function (phpFile, postType, htmlObjectPrimaryKeyValue, htmlObjectFieldsValuesUpdate, fieldsInfo, arrayOldValuesTable, refreshGridCallback, tableHtmlObjectId)
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
					alert("input format date has to be dd-mmm-yyyy");
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
	
	//alert(updateString);

	if(updateString != "")
	{
		var helper = new CodeReuse.Helper();

		helper.msgBox('confirm', 'There are changes to the fields. Continue with the update?', function (result) {

			if(result == true)
			{
				updateString = updateString.substr(0, updateString.length - 1);

				window.postXmlHttpRequest.onreadystatechange = function() {
					
					if (this.readyState == 4 && this.status == 200) {
					
						var response = this.responseText;

						if(response == "Session Id not valid")
						{
							alert('Session Id not valid. Redirecting to login page.');

							window.location.href = "index.html";

							return;
						}

						for(update=0; update<fieldsInfo.length; update++)
						{			
							arrayOldValuesTable[fieldsInfo[update].htmlObjectId] = htmlObjectFieldsValuesUpdate[update];
						}
						
						var suiteGrid = new CodeReuse.SuiteGrid();
						var tenantGrid = new CodeReuse.TenantGrid();
						var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

						if(tableHtmlObjectId == suiteGrid.getTableHtmlObjectId() || tableHtmlObjectId == tenantGrid.getTableHtmlObjectId())
						{
							if(tableHtmlObjectId == suiteGrid.getTableHtmlObjectId())
							{
								highlightId = suiteGrid.getSuiteSelectedRowId();
							}
							else if(tableHtmlObjectId == tenantGrid.getTableHtmlObjectId())
							{
								highlightId = tenantGrid.getTenantSelectedRowId();
							}

							if(tableHtmlObjectId == suiteGrid.getTableHtmlObjectId())
							{
								var formObject = new CodeReuse.Suite();
								var tableNameInDb = formObject.getTableNameInDb();
							}
							else
							if(tableHtmlObjectId == tenantGrid.getTableHtmlObjectId())
							{
								var formObject = new CodeReuse.Tenant();
								var tableNameInDb = formObject.getTableNameInDb();
							}

							var lock = new CodeReuse.Lock();
							
							lock.unlock(tableNameInDb, htmlObjectPrimaryKeyValue, sessionStorage.getItem("userId"));

							if(refreshGridCallback != undefined)
								refreshGridCallback(highlightId);						
						}
						else
						if(tableHtmlObjectId == home_tenant_form_grid_paging.getTableHtmlObjectId())
						{
							var grid_get_post_function = new CodeReuse.Grid_Get_Post_Functions;

							var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();
	
							var searchValue = home_tenant_form_grid_paging.getSearchValue();
	
							if(searchValue == "" || searchValue == undefined)
							{
								grid_get_post_function.showTheGridAfterSaveRecord(home_tenant_form_grid_paging.getPhpFile(), "gridtablehome", "getPageNumber", "savePrimaryKey", htmlObjectPrimaryKeyValue, sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging"), sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging"), '', '', tableHtmlObjectId, home_tenant_form_grid_paging.getPageSize(), '');
							}
							else
							{
								grid_get_post_function.showTheGridAfterSaveRecord(home_tenant_form_grid_paging.getPhpFile(), "gridtablehomeSearch", "getPageNumber", "savePrimaryKey", htmlObjectPrimaryKeyValue, sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging"), sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging"), "searchValue", searchValue, tableHtmlObjectId, home_tenant_form_grid_paging.getPageSize(), '');
							}
						}
						
					}
				}

				var query = window.location.search.substring(1).split("&");

				var helper = new CodeReuse.Helper();
			
				var GET_parameters = helper.parameterPassingUrl(query);
			
				var sessionId = GET_parameters["sessionId"];

				var formVariables = "postType" + "=" + postType + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString) + "&" + "sessionId" + "=" + sessionId;
					
				window.postXmlHttpRequest.open("POST", phpFile, true);
				window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				window.postXmlHttpRequest.send(formVariables);
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
 * @param {string} tableHtmlObjectId table name of the form grid
 **/
post_updateGrid: function(phpFile, postType, htmlObjectPrimaryKeyValue, htmlObjectFieldsValuesUpdate, columnsInfo, arrayOldValuesTableGridEdit, tableHtmlObjectId)
{	
	var updateString = "";
	
	for(update=0; update<columnsInfo.length; update++)
	{			
		var htmlObjectField = columnsInfo[update].htmlObjectId;
		var htmlObjectFieldValue = htmlObjectFieldsValuesUpdate[update];
		var databaseField = columnsInfo[update].id;		
		
		var hiddenFieldFlag = columnsInfo[update].hasIdHiddenField;
		var hiddenField = columnsInfo[update].idDbField;	
			
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
					alert("input format date has to be dd-mmm-yyyy");
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
		var helper = new CodeReuse.Helper();

		helper.msgBox('confirm', 'There are no changes to this record', function (result) {
		
		if(result == true)
		{
			return;
		}
		else
		if(result == false);
		{
			sessionStorage.setItem("editMode", "false");

			var gridObject;
			var tableNameInDb;
			var primaryKeyFieldName;
			
			if(tableHtmlObjectId == "tableHomeTenant")
			{
				gridObject = new CodeReuse.HomeTenantGrid();

				tableNameInDb = gridObject.getTableNameInDb();
			}

			var lock = new CodeReuse.Lock();

			lock.grid_unlock_cancel(tableNameInDb, htmlObjectPrimaryKeyValue, sessionStorage.getItem("userId"));
		}

		});
	}

	if(updateString != "")
	{
		var helper = new CodeReuse.Helper();

		helper.msgBox('confirm', 'There are changes to the fields. Continue with the update?', function (result) {

			if(result == true)
			{
				//alert(updateString);

				updateString = updateString.substr(0, updateString.length - 1);
						
				window.postXmlHttpRequest.onreadystatechange = function() {
					
					if (this.readyState == 4 && this.status == 200) {

						var response = this.responseText;

						if(response == "Session Id not valid")
						{
							alert('Session Id not valid. Redirecting to login page.');

							window.location.href = "index.html";

							return;
						}

						var gridObject;
						var tableNameInDb;
						var primaryKeyFieldName;
						
						if(tableHtmlObjectId == "tableHomeTenant")
						{
							gridObject = new CodeReuse.HomeTenantGrid();
			
							tableNameInDb = gridObject.getTableNameInDb();
						}
			
						var lock = new CodeReuse.Lock();
			
						lock.grid_unlock_update(tableNameInDb, htmlObjectPrimaryKeyValue, sessionStorage.getItem("userId"));
					}
				}

				var query = window.location.search.substring(1).split("&");

				var helper = new CodeReuse.Helper();
			
				var GET_parameters = helper.parameterPassingUrl(query);
			
				var sessionId = GET_parameters["sessionId"];

				var formVariables = "postType" + "=" + postType + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString) + "&" + "sessionId" + "=" + sessionId;
					
				window.postXmlHttpRequest.open("POST", phpFile, true);
				window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				window.postXmlHttpRequest.send(formVariables);				
			}
			else
			if(result == false)
			{
				sessionStorage.setItem("editMode", "false");

				var gridObject;
				var tableNameInDb;
				var primaryKeyFieldName;
				
				if(tableHtmlObjectId == "tableHomeTenant")
				{
					gridObject = new CodeReuse.HomeTenantGrid();
	
					tableNameInDb = gridObject.getTableNameInDb();
				}
	
				var lock = new CodeReuse.Lock();
	
				lock.grid_unlock_cancel(tableNameInDb, htmlObjectPrimaryKeyValue, sessionStorage.getItem("userId"));
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
 * @param {string} inputPrimaryKeyId the input object id to set the new insert id
 * @param {Array} arrayOldValuesTable array of old values before the insert. is set to the new values after an insert.
 * @param {function} refreshGridCallback refresh grid callback when the XMLHttpRequest post method returns
 * @param {string} tableHtmlObjectId table name of the form grid
 **/
post_insertRecordForm: function(phpFile, postType, htmlObjectFieldsValuesInsert, fieldsInfo, inputPrimaryKeyId, arrayOldValuesTable, refreshGridCallback, tableHtmlObjectId)
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
							alert("input date format has to be dd-mmm-yyyy");
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
				
					var response = this.responseText;

					if(response == "Session Id not valid")
					{
						alert('Session Id not valid. Redirecting to login page.');

						window.location.href = "index.html";

						return;
					}

					var insertId = this.responseText;
					
					document.getElementById(inputPrimaryKeyId).value = insertId;
					
					arrayOldValuesTable[inputPrimaryKeyId] = insertId;
					
					for(insert=0; insert<fieldsInfo.length; insert++)
					{									
						if(fieldsInfo[insert].htmlObjectType != "primaryKey")				
							arrayOldValuesTable[fieldsInfo[insert].htmlObjectId] = htmlObjectFieldsValuesInsert[insert];
					}		
					
					var formObject;
					var previousSelection;
					var tableNameInDb;

					
					if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
					{
						formObject = new CodeReuse.TenantFormGridPaging();
	
						tableNameInDb = formObject.getTableNameInDb();

						formObject.setPreviousSelection(insertId);
					}
					else
					if(tableHtmlObjectId == "tableSuite")
					{
						formObject = new CodeReuse.Suite();
	
						tableNameInDb = formObject.getTableNameInDb();
	
						formObject.setPreviousSelection(insertId);
					}
					else
					if(tableHtmlObjectId == "tableTenant")
					{
						formObject = new CodeReuse.Tenant();
	
						tableNameInDb = formObject.getTableNameInDb();
	
						formObject.setPreviousSelection(insertId);
					}
	
					var tableName_primaryKey = "tableName=" + tableNameInDb + "&primaryKey=" + insertId;

					sessionStorage.setItem("recordLockInformation", tableName_primaryKey);

					if(tableHtmlObjectId == "tableSuite")
					{
						document.getElementById("inputSuiteNumber").readOnly = true;
					}

					var lock = new CodeReuse.Lock();

					lock.form_lock_insertRecord(tableNameInDb, insertId, sessionStorage.getItem("userId"), tableHtmlObjectId, refreshGridCallback);		
				}
			}	
			
			var query = window.location.search.substring(1).split("&");

			var helper = new CodeReuse.Helper();
		
			var GET_parameters = helper.parameterPassingUrl(query);
		
			var sessionId = GET_parameters["sessionId"];

			var formVariables = "postType" + "=" + postType + "&" + "insertString" + "=" + encodeURIComponent(insertString) + "&" + "sessionId" + "=" + sessionId;
				
			window.postXmlHttpRequest.open("POST", phpFile, true);
			window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			window.postXmlHttpRequest.send(formVariables);

		}
	});
}

}
