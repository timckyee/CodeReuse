CodeReuse.Tabs = function() {
	
};

CodeReuse.Tabs.prototype = {

changeTab: function(tab) {

	var currentTab = tab.id.substring(3, tab.id.length);
	
	var otherTabs = tab.parentElement.children;

	for(i=0; i<otherTabs.length; i++)
	{
		var otherTab = otherTabs[i].id.substring(3, otherTabs[i].length);
		
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

loadHomeTenantGrid: function() {
	
	var tenant = new CodeReuse.Tenant();
	
	tenant.refreshTenantGridHome();
	
	//localStorage.clear();
	
	//return;
	
	localStorage.setItem("sortTableId", "");
	
	localStorage.setItem("arraySortColumn", "");
	
	localStorage.setItem("arraySortDirection", "desc");
	
},

loadSuiteGrid: function() {
	
	var suite = new CodeReuse.Suite();
	
	suite.refreshSuiteGrid();	
	
	localStorage.setItem("sortTableId", "");
	
	localStorage.setItem("arraySortColumn", "");
	
	localStorage.setItem("arraySortDirection", "desc");	
	
},

loadTenantGrid: function() {
	
	var tenant = new CodeReuse.Tenant();
	
	tenant.refreshTenantGrid();
	
	localStorage.setItem("sortTableId", "");
	
	localStorage.setItem("arraySortColumn", "");
	
	localStorage.setItem("arraySortDirection", "desc");	
	
}


}