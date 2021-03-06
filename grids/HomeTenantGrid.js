/**
 * Class for HomeTenantGrid object
 * @class
 **/
CodeReuse.HomeTenantGrid = function() {
	
	this.gridName = "HomeTenantGrid";
	this.gridGetPostDivElement = "gridGetPostHome";
	this.tableHtmlObjectId = "tableHomeTenant";
		
	this.fieldPrimaryKey;
	this.field1;
	this.field2;
	this.field3;
	this.field4;
		
	this.columns = [
		
		{ colName: "Primary Key", id: "fieldPrimaryKey", colType: "int", htmlObjectId: "inputPrimaryKey_grid", htmlObjectType: "primaryKey" },
		{ colName: "Building", id: "buildingName", colType: "string", htmlObjectId: "building_option_grid", htmlObjectType: "select", hasIdHiddenField: true, idDbField: "field3", description: "Building" },
		{ colName: "Tenant Name", id: "tenantName", colType: "string", htmlObjectId: "tenant_input_grid", htmlObjectType: "autocomplete", hasIdHiddenField: true, idDbField: "field4", description: "Tenant" },
		{ colName: "Date First", id: "field1", colType: "date", htmlObjectId: "inputCalendar_grid", htmlObjectType: "calendar", description: "Date" },
		{ colName: "Date Second", id: "field2", colType: "date", htmlObjectId: "inputCalendarTesting_grid", htmlObjectType: "calendar", description: "Date" }
		
	];
	
	this.autocomplete_inputs = [
	
		//{ htmlObjectId: "building_input", value: "field3" , display: "field3display" },
		{ htmlObjectId: "tenant_input", value: "field4" , display: "field4display" }
		
	];
	
	var handler = new CodeReuse.Handler();

	this.gridIdField = "fieldPrimaryKey";

	this.pageSize = "4";

	this.rowOnClick =  handler.TenantHomeGridOnClickHandler;
	
	this.phpFileGridGetPost = "php/grid_get_post.php";

	this.refreshHomeTenantGridQueryName = "gridtablehome";

	this.refreshHomeTenantGridQueryNameSearch = "gridtablehomeSearch";

	this.homeTenantGridUpdateQueryName = "updateTableGridGetPost";

	this.pageNumbersQueryName = "gridtablehomePages";

	this.divPagingFooter = "gridGetPostHomePaging";

	this.recordExist = "recordExistsHomeTenantGrid";

	this.tableNameInDb = "tableGridGetPost2";

	this.homeTenantGridPagingDiv = "gridGetPostHomePaging";
};

