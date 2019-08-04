var controller;

window.addEventListener("load", function() {
		
	init();
	
});

function init() {
	
	controller = new Controller();
	
	controller.loadGridGetPost();
	
}

function Controller() {
	
	this.tenantSave = function() {
				
		var saveType;
		
		var inputPrimaryKey = document.getElementById("inputPrimaryKey").value;
		
		var inputCalendar = document.getElementById("inputCalendar").value;
		var inputCalendarTesting = document.getElementById("inputCalendarTesting").value;
		var selectBuilding = document.getElementById("selectBuilding").value;
		
		//var building_input = document.getElementById("building_input").value;
		//var tenant_input = document.getElementById("tenant_input").value;
		
		//var building_input = document.getElementById("building_input").getAttribute("rowAttributeValue");
		var tenant_input = document.getElementById("tenant_input").getAttribute("rowAttributeValue");
		//svar tenant_input_value = document.getElementById("tenant_input").value;
		//alert(tenant_input);
		//alert(tenant_input_value);
		//return;
		
		var TenantValues = new Array();
		
		TenantValues["inputCalendar"] = inputCalendar;
		TenantValues["inputCalendarTesting"] = inputCalendarTesting;
		TenantValues["selectBuilding"] = selectBuilding;
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
				
		this.refreshGridGetPost();
	};
		
	this.loadGridGetPost = function() {
		
		var tenantModel = new Tenant();
		tenantModel.loadGridGetPost();
			
	};
		
	this.refreshGridGetPost = function() {
		
		var tenantModel = new Tenant();
		tenantModel.loadGridGetPost();
			
	};

}