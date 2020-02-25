var Handler = function() {
	
};

Handler.prototype = {

TenantGridOnClickHandler: function(phpFile, row, fieldsInfo, gridColumnsInfo) {	
		
	var rowAttributeValue = row.attributes["gridIdField"].value;

	var tenantModel = new Tenant();
	
	var autocompleteInputs = tenantModel.getAutocompleteInputs();			
	
	var arrayOldValuesTable = tenantModel.arrayOldValuesTable;
	
	var grid_get_post_functions = new Grid_Get_Post_Functions();
	
	var callback = new Callback();
	
	grid_get_post_functions.get_populateForm(phpFile, "populate", rowAttributeValue, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTable, callback.get_populateForm_callback);
	
},

sortTableColumnOnclickHandler: function(sortTableHtmlObjectId, gridColumnsInfo, column) {
			
	return function() { 

		var sort = new Sort();

		sort.sortTable(sortTableHtmlObjectId, column);
			
	};
}

}