/**
 * Class for Suite form object
 * @class
 */
CodeReuse.Suite = function() {
	
	this.suiteId;
	this.suiteNumber;
	this.buildingId;
	this.location;
	
	this.fields = [
		{ name: "suiteId", dbType: "int", htmlObjectId: "inputPrimaryKeySuite", htmlObjectType: "primaryKey" },
		{ name: "suiteNumber", dbType: "varchar(10)", htmlObjectId: "inputSuiteNumber", htmlObjectType: "text" },
		{ name: "buildingId", dbType: "int", htmlObjectId: "inputBuildingId", htmlObjectType: "number" },
		{ name: "location", dbType: "varchar(25)", htmlObjectId: "inputLocation", htmlObjectType: "text" },
	];
		
	this.phpFileGridGetPost = "php/grid_get_post.php";
	
	this.suiteUpdateQueryName = "updateTableGridGetPostSuite";

	this.suiteInsertQueryName = "createRecordTableGridGetPostSuite";
};

CodeReuse.Suite.prototype = {
			
	/**
	 * Array to store old values for inserting and updating records in Suite form object
	 * @var {Array} arrayOldValuesTable
	 */	
	arrayOldValuesTable: [],
	
	getFieldsInfo: function() {
		
		return this.fields;
	},
		
	getPhpFile: function() {
		
		return this.phpFileGridGetPost;	
		
	},

	getSuiteUpdateQueryName: function() {

		return this.suiteUpdateQueryName;

	},

	getSuiteInsertQueryName: function() {

		return this.suiteInsertQueryName;

	},
	
	/**
	 * Setting values in this object constructor from the html inputs for inserting or updating
	 * @function
	 * @name Suite#setFieldValuesFromInputs
	 * 
	 * @param {Array} inputValueArray array of html input values
	 * @param {string} primaryKey primary key of the record we are updating
	 */
	setFieldValuesFromInputs: function(inputValueArray, primaryKey) {
		
		this.suiteId = primaryKey;
		
		this.suiteNumber = inputValueArray["inputSuiteNumber"];
		this.buildingId = inputValueArray["inputBuildingId"];
		
		this.location = inputValueArray["inputLocation"];
	},
	
	/**
	 * Returns an array with values that have been preset in this object for updating
	 * @function
	 * @name Suite#fieldsValuesUpdate
	 * 
	 * @returns {Array} array of the field values of this object
	 */
	fieldsValuesUpdate: function() {
		
		var fieldsValuesUpdateArray = [];
		
		fieldsValuesUpdateArray[0] = this.suiteId;
		fieldsValuesUpdateArray[1] = this.suiteNumber;
		fieldsValuesUpdateArray[2] = this.buildingId;
		fieldsValuesUpdateArray[3] = this.location;
		
		return fieldsValuesUpdateArray;
		
	},
	
	/**
	 * Returns an array with values that have been preset in this object for inserting
	 * @function
	 * @name Suite#fieldsValuesInsert
	 * 
	 * @returns {Array} array of the field values of this object
	 */
	fieldsValuesInsert: function() {
		
		var fieldsValuesInsertArray = [];
		
		fieldsValuesInsertArray[1] = this.suiteNumber;
		fieldsValuesInsertArray[2] = this.buildingId;
		fieldsValuesInsertArray[3] = this.location;
		
		return fieldsValuesInsertArray;
		
	},
	
	/**
	 * Refresh Suite form grid by calling the SuiteGrid object refreshSuiteGrid function
	 * @function
	 * @name Suite#refreshSuiteGrid
	 * 
	 * @param {string} highlightId the row primary key to highlight
	 */
	refreshSuiteGrid: function(highlightId) {

		var suiteGrid = new CodeReuse.SuiteGrid();
		
		suiteGrid.refreshSuiteGrid(this.getPhpFile(),this.getFieldsInfo(), highlightId);
		
	},
	
	/**
	 * Refresh Suite form grid when updating the building select value by calling the SuiteGrid object refreshSelectSuiteGrid function
	 * @function
	 * @name Suite#refreshSelectSuiteGrid
	 */
	refreshSelectSuiteGrid: function() {

		var suiteGrid = new CodeReuse.SuiteGrid();
		
		suiteGrid.refreshSelectSuiteGrid(this.getPhpFile(),this.getFieldsInfo(), document.getElementById("selectBuildingSuite").value);
		
	},
	
	/**
	 * Suite form update
	 * @function
	 * @name Suite#suiteUpdate
	 */
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
	 */
	suiteInsert: function() {
	
		var htmlObjectFieldsValuesInsert = this.fieldsValuesInsert();	
				
		var helper = new CodeReuse.Helper();		
				
		if(helper.validateHtmlObjectFieldsSuite(this.fields))
		{
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
			var callback = new CodeReuse.Callback();
			
			var suiteGrid = CodeReuse.HomeTenantFormGridPaging();

			grid_get_post_functions.post_insertRecordForm(this.getPhpFile(), this.getSuiteInsertQueryName(), htmlObjectFieldsValuesInsert, this.getFieldsInfo(), "inputPrimaryKeySuite", this.arrayOldValuesTable, callback.refreshGridCallbackSuite, suiteGrid.getTableHtmlObjectId());
		}	
	
	}
}