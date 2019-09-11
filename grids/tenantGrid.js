
function TenantGrid()
{	
	var gridGetPostDivElement = "gridGetPost";
	var tableHtmlObjectId = "tableTenant";
		
	columns = [
		
		{ colName: "Primary Key", id: "fieldPrimaryKey", colType: "int" },
		{ colName: "field1", id: "field1", colType: "date" },
		{ colName: "field2", id: "field2", colType: "date" },
		{ colName: "Building Name", id: "buildingName", colType: "string" },
		{ colName: "Tenant Name", id: "tenantName", colType: "string" }
	];
	
	this.getGridColumnsInfo = function() {
		
		return columns;
	};
		
	this.loadTenantGrid = function(phpFile, fieldsInfo) {
		
		if(document.getElementById("selectBuilding").value != "")
		{	
			grid(gridGetPostDivElement, phpFile, "gridtable", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), tableHtmlObjectId, "building", document.getElementById("selectBuilding").value, gridCallback, this.rowOnClick);
		}
		else if(document.getElementById("building_input").getAttribute("rowAttributeValue") != "")
		{

			grid(gridGetPostDivElement, phpFile, "gridtable", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), tableHtmlObjectId, "building", document.getElementById("building_input").getAttribute("rowAttributeValue"), gridCallback, this.rowOnClick);
			
		}
		else
		{
			gridHide(gridGetPostDivElement);
		}
		
	};
	
	this.rowOnClick = TenantGridOnClickHandler;
	
}