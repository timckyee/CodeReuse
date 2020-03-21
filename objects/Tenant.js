CodeReuse.Tenant = function() {
		
	this.fieldPrimaryKey;
	this.field1;
	this.field2;
	this.field3;
	this.field4;
	
	this.fields = [
		{ name: "fieldPrimaryKey", dbType: "int", htmlObjectId: "inputPrimaryKey", htmlObjectType: "primaryKey" },
		{ name: "field1", dbType: "date", htmlObjectId: "inputCalendar", htmlObjectType: "calendar" },
		{ name: "field2", dbType: "date", htmlObjectId: "inputCalendarTesting", htmlObjectType: "calendar" },
		//{ name: "field3", dbType: "int", htmlObjectId: "building_input", htmlObjectType: "autocomplete" },
		{ name: "field3", dbType: "int", htmlObjectId: "building_option", htmlObjectType: "select" },
		{ name: "field4", dbType: "int", htmlObjectId: "tenant_input", htmlObjectType: "autocomplete" }
	];
	
	this.autocomplete_inputs = [
	
		//{ htmlObjectId: "building_input", value: "field3" , display: "field3display" },
		{ htmlObjectId: "tenant_input", value: "field4" , display: "field4display" }
		
	];
	
	this.phpFileGridGetPost = "php/grid_get_post.php";
	
};

CodeReuse.Tenant.prototype = {
			
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
		
		this.fieldPrimaryKey = primaryKey;
		
		this.field1 = inputValueArray["inputCalendar"];
		this.field2 = inputValueArray["inputCalendarTesting"];
		this.field3 = inputValueArray["building_option"];
		this.field4 = inputValueArray["tenant_input"];
		
	},
	
	fieldsValuesUpdate: function() {
		
		var fieldsValuesUpdateArray = [];
		
		fieldsValuesUpdateArray[0] = this.fieldPrimaryKey;
		fieldsValuesUpdateArray[1] = this.field1;
		fieldsValuesUpdateArray[2] = this.field2;
		fieldsValuesUpdateArray[3] = this.field3;
		fieldsValuesUpdateArray[4] = this.field4;
		
		return fieldsValuesUpdateArray;
		
	},
	
	fieldsValuesInsert: function() {
		
		var fieldsValuesInsertArray = [];
		
		fieldsValuesInsertArray[1] = this.field1;
		fieldsValuesInsertArray[2] = this.field2;
		fieldsValuesInsertArray[3] = this.field3;
		fieldsValuesInsertArray[4] = this.field4;
		
		return fieldsValuesInsertArray;
		
	},
	
	refreshTenantGrid: function() {
		
		var tenantGrid = new CodeReuse.TenantGrid();
		
		tenantGrid.refreshTenantGrid(this.getPhpFile(),this.getFieldsInfo());
		
	},
	
	refreshSelectTenantGrid: function() {
		
		var tenantGrid = new CodeReuse.TenantGrid();
		
		tenantGrid.refreshSelectTenantGrid(this.getPhpFile(),this.getFieldsInfo(), document.getElementById("selectBuildingTenant").value);
		
	},
	
	refreshTenantGridHome: function() {
		
		var homeTenantGrid = new CodeReuse.HomeTenantGrid();
		
		homeTenantGrid.refreshTenantHomeGrid(this.getPhpFile(),this.getFieldsInfo());
		
	},
	
	refreshSelectTenantGridHome: function() {
		
		var homeTenantGrid = new CodeReuse.HomeTenantGrid();
		
		homeTenantGrid.refreshSelectTenantHomeGrid(this.getPhpFile(),this.getFieldsInfo(), document.getElementById("selectBuildingTenant").value);
		
	},	
		
	tenantUpdate: function() {
			
		var htmlObjectFieldsValuesUpdate = this.fieldsValuesUpdate();				
										
		var helper = new CodeReuse.Helper();								
												
		if(helper.validateHtmlObjectFieldsTenant(this.fields))
		{	
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			var callback = new CodeReuse.Callback();
			
			grid_get_post_functions.post_updateForm(this.getPhpFile(), "updateTableGridGetPost", document.getElementById("inputPrimaryKey").value, htmlObjectFieldsValuesUpdate, this.getFieldsInfo(), this.arrayOldValuesTable, callback.refreshGridCallback);
		}
		
	},
	
	tenantInsert: function() {
	
		var htmlObjectFieldsValuesInsert = this.fieldsValuesInsert();	
				
		var helper = new CodeReuse.Helper();		
				
		if(helper.validateHtmlObjectFieldsTenant(this.fields))
		{
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			var callback = new CodeReuse.Callback();
			
			grid_get_post_functions.post_insertRecordForm(this.getPhpFile(), "createRecordTableGridGetPost", htmlObjectFieldsValuesInsert, this.getFieldsInfo(), "inputPrimaryKey", this.arrayOldValuesTable, callback.refreshGridCallback);
		}	
	
	}
}