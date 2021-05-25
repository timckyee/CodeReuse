/**
 * Class for storing grid handlers
 * @class
 **/
CodeReuse.Handler = function() {
	
};

CodeReuse.Handler.prototype = {

/**
 * TenantHomeGrid row onclick handler
 * @function
 * @name Handler#TenantHomeGridOnClickHandler
 **/
TenantHomeGridOnClickHandler: function() {
	
},

/**
 * TenantFormGridPaging row onclick handler
 * @function
 * @name Handler#TenantFormGridPagingOnClickHandler
 * 
 * @param {string} phpFile php file name and location
 * @param {string} gridRowId row onclick primary key
 * @param {string} tableHtmlObjectId the table to set the row highlighting after onclick
 **/
TenantFormGridPagingOnClickHandler: function(phpFile, gridRowId, tableHtmlObjectId) {

	var tableTenant = document.getElementById(tableHtmlObjectId);
	var row;

	for(var i=0; i<tableTenant.rows.length; i++)
	{
		row = tableTenant.rows[i];
		if(row.cells[0].innerText == gridRowId)
		{
			row.className = "tableHover highlightRow";
		}
		else
		{
			row.className = "rowClickCursor";
		}
	}

	var tenantFormGridPagingModel = new CodeReuse.TenantFormGridPaging();
	
	var autocompleteInputs = tenantFormGridPagingModel.getAutocompleteInputs();			
	
	var arrayOldValuesTable = tenantFormGridPagingModel.arrayOldValuesTable;
	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
	var callback = new CodeReuse.Callback();

	// save the previous grid rowd id selection for unlocking the record after moving to other record
	tenantFormGridPagingModel.setPreviousSelection(gridRowId);
	
	grid_get_post_functions.get_populateForm(phpFile, "populate", gridRowId, tenantFormGridPagingModel.getFieldsInfo(), autocompleteInputs, arrayOldValuesTable, callback.get_populateForm_callback);
	
},

/**
 * SuiteGrid row onclick handler
 * @function
 * @name Handler#SuiteGridOnClickHandler
 * 
 * @param {string} phpFile php file name and location
 * @param {string} gridRowId row onclick primary key
 * @param {string} tableHtmlObjectId the table to set the row highlighting after onclick
 **/
SuiteGridOnClickHandler: function(phpFile, gridRowId, tableHtmlObjectId) {

	//var rowAttributeValue = row.attributes["gridIdField"].value;

	var tableSuite = document.getElementById(tableHtmlObjectId);
	var row;

	for(var i=0; i<tableSuite.rows.length; i++)
	{
		row = tableSuite.rows[i];
		if(row.cells[0].innerText == gridRowId)
		{
			row.className = "tableHover highlightRow";
		}
		else
		{
			row.className = "rowClickCursor";
		}
	}

	var suiteModel = new CodeReuse.Suite();
	
	var arrayOldValuesTable = suiteModel.arrayOldValuesTable;
	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
	var callback = new CodeReuse.Callback();
	
	// save the previous grid rowd id selection for unlocking the record after moving to other record
	suiteModel.setPreviousSelection(gridRowId);
	
	grid_get_post_functions.get_populateForm(phpFile, "populateSuite", gridRowId, suiteModel.getFieldsInfo(), '', arrayOldValuesTable, callback.get_populateForm_callback);
	
},

/**
 * TenantGrid row onclick handler
 * @function
 * @name Handler#TenantGridOnClickHandler
 * 
 * @param {string} phpFile php file name and location
 * @param {string} gridRowId row onclick primary key
 * @param {string} tableHtmlObjectId the table to set the row highlighting after onclick
 **/
TenantGridOnClickHandler: function(phpFile, gridRowId, tableHtmlObjectId) {
		
	//var rowAttributeValue = row.attributes["gridIdField"].value;

	var tableTenant = document.getElementById(tableHtmlObjectId);
	var row;

	for(var i=0; i<tableTenant.rows.length; i++)
	{
		row = tableTenant.rows[i];
		if(row.cells[0].innerText == gridRowId)
		{
			row.className = "tableHover highlightRow";
		}
		else
		{
			row.className = "rowClickCursor";
		}
	}

	var tenantModel = new CodeReuse.Tenant();
	
	var autocompleteInputs = tenantModel.getAutocompleteInputs();			
	
	var arrayOldValuesTable = tenantModel.arrayOldValuesTable;
	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
	var callback = new CodeReuse.Callback();
	
	// save the previous grid rowd id selection for unlocking the record after moving to other record
	tenantModel.setPreviousSelection(gridRowId);

	grid_get_post_functions.get_populateForm(phpFile, "populateTenant", gridRowId, tenantModel.getFieldsInfo(), autocompleteInputs, arrayOldValuesTable, callback.get_populateForm_callback);
	
},

/**
 * Clicking on SuiteGrid or TenantGrid header row that sorts inplace without going to server
 * @function
 * @name Handler#sortTableColumnOnclickHandler
 *  
 * @param {string} sortTableHtmlObjectId the table being sorted
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {string} column the column number that is being sorted
 **/
sortTableColumnOnclickHandler: function(sortTableHtmlObjectId, gridColumnsInfo, column) {
	
	var gridObject;
	var formObject;
	var tableNameInDb;
	var selectedId;

	if(sortTableHtmlObjectId == "tableSuite")
	{
		gridObject = new CodeReuse.SuiteGrid();
		formObject = new CodeReuse.Suite();
		tableNameInDb = formObject.getTableNameInDb();
		selectedId = gridObject.getSuiteSelectedRowId();
	}
	else
	if(sortTableHtmlObjectId == "tableTenant")
	{
		gridObject = new CodeReuse.TenantGrid();
		formObject = new CodeReuse.Tenant();
		tableNameInDb = formObject.getTableNameInDb();
		selectedId = gridObject.getTenantSelectedRowId();
	}

	var lock = new CodeReuse.Lock();
		
	lock.unlock_sort_client(sortTableHtmlObjectId, gridColumnsInfo, column, tableNameInDb, selectedId, sessionStorage.getItem("userId"));
	
},

/**
 * Clicking on HomeTenantGridPaging header row that goes to the server
 * @function
 * @name Handler#sortTableColumnOnclickHandlerHomeTenantFormGridPaging
 * 
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {string} column the column number that is being sorted
 * @param {string} pageNumber the current page number of the grid
 **/
sortTableColumnOnclickHandlerHomeTenantFormGridPaging: function(gridColumnsInfo, column, pageNumber) {
	
	var homeTenantFormGridPaging = new CodeReuse.HomeTenantFormGridPaging()

	var formObject = new CodeReuse.TenantFormGridPaging();

	var tableNameInDb = formObject.getTableNameInDb();

	var selectedId = homeTenantFormGridPaging.getTenantForGridPagingSelectedRowId()

	var lock = new CodeReuse.Lock();
		
	lock.unlock_sort_server(gridColumnsInfo, column, pageNumber, tableNameInDb, selectedId, sessionStorage.getItem("userId"));
	
},

/**
 * Clicking on HomeTenantGrid header row that goes to the server
 * @function
 * @name Handler#sortTableColumnOnclickHandlerHomeTenantGrid
 * 
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {string} column the column number that is being sorted
 **/
sortTableColumnOnclickHandlerHomeTenantGrid: function(gridColumnsInfo, column) {

	var tenantModel = new CodeReuse.Tenant();
	
	var home_tenant_grid = new CodeReuse.HomeTenantGrid();
	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
	var callback = new CodeReuse.Callback();

	var sortColumn = gridColumnsInfo[column].id;		
	
	var sortDirection = sessionStorage.getItem("arraySortDirection");	
	
	if(sortColumn != sessionStorage.getItem("arraySortColumn"))
	{
		sessionStorage.setItem("arraySortDirection", "asc");
	}
	else
	{
		if(sortDirection == "asc")
		{
			sessionStorage.setItem("arraySortDirection", "desc");	
		}
		else
		{
			if(sortDirection == "desc")
			{
				sessionStorage.setItem("arraySortDirection", "asc");
			}
		}			
	}
	
	sessionStorage.setItem("arraySortColumn", sortColumn);

	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();

	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	var callback = new CodeReuse.Callback();

	var column = sessionStorage.getItem("arraySortColumn");
	var direction = sessionStorage.getItem("arraySortDirection");

	var homeTenantGridPageNumber = sessionStorage.getItem("homeTenantGridPageNumber");

	var searchValue = home_tenant_grid.getSearchValue();

	if(searchValue == "" || searchValue == undefined)
	{
		grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, '', "showEdit", column, direction, homeTenantGridPageNumber, '', "false", '', '', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
	}
	else
	{
		grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, '', "showEdit", column, direction, homeTenantGridPageNumber, '', "false", '', '', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
	}

}

}