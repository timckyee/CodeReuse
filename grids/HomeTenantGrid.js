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
		
		{ colName: "Primary Key", id: "fieldPrimaryKey", colType: "int", dbField: "fieldPrimaryKey", htmlObjectId: "inputPrimaryKey_grid"},
		{ colName: "Building Name", id: "buildingName", colType: "int", dbField: "buildingName", htmlObjectId: "building_option_grid", hasIdHiddenField: true, idDbField: "field3" },
		{ colName: "Tenant Name", id: "tenantName", colType: "string", dbField: "tenantName", htmlObjectId: "tenant_input_grid", hasIdHiddenField: true, idDbField: "field4" },
		{ colName: "Field Date", id: "field1", colType: "date", dbField: "field1", htmlObjectId: "inputCalendar_grid" },
		{ colName: "Field Date", id: "field2", colType: "date", dbField: "field2", htmlObjectId: "inputCalendarTesting_grid" },
		
	];
	
	this.autocomplete_inputs = [
	
		//{ htmlObjectId: "building_input", value: "field3" , display: "field3display" },
		{ htmlObjectId: "tenant_input", value: "field4" , display: "field4display" }
		
	];
	
	var handler = new CodeReuse.Handler();
	
	this.rowOnClick =  handler.TenantHomeGridOnClickHandler;
	
	this.phpFileGridGetPost = "php/grid_get_post.php";

};

CodeReuse.HomeTenantGrid.prototype = {
	
	arrayOldValuesTableGridEdit: [],
	
	getGridName: function() {
		
		return this.gridName;
		
	},
	
	getRowOnClick: function() {
		
		return this.rowOnClick;
		
	},
	
	getColumnsInfo: function() {
		
		return this.columns;
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
	
	getTableHtmlObjectId: function() {
		
		return this.tableHtmlObjectId;
	},
	
	setFieldValuesFromInputs: function(inputValueArray, primaryKey) {
		
		this.fieldPrimaryKey = primaryKey;
		
		this.field1 = inputValueArray["inputCalendar_grid"];
		this.field2 = inputValueArray["inputCalendarTesting_grid"];
		this.field3 = inputValueArray["building_option_grid"];
		this.field4 = inputValueArray["tenant_input_grid"];
		
	},	
	
	fieldsValuesUpdate: function() {
		
		var fieldsValuesUpdateArray = [];
		
		fieldsValuesUpdateArray[0] = this.fieldPrimaryKey;
		fieldsValuesUpdateArray[1] = this.field3;
		fieldsValuesUpdateArray[2] = this.field4;
		fieldsValuesUpdateArray[3] = this.field1;
		fieldsValuesUpdateArray[4] = this.field2;
		
		return fieldsValuesUpdateArray;
		
	},	
	
	refreshTenantHomeGrid: function(phpFile, fieldsInfo, sortColumn, sortDirection, pageNumber) {
		
		grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var callback = new CodeReuse.Callback();
		
		if(sortColumn != "")		
		{		
			if(sortColumn == "fieldPrimaryKey")
			{
				localStorage.setItem("arraySortDirection", "asc");
			}
		}
		else
		{
			localStorage.setItem("arraySortDirection", "asc");
		}		
		
		if(sortColumn == "")
		{
			if(this.tableHtmlObjectId == "tableHomeTenant")
			{
				sortColumn = "fieldPrimaryKey";
			}
			else if(this.tableHtmlObjectId == "tableSuite")
			{
				sortColumn = "suiteId";
			}
			else if(this.tableHtmlObjectId == "tableTenant")
			{
				sortColumn = "fieldPrimaryKey";
			}
		}
		
		alert('homeTenantGrid');

		grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, "gridtablehome", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, '', '', callback.gridCallback, this.rowOnClick, "showEdit", null, sortColumn, sortDirection, '', '', pageNumber);
		
	},
	
	homeTenantGridUpdate: function(tableRowNumber, tableFieldsValue, pageNumber) {
			
		var htmlObjectFieldsValuesUpdate = this.fieldsValuesUpdate();
		
		var helper = new CodeReuse.Helper();								
												
		if(helper.validateHtmlObjectFieldsHomeTenantGrid(this.columns))
		{	
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			var callback = new CodeReuse.Callback();
			
			grid_get_post_functions.post_updateGrid(this.getPhpFile(), "updateTableGridGetPost", document.getElementById("inputPrimaryKey_grid").innerHTML, htmlObjectFieldsValuesUpdate, this.getColumnsInfo(), this.arrayOldValuesTableGridEdit, callback.refreshGridCallbackHomeTenantGrid, tableRowNumber, tableFieldsValue, pageNumber);
		}
		
	},
	
};