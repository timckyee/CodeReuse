var TenantGrid = function() {
	
	this.gridGetPostDivElement = "gridGetPost";
	this.tableHtmlObjectId = "tableTenant";
		
	this.columns = [
		
		{ colName: "Primary Key", id: "fieldPrimaryKey", colType: "int" },
		{ colName: "field1", id: "field1", colType: "date" },
		{ colName: "field2", id: "field2", colType: "date" },
		{ colName: "Building Name", id: "buildingName", colType: "string" },
		{ colName: "Tenant Name", id: "tenantName", colType: "string" }
	];
	
	var handler = new Handler();
	
	this.rowOnClick =  handler.TenantGridOnClickHandler;

};

TenantGrid.prototype = {
	
	getGridColumnsInfo: function() {
		
		return this.columns;
	},
		
	refreshTenantGrid: function(phpFile, fieldsInfo) {
		
		grid_get_post_functions = new Grid_Get_Post_Functions();
		var callback = new Callback();
		
		grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, "gridtable", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("building_input").getAttribute("rowAttributeValue"), callback.gridCallback, this.rowOnClick);
		
	},
	
	refreshSelectTenantGrid: function(phpFile, fieldsInfo, selectBuildingHtmlObjectValue) {		
		
		if(selectBuildingHtmlObjectValue != "")
		{
			grid_get_post_functions = new Grid_Get_Post_Functions();
			callback = new Callback();			
					
			grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, "gridtable", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", selectBuildingHtmlObjectValue, callback.gridCallback, this.rowOnClick);
		}
		else
		{
			var helper = new Helper();
			
			helper.gridHide(this.gridGetPostDivElement);
		}
		
	}
	
};