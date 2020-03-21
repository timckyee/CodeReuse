CodeReuse.Sort = function() {
	
};

CodeReuse.Sort.prototype = {

sortTable: function(tblId, column){
	
	//localStorage.removeItem("arraySortDirection");
	
	//return;
	
	
	var sortDirection;
	
	if(localStorage.getItem("sortTableId") != tblId)
	{
		localStorage.setItem("sortTableId", tblId);
		localStorage.setItem("arraySortDirection", "desc");
	}	
	else
	{
		sortDirection = localStorage.getItem("arraySortDirection");	
		
		if(sortDirection != null)
		{
			if(sortDirection == "asc")
				localStorage.setItem("arraySortDirection", "desc");	
			else
			if(sortDirection == "desc")
				localStorage.setItem("arraySortDirection", "asc");
		}
		else
		{
			localStorage.setItem("arraySortDirection", "desc");
		}
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
	   	sortingFunctionCompareColumn = column + 1;
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
			
			var x = a[0].cells[sortingFunctionCompareColumn].innerHTML;
			var y = b[0].cells[sortingFunctionCompareColumn].innerHTML;			
						
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
			
			var x = a[0].cells[sortingFunctionCompareColumn].innerHTML;
			var y = b[0].cells[sortingFunctionCompareColumn].innerHTML;			
						
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