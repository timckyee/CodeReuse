/**
 * Class for Tenant form object
 * @class
 **/
CodeReuse.Tenant = function() {
	
	this.tenantId;
	this.buildingId;
	this.suiteId;
	this.firstname;
	this.lastname;
	
	this.fields = [
		{ name: "tenantId", dbType: "int", htmlObjectId: "inputPrimaryKey", htmlObjectType: "primaryKey" },
		{ name: "suiteId", dbType: "int", htmlObjectId: "tenantSelectSuiteList", htmlObjectType: "select", description: "Suite" },
		{ name: "firstname", dbType: "string", htmlObjectId: "tenantFirstName", htmlObjectType: "text", description: "First Name" },
		{ name: "lastname", dbType: "string", htmlObjectId: "tenantLastName", htmlObjectType: "text", description: "Last Name" }
	];
	
	this.phpFileGridGetPost = "php/grid_get_post.php";

	this.tenantUpdateQueryName = "updateTableTenant";

	this.recordExist = "recordExistsTenantForm";

	this.tenantInsertQueryName = "createRecordTableGridGetPostTenant";
	
};

CodeReuse.Tenant.prototype = {
			
	/**
	 * Array to store old values for inserting and updating records in Tenant form object
	 * @var {Array} arrayOldValuesTable
	 **/		
	arrayOldValuesTable: [],
	
	getFieldsInfo: function() {
		
		return this.fields;
	},
	
	getRecordExistsTenantForm: function() {

		return this.recordExist;

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
	 **/
	setFieldValuesFromInputs: function(inputValueArray, primaryKey) {
		
		this.tenantId = primaryKey;
		
		this.suiteId = inputValueArray["tenantSelectSuiteList"];
		this.firstname = inputValueArray["tenantFirstName"];
		this.lastname = inputValueArray["tenantLastName"];
		
	},
	
	/**
	 * Returns an array with values that have been preset in this object for updating
	 * @function
	 * @name Tenant#fieldsValuesUpdate
	 * 
	 * @returns {Array} array of the field values of this object
	 **/
	fieldsValuesUpdate: function() {
		
		var fieldsValuesUpdateArray = [];
		
		fieldsValuesUpdateArray[0] = this.tenantId;
		fieldsValuesUpdateArray[1] = this.suiteId;
		fieldsValuesUpdateArray[2] = this.firstname;
		fieldsValuesUpdateArray[3] = this.lastname;
		
		return fieldsValuesUpdateArray;
		
	},
	
	/**
	 * Returns an array with values that have been preset in this object for inserting
	 * @function
	 * @name Tenant#fieldsValuesInsert
	 * 
	 * @returns {Array} array of the field values of this object
	 **/
	fieldsValuesInsert: function() {
		
		var fieldsValuesInsertArray = [];
		
		fieldsValuesInsertArray[1] = this.suiteId;
		fieldsValuesInsertArray[2] = this.firstname;
		fieldsValuesInsertArray[3] = this.lastname;
		
		return fieldsValuesInsertArray;
		
	},
	
	/**
	 * Refresh Tenant form grid by calling the TenantGrid object refreshTenantGrid function
	 * @function
	 * @name Tenant#refreshTenantGrid
	 *
	 * @param {string} phpFile php file name and location
	 * @param {string} highlightId the row primary key to highlight
	 **/
	refreshTenantGrid: function(highlightId) {

		var tenantGrid = new CodeReuse.TenantGrid();
		
		tenantGrid.refreshTenantGrid(this.getPhpFile(), highlightId);
		
	},
	
	/**
	 * Refresh Tenant form grid when updating the building select value by calling the TenantGrid object refreshSelectTenantGrid function
	 * @function
	 * @name Tenant#refreshSelectTenantGrid
	 **/
	refreshSelectTenantGrid: function() {
		
		var tenantGrid = new CodeReuse.TenantGrid();
		
		tenantGrid.refreshSelectTenantGrid(this.getPhpFile(), document.getElementById("selectBuildingTenant").value);
		
	},
	
	/**
	 * Refresh the HomeTenantGrid by calling the HomeTenantGrid object refreshTenantHomeGrid function
	 * @function
	 * @name Tenant#refreshTenantGridHome	 
	 **/
	refreshTenantGridHome: function() {
		
		var homeTenantGrid = new CodeReuse.HomeTenantGrid();

		homeTenantGrid.refreshTenantHomeGrid(this.getPhpFile(), sessionStorage.getItem("arraySortColumn"), sessionStorage.getItem("arraySortDirection"), sessionStorage.getItem("homeTenantGridPageNumber"));
		
	},
		
	/**
	 * Tenant form update
	 * @function
	 * @name Tenant#tenantUpdate
	 **/
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
	 **/	
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
	
	},

	/**
	 * To check if record exists before saving
	 * @function
	 * @name Tenant#recordExists
	 * 
	 * @param {Array} TenantValues tenant form values to save
	 * @param {string} inputPrimaryKey the primary key
	 **/
	 recordExists: function(TenantValues, inputPrimaryKey) {

		window.getXmlHttpRequest.onreadystatechange = function() {
		
			if (this.readyState == 4 && this.status == 200) {

				var response = JSON.parse(this.responseText);

				if(response == "0")
				{
					alert('Record no longer exists. Please refresh the form.')
					return;
				}
				else
				{
					// record exists so update record
					var tenantForm = new CodeReuse.Tenant();

					tenantForm.setFieldValuesFromInputs(TenantValues, inputPrimaryKey);
					tenantForm.tenantUpdate();
				}
			
			}
		}
		
		var queryString = "queryName" + "=" + this.recordExist + "&" + "inputPrimaryKey" + "=" + inputPrimaryKey;
		
		window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
		window.getXmlHttpRequest.send();		
		
	}	
	
}