CodeReuse.Sort = function() {
	
};

CodeReuse.Sort.prototype = {

sortTable: function(tblId, column, gridColumnsInfo){
		
	var sortColumn = gridColumnsInfo[column].id;
	
	if(tblId == "tableSuite")
	{
		var sortDirection_suite = localStorage.getItem("arraySortDirection_suite");	
		
		if(sortColumn != localStorage.getItem("arraySortColumn_suite"))
		{
			
			if(sortColumn == "suiteId")
			{
				localStorage.setItem("arraySortDirection_suite", "desc");
			}
			else
			{
				localStorage.setItem("arraySortDirection_suite", "asc");
			}
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
		
	}
	else if(tblId == "tableTenant")
	{
		var sortDirection_tenant = localStorage.getItem("arraySortDirection_tenant");	
		
		if(sortColumn != localStorage.getItem("arraySortColumn_tenant"))
		{
			if(sortColumn == "fieldPrimaryKey")
			{
				localStorage.setItem("arraySortDirection_tenant", "desc");
			}
			else
			{
				localStorage.setItem("arraySortDirection_tenant", "asc");
			}
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
	}
	
	var table = document.getElementById(tblId);
    
    var Arr = [];
    
	var header = table.rows[0];
	    
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

    for(var i=0, ln=Arr.length; i<ln; i++){
		table.appendChild(Arr[i][0]);
    }
    
    Arr = null;
}

}