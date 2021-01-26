/**
 * Class for HomeTenantGrid object
 * @class
 */
CodeReuse.HomeTenantFormGridPaging = function() {
	
	this.gridName = "HomeTenantFormGridPaging";
	this.gridGetPostDivElement = "gridGetPostHomeFormGridPaging";
	this.tableHtmlObjectId = "tableHomeTenantFormGridPaging";
		
	this.fieldPrimaryKey;
	this.field1;
	this.field2;
	this.field3;
	this.field4;
		
	this.columns = [
		
		{ colName: "Primary Key", id: "fieldPrimaryKey", colType: "int", htmlObjectId: "inputPrimaryKey_grid", htmlObjectType: "primaryKey" },
		{ colName: "Building", id: "buildingName", colType: "string", htmlObjectId: "building_option_grid", htmlObjectType: "select", hasIdHiddenField: true, idDbField: "field3" },
		{ colName: "Tenant Name", id: "tenantName", colType: "string", htmlObjectId: "tenant_input_grid", htmlObjectType: "autocomplete", hasIdHiddenField: true, idDbField: "field4" },
		{ colName: "Date First", id: "field1", colType: "date", htmlObjectId: "inputCalendar_grid", htmlObjectType: "calendar" },
		{ colName: "Date Second", id: "field2", colType: "date", htmlObjectId: "inputCalendarTesting_grid", htmlObjectType: "calendar" },
		
	];
	
	this.autocomplete_inputs = [
	
		//{ htmlObjectId: "building_input", value: "field3" , display: "field3display" },
		{ htmlObjectId: "tenant_input", value: "field4" , display: "field4display" }
		
	];
	
	var handler = new CodeReuse.Handler();
	
	this.gridIdField = "fieldPrimaryKey";

	this.rowOnClick =  handler.TenantFormGridPagingOnClickHandler;
	
	this.phpFileGridGetPost = "php/grid_get_post.php";

	this.refreshHomeTenantGridQueryName = "gridtablehome";

	this.refreshHomeTenantGridQueryNameSearch = "gridtablehomeSearch";

	this.homeTenantGridUpdateQueryName = "updateTableGridGetPost";

	this.homeTenantGridPagingDiv = "gridGetPostHomeFormGridPagingFooter";
};

CodeReuse.HomeTenantFormGridPaging.prototype = {
	
	/**
	 * Array to store old values for updating records in HomeTenantGrid
	 * @var {Array} arrayOldValuesTableGridEdit
	 */
	arrayOldValuesTableGridEdit: [],
	
	searchValue: [],

	getGridName: function() {
		
		return this.gridName;
		
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
	
	getPhpFile: function() {
		
		return this.phpFileGridGetPost;	
		
	},	
	
	getGridGetPostDivElement: function() {
		
		return this.gridGetPostDivElement;
		
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
	 */
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
	 * Refreshes the home tenant grid
	 * @function
	 * @name HomeTenantGrid#refreshTenantHomeGrid
	 * 
	 * @param {string} phpFile php file name and location
	 * @param {Array} fieldsInfo form object array of fields
	 * @param {string} sortColumn the grid column which is currently sorted
	 * @param {string} sortDirection the direction which is currently sorted
	 * @param {string} pageNumber the page number of the table we are currently showing
	 * @param {string} highlight the row number to highlight after save
	 */
	refreshTenantHomeGrid: function(phpFile, fieldsInfo, sortColumn, sortDirection, pageNumber, highlight) {

		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

		var callback = new CodeReuse.Callback();
		
		grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshHomeTenantGridQueryName(), this.getGridIdField(), fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, '', '', callback.gridCallback, this.rowOnClick, '', sortColumn, sortDirection, pageNumber, highlight, "false", '' , "true", "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv());
		
	},
	
	/**
	 * Getting the selected row id for the row that is highlighted
	 * @function
	 * @name TenantGrid#getTenantSelectedRowId
	 */
	getHomeTenantFormGridPagingSelectedRowId: function() {

		var table = document.getElementById(this.tableHtmlObjectId);

		if(table == null)
		{
			return;
		}

		var row;
		var rowFound = false;
		var primaryKey;

		for(var i=1; i<table.rows.length; i++)
		{
			row = table.rows[i];
			
			if(row.className == "tableHover highlightRow")
			{
				rowFound = true;
				primaryKey = row.cells[0].innerText;				
				break;
			}
		}

		if(rowFound == true)
		{
			return primaryKey;
		}
		else
		{
			return "";
		}
	},

	/**
	 * Updating the Home Tenant Grid table row values inline
	 * @function
	 * @name HomeTenantGrid#homeTenantGridUpdate 
	 */
	homeTenantGridUpdate: function() {

		var htmlObjectFieldsValuesUpdate = this.fieldsValuesUpdate();
		
		var helper = new CodeReuse.Helper();								
												
		if(helper.validateHtmlObjectFieldsHomeTenantGrid(this.columns))
		{
			grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			tenantModel = new CodeReuse.Tenant();
				
			home_tenant_grid = new CodeReuse.HomeTenantGrid();

			var callback = new CodeReuse.Callback();
			
			grid_get_post_functions.post_updateGrid(this.getPhpFile(), this.getHomeTenantGridUpdateQueryName(), document.getElementById("inputPrimaryKey_grid").innerHTML, htmlObjectFieldsValuesUpdate, this.getGridColumnsInfo(), this.arrayOldValuesTableGridEdit);
		}
		
	},
	
};