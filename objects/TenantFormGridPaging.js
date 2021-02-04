/**
 * Class for Tenant form object
 * @class
 */
CodeReuse.TenantFormGridPaging = function() {
	
	this.fieldPrimaryKey;
	this.field1;
	this.field2;
	this.field3;
	this.field4;
	
	this.fields = [
		{ name: "fieldPrimaryKey", dbType: "int", htmlObjectId: "inputPrimaryKeyFormGridPaging", htmlObjectType: "primaryKey" },
		{ name: "field1", dbType: "date", htmlObjectId: "inputCalendarFormGridPaging", htmlObjectType: "calendar" },
		{ name: "field2", dbType: "date", htmlObjectId: "inputCalendarTestingFormGridPaging", htmlObjectType: "calendar" },
		{ name: "field3", dbType: "int", htmlObjectId: "building_option_form_grid_paging", htmlObjectType: "select" },
		{ name: "field4", dbType: "int", htmlObjectId: "tenant_input_form_grid_paging", htmlObjectType: "autocomplete" }
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
		
		this.field1 = inputValueArray["inputCalendarFormGridPaging"];
		this.field2 = inputValueArray["inputCalendarTestingFormGridPaging"];
		this.field3 = inputValueArray["building_option_form_grid_paging"];
		this.field4 = inputValueArray["tenant_input_form_grid_paging"];
		
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
	 * @param {string} highlightId the row primary key to highlight
	 */

	 /*
	refreshTenantGrid: function(highlightId) {

		var tenantGrid = new CodeReuse.TenantGrid();
		
		tenantGrid.refreshTenantGrid(this.getPhpFile(),this.getFieldsInfo(), highlightId);
		
	},
	*/
	
	/**
	 * Refresh Tenant form grid when updating the building select value by calling the TenantGrid object refreshSelectTenantGrid function
	 * @function
	 * @name Tenant#refreshSelectTenantGrid
	 */

	 /*
	refreshSelectTenantGrid: function() {
		
		var tenantGrid = new CodeReuse.TenantGrid();
		
		tenantGrid.refreshSelectTenantGrid(this.getPhpFile(),this.getFieldsInfo(), document.getElementById("selectBuildingTenant").value);
		
	},
	*/
	
	/**
	 * Refresh the HomeTenantGrid by calling the HomeTenantGrid object refreshTenantHomeGrid function
	 * @function
	 * @name Tenant#refreshTenantGridHome	 
	 */

	 /*
	refreshTenantFormGridPaging: function(highlight) {
		
		var homeTenantFormGridPaging = new CodeReuse.HomeTenantFormGridPaging();

		homeTenantFormGridPaging.refreshTenantHomeGrid(this.getPhpFile(),this.getFieldsInfo(), localStorage.getItem("arraySortColumn_tenant_form_grid_paging"), localStorage.getItem("arraySortDirection_tenant_form_grid_paging"), localStorage.getItem("homeTenantFormGridPagingPageNumber"), highlight);
		
	},
	*/
		
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
			
			var homeTenantFormGridPaging = new CodeReuse.HomeTenantFormGridPaging();

			grid_get_post_functions.post_updateForm(this.getPhpFile(), this.getTenantUpdateQueryName(), document.getElementById("inputPrimaryKeyFormGridPaging").value, htmlObjectFieldsValuesUpdate, this.getFieldsInfo(), this.arrayOldValuesTable, callback.refreshGridCallbackTenantFormGridPaging, homeTenantFormGridPaging.getTableHtmlObjectId());
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
			
			var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

			grid_get_post_functions.post_insertRecordForm(this.getPhpFile(), this.getTenantInsertQueryName(), htmlObjectFieldsValuesInsert, this.getFieldsInfo(), "inputPrimaryKeyFormGridPaging", this.arrayOldValuesTable, callback.refreshGridCallback, home_tenant_form_grid_paging.getTableHtmlObjectId());
		}	
	
	}
}