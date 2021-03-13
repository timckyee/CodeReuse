/**
 * The app controller to save suite form, tenant form, home tenant grid, home tenant grid paging form, reset form fields when click on new, and refresh form data when change building selection
 * @class
 **/
CodeReuse.Controller = function () {
		
};

CodeReuse.Controller.prototype = {
	
	/**
	 * Save the suite form values
	 * @function
	 * @name Controller#suiteSave
	 **/
	suiteSave: function() {
		
		var saveType;
		
		var inputPrimaryKey = document.getElementById("inputPrimaryKeySuite").value;
	
		var inputBuildingId = document.getElementById("inputBuildingId").value;		
		var inputSuiteNumber = document.getElementById("inputSuiteNumber").value;
		
		var inputLocation = document.getElementById("inputLocation").value;
		
		var SuiteValues = new Array();
		
		SuiteValues["inputBuildingId"] = inputBuildingId;		
		SuiteValues["inputSuiteNumber"] = inputSuiteNumber;
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
	
	/**
	 * Save the tenant form values
	 * @function
	 * @name Controller#tenantSave
	 **/
	tenantSave: function() {

		var saveType;
		
		var inputPrimaryKey = document.getElementById("inputPrimaryKey").value;
		
		var tenantSelectSuiteList = document.getElementById("tenantSelectSuiteList").value;

		var tenantFirstName = document.getElementById("tenantFirstName").value;
		var tenantLastName = document.getElementById("tenantLastName").value;
		
		var TenantValues = new Array();
		
		TenantValues["tenantSelectSuiteList"] = tenantSelectSuiteList;		
		TenantValues["tenantFirstName"] = tenantFirstName;
		TenantValues["tenantLastName"] = tenantLastName;
		
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
	
	/**
	 * Save the home tenant grid values
	 * @function
	 * @name Controller#homeTenantGridSave
	 **/	
	homeTenantGridSave: function() {
		
		var saveType;
		
		var inputPrimaryKey_grid = document.getElementById("inputPrimaryKey_grid").innerHTML;
		
		var building_option_grid = document.getElementById("building_option_grid").selectedIndex;
		var tenant_input_grid = document.getElementById("tenant_input_grid").getAttribute("rowAttributeValue");	

		var inputCalendar_grid = document.getElementById("inputCalendar_grid").value;
		var inputCalendarTesting_grid = document.getElementById("inputCalendarTesting_grid").value;
				
		var HomeTenantGridValues = new Array();
		
		HomeTenantGridValues["building_option_grid"] = building_option_grid;
		HomeTenantGridValues["tenant_input_grid"] = tenant_input_grid;		

		HomeTenantGridValues["inputCalendar_grid"] = inputCalendar_grid;
		HomeTenantGridValues["inputCalendarTesting_grid"] = inputCalendarTesting_grid;
		
		var homeTenantGrid = new CodeReuse.HomeTenantGrid();
		
		var tablePrimaryKey = document.getElementById("inputPrimaryKey_grid").innerText;
			
		var tableHomeTenant = document.getElementById("tableHomeTenant");
		
		var tableHomeTenantRows = tableHomeTenant.rows;
		
		var tableRowNumber = 0;	
		
		for(var i=1; i<tableHomeTenantRows.length; i++)
		{
			var tableHomeTenantRowsCellValue = tableHomeTenantRows[i].cells[1].innerText;
			
			if(tableHomeTenantRowsCellValue == tablePrimaryKey)
			{					
				tableRowNumber = i
				break;
			}
		}
		
		homeTenantGrid.setFieldValuesFromInputs(HomeTenantGridValues, inputPrimaryKey_grid);
		homeTenantGrid.homeTenantGridUpdate();	
	},
	
	/**
	 * Save the tenant form grid paging values
	 * @function
	 * @name Controller#tenantFormGridPagingSave
	 **/
	tenantFormGridPagingSave: function() {

		var saveType;
		
		var inputPrimaryKey = document.getElementById("inputPrimaryKeyFormGridPaging").value;
		
		var building_option = document.getElementById("building_option_form_grid_paging").value;
		var tenant_input = document.getElementById("tenant_input_form_grid_paging").getAttribute("rowAttributeValue");

		var inputCalendar = document.getElementById("inputCalendarFormGridPaging").value;
		var inputCalendarTesting = document.getElementById("inputCalendarTestingFormGridPaging").value;
		
		var TenantFormGridValues = new Array();
		
		TenantFormGridValues["building_option_form_grid_paging"] = building_option;
		TenantFormGridValues["tenant_input_form_grid_paging"] = tenant_input;		
		TenantFormGridValues["inputCalendarFormGridPaging"] = inputCalendar;
		TenantFormGridValues["inputCalendarTestingFormGridPaging"] = inputCalendarTesting;
		
		if(inputPrimaryKey != "")
		{
			saveType = "update";
		}
		else
		{
			saveType = "insert";
		}
		
		var tenantFormGridPaging = new CodeReuse.TenantFormGridPaging();	
				
		if(saveType == "update") 
		{
			// only update record if exists
			tenantFormGridPaging.recordExists(TenantFormGridValues, inputPrimaryKey);
		}
		else if(saveType == "insert") 
		{
			// if save type not update then insert
			tenantFormGridPaging.setFieldValuesFromInputs(TenantFormGridValues, "");
			tenantFormGridPaging.tenantFormGridInsert();			
		}		
	},

	/**
	 * Load the suite selection list based on the building id, refreshes select tenant grid, and resets Tenant fields.
	 * @function
	 * @name Controller#loadSuiteSelections
	 * 
	 * @param {string} buildingId filter selection list by building id
	 **/
	loadSuiteSelections: function(obj) 
	{
		window.getXmlHttpRequest.onreadystatechange = function() {
		
			if (this.readyState == 4 && this.status == 200) {

				var response = JSON.parse(this.responseText); 
	
				var select = "";
	
				select += "<select id=\"tenantSelectSuiteList\">";
	
				select += "<option value=\"\"></option>";
	
				for (item in response) {
					select += "<option value=\"" + response[item].suiteId + "\">" + response[item].suiteNumber + "</option>";
				}
				select += "</select>"

				document.getElementById("selectSuites").innerHTML = select;


				controller.refreshSelectTenantGrid();
				controller.resetTenantFields();
			}
		}

		var tenant_building_option = obj.value;

		var queryString;
	
		queryString = "queryName" + "=" + "selectSuites" + "&" + "buildingId=" + tenant_building_option;
		
		window.getXmlHttpRequest.open("GET", "php/grid_get_post.php" + "?" + queryString, true);
		window.getXmlHttpRequest.send();
	},

	/**
	 * Set the tenant form grid paging values to empty when clicking on new
	 * @function
	 * @name Controller#resetTenantFormGridPagingFields
	 **/
	resetTenantFormGridPagingFields: function() {
		
		var tenantFormGridPaging = new CodeReuse.TenantFormGridPaging();
		
		var fieldsInfo = tenantFormGridPaging.getFieldsInfo();
		
		for(i=0; i<fieldsInfo.length; i++)
		{
			document.getElementById(fieldsInfo[i].htmlObjectId).value = "";
		}
		
	},

	/**
	 * Set the tenant form values to empty when clicking on new
	 * @function
	 * @name Controller#resetTenantFields
	 **/
	resetTenantFields: function() {

		var tenantModel = new CodeReuse.Tenant();
		
		var fieldsInfo = tenantModel.getFieldsInfo();

		for(i=0; i<fieldsInfo.length; i++)
		{
			if(fieldsInfo[i].htmlObjectType == "select")
			{
				document.getElementById(fieldsInfo[i].htmlObjectId).selectedIndex = 0;
			}
			else
			{
				document.getElementById(fieldsInfo[i].htmlObjectId).value = "";
			}
		}
		
	},
	
	/**
	 * Refresh tenant grid when changing the building select on tenant form
	 * @function
	 * @name Controller#refreshSelectTenantGrid
	 **/	
	refreshSelectTenantGrid: function() {
		
		var tenantModel = new CodeReuse.Tenant();
		
		tenantModel.refreshSelectTenantGrid();
			
	},
	
	/**
	 * Set the suite form values to empty when clicking on new
	 * @function
	 * @name Controller#resetSuiteFields
	 **/	
	resetSuiteFields: function() {
		
		var suiteModel = new CodeReuse.Suite();
		
		var fieldsInfo = suiteModel.getFieldsInfo();
		
		for(i=0; i<fieldsInfo.length; i++)
		{
			document.getElementById(fieldsInfo[i].htmlObjectId).value = "";
		}
		
	},	
	
	/**
	 * Refresh suite grid when changing the building select on tenant form
	 * @function
	 * @name Controller#refreshSelectSuiteGrid
	 **/		
	refreshSelectSuiteGrid: function() {
		
		var suiteModel = new CodeReuse.Suite();
		
		suiteModel.refreshSelectSuiteGrid();
			
	}	
}