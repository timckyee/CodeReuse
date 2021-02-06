/**
 * Class for HomeTenantFormGridPaging object
 * @class
 */
CodeReuse.HomeTenantFormGridPaging = function() {
	
	this.gridName = "HomeTenantFormGridPaging";
	this.gridGetPostDivElement = "gridGetPostHomeFormGridPaging";
	this.tableHtmlObjectId = "tableHomeTenantFormGridPaging";
			
	this.columns = [
		
		{ colName: "Primary Key", id: "fieldPrimaryKey", colType: "int", htmlObjectId: "", htmlObjectType: "" },
		{ colName: "Building", id: "buildingName", colType: "string", htmlObjectId: "", htmlObjectType: "" },
		{ colName: "Tenant Name", id: "tenantName", colType: "string", htmlObjectId: "", htmlObjectType: "" },
		{ colName: "Date First", id: "field1", colType: "date", htmlObjectId: "", htmlObjectType: "" },
		{ colName: "Date Second", id: "field2", colType: "date", htmlObjectId: "", htmlObjectType: "" },
		
	];
		
	var handler = new CodeReuse.Handler();
	
	this.gridIdField = "fieldPrimaryKey";

	this.pageSize = "4";

	this.rowOnClick =  handler.TenantFormGridPagingOnClickHandler;
	
	this.phpFileGridGetPost = "php/grid_get_post.php";

	this.refreshHomeTenantGridQueryName = "gridtablehome";

	this.refreshHomeTenantGridQueryNameSearch = "gridtablehomeSearch";

	this.homeTenantGridUpdateQueryName = "updateTableGridGetPost";

	this.pageNumbersQueryName = "gridtablehomePages";

	this.homeTenantGridPagingDiv = "gridGetPostHomeFormGridPagingFooter";
};

CodeReuse.HomeTenantFormGridPaging.prototype = {
	
	/**
	 * Array to store old values for updating records in HomeTenantFormGridPaging
	 * @var {Array} arrayOldValuesTableGridEdit
	 */
	arrayOldValuesTableGridEdit: [],
	
	searchValue: [],

	getGridName: function() {
		
		return this.gridName;
		
	},
	
	getRowOnClick: function() {
		
		return this.rowOnClick;
		
	},
	
	getGridIdField: function() {

		return this.gridIdField;
	},
	
	getPhpFile: function() {
		
		return this.phpFileGridGetPost;	
		
	},	
	
	getGridGetPostDivElement: function() {
		
		return this.gridGetPostDivElement;
		
	},
	
	getPageSize: function() {

		return this.pageSize;

	},

	getGridColumnsInfo: function() {
		
		return this.columns;
	},
	
	getRefreshHomeTenantGridQueryName: function () {

		return this.refreshHomeTenantGridQueryName;

	},
	
	getRefreshHomeTenantGridQueryNameSearch: function() {

		return this.refreshHomeTenantGridQueryNameSearch;

	},

	getHomeTenantGridUpdateQueryName: function () {

		return this.homeTenantGridUpdateQueryName;

	},

	getPageNumbersQueryName: function() {

		return this.pageNumbersQueryName;

	},

	getHomeTenantGridPagingDiv: function () {

		return this.homeTenantGridPagingDiv;

	},

	setSearchValue: function(newSearchValue) {

		this.searchValue[0] = newSearchValue;

	},

	getSearchValue: function() {

		return this.searchValue[0];

	},

	getTableHtmlObjectId: function() {
		
		return this.tableHtmlObjectId;
	},

	/**
	 * Getting the selected row id for the row that is highlighted
	 * @function
	 * @name HomeTenantFormGridPaging#getHomeTenantFormGridPagingSelectedRowId
	 */
	getHomeTenantFormGridPagingSelectedRowId: function() {

		var table = document.getElementById(this.tableHtmlObjectId);

		if(table == null)
		{
			return;
		}

		var row;
		var rowFound = false;
		var primaryKey;

		for(var i=1; i<table.rows.length; i++)
		{
			row = table.rows[i];
			
			if(row.className == "tableHover highlightRow")
			{
				rowFound = true;
				primaryKey = row.cells[0].innerText;				
				break;
			}
		}

		if(rowFound == true)
		{
			return primaryKey;
		}
		else
		{
			return "";
		}
	},
	
};