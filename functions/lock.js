/**
 * Class for storing lock functions
 * @class
 **/
 CodeReuse.Lock = function() {
	
	this.phpFileGridGetPost = "php/grid_get_post.php";

};

CodeReuse.Lock.prototype = {

getPhpFile: function() {
    
    return this.phpFileGridGetPost;	
    
},

/**
 * To unlock the grid edit record on msgbox cancel
 * @function
 * @name Lock#grid_unlock_cancel
 * 
 * @param {string} tableNameInDb the table name in the database
 * @param {string} primaryKey the primary key
 * @param {string} userId the user logged in
 **/
 grid_unlock_cancel: function(tableNameInDb, primaryKey, userId) {

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            var response = this.responseText;

            //alert(response);
            
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();

			var home_tenant_grid = new CodeReuse.HomeTenantGrid();
			
			var callback = new CodeReuse.Callback();
	
			var column = sessionStorage.getItem("arraySortColumn");
			var direction = sessionStorage.getItem("arraySortDirection");
	
			var pageNumber = sessionStorage.getItem("homeTenantGridPageNumber");
	
            sessionStorage.setItem("recordLockInformation", "");

			var searchValue = home_tenant_grid.getSearchValue();
	
			if(searchValue == "" || searchValue == undefined)
			{
				grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, '', "showEdit", column, direction, pageNumber, '', "false", '', '', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
			}
			else
			{
				grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, '', "showEdit", column, direction, pageNumber, '', "false", '', '', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
			}

        }
    }
    
    var queryName = "unlock";
    
    var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKey=" + primaryKey + "&userId=" + userId;

    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * To unlock if previous record locked before changing record
 * @function
 * @name Lock#form_unlock
 * 
 * @param {string} tableNameInDb the table name in the database
 * @param {string} previousPrimaryKey the id of the previous selected record
 * @param {string} primaryKeyFieldName the primary key field name 
 * @param {string} primaryKey the primary key
 * @param {string} userId the user logged in
 * @param {string} rowOnClick callback function after checking if record exists and lock
 * @param {string} phpFile php file name and location
 * @param {string} tableHtmlObjectId the html table id
 **/
 form_unlock: function(tableNameInDb, previousPrimaryKey, primaryKeyFieldName, primaryKey, userId, rowOnClick, phpFile, tableHtmlObjectId) {

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            var response = this.responseText;

            //alert(response);

            var lock = new CodeReuse.Lock();
            lock.form_checkdelete_checklock_lock(tableNameInDb, primaryKeyFieldName, primaryKey, sessionStorage.getItem("userId"), rowOnClick, phpFile, tableHtmlObjectId);
        }
    }
    
    var queryName = "form_unlock";
    
    var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&previousPrimaryKey=" + previousPrimaryKey + "&primaryKey=" + primaryKey + "&userId=" + userId;

    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * To unlock record from locks table
 * @function
 * @name Lock#unlock
 * 
 * @param {string} tableNameInDb the table name in the database
 * @param {string} primaryKey the primary key to unlock
 * @param {string} userId the user logged in
 **/
 unlock: function(tableNameInDb, primaryKey, userId) {

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            var response = this.responseText;

            //alert(response);

            sessionStorage.setItem("recordLockInformation", "");
        }
    }
    
    var queryName = "unlock";
    
    var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKey=" + primaryKey + "&userId=" + userId;

    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * To unlock record before sorting (going to database)
 * @function
 * @name Lock#unlock_sort_server
 * 
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {string} column the column number that is being sorted
 * @param {string} pageNumber the current page number of the grid
 * @param {string} tableNameInDb the table name in the database
 * @param {string} primaryKey the primary key to unlock
 * @param {string} userId the user logged in
 **/
 unlock_sort_server: function(gridColumnsInfo, column, pageNumber, tableNameInDb, primaryKey, userId) {

    var columnSort = column;

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            var response = this.responseText;

            //alert(response);

            var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();
	
            var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
            
            var callback = new CodeReuse.Callback();
        
            var sortColumn = gridColumnsInfo[columnSort].id;		
            
            var sortDirection = sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging");	
            
            if(sortColumn != sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging"))
            {
                sessionStorage.setItem("arraySortDirection_tenant_form_grid_paging", "asc");
            }
            else
            {
                if(sortDirection == "asc")
                {
                    sessionStorage.setItem("arraySortDirection_tenant_form_grid_paging", "desc");	
                }
                else
                {
                    if(sortDirection == "desc")
                    {
                        sessionStorage.setItem("arraySortDirection_tenant_form_grid_paging", "asc");
                    }
                }			
            }
            
            sessionStorage.setItem("arraySortColumn_tenant_form_grid_paging", sortColumn);
        
            var column = sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging");
            var direction = sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging");
        
            var searchValue = home_tenant_form_grid_paging.getSearchValue();
        
            if(searchValue == "" || searchValue == undefined)
            {
                grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryName(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumber, '', "false", '', '', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
            }
            else
            {
                grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumber, '', "false", '', '', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
            }

            sessionStorage.setItem("recordLockInformation", "");            

            var controller = new CodeReuse.Controller();
            controller.resetTenantFormGridPagingFields();
        }
    }
    
    var queryName = "unlock";
    
    var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKey=" + primaryKey + "&userId=" + userId;

    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * To unlock record before sorting (not going to database, sort on client)
 * @function
 * @name Lock#unlock_sort_client
 * 
 * @param {string} sortTableHtmlObjectId the table being sorted
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {string} column the column number that is being sorted
 * @param {string} tableNameInDb the table name in the database
 * @param {string} primaryKey the primary key to unlock
 * @param {string} userId the user logged in
 **/
 unlock_sort_client: function(sortTableHtmlObjectId, gridColumnsInfo, column, tableNameInDb, primaryKey, userId) {

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            var response = this.responseText;

            //alert(response);

            var sort = new CodeReuse.Sort();

            sort.sortTable(sortTableHtmlObjectId, column, gridColumnsInfo);

            //sessionStorage.setItem("recordLockInformation", "");
        }
    }
    
    var queryName = "unlock";
    
    var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKey=" + primaryKey + "&userId=" + userId;

    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * To unlock record before updating page number
 * @function
 * @name Lock#unlock_update_page_number
 * 
 * @param {string} pageNumber the updated page number
 * @param {string} tableNameInDb the table name in the database
 * @param {string} primaryKey the primary key to unlock
 * @param {string} userId the user logged in
 **/
 unlock_update_page_number: function(pageNumber, tableNameInDb, primaryKey, userId) {

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            var response = this.responseText;

            //alert(response);

            var inputPage = document.getElementById("gridGetPostHomeFormGridPagingPageNumber").value;
            var totalPagesString = document.getElementById("gridGetPostHomeFormGridPagingPages").innerText;
            var totalPages = totalPagesString.substr(3, totalPagesString.length);
            
            if(parseInt(inputPage) > totalPages)
            {
                alert('This page number is greater than the total number of pages');
                return;
            }
    
            sessionStorage.setItem("homeTenantFormGridPagingPageNumber", pageNumber);
                
            pageNumberUpdate = sessionStorage.getItem("homeTenantFormGridPagingPageNumber");
            
            var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
        
            var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();
        
            var callback = new CodeReuse.Callback();
        
            var column = sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging");
            var direction = sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging");
        
            var searchValue = home_tenant_form_grid_paging.getSearchValue();
            
            if(searchValue == "" || searchValue == undefined)
            {
                grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryName(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberUpdate, '', "false", '' ,'', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
            }
            else
            {
                grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberUpdate, '', "false", '' ,'', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
            }


            sessionStorage.setItem("recordLockInformation", "");

            controller.resetTenantFormGridPagingFields();
        }
    }
    
    var queryName = "unlock";
    
    var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKey=" + primaryKey + "&userId=" + userId;

    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * To unlock record before changing page direction
 * @function
 * @name Lock#unlock_update_page_direction
 * 
 * @param {string} direction the left or right arrow
 * @param {string} pageNumber the updated page number
 * @param {string} tableNameInDb the table name in the database
 * @param {string} primaryKey the primary key to unlock
 * @param {string} userId the user logged in
 **/
 unlock_update_page_direction: function(direction, pageNumber, tableNameInDb, primaryKey, userId) {

    var updatePage_direction = direction;

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            //var response = this.responseText;

            if(updatePage_direction == "left") {
                if(pageNumber == "1") {
                    alert('You are on the first page');
                    return;
                } else {
                    pageNumberUpdate = parseInt(pageNumber) - 1;
                    document.getElementById('gridGetPostHomeFormGridPagingPageNumber').value = pageNumberUpdate;
                }
            } else if(updatePage_direction == "right") {
    
                var inputPage = pageNumber;
                var totalPagesString = document.getElementById("gridGetPostHomeFormGridPagingPages").innerText;
                var totalPages = totalPagesString.substr(3, totalPagesString.length);
                
                if(parseInt(inputPage) == parseInt(totalPages))
                {
                    alert('You have reached the last page');
                    return;
                }
    
                
                pageNumberUpdate = parseInt(pageNumber) + 1;
                document.getElementById('gridGetPostHomeFormGridPagingPageNumber').value = pageNumberUpdate;
            }
        
            //var pageNumberUpdate = parseInt(pageNumber) - 1;

            sessionStorage.setItem("homeTenantFormGridPagingPageNumber", pageNumberUpdate.toString());		
        
            var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
        
            var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();
        
            var callback = new CodeReuse.Callback();
        
            var column = sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging");
            var direction = sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging");
        
            var searchValue = home_tenant_form_grid_paging.getSearchValue();
        
            if(searchValue == "" || searchValue == undefined)
            {
                grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryName(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberUpdate.toString(), '', "false", '', '', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
            }
            else
            {
                grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberUpdate.toString(), '', "false", '', '', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
            }

            sessionStorage.setItem("recordLockInformation", "");

            controller.resetTenantFormGridPagingFields();
        }
    }
    
    var queryName = "unlock";
    
    var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKey=" + primaryKey + "&userId=" + userId;

    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * To unlock table record if new or clear lock button is clicked
 * @function
 * @name Lock#unlock_search_home_form_grid_paging
 * 
 * @param {string} tableNameInDb the table name in the database
 * @param {string} primaryKey the primary key to unlock
 * @param {string} userId the user logged in
 **/
 unlock_search_home_form_grid_paging: function(tableNameInDb, primaryKey, userId) {

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            //var response = this.responseText;

            //alert(response);

            var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
            var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();
        
            var callback = new CodeReuse.Callback();
        
            grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", home_tenant_form_grid_paging.getSearchValue(), callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', "fieldPrimaryKey", "asc", "1", '', "false", '' ,'', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');	
        
            sessionStorage.setItem("arraySortColumn_tenant_form_grid_paging", "fieldPrimaryKey");
            
            sessionStorage.setItem("arraySortDirection_tenant_form_grid_paging", "asc");
        
            sessionStorage.setItem("homeTenantFormGridPagingPageNumber", "1");
        
            document.getElementById("gridGetPostHomeFormGridPagingPageNumber").value = "1";


            sessionStorage.setItem("recordLockInformation", "");

            controller.resetTenantFormGridPagingFields();
        }
    }
    
    var queryName = "unlock";
    
    var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKey=" + primaryKey + "&userId=" + userId;

    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * To unlock the grid edit record after save
 * @function
 * @name Lock#grid_unlock_update
 * 
 * @param {string} tableNameInDb the table name in the database
 * @param {string} primaryKey the primary key
 * @param {string} userId the user logged in
 **/
 grid_unlock_update: function(tableNameInDb, primaryKey, userId) {

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            var response = this.responseText;

            //alert(response);
            
            var grid_get_post_function = new CodeReuse.Grid_Get_Post_Functions;

            var home_tenant_grid = new CodeReuse.HomeTenantGrid();

            var phpFile = home_tenant_grid.getPhpFile();

            var tableHtmlObjectId = home_tenant_grid.getTableHtmlObjectId();

            sessionStorage.setItem("recordLockInformation", "");

            var searchValue = home_tenant_grid.getSearchValue();

            if(searchValue == "" || searchValue == undefined)
            {
                grid_get_post_function.showTheGridAfterSaveRecord(phpFile, "gridtablehome", "getPageNumber", "savePrimaryKey", primaryKey, sessionStorage.getItem("arraySortColumn"), sessionStorage.getItem("arraySortDirection"), '', '', tableHtmlObjectId, home_tenant_grid.getPageSize(), '');
            }
            else
            {
                grid_get_post_function.showTheGridAfterSaveRecord(phpFile, "gridtablehomeSearch", "getPageNumber", "savePrimaryKey", primaryKey, sessionStorage.getItem("arraySortColumn"), sessionStorage.getItem("arraySortDirection"), "searchValue", searchValue, tableHtmlObjectId, home_tenant_grid.getPageSize(), '');
            }

        }
    }
    
    var queryName = "unlock";
    
    var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKey=" + primaryKey + "&userId=" + userId;

    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * On form on grid row click to check if record has been deleted, then check if record has been locked, then lock record and populate form
 * @function
 * @name Lock#form_checkdelete_checklock_lock
 * 
 * @param {string} tableNameInDb the table name in the database
 * @param {string} primaryKeyFieldName the primary key field name
 * @param {string} primaryKey the primary key
 * @param {string} userId the user logged in
 * @param {string} rowOnClick callack function after checking locks
 * @param {string} phpFile php file name and location
 * @param {string} tableHtmlObjectId the html table id
 **/
