/**
 * Class for storing grid handlers
 * @class
 */
CodeReuse.Handler = function() {
	
};

CodeReuse.Handler.prototype = {

/**
 * TenantHomeGrid row onclick handler
 * @function
 * @name Handler#TenantHomeGridOnClickHandler
 */
TenantHomeGridOnClickHandler: function() {
	
},

/**
 * SuiteGrid row onclick handler
 * @function
 * @name Handler#SuiteGridOnClickHandler
 * 
 * @param {string} phpFile php file name and location
 * @param {string} gridRowId row onclick primary key
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {string} tableHtmlObjectId the table to set the row highlighting after onclick
 */
SuiteGridOnClickHandler: function(phpFile, gridRowId, fieldsInfo, gridColumnsInfo, tableHtmlObjectId) {

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
	
	grid_get_post_functions.get_populateForm(phpFile, "populateSuite", gridRowId, fieldsInfo, '', arrayOldValuesTable, callback.get_populateForm_callback);
	
},

/**
 * TenantGrid row onclick handler
 * @function
 * @name Handler#TenantGridOnClickHandler
 * 
 * @param {string} phpFile php file name and location
 * @param {string} gridRowId row onclick primary key
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {string} tableHtmlObjectId the table to set the row highlighting after onclick
 */
TenantGridOnClickHandler: function(phpFile, gridRowId, fieldsInfo, gridColumnsInfo, tableHtmlObjectId) {
		
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
	
	grid_get_post_functions.get_populateForm(phpFile, "populate", gridRowId, fieldsInfo, autocompleteInputs, arrayOldValuesTable, callback.get_populateForm_callback);
	
},

/**
 * Clicking on SuiteGrid or TenantGrid header row that sorts inplace without going to server
 * @function
 * @name Handler#sortTableColumnOnclickHandler
 *  
 * @param {string} sortTableHtmlObjectId the table being sorted
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {string} column the column number that is being sorted
 */
sortTableColumnOnclickHandler: function(sortTableHtmlObjectId, gridColumnsInfo, column) {
	
	var sort = new CodeReuse.Sort();

	sort.sortTable(sortTableHtmlObjectId, column, gridColumnsInfo);
		
},

/**
 * Clicking on HomeTenantGrid header row that goes to the server
 * @function
 * @name Handler#sortTableColumnOnclickHandlerHomeTenantGrid
 * 
 * @param {string} sortTableHtmlObjectId the table being sorted
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {string} column the column number that is being sorted
 * @param {string} pageNumber the current page number of the grid
 */
sortTableColumnOnclickHandlerHomeTenantGrid: function(sortTableHtmlObjectId, gridColumnsInfo, column, pageNumber) {

	tenantModel = new CodeReuse.Tenant();
	
	home_tenant_grid = new CodeReuse.HomeTenantGrid();
	
	grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
	var callback = new CodeReuse.Callback();

	var sortColumn = gridColumnsInfo[column].id;		
	
	var sortDirection = localStorage.getItem("arraySortDirection");	
	
	if(sortColumn != localStorage.getItem("arraySortColumn"))
	{
		localStorage.setItem("arraySortDirection", "asc");
	}
	else
	{
		if(sortDirection == "asc")
		{
			localStorage.setItem("arraySortDirection", "desc");	
		}
		else
		{
			if(sortDirection == "desc")
			{
				localStorage.setItem("arraySortDirection", "asc");
			}
		}			
	}
	
	localStorage.setItem("arraySortColumn", sortColumn);

	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
	
	var tenantModel = new CodeReuse.Tenant();

	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	var callback = new CodeReuse.Callback();

	var column = localStorage.getItem("arraySortColumn");
	var direction = localStorage.getItem("arraySortDirection");

	var pageNumber = localStorage.getItem("homeTenantGridPageNumber");

	var searchValue = home_tenant_grid.getSearchValue();

	if(searchValue == "" || searchValue == undefined)
	{
		grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, '', "showEdit", column, direction, pageNumber, '', "false", '', '', "true", home_tenant_grid.getHomeTenantGridPagingDiv());
	}
	else
	{
		grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, '', "showEdit", column, direction, pageNumber, '', "false", '', '', "true", home_tenant_grid.getHomeTenantGridPagingDiv());
	}

}

}