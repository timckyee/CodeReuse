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
 * @name Handler#TenantGridOnClickHandler
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
	
	var sort = new CodeReuse.Sort();

	sort.sortTable(sortTableHtmlObjectId, column, gridColumnsInfo);
	
},

/**
 * Clicking on HomeTenantGrid header row that goes to the server
 * @function
 * @name Handler#sortTableColumnOnclickHandlerHomeTenantFormGridPaging
 * 
 * @param {string} sortTableHtmlObjectId the table being sorted
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {string} column the column number that is being sorted
 * @param {string} pageNumber the current page number of the grid
 **/
sortTableColumnOnclickHandlerHomeTenantFormGridPaging: function(gridColumnsInfo, column, pageNumber) {
	
	var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();
	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
	var callback = new CodeReuse.Callback();

	var sortColumn = gridColumnsInfo[column].id;		
	
	var sortDirection = sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging");	
	
	if(sortColumn != sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging"))
	{
		sessionStorage.setItem("arraySortDirection_tenant_form_grid_paging", "asc");
	}
	else
	{
		if(sortDirection == "asc")
		{
			sessionStorage.setItem("arraySortDirection_tenant_form_grid_paging", "desc");	
		}
		else
		{
			if(sortDirection == "desc")
			{
				sessionStorage.setItem("arraySortDirection_tenant_form_grid_paging", "asc");
			}
		}			
	}
	
	sessionStorage.setItem("arraySortColumn_tenant_form_grid_paging", sortColumn);

	var column = sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging");
	var direction = sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging");

	var searchValue = home_tenant_form_grid_paging.getSearchValue();

	if(searchValue == "" || searchValue == undefined)
	{
		grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryName(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumber, '', "false", '', '', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
	}
	else
	{
		grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumber, '', "false", '', '', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
	}
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