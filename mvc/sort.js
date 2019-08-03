
window.addEventListener("load", function() {
	
	//sortTable(0);
	
});

function sortTable(column){	
				
    var table = document.getElementById("tblSort");
        
    var Arr = [];
    
    for(var i=0, ln=table.rows.length; i<ln; i++){
	    
        var row = table.rows[i];
        var firstCell = row.cells[0].textContent;
        var secondCell = row.cells[1].textContent;
        
		Arr.push([firstCell, secondCell, row]);  //temporary array
    }

	// skip the header rows
	Arr[0] = null;

	var sortingFunctionColumn1 = function(a,b) {
		
		if(b == null)
			return;
		
		var x = a[0];
		var y = b[0];		
		if (x < y) {return -1;}
		if (x > y) {return 1;}
		return 0;
		
	}
	
	var sortingFunctionColumn2 = function(a,b) {
		
		if(b == null)
			return;
		
		var x = a[1];
		var y = b[1];		
		if (x < y) {return -1;}
		if (x > y) {return 1;}
		return 0;
		
	}

	if(column != 0)
	{
		if(column == 1)
			Arr.sort(sortingFunctionColumn1);
		else
		if(column == 2)
			Arr.sort(sortingFunctionColumn2);
	}

    for(var i=0, ln=Arr.length; i<ln; i++){
	    if(Arr[i] != null)
    		table.appendChild(Arr[i][2]);
    }
    Arr = null;
}