CodeReuse.HomeTenantGrid.prototype = {
	
	/**
	 * Array to store old values for updating records in HomeTenantGrid
	 * @var {Array} arrayOldValuesTableGridEdit
	 **/
	arrayOldValuesTableGridEdit: [],
	
	/**
	 * Search value of this grid
	 * @var {Array} searchValue
	 **/	
	searchValue: [],

	getGridName: function() {
		
		return this.gridName;
		
	},
	
	getTableNameInDb: function() {

		return this.tableNameInDb;

	},

	getRowOnClick: function() {
		
		return this.rowOnClick;
		
	},
	
	getGridIdField: function() {

		return this.gridIdField;
	},

	getAutocompleteInputs: function() {
	
		return this.autocomplete_inputs;
		
	},	
	
	getRecordExistsHomeTenantGrid: function() {

		return this.recordExist;

	},

	getPhpFile: function() {
		
		return this.phpFileGridGetPost;	
		
	},	
	
	getGridGetPostDivElement: function() {
		
		return this.gridGetPostDivElement;
		
	},

	getPageSize: function() {

		return this.pageSize;

	},

	getGridColumnsInfo: function() {
		
		return this.columns;
	},
	
	getRefreshHomeTenantGridQueryName: function () {

		return this.refreshHomeTenantGridQueryName;

	},
	
	getRefreshHomeTenantGridQueryNameSearch: function() {

		return this.refreshHomeTenantGridQueryNameSearch;

	},

	getHomeTenantGridUpdateQueryName: function () {

		return this.homeTenantGridUpdateQueryName;

	},

	getPageNumbersQueryName: function() {

		return this.pageNumbersQueryName;

	},

	getDivPagingFooter: function() {

		return this.divPagingFooter;
		
	},

	getHomeTenantGridPagingDiv: function () {

		return this.homeTenantGridPagingDiv;

	},

	setSearchValue: function(newSearchValue) {

		this.searchValue[0] = newSearchValue;

	},

	getSearchValue: function() {

		return this.searchValue[0];

	},

	getTableHtmlObjectId: function() {
		
		return this.tableHtmlObjectId;
	},
	
	/**
	 * Setting values in this object constructor from the html inputs for inserting or updating
	 * @function
	 * @name HomeTenantGrid#setFieldValuesFromInputs
	 * 
	 * @param {Array} inputValueArray array of html input values
	 * @param {string} primaryKey primary key of the record we are updating
	 **/
	setFieldValuesFromInputs: function(inputValueArray, primaryKey) {
		
		this.fieldPrimaryKey = primaryKey;
		
		this.field1 = inputValueArray["inputCalendar_grid"];
		this.field2 = inputValueArray["inputCalendarTesting_grid"];
		this.field3 = inputValueArray["building_option_grid"];
		this.field4 = inputValueArray["tenant_input_grid"];
		
	},	
	
	/**
	 * Returns an array with values that have been preset in this object for updating
	 * @function
	 * @name HomeTenantGrid#fieldsValuesUpdate
	 * 
	 * @returns {Array} array of the field values of this object
	 **/
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
	 * Refreshes the home tenant grid
	 * @function
	 * @name HomeTenantGrid#refreshTenantHomeGrid
	 * 
	 * @param {string} phpFile php file name and location
	 * @param {string} sortColumn the grid column which is currently sorted
	 * @param {string} sortDirection the direction which is currently sorted
	 * @param {string} pageNumber the page number of the table we are currently showing
	 **/
	refreshTenantHomeGrid: function(phpFile, sortColumn, sortDirection, pageNumber) {

		grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var home_tenant_grid = new CodeReuse.HomeTenantGrid();

		var callback = new CodeReuse.Callback();

		grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshHomeTenantGridQueryName(), this.getGridIdField(), this.getGridColumnsInfo(), this.tableHtmlObjectId, '', '', callback.gridCallback, this.rowOnClick, "showEdit", sortColumn, sortDirection, pageNumber, '', "false", '' ,'', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
		
	},
	
	/**
	 * Updating the Home Tenant Grid table row values inline
	 * @function
	 * @name HomeTenantGrid#homeTenantGridUpdate 
	 **/
	homeTenantGridUpdate: function() {

		var htmlObjectFieldsValuesUpdate = this.fieldsValuesUpdate();
		
		var helper = new CodeReuse.Helper();								
												
		if(helper.validateHtmlObjectFieldsHomeTenantGrid(this.columns))
		{
			grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			tenantModel = new CodeReuse.Tenant();
				
			home_tenant_grid = new CodeReuse.HomeTenantGrid();

			var callback = new CodeReuse.Callback();
			
			grid_get_post_functions.post_updateGrid(this.getPhpFile(), this.getHomeTenantGridUpdateQueryName(), document.getElementById("inputPrimaryKey_grid").innerHTML, htmlObjectFieldsValuesUpdate, this.getGridColumnsInfo(), this.arrayOldValuesTableGridEdit, home_tenant_grid.getTableHtmlObjectId());
		}
		
	},
	
	/**
	 * To check if record exists before saving
	 * @function
	 * @name HomeTenantGrid#recordExists
	 * 
	 * @param {Array} HomeTenantGridValues home tenant grid values to save
	 * @param {string} inputPrimaryKey the primary key
	 **/
	recordExists: function(HomeTenantGridValues, inputPrimaryKey) {

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
					var homeTenantGridEdit = new CodeReuse.HomeTenantGrid();

					homeTenantGridEdit.setFieldValuesFromInputs(HomeTenantGridValues, inputPrimaryKey);
					homeTenantGridEdit.homeTenantGridUpdate();
				}
			
			}
		}
		
		var queryString = "queryName" + "=" + this.getRecordExistsHomeTenantGrid() + "&" + "inputPrimaryKey" + "=" + inputPrimaryKey;
		
		window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
		window.getXmlHttpRequest.send();		
		
	}

};