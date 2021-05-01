/**
 * Class for TenantGrid object
 * @class
 **/
CodeReuse.TenantGrid = function() {
	
	this.gridName = "TenantGrid";
	this.gridGetPostDivElement = "gridGetPost";
	this.tableHtmlObjectId = "tableTenant";
		
	this.columns = [
		
		{ colName: "Primary Key", id: "tenantId", colType: "int" },
		{ colName: "Building", id: "buildingName", colType: "string" },
		{ colName: "Suite Number", id: "suiteNumber", colType: "string" },
		{ colName: "First Name", id: "firstname", colType: "string" },
		{ colName: "Last Name", id: "lastname", colType: "string" }
	];
	
	var handler = new CodeReuse.Handler();
	
	this.gridIdField = "tenantId";

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

	/**
	 * Getting the selected row id for the row that is highlighted
	 * @function
	 * @name TenantGrid#getTenantSelectedRowId
	 **/
	getTenantSelectedRowId: function() {

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
	 * Refreshes the tenant grid
	 * @function
	 * @name TenantGrid#refreshTenantGrid
	 * 
	 * @param {string} phpFile php file name and location
	 * @param {string} highlightId row id of the row this is highlighted
	 **/
	refreshTenantGrid: function(phpFile, highlightId) {

		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var callback = new CodeReuse.Callback();
		
		if(document.getElementById("selectBuildingTenant").selectedIndex != 0)
		{
			var sortColumn = sessionStorage.getItem("arraySortColumn_tenant");

			var sortDirection = sessionStorage.getItem("arraySortDirection_tenant");

			grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshTenantGridQueryName(), this.getGridIdField(), this.getGridColumnsInfo(), this.tableHtmlObjectId, "buildingId", document.getElementById("selectBuildingTenant").value, callback.gridCallback, this.rowOnClick, "noEdit", sortColumn, sortDirection, '', highlightId, "false", '', '', "false", '', '', '');
		}
	},
	
	/**
	 * Refreshes the tenant grid when building select field is updated
	 * @function
	 * @name TenantGrid#refreshSelectTenantGrid
	 * 
	 * @param {string} phpFile php file name and location
	 * @param {string} selectBuildingHtmlObjectValue the selected building value on the form
	 **/
	refreshSelectTenantGrid: function(phpFile, selectBuildingHtmlObjectValue) {
		
		if(selectBuildingHtmlObjectValue != "")
		{
			grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			callback = new CodeReuse.Callback();

			if(document.getElementById("selectBuildingTenant").selectedIndex != 0)
			{					
				sessionStorage.setItem("arraySortColumn_tenant", "tenantId");

				sessionStorage.setItem("arraySortDirection_tenant", "asc");
	
				var sortColumn = sessionStorage.getItem("arraySortColumn_tenant");

				var sortDirection = sessionStorage.getItem("arraySortDirection_tenant");

				grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshSelectTenantGridQueryName(), this.getGridIdField(), this.getGridColumnsInfo(), this.tableHtmlObjectId, "buildingId", document.getElementById("selectBuildingTenant").value, callback.gridCallback, this.rowOnClick, "noEdit", sortColumn, sortDirection, '', '', "false", '', '', "false", '', '', '');
						
			}
		}		
	}
	
};