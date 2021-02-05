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

		if(localStorage.getItem("editMode") == "true")
		{
			alert('Please cancel save mode in order to continue');
			return;
		}
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

		if(localStorage.getItem("editMode") == "true")
		{
			alert('Please cancel save mode in order to continue');
			return;
		}
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

}