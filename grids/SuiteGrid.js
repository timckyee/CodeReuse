CodeReuse.SuiteGrid = function() {
	
	this.gridGetPostDivElement = "gridGetPostSuite";
	this.tableHtmlObjectId = "tableSuite";
		
	this.columns = [
		
		{ colName: "Primary Key", id: "suiteId", colType: "int" },
		{ colName: "Suite Number", id: "suiteNumber", colType: "string" },
		{ colName: "Building", id: "buildingId", colType: "int" },
		{ colName: "Location", id: "location", colType: "string" }

	];
	
	var handler = new CodeReuse.Handler();
	
	this.rowOnClick =  handler.SuiteGridOnClickHandler;

};

CodeReuse.SuiteGrid.prototype = {
	
	getGridColumnsInfo: function() {
		
		return this.columns;
	},
	
	refreshSuiteGrid: function(phpFile, fieldsInfo) {
						
		grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var callback = new CodeReuse.Callback();
				
		grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, "suites", "suiteId", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingSuite").value, callback.gridCallback, this.rowOnClick);
						
	},
	
	refreshSelectSuiteGrid: function(phpFile, fieldsInfo, selectBuildingHtmlObjectValue) {
		
		if(selectBuildingHtmlObjectValue != "")
		{
			grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			callback = new CodeReuse.Callback();			
					
			grid_get_post_functions.grid(this.gridGetPostDivElement, phpFile, "suites", "suiteId", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("selectBuildingSuite").value, callback.gridCallback, this.rowOnClick);
				
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