form_checkdelete_checklock_lock: function(tableNameInDb, primaryKeyFieldName, primaryKey, userId, rowOnClick, phpfile, tableHtmlObjectId) {

window.getXmlHttpRequest.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

        var response = this.responseText;
        
        //alert(response);

        if(response != "Record has been locked")
        {
            sessionStorage.setItem("recordLockInformation", "");
            alert(response);
        }
        else
        {
            var tableName_primaryKey = "tableName=" + tableNameInDb + "&primaryKey=" + primaryKey;
            sessionStorage.setItem("recordLockInformation", tableName_primaryKey);

            rowOnClick(phpfile, primaryKey, tableHtmlObjectId);
        }
    }
}

var queryName = "checkdelete_checklock_lock";

var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKeyFieldName=" + primaryKeyFieldName + "&primaryKey=" + primaryKey + "&userId=" + userId;

window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
window.getXmlHttpRequest.send();
		
},

/**
 * To lock the form record after insert
 * @function
 * @name Lock#form_lock_insertRecord
 * 
 * @param {string} tableNameInDb the table name in the database
 * @param {string} primaryKey the primary key
 * @param {string} userId the user logged in
 * @param {string} tableHtmlObjectId html table name of the form grid
 * @param {function} refreshGridCallback refresh grid callback if SuiteGrid or TenantGrid
 **/
 form_lock_insertRecord: function(tableNameInDb, primaryKey, userId, tableHtmlObjectId, refreshGridCallback) {

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            var response = this.responseText;
            
            //alert(response);
    
            if(response != "Record has been locked")
            {
                alert(response);
            }
            else
            {            
                var suiteGrid = new CodeReuse.SuiteGrid();
                var tenantGrid = new CodeReuse.TenantGrid();
                var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

                if(tableHtmlObjectId == suiteGrid.getTableHtmlObjectId() || tableHtmlObjectId == tenantGrid.getTableHtmlObjectId())
                {
                    var highlightId = primaryKey;

                    if(refreshGridCallback != undefined)
                        refreshGridCallback(highlightId);						
                }
                else
                if(tableHtmlObjectId == home_tenant_form_grid_paging.getTableHtmlObjectId())
                {
                    var grid_get_post_function = new CodeReuse.Grid_Get_Post_Functions;

                    var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

                    var searchValue = home_tenant_form_grid_paging.getSearchValue();

                    if(searchValue == "" || searchValue == undefined)
                    {
                        grid_get_post_function.showTheGridAfterSaveRecord(home_tenant_form_grid_paging.getPhpFile(), "gridtablehome", "getPageNumber", "savePrimaryKey", primaryKey, sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging"), sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging"), '', '', tableHtmlObjectId, home_tenant_form_grid_paging.getPageSize(), '');
                    }
                    else
                    {
                        grid_get_post_function.showTheGridAfterSaveRecord(home_tenant_form_grid_paging.getPhpFile(), "gridtablehomeSearch", "getPageNumber", "savePrimaryKey", primaryKey, sessionStorage.getItem("arraySortColumn_tenant_form_grid_paging"), sessionStorage.getItem("arraySortDirection_tenant_form_grid_paging"), "searchValue", searchValue, tableHtmlObjectId, home_tenant_form_grid_paging.getPageSize(), '');
                    }
                }
            }
        }
    }
    
    var queryName = "lock";
    
    var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKey=" + primaryKey + "&userId=" + userId;
    
    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * To unlock records on exit
 * @function
 * @name Lock#unlockRecordsOnExit
 * 
 * @param {string} userId the user logged in
 **/
 unlockRecordsOnExit: function(userId) {
    
    window.getXmlHttpRequest = new XMLHttpRequest();

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            //var response = this.responseText;

            //alert(response);

            var session = new CodeReuse.Session();  
            session.remove_session(userId);
        }
    }
    
    var queryName = "unlockRecordsOnExit";
    
    //var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKey=" + primaryKey + "&userId=" + userId;
    
    var queryString = "queryName=" + queryName + "&userId=" + userId;

    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * On edit grid on edit link click to check if record has been deleted, then check if record has been locked, then lock record and show edit row
 * @function
 * @name Lock#grid_checkdelete_checklock_lock
 * 
 * @param {string} tableNameInDb the table name in the database
 * @param {string} primaryKeyFieldName the primary key field name
 * @param {string} primaryKey the primary key
 * @param {string} userId the user logged in
 * @param {Object} tableHtml the html table object used to replace the row edited with form objects
 **/
 grid_checkdelete_checklock_lock: function(tableNameInDb, primaryKeyFieldName, primaryKey, userId, tableHtml) {

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            var response = this.responseText;
            
            //alert(response);
    
            var home_tenant_grid = new CodeReuse.HomeTenantGrid();
		
            var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
            
            var callback = new CodeReuse.Callback();

            if(response != "Record has been locked")
            {
                sessionStorage.setItem("recordLockInformation", "");
                alert(response);
            }
            else
            {
                grid_get_post_functions.get_populateGrid(home_tenant_grid.getPhpFile(), "populategrid", home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.arrayOldValuesTableGridEdit, callback.get_populateGrid_callback, tableHtml, primaryKey, home_tenant_grid.getTableHtmlObjectId());				

                sessionStorage.setItem("editMode", "true");	
            }
        }
    }
    
    var queryName = "checkdelete_checklock_lock";
    
    var queryString = "queryName=" + queryName + "&tableName=" + tableNameInDb + "&primaryKeyFieldName=" + primaryKeyFieldName + "&primaryKey=" + primaryKey + "&userId=" + userId;
    
    window.getXmlHttpRequest.open("GET", this.phpFileGridGetPost + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

}