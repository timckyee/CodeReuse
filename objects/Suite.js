/**
 * Class for Suite form object
 * @class
 **/
CodeReuse.Suite = function() {
	
	this.suiteId;
	this.buildingId;
	this.suiteNumber;
	this.location;
	
	this.fields = [
		{ name: "suiteId", dbType: "int", htmlObjectId: "inputPrimaryKeySuite", htmlObjectType: "primaryKey"},
		{ name: "buildingId", dbType: "int", htmlObjectId: "inputBuildingId", htmlObjectType: "number", description: "Building" },
		{ name: "suiteNumber", dbType: "string", htmlObjectId: "inputSuiteNumber", htmlObjectType: "text", description: "Suite Number" },
		{ name: "location", dbType: "string", htmlObjectId: "inputLocation", htmlObjectType: "text", description: "Location" },
	];
		
	this.phpFileGridGetPost = "php/grid_get_post.php";
	
	this.suiteUpdateQueryName = "updateTableGridGetPostSuite";

	this.recordExist = "recordExistsSuiteForm";

	this.suiteNumberExistsQuery = "suiteNumberExists";	

	this.tableNameInDb = "tableGridGetPostSuite";

	this.suiteInsertQueryName = "createRecordTableGridGetPostSuite";
};

CodeReuse.Suite.prototype = {
			
	/**
	 * Array to store old values for inserting and updating records in Suite form object
	 * @var {Array} arrayOldValuesTable
	 **/	
	arrayOldValuesTable: [],
	
	/**
	 * Save the record id of the previous selection to unlock the record
	 * @var {Array} previousSelection
	 **/
	 previousSelection: [],

	getFieldsInfo: function() {
		
		return this.fields;
	},

	getTableNameInDb: function() {

		return this.tableNameInDb;

	},	

	getRecordExistsSuiteForm: function() {

		return this.recordExist;

	},
	
	getPhpFile: function() {
		
		return this.phpFileGridGetPost;	
		
	},

	getSuiteNumberExistsQuery: function() {

		return this.suiteNumberExistsQuery;

	},

	getSuiteUpdateQueryName: function() {

		return this.suiteUpdateQueryName;

	},

	getSuiteInsertQueryName: function() {

		return this.suiteInsertQueryName;

	},
	
	getPreviousSelection: function() {

		return this.previousSelection[0];

	},

	setPreviousSelection: function(newSelection) {

		this.previousSelection[0] = newSelection;

	},	

	/**
	 * Setting values in this object constructor from the html inputs for inserting or updating
	 * @function
	 * @name Suite#setFieldValuesFromInputs
	 * 
	 * @param {Array} inputValueArray array of html input values
	 * @param {string} primaryKey primary key of the record we are updating
	 **/
	setFieldValuesFromInputs: function(inputValueArray, primaryKey) {
		
		this.suiteId = primaryKey;

		this.buildingId = inputValueArray["inputBuildingId"];
		this.suiteNumber = inputValueArray["inputSuiteNumber"];

		this.location = inputValueArray["inputLocation"];
	},
	
	/**
	 * Returns an array with values that have been preset in this object for updating
	 * @function
	 * @name Suite#fieldsValuesUpdate
	 * 
	 * @returns {Array} array of the field values of this object
	 **/
	fieldsValuesUpdate: function() {
		
		var fieldsValuesUpdateArray = [];
		
		fieldsValuesUpdateArray[0] = this.suiteId;
		fieldsValuesUpdateArray[1] = this.buildingId;		
		fieldsValuesUpdateArray[2] = this.suiteNumber;
		fieldsValuesUpdateArray[3] = this.location;
		
		return fieldsValuesUpdateArray;
		
	},
	
	/**
	 * Returns an array with values that have been preset in this object for inserting
	 * @function
	 * @name Suite#fieldsValuesInsert
	 * 
	 * @returns {Array} array of the field values of this object
	 **/
	fieldsValuesInsert: function() {
		
		var fieldsValuesInsertArray = [];
		
		fieldsValuesInsertArray[1] = this.buildingId;		
		fieldsValuesInsertArray[2] = this.suiteNumber;
		fieldsValuesInsertArray[3] = this.location;
		
		return fieldsValuesInsertArray;
		
	},
	
	/**
	 * Refresh Suite form grid by calling the SuiteGrid object refreshSuiteGrid function
	 * @function
	 * @name Suite#refreshSuiteGrid
	 * 
	 * @param {string} highlightId the row primary key to highlight
	 **/
	refreshSuiteGrid: function(highlightId) {

		var suiteGrid = new CodeReuse.SuiteGrid();
		
		suiteGrid.refreshSuiteGrid(this.getPhpFile(), highlightId);
		
	},
	
	/**
	 * Refresh Suite form grid when updating the building select value by calling the SuiteGrid object refreshSelectSuiteGrid function
	 * @function
	 * @name Suite#refreshSelectSuiteGrid
	 **/
	refreshSelectSuiteGrid: function() {

		var suiteGrid = new CodeReuse.SuiteGrid();
		
		suiteGrid.refreshSelectSuiteGrid(this.getPhpFile(), document.getElementById("selectBuildingSuite").value);
		
	},
	
	/**
	 * Suite form update
	 * @function
	 * @name Suite#suiteUpdate
	 **/
	suiteUpdate: function() {
			
		var htmlObjectFieldsValuesUpdate = this.fieldsValuesUpdate();	
										
		var helper = new CodeReuse.Helper();							
												
		if(helper.validateHtmlObjectFieldsSuite(this.fields))
		{	
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			var callback = new CodeReuse.Callback();
			
			var suiteGrid = new CodeReuse.SuiteGrid();

			grid_get_post_functions.post_updateForm(this.getPhpFile(), this.getSuiteUpdateQueryName(), document.getElementById("inputPrimaryKeySuite").value, htmlObjectFieldsValuesUpdate, this.getFieldsInfo(), this.arrayOldValuesTable, callback.refreshGridCallbackSuite, suiteGrid.getTableHtmlObjectId());
		}
		
	},
	
	/**
	 * Suite form insert
	 * @function
	 * @name Suite#suiteInsert
	 **/
	suiteInsert: function() {
	
		var htmlObjectFieldsValuesInsert = this.fieldsValuesInsert();	
				
		var helper = new CodeReuse.Helper();		
				
		if(helper.validateHtmlObjectFieldsSuite(this.fields))
		{
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			var callback = new CodeReuse.Callback();
			
			var suiteGrid = new CodeReuse.SuiteGrid();

			grid_get_post_functions.post_insertRecordForm(this.getPhpFile(), this.getSuiteInsertQueryName(), htmlObjectFieldsValuesInsert, this.getFieldsInfo(), "inputPrimaryKeySuite", this.arrayOldValuesTable, callback.refreshGridCallbackSuite, suiteGrid.getTableHtmlObjectId());
		}	
	
	},

	/**
	 * To check if record exists before saving
	 * @function
	 * @name Suite#recordExists
	 * 
	 * @param {Array} SuiteValues suite form values to save
	 * @param {string} inputPrimaryKey the primary key
	 * @param {string} inputBuildingId the building id
	 * @param {string} inputSuiteNumber the suite number
	 * @param {string} saveType either update or insert
	 **/
	 recordExists: function(SuiteValues, inputPrimaryKey, inputBuildingId, inputSuiteNumber, saveType) {

		window.getXmlHttpRequest.onreadystatechange = function() {
		
			if (this.readyState == 4 && this.status == 200) {

				var response = JSON.parse(this.responseText);
				
				if(response == "0")
				{
					alert('Record no longer exists. Please refresh the form.')
					return;
				}
				else
				{
					var suiteForm = new CodeReuse.Suite();

					suiteForm.setFieldValuesFromInputs(SuiteValues, inputPrimaryKey);
					suiteForm.suiteUpdate();
				}
			
			}
		}
		
		var queryString = "queryName" + "=" + this.getRecordExistsSuiteForm() + "&" + "inputPrimaryKey" + "=" + inputPrimaryKey;
		
		window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
		window.getXmlHttpRequest.send();		
		
	},

	/**
	 * To check if record suite number exists before saving or inserting
	 * @function
	 * @name Suite#suiteNumberExists
	 * 
	 * @param {Array} SuiteValues suite form values to save
	 * @param {string} inputPrimaryKey the primary key
	 * @param {string} inputBuildingId building id
	 * @param {string} inputSuiteNumber the suite number
	 * @param {string} saveType either update or insert 
	 **/
	 suiteNumberExists: function(SuiteValues, inputPrimaryKey, inputBuildingId, inputSuiteNumber, saveType) {
		
		window.getXmlHttpRequest.onreadystatechange = function() {
		
			if (this.readyState == 4 && this.status == 200) {

				var response = this.responseText;

				if(response == "1" && saveType != "update")
				{
					alert("Suite Number with Building Id exists. Please choose another.");
					return;
				}

				var suiteForm = new CodeReuse.Suite();

				if(saveType == "update") 
				{
					suiteForm.recordExists(SuiteValues, inputPrimaryKey, inputBuildingId, inputSuiteNumber, saveType);	
				}
				else if(saveType == "insert") 
				{				
					suiteForm.setFieldValuesFromInputs(SuiteValues, "");
					suiteForm.suiteInsert();
				}
			}
		}
		
		var queryString = "queryName" + "=" + this.getSuiteNumberExistsQuery() + "&" + "inputBuildingId" + "=" + inputBuildingId + "&" + "inputSuiteNumber" + "=" + inputSuiteNumber;
		
		window.getXmlHttpRequest.open("GET", this.getPhpFile() + "?" + queryString, true);
		window.getXmlHttpRequest.send();		
		
	}
}