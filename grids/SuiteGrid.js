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

	getGridIdField: function() {

		return this.gridIdField;
	},

	getGridColumnsInfo: function() {
		
		return this.columns;
	},
	
	refreshSuiteGrid: function(phpFile, fieldsInfo) {
						
		grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var callback = new CodeReuse.Callback();
				
		if(document.getElementById("selectBuildingSuite").selectedIndex != 0)			
			grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshSuiteGridQueryName(), this.getGridIdField(), fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingSuite").value, callback.gridCallback, this.rowOnClick, "noEdit", '' ,'', '', '');
	},
	
	refreshSelectSuiteGrid: function(phpFile, fieldsInfo, selectBuildingHtmlObjectValue) {
		
		if(selectBuildingHtmlObjectValue != "")
		{
			grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			callback = new CodeReuse.Callback();
			
			if(document.getElementById("selectBuildingSuite").selectedIndex != 0)	
				grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, this.getRefreshSelectSuiteGridQueryName(), this.getGridIdField(), fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingSuite").value, callback.gridCallback, this.rowOnClick, "noEdit", '', '', '', '');
				
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