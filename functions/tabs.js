var Tabs = function() {
	
};

Tabs.prototype = {

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
}

}