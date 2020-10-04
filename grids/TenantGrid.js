CodeReuse.TenantGrid = function() {
	
	this.gridName = "TenantGrid";
	this.gridGetPostDivElement = "gridGetPost";
	this.tableHtmlObjectId = "tableTenant";
		
	this.columns = [
		
		{ colName: "Primary Key", id: "fieldPrimaryKey", colType: "int" },
		{ colName: "Building", id: "buildingName", colType: "string" },
		{ colName: "Tenant Name", id: "tenantName", colType: "string" },
		{ colName: "Date First", id: "field1", colType: "date" },
		{ colName: "Date Second", id: "field2", colType: "date" }
	];
	
	var handler = new CodeReuse.Handler();
	
	this.gridIdField = "fieldPrimaryKey";

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

	getGridIdField: function() {

		return this.gridIdField;
	},

	getRefreshTenantGridQueryName: function() {

		return this.refreshTenantGridQueryName;

	},

	getRefreshSelectTenantGridQueryName: function() {

		return this.refreshSelectTenantGridQueryName;

	},
	
	getTableHtmlObjectId: function() {
		
		return this.tableHtmlObjectId;
	},

	getTenantSelectedRowId: function() {

		var table = document.getElementById(this.tableHtmlObjectId);

		if(table == null)
		{
			return;
		}

		var row;

		for(var i=1; i<table.rows.length; i++)
		{
			row = table.rows[i];
			
			if(row.className == "tableHover highlightRow")
			{
				break;
			}
		}

		var primaryKey = row.cells[0].innerText;

		return primaryKey;

	},

	refreshTenantGrid: function(phpFile, fieldsInfo, highlightId) {

		grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var callback = new CodeReuse.Callback();
		
		if(document.getElementById("selectBuildingTenant").selectedIndex != 0)
		{			
			var sortColumn = localStorage.getItem("arraySortColumn_tenant");

			var sortDirection = localStorage.getItem("arraySortDirection_tenant");

			grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshTenantGridQueryName(), this.getGridIdField(), fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingTenant").value, callback.gridCallback, this.rowOnClick, "noEdit", sortColumn, sortDirection, '', highlightId);
		}
	},
	
	refreshSelectTenantGrid: function(phpFile, fieldsInfo, selectBuildingHtmlObjectValue) {
		
		if(selectBuildingHtmlObjectValue != "")
		{
			grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			callback = new CodeReuse.Callback();

			if(document.getElementById("selectBuildingTenant").selectedIndex != 0)
			{	
				var sortColumn = localStorage.getItem("arraySortColumn_tenant");

				var sortDirection = localStorage.getItem("arraySortDirection_tenant");
				
				grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshSelectTenantGridQueryName(), this.getGridIdField(), fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingTenant").value, callback.gridCallback, this.rowOnClick, "noEdit", sortColumn, sortDirection, '', this.getTenantSelectedRowId());
						
			}
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