
var Tenant = function() {
		
	this.fieldPrimaryKey;
	this.field1;
	this.field2;
	this.field3;
	this.field4;
	
	this.fields = [
		{ name: "fieldPrimaryKey", dbType: "int", htmlObjectId: "inputPrimaryKey", htmlObjectType: "primaryKey" },
		{ name: "field1", dbType: "date", htmlObjectId: "inputCalendar", htmlObjectType: "calendar" },
		{ name: "field2", dbType: "date", htmlObjectId: "inputCalendarTesting", htmlObjectType: "calendar" },
		{ name: "field3", dbType: "int", htmlObjectId: "building_input", htmlObjectType: "autocomplete" },
		{ name: "field4", dbType: "int", htmlObjectId: "tenant_input", htmlObjectType: "autocomplete" }
	];
	
	this.autocomplete_inputs = [
	
		{ htmlObjectId: "building_input", value: "field3" , display: "field3display" },
		{ htmlObjectId: "tenant_input", value: "field4" , display: "field4display" }
		
	];
	
	this.phpFileGridGetPost = "php/grid_get_post.php";
	
};

Tenant.prototype = {
		
	arrayOldValuesTable: [],
	
	getFieldsInfo: function() {
		
		return this.fields;
	},
	
	getAutocompleteInputs: function() {
	
		return this.autocomplete_inputs;
		
	},
	
	getPhpFile: function() {
		
		return this.phpFileGridGetPost;	
		
	},
	
	setFieldValuesFromInputs: function(inputValueArray, primaryKey) {
		
		fieldPrimaryKey = primaryKey;
		
		field1 = inputValueArray["inputCalendar"];
		field2 = inputValueArray["inputCalendarTesting"];
		field3 = inputValueArray["building_input"];
		field4 = inputValueArray["tenant_input"];
		
	},
	
	fieldsValuesUpdate: function() {
		
		var fieldsValuesUpdateArray = [];
		
		fieldsValuesUpdateArray[0] = fieldPrimaryKey;
		fieldsValuesUpdateArray[1] = field1;
		fieldsValuesUpdateArray[2] = field2;
		fieldsValuesUpdateArray[3] = field3;
		fieldsValuesUpdateArray[4] = field4;
		
		return fieldsValuesUpdateArray;
		
	},
	
	fieldsValuesInsert: function() {
		
		var fieldsValuesInsertArray = [];
		
		fieldsValuesInsertArray[1] = field1;
		fieldsValuesInsertArray[2] = field2;
		fieldsValuesInsertArray[3] = field3;
		fieldsValuesInsertArray[4] = field4;
		
		return fieldsValuesInsertArray;
		
	},
	
	refreshTenantGrid: function() {
		
		var tenantGrid = new TenantGrid();
		
		tenantGrid.refreshTenantGrid(this.getPhpFile(),this.getFieldsInfo());
		
	},
	
	refreshSelectTenantGrid: function() {
		
		var tenantGrid = new TenantGrid();
		
		tenantGrid.refreshSelectTenantGrid(this.getPhpFile(),this.getFieldsInfo(), document.getElementById("selectBuilding").value);
		
	},
		
	tenantUpdate: function() {
			
		var htmlObjectFieldsValuesUpdate = this.fieldsValuesUpdate();
				
		if(validateHtmlObjectFields(this.fields))
		{	
			post_updateForm(this.getPhpFile(), "updateTableGridGetPost", document.getElementById("inputPrimaryKey").value, htmlObjectFieldsValuesUpdate, this.getFieldsInfo(), this.arrayOldValuesTable, refreshGridCallback);
		}
		
	},
	
	tenantInsert: function() {
	
		var htmlObjectFieldsValuesInsert = this.fieldsValuesInsert();
				
		if(validateHtmlObjectFields(this.fields))
		{
			post_insertRecordForm(this.getPhpFile(), "createRecordTableGridGetPost", htmlObjectFieldsValuesInsert, this.getFieldsInfo(), "inputPrimaryKey", this.arrayOldValuesTable, refreshGridCallback);
		}	
	
	}
}