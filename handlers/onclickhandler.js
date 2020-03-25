CodeReuse.Handler = function() {
	
};

CodeReuse.Handler.prototype = {

TenantHomeGridOnClickHandler: function(phpFile, row, fieldsInfo, gridColumnsInfo) {
	
},

SuiteGridOnClickHandler: function(phpFile, row, fieldsInfo, gridColumnsInfo) {
			
	var rowAttributeValue = row.attributes["gridIdField"].value;

	var suiteModel = new CodeReuse.Suite();
	
	var arrayOldValuesTable = suiteModel.arrayOldValuesTable;
	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
	var callback = new CodeReuse.Callback();
	
	grid_get_post_functions.get_populateForm(phpFile, "populateSuite", rowAttributeValue, fieldsInfo, gridColumnsInfo, '', arrayOldValuesTable, callback.get_populateForm_callback);
	
},

TenantGridOnClickHandler: function(phpFile, row, fieldsInfo, gridColumnsInfo) {
		
	var rowAttributeValue = row.attributes["gridIdField"].value;

	var tenantModel = new CodeReuse.Tenant();
	
	var autocompleteInputs = tenantModel.getAutocompleteInputs();			
	
	var arrayOldValuesTable = tenantModel.arrayOldValuesTable;
	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
	var callback = new CodeReuse.Callback();
	
	grid_get_post_functions.get_populateForm(phpFile, "populate", rowAttributeValue, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTable, callback.get_populateForm_callback);
	
},

sortTableColumnOnclickHandler: function(sortTableHtmlObjectId, gridColumnsInfo, column) {
				
	return function() {
		
		var sort = new CodeReuse.Sort();

		sort.sortTable(sortTableHtmlObjectId, column, gridColumnsInfo);
			
	};
},

sortTableColumnOnclickHandlerHomeTenantGrid: function(sortTableHtmlObjectId, gridColumnsInfo, column) {
	
	return function() {
	
		tenantModel = new CodeReuse.Tenant();
		
		home_tenant_grid = new CodeReuse.HomeTenantGrid();
		
		grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var callback = new CodeReuse.Callback();
		
		var sortColumn = gridColumnsInfo[column].dbField;		
		
		var sortDirection = localStorage.getItem("arraySortDirection");	
		
		if(sortColumn != localStorage.getItem("arraySortColumn"))
		{
			if(sortDirection == "asc")
			{
				localStorage.setItem("arraySortDirection", "asc");
			}
			else
			{
				if(sortTableHtmlObjectId != localStorage.getItem("sortTableId"))
				{
					if(sortColumn == "fieldPrimaryKey")
					{
						localStorage.setItem("arraySortDirection", "desc");
					}
					else
					{
						localStorage.setItem("arraySortDirection", "asc");
					}
						
					localStorage.setItem("sortTableId", sortTableHtmlObjectId);
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
							localStorage.setItem("arraySortDirection", "asc");
					}
				}
			}
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
					localStorage.setItem("arraySortDirection", "asc");
			}			
		}
			
		localStorage.setItem("arraySortColumn", sortColumn);

		
		grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), "gridtablehome", "fieldPrimaryKey", tenantModel.getFieldsInfo(), gridColumnsInfo, sortTableHtmlObjectId, '', '', callback.gridCallback, '', "showEdit", sortColumn, localStorage.getItem("arraySortDirection"));
			
	};
}

}