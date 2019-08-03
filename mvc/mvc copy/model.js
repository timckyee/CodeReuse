arrayOldValuesTable = [];

function Tenant(inputValueArray,primaryKey) {
	
	var fieldPrimaryKey;
	var field1;
	var field2;
	var field3;
	var field4;
	
	var	phpFile = "grid_get_post.php";
	
	htmlObjectFieldsSelect = "inputPrimaryKey,input1,input2,input3,input4";
	databaseFieldsSelect = "fieldPrimaryKey,field1,field2,field3,field4";	
	
	htmlObjectFieldsUpdate = "inputPrimaryKey,input1,input2,input3,input4";
	databaseFieldsUpdate = "fieldPrimaryKey,field1,field2,field3,field4";
	
	htmlObjectFieldsInsert = "input1,input2,input3,input4";
	databaseFieldsInsert = "field1,field2,field3,field4";
	
	this.setFieldValuesFromInputs = function(inputValueArray, primaryKey) {
		
		fieldPrimaryKey = primaryKey;
		
		field1 = inputValueArray["input1"];
		field2 = inputValueArray["input2"];
		field3= inputValueArray["input3"];
		field4 = inputValueArray["input4"];
		
	};
	
	this.createCommaListOfInputValuesUpdate = function() {
	
		return fieldPrimaryKey + "," + field1 + "," + field2 + "," + field3 + "," + field4;
			
	};	
	
	this.createCommaListOfInputValuesInsert = function() {
	
		return field1 + "," + field2 + "," + field3 + "," + field4;
			
	};
	
	this.loadGridGetPost = function() {
		
		grid("gridGetPost", phpFile, "gridtable", "fieldPrimaryKey", databaseFieldsSelect);
		
	};
		
	this.tenantUpdate = function() {
		
		var htmlObjectFieldsValuesUpdate = 	this.createCommaListOfInputValuesUpdate();
		
		if(validateHtmlObjectFields(htmlObjectFieldsUpdate))
		{							
			post_updateForm(phpFile, "updateTableGridGetPost", document.getElementById("inputPrimaryKey").value, htmlObjectFieldsUpdate, htmlObjectFieldsValuesUpdate, databaseFieldsUpdate, arrayOldValuesTable);
		}
		
	};
	
	this.tenantInsert = function() {
	
		var htmlObjectFieldsValuesInsert = 	this.createCommaListOfInputValuesInsert();
		
		if(validateHtmlObjectFields(htmlObjectFieldsInsert))
		{
			post_insertRecordForm(phpFile, "createRecordTableGridGetPost", htmlObjectFieldsInsert, htmlObjectFieldsValuesInsert, databaseFieldsInsert, "inputPrimaryKey");
		}	
	
	};
}