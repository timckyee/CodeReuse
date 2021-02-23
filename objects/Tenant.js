/**
 * Class for Tenant form object
 * @class
 */
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

	this.tenantUpdateQueryName = "updateTableGridGetPost";

	this.tenantInsertQueryName = "createRecordTableGridGetPost";
	
};

CodeReuse.Tenant.prototype = {
			
	/**
	 * Array to store old values for inserting and updating records in Tenant form object
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
	 * @name Tenant#setFieldValuesFromInputs
	 * 
	 * @param {Array} inputValueArray array of html input values
	 * @param {string} primaryKey primary key of the record we are updating
	 */
	setFieldValuesFromInputs: function(inputValueArray, primaryKey) {
		
		this.fieldPrimaryKey = primaryKey;
		
		this.field1 = inputValueArray["inputCalendar"];
		this.field2 = inputValueArray["inputCalendarTesting"];
		this.field3 = inputValueArray["building_option"];
		this.field4 = inputValueArray["tenant_input"];
		
	},
	
	/**
	 * Returns an array with values that have been preset in this object for updating
	 * @function
	 * @name Tenant#fieldsValuesUpdate
	 * 
	 * @returns {Array} array of the field values of this object
	 */
	fieldsValuesUpdate: function() {
		
		var fieldsValuesUpdateArray = [];
		
		fieldsValuesUpdateArray[0] = this.fieldPrimaryKey;
		fieldsValuesUpdateArray[1] = this.field1;
		fieldsValuesUpdateArray[2] = this.field2;
		fieldsValuesUpdateArray[3] = this.field3;
		fieldsValuesUpdateArray[4] = this.field4;
		
		return fieldsValuesUpdateArray;
		
	},
	
	/**
	 * Returns an array with values that have been preset in this object for inserting
	 * @function
	 * @name Tenant#fieldsValuesInsert
	 * 
	 * @returns {Array} array of the field values of this object
	 */
	fieldsValuesInsert: function() {
		
		var fieldsValuesInsertArray = [];
		
		fieldsValuesInsertArray[1] = this.field1;
		fieldsValuesInsertArray[2] = this.field2;
		fieldsValuesInsertArray[3] = this.field3;
		fieldsValuesInsertArray[4] = this.field4;
		
		return fieldsValuesInsertArray;
		
	},
	
	/**
	 * Refresh Tenant form grid by calling the TenantGrid object refreshTenantGrid function
	 * @function
	 * @name Tenant#refreshTenantGrid
	 *
	 * @param {string} phpFile php file name and location
	 * @param {string} highlightId the row primary key to highlight
	 */
	refreshTenantGrid: function(highlightId) {

		var tenantGrid = new CodeReuse.TenantGrid();
		
		tenantGrid.refreshTenantGrid(this.getPhpFile(), highlightId);
		
	},
	
	/**
	 * Refresh Tenant form grid when updating the building select value by calling the TenantGrid object refreshSelectTenantGrid function
	 * @function
	 * @name Tenant#refreshSelectTenantGrid
	 */
	refreshSelectTenantGrid: function() {
		
		var tenantGrid = new CodeReuse.TenantGrid();
		
		tenantGrid.refreshSelectTenantGrid(this.getPhpFile(), document.getElementById("selectBuildingTenant").value);
		
	},
	
	/**
	 * Refresh the HomeTenantGrid by calling the HomeTenantGrid object refreshTenantHomeGrid function
	 * @function
	 * @name Tenant#refreshTenantGridHome	 
	 */
	refreshTenantGridHome: function() {
		
		var homeTenantGrid = new CodeReuse.HomeTenantGrid();

		homeTenantGrid.refreshTenantHomeGrid(this.getPhpFile(), localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), localStorage.getItem("homeTenantGridPageNumber"));
		
	},
		
	/**
	 * Tenant form update
	 * @function
	 * @name Tenant#tenantUpdate
	 */
	tenantUpdate: function() {
			
		var htmlObjectFieldsValuesUpdate = this.fieldsValuesUpdate();				
										
		var helper = new CodeReuse.Helper();								
					
		if(helper.validateHtmlObjectFieldsTenant(this.fields))
		{	
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			var callback = new CodeReuse.Callback();
			
			var tenantGrid = new CodeReuse.TenantGrid();

			grid_get_post_functions.post_updateForm(this.getPhpFile(), this.getTenantUpdateQueryName(), document.getElementById("inputPrimaryKey").value, htmlObjectFieldsValuesUpdate, this.getFieldsInfo(), this.arrayOldValuesTable, callback.refreshGridCallback, tenantGrid.getTableHtmlObjectId());
		}
		
	},
	
	/**
	 * Tenant form insert
	 * @function
	 * @name Tenant#tenantInsert
	 */	
	tenantInsert: function() {
	
		var htmlObjectFieldsValuesInsert = this.fieldsValuesInsert();	
				
		var helper = new CodeReuse.Helper();		
				
		if(helper.validateHtmlObjectFieldsTenant(this.fields))
		{
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			var callback = new CodeReuse.Callback();
			
			var tenantGrid = new CodeReuse.TenantGrid();

			grid_get_post_functions.post_insertRecordForm(this.getPhpFile(), this.getTenantInsertQueryName(), htmlObjectFieldsValuesInsert, this.getFieldsInfo(), "inputPrimaryKey", this.arrayOldValuesTable, callback.refreshGridCallback, tenantGrid.getTableHtmlObjectId());
		}	
	
	}
}