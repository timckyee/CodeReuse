CodeReuse.TenantGrid = function() {
	
	this.gridName = "TenantGrid";
	this.gridGetPostDivElement = "gridGetPost";
	this.tableHtmlObjectId = "tableTenant";
		
	this.columns = [
		
		{ colName: "Primary Key", id: "fieldPrimaryKey", colType: "int", dbField: "fieldPrimaryKey" },
		{ colName: "field1", id: "field1", colType: "date", dbField: "field1" },
		{ colName: "field2", id: "field2", colType: "date", dbField: "field2" },
		{ colName: "Building Name", id: "buildingName", colType: "string", dbField: "field3" },
		{ colName: "Tenant Name", id: "tenantName", colType: "string", dbField:"field4" }
	];
	
	var handler = new CodeReuse.Handler();
	
	this.rowOnClick =  handler.TenantGridOnClickHandler;

};

CodeReuse.TenantGrid.prototype = {
	
	getGridName: function() {
		
		return this.gridName;
		
	},
	
	getGridGetPostDivElement: function() {
	
		return this.gridGetPostDivElement;
		
	},
	
	getGridColumnsInfo: function() {
		
		return this.columns;
	},
		
	refreshTenantGrid: function(phpFile, fieldsInfo) {
		
		grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var callback = new CodeReuse.Callback();
		
		//localStorage.setItem("arraySortDirection", "desc");
		
		if(document.getElementById("selectBuildingTenant").selectedIndex != 0)
			grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, "gridtable", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingTenant").value, callback.gridCallback, this.rowOnClick, "noEdit", "fieldPrimaryKey", localStorage.getItem("arraySortDirection"));
		
	},
	
	refreshSelectTenantGrid: function(phpFile, fieldsInfo, selectBuildingHtmlObjectValue) {		
		
		if(selectBuildingHtmlObjectValue != "")
		{
			grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			callback = new CodeReuse.Callback();
			
			if(document.getElementById("selectBuildingTenant").selectedIndex != 0)
				grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, "gridtable", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingTenant").value, callback.gridCallback, this.rowOnClick, "noEdit", "fieldPrimaryKey", "asc");
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