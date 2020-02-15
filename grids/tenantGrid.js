
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
	
	this.rowOnClick =  TenantGridOnClickHandler;

};

TenantGrid.prototype = {
	
	getGridColumnsInfo: function() {
		
		return this.columns;
	},
		
	refreshTenantGrid: function(phpFile, fieldsInfo) {
		
		grid(this.gridGetPostDivElement, phpFile, "gridtable", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", document.getElementById("building_input").getAttribute("rowAttributeValue"), gridCallback, this.rowOnClick);
		
	},
	
	refreshSelectTenantGrid: function(phpFile, fieldsInfo, selectBuildingHtmlObjectValue) {
		
		if(selectBuildingHtmlObjectValue != "")
		{
			grid(this.gridGetPostDivElement, phpFile, "gridtable", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), this.tableHtmlObjectId, "building", selectBuildingHtmlObjectValue, gridCallback, this.rowOnClick);
		}
		else
		{
			gridHide(this.gridGetPostDivElement);
		}
		
	}
	
};