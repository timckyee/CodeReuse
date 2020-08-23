CodeReuse.Sort = function() {
	
};

CodeReuse.Sort.prototype = {

sortTable: function(tblId, column, gridColumnsInfo){
	
	var sortColumn = gridColumnsInfo[column].id;
	
	var column_update;
	var direction_update;

	if(tblId == "tableSuite")
	{
		var sortDirection_suite = localStorage.getItem("arraySortDirection_suite");	
		
		if(sortColumn != localStorage.getItem("arraySortColumn_suite"))
		{
			localStorage.setItem("arraySortDirection_suite", "asc");
		}
		else
		{	
			if(sortDirection_suite == "asc")
			{
				localStorage.setItem("arraySortDirection_suite", "desc");	
			}
			else
			{
				if(sortDirection_suite == "desc")
					localStorage.setItem("arraySortDirection_suite", "asc");
			}			
		}
		
		localStorage.setItem("arraySortColumn_suite", sortColumn);

		column_update = localStorage.getItem("arraySortColumn_suite");
		direction_update = localStorage.getItem("arraySortDirection_suite");
	}
	else if(tblId == "tableTenant")
	{
		var sortDirection_tenant = localStorage.getItem("arraySortDirection_tenant");	
		
		if(sortColumn != localStorage.getItem("arraySortColumn_tenant"))
		{
			localStorage.setItem("arraySortDirection_tenant", "asc");
		}
		else
		{	
			if(sortDirection_tenant == "asc")
			{
				localStorage.setItem("arraySortDirection_tenant", "desc");	
			}
			else
			{
				if(sortDirection_tenant == "desc")
					localStorage.setItem("arraySortDirection_tenant", "asc");
			}			
		}
		
		localStorage.setItem("arraySortColumn_tenant", sortColumn);

		column_update = localStorage.getItem("arraySortColumn_tenant");
		direction_update = localStorage.getItem("arraySortDirection_tenant");		
	}

	
	var table = document.getElementById(tblId);
    
    var Arr = [];
    
	var header = table.rows[0];
		
	//console.dir(header);

    for(var i=1, ln=table.rows.length; i<ln; i++){
	    
        var row = table.rows[i];
		
        Arr.push([row]);
        
    }

    if(tblId == "tableHomeTenant")
    {
	   	sortingFunctionCompareColumn = parseInt(column) + 1;
    }
    else
    {
	    sortingFunctionCompareColumn = column;
    }
        
    var sortingFunction;
    	
    if(tblId == "tableSuite")
    {
    	sortDirection = localStorage.getItem("arraySortDirection_suite");
    }
    else if(tblId == "tableTenant")
    {
	    sortDirection = localStorage.getItem("arraySortDirection_tenant");
    }	 	
    
    if(sortDirection == "asc")
    {
		var sortingFunction = function(a,b) {
			
			if(b == null)
				return;
			
			var x = a[0].cells[sortingFunctionCompareColumn].innerText;
			var y = b[0].cells[sortingFunctionCompareColumn].innerText;			
						
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			
			return 0;
		}
	}
	else if(sortDirection == "desc")
	{
		var sortingFunction = function(a,b) {
							
			if(b == null)
				return;
			
			var x = a[0].cells[sortingFunctionCompareColumn].innerText;
			var y = b[0].cells[sortingFunctionCompareColumn].innerText;	
						
			if (x > y) {return -1;}
			if (x < y) {return 1;}
			
			return 0;
		}
	}	

	
	Arr.sort(sortingFunction);

	table.innerHTML = "";
	table.appendChild(header);

	debugger

	for(var i=0; i<gridColumnsInfo.length; i++)
	{
		var htmlSortIconId = tblId + "_" + column_update + "ColumnHeaderIcon";

		if(tblId + "_" + gridColumnsInfo[i].id + "ColumnHeaderIcon" == htmlSortIconId)
		{
			document.getElementById(htmlSortIconId).width = "14";
			document.getElementById(htmlSortIconId).height = "14";

			var server = new CodeReuse.Config();

			if(direction_update == "asc")
			{
				//document.getElementById(htmlSortIconId).src = images[0].src;
				document.getElementById(htmlSortIconId).src = server.getServerUrl() + "/images/pngfuel.com.up.png";
			}
			else if(direction_update == "desc")
			{
				//document.getElementById(htmlSortIconId).src = images[1].src;
				document.getElementById(htmlSortIconId).src = server.getServerUrl() + "/images/pngfuel.com.down.png";
			}
			
			document.getElementById(htmlSortIconId).style.display = "inline";
		}
		else
		{
			document.getElementById(tblId + "_" + gridColumnsInfo[i].id + "ColumnHeaderIcon").style.display = "none";
		}
	}


    for(var i=0, ln=Arr.length; i<ln; i++){
		table.appendChild(Arr[i][0]);
    }
    
    Arr = null;
}

}