CodeReuse.HomeTenantGrid = function() {
	
	this.gridGetPostDivElement = "gridGetPostHome";
	this.tableHtmlObjectId = "tableHomeTenant";
		
	this.columns = [
		
		{ colName: "Primary Key", id: "fieldPrimaryKey", colType: "int" },
		{ colName: "field1", id: "field1", colType: "date" },
		{ colName: "field2", id: "field2", colType: "date" },
		{ colName: "Building Name", id: "buildingName", colType: "string" },
		{ colName: "Tenant Name", id: "tenantName", colType: "string" }
	];
	
	var handler = new CodeReuse.Handler();
	
	this.rowOnClick =  handler.TenantHomeGridOnClickHandler;

};

CodeReuse.HomeTenantGrid.prototype = {
	
	getGridColumnsInfo: function() {
		
		return this.columns;
	},
	
	refreshTenantHomeGrid: function(phpFile, fieldsInfo) {
				
		grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var callback = new CodeReuse.Callback();
		
		grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, "gridtablehome", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, '', '', callback.gridCallback, this.rowOnClick);
		
	},
	
	refreshSelectTenantHomeGrid: function(phpFile, fieldsInfo, selectBuildingHtmlObjectValue) {		
		
		if(selectBuildingHtmlObjectValue != "")
		{
			grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			callback = new CodeReuse.Callback();			
					
			grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, "gridtablehome", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, '', '', callback.gridCallback, this.rowOnClick);
		}
		
		/*
		else
		{
			var helper = new CodeReuse.Helper();
			
			helper.gridHide(this.gridGetPostDivElement);
		}
		*/
		
	}
	
};