
/*
window.addEventListener("load", function() {
	
	//sortTable("tableTenant",0);
	
});
*/

function sortTable(tblId, column){				
	
    var table = document.getElementById(tblId);
    
    var Arr = [];
    
    /*
    for(var i=1, ln=table.rows.length; i<ln; i++){
	    
        var row = table.rows[i];
        var firstCell = row.cells[0].textContent;
        var secondCell = row.cells[1].textContent;
        var thirdCell = row.cells[2].textContent;
        var fourthCell = row.cells[3].textContent;
        var fifthCell = row.cells[4].textContent;
        
		Arr.push([firstCell, secondCell, thirdCell, fourthCell, fifthCell, row]);  //temporary arrays
    }
    */
    
    for(var i=1, ln=table.rows.length; i<ln; i++){
	    
        var row = table.rows[i];
        
        var pushValues = "";
        
        for(cell=0; cell<row.cells.length; cell++)
        {
	        pushValues = pushValues + "\"" + row.cells[cell].textContent + "\",";
        }
        
		pushValues = pushValues.substr(0, pushValues.length - 1);
				
		var pushValuesRemoveQuotes = pushValues.slice(1, -1);
		
        Arr.push([pushValuesRemoveQuotes, row]);
        
    }
    
	var sortingFunctionColumn = function(a,b) {
				
		if(b == null)
			return;
		
		var x = a[0].split(",")[column];
		var y = b[0].split(",")[column];
				
		if (x < y) {return -1;}
		if (x > y) {return 1;}
		return 0;
		
	}
	
	Arr.sort(sortingFunctionColumn);
	
    for(var i=0, ln=Arr.length; i<ln; i++){
		table.appendChild(Arr[i][1]);
    }
    
    Arr = null;
}