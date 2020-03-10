
CodeReuse.Controller = function () {
		
};

CodeReuse.Controller.prototype = {
	
	suiteSave: function() {
		
		var saveType;
		
		var inputPrimaryKey = document.getElementById("inputPrimaryKeySuite").value;
		
		var inputSuiteNumber = document.getElementById("inputSuiteNumber").value;
		var inputBuildingId = document.getElementById("inputBuildingId").value;
		
		var inputLocation = document.getElementById("inputLocation").value;
		
		var SuiteValues = new Array();
		
		SuiteValues["inputSuiteNumber"] = inputSuiteNumber;
		SuiteValues["inputBuildingId"] = inputBuildingId;
		SuiteValues["inputLocation"] = inputLocation;
		
		if(inputPrimaryKey != "")
		{
			saveType = "update";
		}
		else
		{
			saveType = "insert";
		}
		
		var suiteModel = new CodeReuse.Suite();
		
		if(saveType == "update")
		{
			suiteModel.setFieldValuesFromInputs(SuiteValues, inputPrimaryKey);
			suiteModel.suiteUpdate();
		}
		else
		if(saveType == "insert")
		{
			suiteModel.setFieldValuesFromInputs(SuiteValues, "");
			suiteModel.suiteInsert();
		}
		
	},	
	
	tenantSave: function() {
		
		var saveType;
		
		var inputPrimaryKey = document.getElementById("inputPrimaryKey").value;
		
		var inputCalendar = document.getElementById("inputCalendar").value;
		var inputCalendarTesting = document.getElementById("inputCalendarTesting").value;
		var selectBuilding = document.getElementById("selectBuildingTenant").value;
		
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
		
		var tenantModel = new CodeReuse.Tenant();	
				
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
		
	},
	
	resetBuildingSelectField: function(selectFieldHtmlObjectId, gridGetPostDivElement) {
		
		//var selectFieldHtmlObjectId = "selectBuilding";
		//var gridGetPostDivElement = "gridGetPost";
		
		//document.getElementById(selectFieldHtmlObjectId).selectedIndex = 0;
		
		//var helper = new CodeReuse.Helper();
		
		//helper.gridHide(gridGetPostDivElement);
		
	},
	
	resetSuiteFields: function() {
		
		var suiteModel = new CodeReuse.Suite();
		
		var fieldsInfo = suiteModel.getFieldsInfo();
		
		for(i=0; i<fieldsInfo.length; i++)
		{
			document.getElementById(fieldsInfo[i].htmlObjectId).value = "";
		}
		
	},	
	
	resetTenantFields: function() {
		
		var tenantModel = new CodeReuse.Tenant();
		
		var fieldsInfo = tenantModel.getFieldsInfo();
		
		for(i=0; i<fieldsInfo.length; i++)
		{
			document.getElementById(fieldsInfo[i].htmlObjectId).value = "";
		}
		
	},
	
	refreshSelectTenantGrid: function() {
		
		var tenantModel = new CodeReuse.Tenant();
		
		tenantModel.refreshSelectTenantGrid();
			
	},
	
	resetSuiteFields: function() {
		
		var suiteModel = new CodeReuse.Suite();
		
		var fieldsInfo = suiteModel.getFieldsInfo();
		
		for(i=0; i<fieldsInfo.length; i++)
		{
			document.getElementById(fieldsInfo[i].htmlObjectId).value = "";
		}
		
	},	
	
	refreshSelectSuiteGrid: function() {
		
		var suiteModel = new CodeReuse.Suite();
		
		suiteModel.refreshSelectSuiteGrid();
			
	}	
}