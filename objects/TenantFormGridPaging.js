/**
 * Class for TenantFormGridPaging form object
 * @class
 */
CodeReuse.TenantFormGridPaging = function() {
	
	this.fieldPrimaryKey;
	this.field3;
	this.field4;	
	this.field1;
	this.field2;
	
	this.fields = [
		{ name: "fieldPrimaryKey", dbType: "int", htmlObjectId: "inputPrimaryKeyFormGridPaging", htmlObjectType: "primaryKey" },
		{ name: "field3", dbType: "int", htmlObjectId: "building_option_form_grid_paging", htmlObjectType: "select", description: "Building" },
		{ name: "field4", dbType: "int", htmlObjectId: "tenant_input_form_grid_paging", htmlObjectType: "autocomplete", description: "Tenant" },		
		{ name: "field1", dbType: "date", htmlObjectId: "inputCalendarFormGridPaging", htmlObjectType: "calendar", description: "Date" },
		{ name: "field2", dbType: "date", htmlObjectId: "inputCalendarTestingFormGridPaging", htmlObjectType: "calendar", description: "Date" }
	];
	
	this.autocomplete_inputs = [
	
		{ htmlObjectId: "tenant_input_form_grid_paging", value: "field4" , display: "field4display" }
		
	];
	
	this.phpFileGridGetPost = "php/grid_get_post.php";

	this.tenantUpdateQueryName = "updateTableGridGetPost";

	this.tenantInsertQueryName = "createRecordTableGridGetPost";
	
};

CodeReuse.TenantFormGridPaging.prototype = {
			
	/**
	 * Array to store old values for inserting and updating records in Tenant form grid paging object
	 * @var {Array} arrayOldValuesTable
	 */		
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
	
	getTenantUpdateQueryName: function() {

		return this.tenantUpdateQueryName;

	},

	getTenantInsertQueryName: function() {

		return this.tenantInsertQueryName;

	},
	
	/**
	 * Setting values in this object constructor from the html inputs for inserting or updating
	 * @function
	 * @name TenantFormGridPaging#setFieldValuesFromInputs
	 * 
	 * @param {Array} inputValueArray array of html input values
	 * @param {string} primaryKey primary key of the record we are updating
	 */
	setFieldValuesFromInputs: function(inputValueArray, primaryKey) {
		
		this.fieldPrimaryKey = primaryKey;
		
		this.field3 = inputValueArray["building_option_form_grid_paging"];
		this.field4 = inputValueArray["tenant_input_form_grid_paging"];	
		this.field1 = inputValueArray["inputCalendarFormGridPaging"];
		this.field2 = inputValueArray["inputCalendarTestingFormGridPaging"];
		
	},
	
	/**
	 * Returns an array with values that have been preset in this object for updating
	 * @function
	 * @name TenantFormGridPaging#fieldsValuesUpdate
	 * 
	 * @returns {Array} array of the field values of this object
	 */
	fieldsValuesUpdate: function() {
		
		var fieldsValuesUpdateArray = [];
		
		fieldsValuesUpdateArray[0] = this.fieldPrimaryKey;
		fieldsValuesUpdateArray[1] = this.field3;
		fieldsValuesUpdateArray[2] = this.field4;		
		fieldsValuesUpdateArray[3] = this.field1;
		fieldsValuesUpdateArray[4] = this.field2;
		
		return fieldsValuesUpdateArray;
		
	},
	
	/**
	 * Returns an array with values that have been preset in this object for inserting
	 * @function
	 * @name TenantFormGridPaging#fieldsValuesInsert
	 * 
	 * @returns {Array} array of the field values of this object
	 */
	fieldsValuesInsert: function() {
		
		var fieldsValuesInsertArray = [];
		
		fieldsValuesInsertArray[3] = this.field3;
		fieldsValuesInsertArray[4] = this.field4;		
		fieldsValuesInsertArray[1] = this.field1;
		fieldsValuesInsertArray[2] = this.field2;
		
		return fieldsValuesInsertArray;
		
	},
		
	/**
	 * Tenant form grid paging form update
	 * @function
	 * @name TenantFormGridPaging#tenantUpdate
	 */
	tenantFormGridUpdate: function() {
			
		var htmlObjectFieldsValuesUpdate = this.fieldsValuesUpdate();				
										
		var helper = new CodeReuse.Helper();								
												
		if(helper.validateHtmlObjectFieldsTenant(this.fields))
		{	
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			var homeTenantFormGridPaging = new CodeReuse.HomeTenantFormGridPaging();

			grid_get_post_functions.post_updateForm(this.getPhpFile(), this.getTenantUpdateQueryName(), document.getElementById("inputPrimaryKeyFormGridPaging").value, htmlObjectFieldsValuesUpdate, this.getFieldsInfo(), this.arrayOldValuesTable, '', homeTenantFormGridPaging.getTableHtmlObjectId());
		}
		
	},
	
	/**
	 * Tenant form grid paging insert
	 * @function
	 * @name TenantFormGridPaging#tenantInsert
	 */	
	tenantFormGridInsert: function() {
	
		var htmlObjectFieldsValuesInsert = this.fieldsValuesInsert();	
				
		var helper = new CodeReuse.Helper();		
				
		if(helper.validateHtmlObjectFieldsTenant(this.fields))
		{
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

			grid_get_post_functions.post_insertRecordForm(this.getPhpFile(), this.getTenantInsertQueryName(), htmlObjectFieldsValuesInsert, this.getFieldsInfo(), "inputPrimaryKeyFormGridPaging", this.arrayOldValuesTable, '', home_tenant_form_grid_paging.getTableHtmlObjectId());
		}	
	
	}
}