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
		var tenantSearchListOrCalendarShowing = this.tenantSearchListOrCalendarShowing();
		
		if(tenantSearchListOrCalendarShowing != "")
		{
			if(tenantSearchListOrCalendarShowing == "tenantSearchList")
			{
				alert('Please choose Tenant from list before continuing');
				return;
			}
			else
			if(tenantSearchListOrCalendarShowing == "calendar")
			{
				alert('Please close calendar picker before continuing');
				return;
			}
		}

		if(this.searchFieldEmptyToRefreshGrid() == "0")
		{
			return;
		}	

		if(localStorage.getItem("editMode") == "true")
		{
			alert('Please cancel save mode in order to continue');
			return;
		}

		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		var home_tenant_grid = new CodeReuse.HomeTenantGrid();
	
		var tenant = new CodeReuse.Tenant();
	
		var callback = new CodeReuse.Callback();
	
		var sortColumn = localStorage.getItem("arraySortColumn");
	
		var sortDirection = localStorage.getItem("arraySortDirection");
	
		var pageNumber = localStorage.getItem("homeTenantGridPageNumber");
	
		grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenant.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.getRowOnClick(), "showEdit", sortColumn, sortDirection, pageNumber, '', "false", '' ,'', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
	}
	else
	if(currentTab == "HomeFormGridPaging")
	{		
		var tenantSearchListOrCalendarShowing = this.tenantSearchListOrCalendarShowing();
		
		if(tenantSearchListOrCalendarShowing != "")
		{
			if(tenantSearchListOrCalendarShowing == "tenantSearchList")
			{
				alert('Please choose Tenant from list before continuing');
				return;
			}
			else
			if(tenantSearchListOrCalendarShowing == "calendar")
			{
				alert('Please close calendar picker before continuing');
				return;
			}
		}

		if(this.searchFieldEmptyToRefreshGrid() == "0")
		{
			return;
		}

		if(localStorage.getItem("editMode") == "true")
		{
			alert('Please cancel save mode in order to continue');
			return;
		}

		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
		var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();
	
		var tenant = new CodeReuse.Tenant();
	
		var callback = new CodeReuse.Callback();
	
		var sortColumn = localStorage.getItem("arraySortColumn_tenant_form_grid_paging");
	
		var sortDirection = localStorage.getItem("arraySortDirection_tenant_form_grid_paging");
	
		var pageNumber = localStorage.getItem("homeTenantGridPageNumber");
	
		grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryName(), home_tenant_form_grid_paging.getGridIdField(), tenant.getFieldsInfo(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', sortColumn, sortDirection, pageNumber, '', "false", '' ,'', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');		
	}
	else
	if(currentTab == "Suites")
	{
		var tenantSearchListOrCalendarShowing = this.tenantSearchListOrCalendarShowing();
		
		if(tenantSearchListOrCalendarShowing != "")
		{
			if(tenantSearchListOrCalendarShowing == "tenantSearchList")
			{
				alert('Please choose Tenant from list before continuing');
				return;
			}
			else
			if(tenantSearchListOrCalendarShowing == "calendar")
			{
				alert('Please close calendar picker before continuing');
				return;
			}
		}

		if(this.searchFieldEmptyToRefreshGrid() == "0")
		{
			return;
		}
	}
	else
	if(currentTab == "Tenants")
	{
		var tenantSearchListOrCalendarShowing = this.tenantSearchListOrCalendarShowing();
		
		if(tenantSearchListOrCalendarShowing != "")
		{
			if(tenantSearchListOrCalendarShowing == "tenantSearchList")
			{
				alert('Please choose Tenant from list before continuing');
				return;
			}
			else
			if(tenantSearchListOrCalendarShowing == "calendar")
			{
				alert('Please close calendar picker before continuing');
				return;
			}
		}

		if(this.searchFieldEmptyToRefreshGrid() == "0")
		{
			return;
		}
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

/**
 * If search list or calendar is still showing then notify user.
 * @function
 * @name Tabs#tenantSearchListOrCalendarShowing
 */
tenantSearchListOrCalendarShowing: function() {

	if(document.getElementById("tenantSearchList").style.display == "block")
	{
		return "tenantSearchList";
	}
	else
	if(document.getElementById("calendarId").style.display == "block")
	{
		return "calendar";
	}
	else
	{
		return "";
	}

},

/**
 * Search field empty check to refresh grid upon click on tab
 * @function
 * @name Tabs#searchFieldEmptyToRefreshGrid
 */
searchFieldEmptyToRefreshGrid: function() {

	if(document.getElementById("homeTenantGridSearchValue").value !== "")
	{
		alert('Please clear search field before continuing');
		return 0;
	}

	if(document.getElementById("homeTenantFormGridPagingSearchValue").value !== "")
	{
		alert('Please clear search field before continuing');
		return 0;
	}

	return 1;
}

}