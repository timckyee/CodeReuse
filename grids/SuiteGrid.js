/**
 * Class for SuiteGrid object
 * @class
 */
CodeReuse.SuiteGrid = function() {
	
	this.gridName = "SuiteGrid";
	this.gridGetPostDivElement = "gridGetPostSuite";
	this.tableHtmlObjectId = "tableSuite";
		
	this.columns = [
		
		{ colName: "Primary Key", id: "suiteId", colType: "int" },
		{ colName: "Suite Number", id: "suiteNumber", colType: "string" },
		{ colName: "Building", id: "buildingName", colType: "string" },
		{ colName: "Location", id: "location", colType: "string" }

	];
	
	var handler = new CodeReuse.Handler();

	this.gridIdField = "suiteId";
	
	this.rowOnClick =  handler.SuiteGridOnClickHandler;

	this.refreshSuiteGridQueryName = "suites";

	this.refreshSelectSuiteGridQueryName = "suites";	

};

CodeReuse.SuiteGrid.prototype = {
	
	getGridName: function() {
		
		return this.gridName;
		
	},
	
	getRefreshSuiteGridQueryName: function () {

		return this.refreshSuiteGridQueryName;

	},

	getRefreshSelectSuiteGridQueryName: function () {

		return this.refreshSelectSuiteGridQueryName;

	},

	getTableHtmlObjectId: function() {
		
		return this.tableHtmlObjectId;
	},

	getGridIdField: function() {

		return this.gridIdField;
	},

	getGridColumnsInfo: function() {
		
		return this.columns;
	},
	
	/**
	 * Getting the selected row id for the row that is highlighted
	 * @function
	 * @name SuiteGrid#getSuiteSelectedRowId
	 */
	getSuiteSelectedRowId: function() {

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
	 * Refreshes the suite grid
	 * @function
	 * @name SuiteGrid#refreshSuiteGrid
	 * 
	 * @param {string} phpFile php file name and location
	 * @param {Array} fieldsInfo form object array of fields
	 * @param {string} highlightId row id of the row this is highlighted
	 */
	refreshSuiteGrid: function(phpFile, fieldsInfo, highlightId) {
		
		grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var callback = new CodeReuse.Callback();
				
		if(document.getElementById("selectBuildingSuite").selectedIndex != 0)
		{
			var sortColumn = localStorage.getItem("arraySortColumn_suite");

			var sortDirection = localStorage.getItem("arraySortDirection_suite");

			grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshSuiteGridQueryName(), this.getGridIdField(), this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingSuite").value, callback.gridCallback, this.rowOnClick, "noEdit", sortColumn, sortDirection, '', highlightId, "false", '', '', "false", '', '', '');
		}
	},
	
	/**
	 * Refreshes the suite grid when building select field is updated
	 * @function
	 * @name SuiteGrid#refreshSelectSuiteGrid
	 * 
	 * @param {string} phpFile php file name and location
	 * @param {Array} fieldsInfo form object array of fields
	 * @param {string} selectBuildingHtmlObjectValue the selected building value on the form
	 */
	refreshSelectSuiteGrid: function(phpFile, fieldsInfo, selectBuildingHtmlObjectValue) {

		if(selectBuildingHtmlObjectValue != "")
		{
			grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			callback = new CodeReuse.Callback();
			
			if(document.getElementById("selectBuildingSuite").selectedIndex != 0)
			{
				localStorage.setItem("arraySortColumn_suite", "suiteId");

				localStorage.setItem("arraySortDirection_suite", "asc");
	
				var sortColumn = localStorage.getItem("arraySortColumn_suite");
	
				var sortDirection = localStorage.getItem("arraySortDirection_suite");

				grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshSelectSuiteGridQueryName(), this.getGridIdField(), this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingSuite").value, callback.gridCallback, this.rowOnClick, "noEdit", sortColumn, sortDirection, '', '', "false" ,'' ,'', "false", '', '', '');
			}
		}
	}
	
};