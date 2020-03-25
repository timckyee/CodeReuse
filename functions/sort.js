CodeReuse.Sort = function() {
	
};

CodeReuse.Sort.prototype = {

sortTable: function(tblId, column, gridColumnsInfo){
	
	var sortColumn = gridColumnsInfo[column].dbField;	
	
	var sortDirection = localStorage.getItem("arraySortDirection");
	
	if(sortColumn != localStorage.getItem("arraySortColumn"))
	{
		if(sortDirection == "asc")
		{
			localStorage.setItem("arraySortDirection", "asc");
		}
		else
		{
			if(tblId != localStorage.getItem("sortTableId"))
			{
				var sortColumnTablePrimaryKey;
				
				if(tblId == "tableSuite")
				{
					sortColumnTablePrimaryKey = "suiteId";
				}
				else
				{
					sortColumnTablePrimaryKey = "fieldPrimaryKey";
				}
				
				if(sortColumn == sortColumnTablePrimaryKey)
				{
					localStorage.setItem("arraySortDirection", "desc");
				}
				else
				{
					localStorage.setItem("arraySortDirection", "asc");
				}
					
				localStorage.setItem("sortTableId", tblId);
			}
			else
			{
				if(sortDirection == "asc")
				{
					localStorage.setItem("arraySortDirection", "desc");	
				}
				else
				{
					if(sortDirection == "desc")
						localStorage.setItem("arraySortDirection", "asc");
				}
			}
		}
	}
	else
	{
		if(sortDirection == "asc")
		{
			localStorage.setItem("arraySortDirection", "desc");	
		}
		else
		{
			if(sortDirection == "desc")
				localStorage.setItem("arraySortDirection", "asc");
		}			
	}
		
	localStorage.setItem("arraySortColumn", sortColumn);
		
	
	
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
    	
 	sortDirection = localStorage.getItem("arraySortDirection");	 	
    	
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