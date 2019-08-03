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
		
		var input1 = document.getElementById("input1").value;
		var input2 = document.getElementById("input2").value;
		var input3 = document.getElementById("input3").value;
		var input4 = document.getElementById("input4").value;
		
		var TenantValues = new Array();
		
		TenantValues["input1"] = input1;
		TenantValues["input2"] = input2;
		TenantValues["input3"] = input3;
		TenantValues["input4"] = input4;		
		
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