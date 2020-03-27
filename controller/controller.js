
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
		//var selectBuilding = document.getElementById("selectBuildingTenant").value;
		
		//var building_input = document.getElementById("building_input").getAttribute("rowAttributeValue");
		var building_option = document.getElementById("building_option").value;
		var tenant_input = document.getElementById("tenant_input").getAttribute("rowAttributeValue");
		
		var TenantValues = new Array();
		
		TenantValues["inputCalendar"] = inputCalendar;
		TenantValues["inputCalendarTesting"] = inputCalendarTesting;
		TenantValues["building_option"] = building_option;
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
	
	homeTenantGridSave: function() {
				
		var saveType;
		
		var inputPrimaryKey_grid = document.getElementById("inputPrimaryKey_grid").innerHTML;
		
		var inputCalendar_grid = document.getElementById("inputCalendar_grid").value;
		
		var inputCalendarTesting_grid = document.getElementById("inputCalendarTesting_grid").value;
		
		//var building_input_grid = document.getElementById("building_input_grid").getAttribute("rowAttributeValue");
		
		var building_option_grid = document.getElementById("building_option_grid").selectedIndex;
		var tenant_input_grid = document.getElementById("tenant_input_grid").getAttribute("rowAttributeValue");
				
		var HomeTenantGridValues = new Array();
		
		HomeTenantGridValues["inputCalendar_grid"] = inputCalendar_grid;
		HomeTenantGridValues["inputCalendarTesting_grid"] = inputCalendarTesting_grid;
		HomeTenantGridValues["building_option_grid"] = building_option_grid;
		HomeTenantGridValues["tenant_input_grid"] = tenant_input_grid;
		
		var homeTenantGrid = new CodeReuse.HomeTenantGrid();	
		
		if(inputPrimaryKey != "")
		{
			saveType = "update";
		}
		else
		{
			saveType = "insert";
		}
					
		if(saveType == "update")
		{			
					
			homeTenantGrid.setFieldValuesFromInputs(HomeTenantGridValues, inputPrimaryKey_grid);
			homeTenantGrid.homeTenantGridUpdate();
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