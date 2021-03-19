/**
 * Class for storing tab functions
 * @class
 **/
CodeReuse.Tabs = function() {
	
};

CodeReuse.Tabs.prototype = {

/**
 * Changing the tab selection on the menu on left hand side
 * @function
 * @name Tabs#changeTab
 * 
 * @param {string} tab this is the div object that is clicked
 **/
changeTab: function(tab) {

	var currentTab = tab.id.substring(3, tab.id.length);

	if(currentTab == "Home")
	{	
		if(sessionStorage.getItem("editMode") == "true")
		{
			var helper = new CodeReuse.Helper();

			helper.msgBox('alert', 'Please cancel save mode in order to continue');

			return;
		}

		if(document.getElementById("tenantSearchList").style.display == "block")
		{
			alert('Please choose Tenant from list before continuing');
			return;
		}

        var calendar = new CodeReuse.Calendar();
    
        if(calendar.validateDate("inputCalendarFormGridPaging") == false)
        {
            alert("input format date has to be dd-mmm-yyyy");
			return;
        }

        if(calendar.validateDate("inputCalendarTestingFormGridPaging") == false)
        {
            alert("input format date has to be dd-mmm-yyyy");
			return;
        }
	}
	else
	if(currentTab == "HomeFormGridPaging")
	{
		if(sessionStorage.getItem("editMode") == "true")
		{
			var helper = new CodeReuse.Helper();

			helper.msgBox('alert', 'Please cancel save mode in order to continue');

			return;
		}
		
		if(document.getElementById("tenantSearchList").style.display == "block")
		{
			alert('Please choose Tenant from list before continuing');
			return;
		}

        var calendar = new CodeReuse.Calendar();
    
        if(calendar.validateDate("inputCalendarFormGridPaging") == false)
        {
            alert("input format date has to be dd-mmm-yyyy");
			return;
        }

        if(calendar.validateDate("inputCalendarTestingFormGridPaging") == false)
        {
            alert("input format date has to be dd-mmm-yyyy");
			return;
        }
	}
	else
	if(currentTab == "Suites")
	{
		if(sessionStorage.getItem("editMode") == "true")
		{
			var helper = new CodeReuse.Helper();

			helper.msgBox('alert', 'Please cancel save mode in order to continue');

			return;
		}	
		
		if(document.getElementById("tenantSearchList").style.display == "block")
		{
			alert('Please choose Tenant from list before continuing');
			return;
		}

        var calendar = new CodeReuse.Calendar();
    
        if(calendar.validateDate("inputCalendarFormGridPaging") == false)
        {
            alert("input format date has to be dd-mmm-yyyy");
			return;
        }

        if(calendar.validateDate("inputCalendarTestingFormGridPaging") == false)
        {
            alert("input format date has to be dd-mmm-yyyy");
			return;
        }
	}
	else
	if(currentTab == "Tenants")
	{
		if(sessionStorage.getItem("editMode") == "true")
		{
			var helper = new CodeReuse.Helper();

			helper.msgBox('alert', 'Please cancel save mode in order to continue');

			return;
		}

		if(document.getElementById("tenantSearchList").style.display == "block")
		{
			alert('Please choose Tenant from list before continuing');
			return;
		}

        var calendar = new CodeReuse.Calendar();
    
        if(calendar.validateDate("inputCalendarFormGridPaging") == false)
        {
            alert("input format date has to be dd-mmm-yyyy");
			return;
        }

        if(calendar.validateDate("inputCalendarTestingFormGridPaging") == false)
        {
            alert("input format date has to be dd-mmm-yyyy");
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
}

}