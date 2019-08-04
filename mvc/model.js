arrayOldValuesTable = [];

function Tenant(inputValueArray,primaryKey) {
	
	var fieldPrimaryKey;
	var field1;
	var field2;
	var field3;
	var field4;
		
	fields = [
		{ name: "fieldPrimaryKey", dbType: "int", htmlObjectType: "primaryKey" },
		{ name: "field1", dbType: "date", htmlObjectType: "calendar" },
		{ name: "field2", dbType: "date", htmlObjectType: "calendar" },
		{ name: "field3", dbType: "int", htmlObjectType: "select" },
		{ name: "field4", dbType: "int", htmlObjectType: "autocomplete" }
	];		
		
	var sortTableHtmObjectId = "tableTenant";
	
	var sortTableColumns = "field1=1,field2=2,field3=3,field4=4";
		
	phpFile = "grid_get_post.php";
	
	htmlObjectFieldsSelect = "inputPrimaryKey,inputCalendar,inputCalendarTesting,selectBuilding,tenant_input";
	databaseFieldsSelect = "fieldPrimaryKey,field1,field2,field3,field4";
	
	htmlObjectFieldsUpdate = "inputPrimaryKey,inputCalendar,inputCalendarTesting,selectBuilding,tenant_input";
	databaseFieldsUpdate = "fieldPrimaryKey,field1,field2,field3,field4";
	
	htmlObjectFieldsInsert = "inputCalendar,inputCalendarTesting,selectBuilding,tenant_input";
	databaseFieldsInsert = "field1,field2,field3,field4";
		
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
	
	this.createCommaListOfInputValuesUpdate = function() {
	
		return fieldPrimaryKey + "," + field1 + "," + field2 + "," + field3 + "," + field4;
			
	};	
	
	this.createCommaListOfInputValuesInsert = function() {
	
		return field1 + "," + field2 + "," + field3 + "," + field4;
			
	};
	
	this.loadGridGetPost = function() {
		
		grid("gridGetPost", phpFile, "gridtable", "fieldPrimaryKey", databaseFieldsSelect, this.getFieldsInfo(), sortTableHtmObjectId, this.getSortFields());
		
	};
		
	this.tenantUpdate = function() {
		
		var htmlObjectFieldsValuesUpdate = this.createCommaListOfInputValuesUpdate();
				
		if(validateHtmlObjectFields(htmlObjectFieldsUpdate))
		{							
			post_updateForm(phpFile, "updateTableGridGetPost", document.getElementById("inputPrimaryKey").value, htmlObjectFieldsUpdate, htmlObjectFieldsValuesUpdate, databaseFieldsUpdate, this.getFieldsInfo(), arrayOldValuesTable);
		}
		
	};
	
	this.tenantInsert = function() {
	
		var htmlObjectFieldsValuesInsert = this.createCommaListOfInputValuesInsert();
		
		if(validateHtmlObjectFields(htmlObjectFieldsInsert))
		{
			post_insertRecordForm(phpFile, "createRecordTableGridGetPost", htmlObjectFieldsInsert, htmlObjectFieldsValuesInsert, databaseFieldsInsert, this.getFieldsInfo(), "inputPrimaryKey");
		}	
	
	};
}