CodeReuse.Handler = function() {
	
};

CodeReuse.Handler.prototype = {

TenantHomeGridOnClickHandler: function(phpFile, row, fieldsInfo, gridColumnsInfo) {
	
},


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

	grid_get_post_functions.showTheGrid("", "grid");

}

}