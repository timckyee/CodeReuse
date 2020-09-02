CodeReuse.Handler = function() {
	
};

CodeReuse.Handler.prototype = {

TenantHomeGridOnClickHandler: function(phpFile, row, fieldsInfo, gridColumnsInfo) {
	
},


SuiteGridOnClickHandler: function(phpFile, gridRowId, fieldsInfo, gridColumnsInfo) {
			
	//var rowAttributeValue = row.attributes["gridIdField"].value;

	var suiteModel = new CodeReuse.Suite();
	
	var arrayOldValuesTable = suiteModel.arrayOldValuesTable;
	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
	var callback = new CodeReuse.Callback();
	
	grid_get_post_functions.get_populateForm(phpFile, "populateSuite", gridRowId, fieldsInfo, gridColumnsInfo, '', arrayOldValuesTable, callback.get_populateForm_callback);
	
},

TenantGridOnClickHandler: function(phpFile, gridRowId, fieldsInfo, gridColumnsInfo) {
		
	//var rowAttributeValue = row.attributes["gridIdField"].value;

	var tenantModel = new CodeReuse.Tenant();
	
	var autocompleteInputs = tenantModel.getAutocompleteInputs();			
	
	var arrayOldValuesTable = tenantModel.arrayOldValuesTable;
	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
	var callback = new CodeReuse.Callback();
	
	grid_get_post_functions.get_populateForm(phpFile, "populate", gridRowId, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTable, callback.get_populateForm_callback);
	
},

sortTableColumnOnclickHandler: function(sortTableHtmlObjectId, gridColumnsInfo, column) {
		
	var sort = new CodeReuse.Sort();

	sort.sortTable(sortTableHtmlObjectId, column, gridColumnsInfo);
		
},

sortTableColumnOnclickHandlerHomeTenantGrid: function(sortTableHtmlObjectId, gridColumnsInfo, column, pageNumber) {

	tenantModel = new CodeReuse.Tenant();
	
	home_tenant_grid = new CodeReuse.HomeTenantGrid();
	
	grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
	var callback = new CodeReuse.Callback();

	var sortColumn = gridColumnsInfo[column].id;		
	
	var sortDirection = localStorage.getItem("arraySortDirection");	
	

	var homeTenantGrid = new CodeReuse.HomeTenantGrid();

	var sortIconCount;

	for(sortIconCount=0; sortIconCount<homeTenantGrid.getColumnsInfo().length; sortIconCount++)
	{
		if(document.getElementById(homeTenantGrid.getTableHtmlObjectId() + "_" + homeTenantGrid.getColumnsInfo()[sortIconCount].id + "ColumnHeaderIcon").style.display == "none")	
		{
			continue;
		}
		else if(document.getElementById(homeTenantGrid.getTableHtmlObjectId() + "_" + homeTenantGrid.getColumnsInfo()[sortIconCount].id + "ColumnHeaderIcon").style.display == "inline")
		{
			break;
		}
	}

	if(sortIconCount == homeTenantGrid.getColumnsInfo().length)
	{
		//localStorage.setItem("arraySortColumn", "fieldPrimaryKey");
		localStorage.setItem("arraySortDirection", "asc");	
	}
	else
	{
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
	}

		
	localStorage.setItem("arraySortColumn", sortColumn);

	//alert('sort: ' + sortColumn + ' ' + localStorage.getItem("arraySortDirection"));

	grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), gridColumnsInfo, sortTableHtmlObjectId, '', '', callback.gridCallback, '', "showEdit", localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), pageNumber, '');

}

}