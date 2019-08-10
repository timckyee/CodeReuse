function TenantGridOnClickHandler(phpFile, row, fieldsInfo, gridColumnsInfo) {
	
	return function() {
		
		var rowAttributeValue = row.attributes["gridIdField"].value;

		get_populateForm(phpFile, "populate", rowAttributeValue, fieldsInfo, gridColumnsInfo, arrayOldValuesTable, get_populateForm_callback);
	}
	
}

function sortTableColumnOnclickHandler(sortTableHtmlObjectId, gridColumnsInfo, column) {
		
	return function() { 

		sortTable(sortTableHtmlObjectId, column);
			
	};
}