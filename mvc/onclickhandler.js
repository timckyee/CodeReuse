function TenantGridOnClickHandler(phpFile, row, fieldsInfo, gridColumnsInfo) {
	
	return function() {
		
		var rowAttributeValue = row.attributes["gridIdField"].value;

		var tenantModel = new Tenant();
		var autocompleteInputs = tenantModel.getAutocompleteInputs();

		get_populateForm(phpFile, "populate", rowAttributeValue, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTable, get_populateForm_callback);
	}
	
}

function sortTableColumnOnclickHandler(sortTableHtmlObjectId, gridColumnsInfo, column) {
		
	return function() { 

		sortTable(sortTableHtmlObjectId, column);
			
	};
}