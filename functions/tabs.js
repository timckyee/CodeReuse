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

}