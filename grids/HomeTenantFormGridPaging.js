/**
 * Class for HomeTenantFormGridPaging object
 * @class
 **/
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

	this.pageNumbersQueryName = "gridtablehomePages";

	this.homeTenantGridPagingDiv = "gridGetPostHomeFormGridPagingFooter";
};

CodeReuse.HomeTenantFormGridPaging.prototype = {
	
	/**
	 * Search value of this grid
	 * @var {Array} searchValue
	 **/
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
	}
	
};