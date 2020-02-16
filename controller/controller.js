
function Controller() {
		
	this.tenantSave = function() {
		
		var saveType;
		
		var inputPrimaryKey = document.getElementById("inputPrimaryKey").value;
		
		var inputCalendar = document.getElementById("inputCalendar").value;
		var inputCalendarTesting = document.getElementById("inputCalendarTesting").value;
		var selectBuilding = document.getElementById("selectBuilding").value;
		
		var building_input = document.getElementById("building_input").getAttribute("rowAttributeValue");
		var tenant_input = document.getElementById("tenant_input").getAttribute("rowAttributeValue");
		
		var TenantValues = new Array();
		
		TenantValues["inputCalendar"] = inputCalendar;
		TenantValues["inputCalendarTesting"] = inputCalendarTesting;
		TenantValues["building_input"] = building_input;
		TenantValues["tenant_input"] = tenant_input;
		
		if(inputPrimaryKey != "")
		{
			saveType = "update";
		}
		else
		{
			saveType = "insert";
		}
		
		var tenantModel = new Tenant();
				
		if(saveType == "update")
		{
			tenantModel.setFieldValuesFromInputs(TenantValues, inputPrimaryKey);
			tenantModel.tenantUpdate();
		}
		else
		if(saveType == "insert")
		{
			tenantModel.setFieldValuesFromInputs(TenantValues, "");
			tenantModel.tenantInsert();
		}
		
	};
	
	this.resetBuildingSelectField = function() {
		
		var selectFieldHtmlObjectId = "selectBuilding";
		var gridGetPostDivElement = "gridGetPost";
		
		document.getElementById(selectFieldHtmlObjectId).selectedIndex = 0;
		gridHide(gridGetPostDivElement);
		
	};
	
	this.resetTenantFields = function() {
		
		var tenantModel = new Tenant();
		
		var fieldsInfo = tenantModel.getFieldsInfo();
		
		for(i=0; i<fieldsInfo.length; i++)
		{
			document.getElementById(fieldsInfo[i].htmlObjectId).value = "";
		}
		
	};
	
	this.refreshSelectTenantGrid = function() {
		
		var tenantModel = new Tenant();
		
		tenantModel.refreshSelectTenantGrid();
			
	};
}