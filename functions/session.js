/**
 * Class for storing session functions
 * @class
 **/
 CodeReuse.Session = function() {

    this.phpFileGridGetPost = "php/grid_get_post.php";

};

CodeReuse.Session.prototype = {

getPhpFile: function() {

    return this.phpFileGridGetPost;	
    
},

/**
 * To verify that the session exists
 * @function
 * @name Session#verify_session
 * 
 * @param {string} userId the userId of the user
 **/
 verify_session: function(sessionId) {

    window.getXmlHttpRequest = new XMLHttpRequest();

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {

            var response = this.responseText;

            //alert(response);

            if(response == "Invalid Session Id. Redirecting to login page.")
            {
                //window.location.href = "login.html";
                window.location.href = "index.html";
            }
            else
            {
                sessionStorage.setItem("userId", response);

                controller = new CodeReuse.Controller();
	
                var onload = new CodeReuse.Onload;
            
                onload.htmlBody_init_class();
            
                onload.init_gridGetPost_xmlHttpRequests();
                
                onload.init_autocomplete_inputs();
                
                onload.init_calendar_inputs();
                
                //sessionStorage.clear();
            
                sessionStorage.setItem("editMode", "false");
            
                sessionStorage.setItem("recordLockInformation", "");
            
                sessionStorage.setItem("homeTenantGridPageNumber", "1");
            
                sessionStorage.setItem("homeTenantFormGridPagingPageNumber", "1");
            
            
                document.getElementById("gridGetPostHomePagingPageNumber").value = "1";
            
                document.getElementById("gridGetPostHomeFormGridPagingPageNumber").value = "1";
            
            
                sessionStorage.setItem("arraySortColumn", "fieldPrimaryKey");
                
                sessionStorage.setItem("arraySortDirection", "asc");
            
            
                sessionStorage.setItem("arraySortColumn_tenant_form_grid_paging", "fieldPrimaryKey");
                
                sessionStorage.setItem("arraySortDirection_tenant_form_grid_paging", "asc");
            
            
                sessionStorage.setItem("arraySortColumn_suite", "suiteId");
                
                sessionStorage.setItem("arraySortDirection_suite", "asc");
                
                sessionStorage.setItem("arraySortColumn_tenant", "tenantId");
                
                sessionStorage.setItem("arraySortDirection_tenant", "asc");
            
            
                var server = new CodeReuse.Config();
            
                var helper = new CodeReuse.Helper();
            
                helper.preload(
                    [server.getServerUrl() + "/images/pngfuel.com.up.gif", 
                    server.getServerUrl() + "/images/pngfuel.com.down.gif"]
                );
            
            
                var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
                    
                var home_tenant_grid = new CodeReuse.HomeTenantGrid();
            
                var callback = new CodeReuse.Callback();
            
                var sortColumn = sessionStorage.getItem("arraySortColumn");
            
                var sortDirection = sessionStorage.getItem("arraySortDirection");
            
                var pageNumber = sessionStorage.getItem("homeTenantGridPageNumber");
            
                grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.getRowOnClick(), "showEdit", sortColumn, sortDirection, pageNumber, '', "false", '' ,'', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), "true");
            }
        }
    }
    
    var queryName = "verify_session";
    
    var queryString = "queryName=" + queryName + "&sessionId=" + sessionId;

    window.getXmlHttpRequest.open("GET", this.getPhpFile() + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

/**
 * To remove session when click on logout, close browser, click back button, or click refresh
 * @function
 * @name Session#remove_session
 * 
 * @param {string} userId the userId of the user
 **/
remove_session: function(userId) {

    //window.location.href = "login.html";

    window.getXmlHttpRequestRemoveSession = new XMLHttpRequest();

    window.getXmlHttpRequestRemoveSession.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            //var response = this.responseText;

            //alert(response);

            //window.location.href = "login.html";

            //sessionStorage.clear();

            setTimeout(function(){ 

                //window.location.href = "login.html";
                window.location.href = "index.html";
          
            }, 400);
        }
    }
    
    var queryName = "remove_session";
    
    var queryString = "queryName=" + queryName + "&userId=" + userId;

    window.getXmlHttpRequestRemoveSession.open("GET", this.getPhpFile() + "?" + queryString, true);
    window.getXmlHttpRequestRemoveSession.send();
            
}

}