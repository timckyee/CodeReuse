
function Tenant(inputValueArray,primaryKey) {
		
	var fieldPrimaryKey;
	var field1;
	var field2;
	var field3;
	var field4;
	
	var fields = [
		{ name: "fieldPrimaryKey", dbType: "int", htmlObjectId: "inputPrimaryKey", htmlObjectType: "primaryKey" },
		{ name: "field1", dbType: "date", htmlObjectId: "inputCalendar", htmlObjectType: "calendar" },
		{ name: "field2", dbType: "date", htmlObjectId: "inputCalendarTesting", htmlObjectType: "calendar" },
		{ name: "field3", dbType: "int", htmlObjectId: "building_input", htmlObjectType: "autocomplete" },
		{ name: "field4", dbType: "int", htmlObjectId: "tenant_input", htmlObjectType: "autocomplete" }
	];
	
	var autocomplete_inputs = [
	
		{ htmlObjectId: "building_input", value: "field3" , display: "field3display" },
		{ htmlObjectId: "tenant_input", value: "field4" , display: "field4display" }
		
	];
	
	var phpFileGridGetPost = "php/grid_get_post.php";
		
	this.getFieldsInfo = function() {
		
		return fields;
	};
	
	this.getAutocompleteInputs = function() {
	
		return autocomplete_inputs;
		
	};
	
	this.getPhpFile = function() {
		
		return phpFileGridGetPost;	
		
	};
	
	this.setFieldValuesFromInputs = function(inputValueArray, primaryKey) {
		
		fieldPrimaryKey = primaryKey;
		
		field1 = inputValueArray["inputCalendar"];
		field2 = inputValueArray["inputCalendarTesting"];
		field3 = inputValueArray["building_input"];
		field4 = inputValueArray["tenant_input"];
		
	};
	
	this.fieldsValuesUpdate = function() {
		
		var fieldsValuesUpdateArray = [];
		
		fieldsValuesUpdateArray[0] = fieldPrimaryKey;
		fieldsValuesUpdateArray[1] = field1;
		fieldsValuesUpdateArray[2] = field2;
		fieldsValuesUpdateArray[3] = field3;
		fieldsValuesUpdateArray[4] = field4;
		
		return fieldsValuesUpdateArray;
		
	}
	
	this.fieldsValuesInsert = function() {
		
		var fieldsValuesInsertArray = [];
		
		fieldsValuesInsertArray[1] = field1;
		fieldsValuesInsertArray[2] = field2;
		fieldsValuesInsertArray[3] = field3;
		fieldsValuesInsertArray[4] = field4;
		
		return fieldsValuesInsertArray;
		
	}
	
	this.loadGridGetPost = function() {
		
		var tenantGrid = new TenantGrid();
		
		tenantGrid.loadTenantGrid(this.getPhpFile(),this.getFieldsInfo());
		
	};
		
	this.tenantUpdate = function() {
			
		var htmlObjectFieldsValuesUpdate = this.fieldsValuesUpdate();
		
		if(validateHtmlObjectFields(fields))
		{						
			post_updateForm(this.getPhpFile(), "updateTableGridGetPost", document.getElementById("inputPrimaryKey").value, htmlObjectFieldsValuesUpdate, this.getFieldsInfo(), arrayOldValuesTable, refreshGridCallback);
		}
		
	};
	
	this.tenantInsert = function() {
	
		var htmlObjectFieldsValuesInsert = this.fieldsValuesInsert();
				
		if(validateHtmlObjectFields(fields))
		{
			post_insertRecordForm(this.getPhpFile(), "createRecordTableGridGetPost", htmlObjectFieldsValuesInsert, this.getFieldsInfo(), "inputPrimaryKey", arrayOldValuesTable, refreshGridCallback);
		}	
	
	};
}