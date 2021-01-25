/**
 * Class for storing tab functions
 * @class
 */
CodeReuse.Tabs = function() {
	
};

CodeReuse.Tabs.prototype = {

/**
 * Changing the tab selection on the menu on left hand side
 * @function
 * @name Tabs#changeTab
 * 
 * @param {string} tab this is the div object that is clicked
 */
changeTab: function(tab) {

	var currentTab = tab.id.substring(3, tab.id.length);
	
	if(currentTab == "Home")
	{
		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var home_tenant_grid = new CodeReuse.HomeTenantGrid();
	
		var tenant = new CodeReuse.Tenant();
	
		var callback = new CodeReuse.Callback();
	
		var sortColumn = localStorage.getItem("arraySortColumn");
	
		var sortDirection = localStorage.getItem("arraySortDirection");
	
		var pageNumber = localStorage.getItem("homeTenantGridPageNumber");
	
		grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenant.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.getRowOnClick(), "showEdit", sortColumn, sortDirection, pageNumber, '', "false", '' ,'', "true", home_tenant_grid.getHomeTenantGridPagingDiv());
	}
	else
	if(currentTab == "HomeFormGridPaging")
	{
		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
		var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();
	
		var tenant = new CodeReuse.Tenant();
	
		var callback = new CodeReuse.Callback();
	
		var sortColumn = localStorage.getItem("arraySortColumn_tenant_form_grid_paging");
	
		var sortDirection = localStorage.getItem("arraySortDirection_tenant_form_grid_paging");
	
		var pageNumber = localStorage.getItem("homeTenantGridPageNumber");
	
		grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryName(), home_tenant_form_grid_paging.getGridIdField(), tenant.getFieldsInfo(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', sortColumn, sortDirection, pageNumber, '', "false", '' ,'', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv());		
	}

	var otherTabs = tab.parentElement.parentElement.children;

	for(i=0; i<otherTabs.length; i++)
	{
		var otherTab = otherTabs[i].cells[0].id.substring(3, otherTabs[i].length);
		
		if(otherTab == "Filler")
		{
			continue;
		}

		if(currentTab == otherTab)
		{
			document.getElementById("pageContent" + currentTab).style.display = "block";
			document.getElementById("tab" + currentTab).className = "tabOptionsSelect";
		}
		else
		{
			document.getElementById("pageContent" + otherTab).style.display = "none";
			document.getElementById("tab" + otherTab).className = "tabOptions";
		}
	}
},

}