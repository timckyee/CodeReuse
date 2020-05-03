CodeReuse.TenantGrid = function() {
	
	this.gridName = "TenantGrid";
	this.gridGetPostDivElement = "gridGetPost";
	this.tableHtmlObjectId = "tableTenant";
		
	this.columns = [
		
		{ colName: "Primary Key", id: "fieldPrimaryKey", colType: "int" },
		{ colName: "Building Name", id: "buildingName", colType: "string" },
		{ colName: "Tenant Name", id: "tenantName", colType: "string" },
		{ colName: "field1", id: "field1", colType: "date" },
		{ colName: "field2", id: "field2", colType: "date" }
	];
	
	var handler = new CodeReuse.Handler();
	
	this.rowOnClick =  handler.TenantGridOnClickHandler;

	this.refreshTenantGridQueryName = "gridtable";

	this.refreshSelectTenantGridQueryName = "gridtable";
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

	getRefreshTenantGridQueryName: function() {

		return this.refreshTenantGridQueryName;

	},

	getRefreshSelectTenantGridQueryName: function() {

		return this.refreshSelectTenantGridQueryName;

	},
	
	refreshTenantGrid: function(phpFile, fieldsInfo) {
				
		grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var callback = new CodeReuse.Callback();
		
		localStorage.setItem("arraySortDirection", "asc");
		
		if(document.getElementById("selectBuildingTenant").selectedIndex != 0)
			grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshTenantGridQueryName(), "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingTenant").value, callback.gridCallback, this.rowOnClick, "noEdit", null, "fieldPrimaryKey", localStorage.getItem("arraySortDirection"));
		
	},
	
	refreshSelectTenantGrid: function(phpFile, fieldsInfo, selectBuildingHtmlObjectValue) {		
		
		if(selectBuildingHtmlObjectValue != "")
		{
			grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			callback = new CodeReuse.Callback();
			
			if(document.getElementById("selectBuildingTenant").selectedIndex != 0)
				grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshSelectTenantGridQueryName(), "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingTenant").value, callback.gridCallback, this.rowOnClick, "noEdit", null, "fieldPrimaryKey", "asc");
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