
function TenantGrid()
{	
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
		
	this.loadTenantGrid = function(fieldsInfo) {
	
		if(document.getElementById("selectBuilding").value != "")
		{
			grid("gridGetPost", phpFile, "gridtable", "fieldPrimaryKey", fieldsInfo, this.getGridColumnsInfo(), tableHtmlObjectId, "building", document.getElementById("selectBuilding").value, gridCallback, this.rowOnClick);
		}
		else
		{
			gridHide("gridGetPost");
		}	
		
	};
	
	this.rowOnClick = TenantGridOnClick;
	
}