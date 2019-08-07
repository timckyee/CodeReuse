
function Tenant(inputValueArray,primaryKey) {
		
	var fieldPrimaryKey;
	var field1;
	var field2;
	var field3;
	var field4;
		
	fields = [
		{ name: "fieldPrimaryKey", dbType: "int", htmlObjectId: "inputPrimaryKey", htmlObjectType: "primaryKey" },
		{ name: "field1", dbType: "date", htmlObjectId: "inputCalendar", htmlObjectType: "calendar" },
		{ name: "field2", dbType: "date", htmlObjectId: "inputCalendarTesting", htmlObjectType: "calendar" },
		{ name: "field3", dbType: "int", htmlObjectId: "selectBuilding", htmlObjectType: "select" },
		{ name: "field4", dbType: "int", htmlObjectId: "tenant_input", htmlObjectType: "autocomplete" }
	];
		
	var sortTableHtmlObjectId = "tableTenant";
	
	var sortTableColumns = "field1=1,field2=2,field3=3,field4=4";
		
	phpFile = "grid_get_post.php";
	
	/*
	htmlObjectFieldsSelect = "inputPrimaryKey,inputCalendar,inputCalendarTesting,selectBuilding,tenant_input";
	databaseFieldsSelect = "fieldPrimaryKey,field1,field2,field3,field4";
	
	htmlObjectFieldsUpdate = "inputPrimaryKey,inputCalendar,inputCalendarTesting,selectBuilding,tenant_input";
	databaseFieldsUpdate = "fieldPrimaryKey,field1,field2,field3,field4";
	
	htmlObjectFieldsInsert = "inputCalendar,inputCalendarTesting,selectBuilding,tenant_input";
	databaseFieldsInsert = "field1,field2,field3,field4";
	*/
		
	this.getFieldsInfo = function() {
		
		return fields;
	};
	
	this.getSortFields = function() {
		
		return sortTableColumns;
		
	};
	
	this.setFieldValuesFromInputs = function(inputValueArray, primaryKey) {
		
		fieldPrimaryKey = primaryKey;
		
		field1 = inputValueArray["inputCalendar"];
		field2 = inputValueArray["inputCalendarTesting"];
		field3 = inputValueArray["selectBuilding"];
		field4 = inputValueArray["tenant_input"];
		
	};
	
	this.fieldsValuesUpate = function() {
		
		var fieldsValuesUpdateArray = [];
		
		fieldsValuesUpdateArray[0] = fieldPrimaryKey;
		fieldsValuesUpdateArray[1] = field1;
		fieldsValuesUpdateArray[2] = field2;
		fieldsValuesUpdateArray[3] = field3;
		fieldsValuesUpdateArray[4] = field4;
		
		return fieldsValuesUpdateArray;
		
	}
	
	this.fieldsValuesInsert = function() {
		
		var fieldsValuesInsertArray = [];
		
		fieldsValuesInsertArray[1] = field1;
		fieldsValuesInsertArray[2] = field2;
		fieldsValuesInsertArray[3] = field3;
		fieldsValuesInsertArray[4] = field4;
		
		return fieldsValuesInsertArray;
		
	}	
	
	/*
	this.createCommaListOfInputValuesUpdate = function() {
	
		return fieldPrimaryKey + "," + field1 + "," + field2 + "," + field3 + "," + field4;
			
	};	
	
	this.createCommaListOfInputValuesInsert = function() {
	
		return field1 + "," + field2 + "," + field3 + "," + field4;
			
	};
	*/
	
	this.loadGridGetPost = function() {
		
		var tenantGrid = new TenantGrid();
		var tenantGridColumnsInfo = tenantGrid.getGridColumnsInfo();
			
		var tenantGridRowOnClick = tenantGrid.rowOnClick;
		
		if(document.getElementById("selectBuilding").value != "")
		{
			grid("gridGetPost", phpFile, "gridtable", "fieldPrimaryKey", this.getFieldsInfo(), tenantGridColumnsInfo, sortTableHtmlObjectId, this.getSortFields(), "building", document.getElementById("selectBuilding").value, gridCallback, tenantGridRowOnClick);
		}
		else
		{
			gridHide("gridGetPost");
		}
		
	};
		
	this.tenantUpdate = function() {
			
		var htmlObjectFieldsValuesUpdate = this.fieldsValuesUpate();
				
		if(validateHtmlObjectFields(fields))
		{							
			post_updateForm(phpFile, "updateTableGridGetPost", document.getElementById("inputPrimaryKey").value, htmlObjectFieldsValuesUpdate, this.getFieldsInfo(), arrayOldValuesTable);
		}
		
	};
	
	this.tenantInsert = function() {
	
		var htmlObjectFieldsValuesInsert = this.fieldsValuesInsert();
				
		if(validateHtmlObjectFields(fields))
		{
			post_insertRecordForm(phpFile, "createRecordTableGridGetPost", htmlObjectFieldsValuesInsert, this.getFieldsInfo(), "inputPrimaryKey");
		}	
	
	};
}