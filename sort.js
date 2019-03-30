
window.addEventListener("load", function() {
	
	sortTable();
	
});

function sortTable(){	
				
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

    var sortingFunction = function(a,b) {
		
		var comparison = 0;
		
		if(b == null)
			return;
			
	    var currentKeyA_col1 = a[0].toLowerCase();
	    var currentKeyB_col1 = b[0].toLowerCase();
	    
	    var currentKeyA_col2 = a[1].toLowerCase();
	    var currentKeyB_col2 = b[1].toLowerCase();
	    
	    if(currentKeyA_col1 > currentKeyB_col1)
	    {
		    comparison = 1;
	    }
	    else
	    if(currentKeyA_col1 < currentKeyB_col1)
	    {
		    comparison = -1;
	    }
	    
	    if(comparison === 0)
	    {		    
		    if(currentKeyA_col2 > currentKeyB_col2)
		    {
			    comparison = 1;
		    }
		    else
		    if(currentKeyA_col2 < currentKeyB_col2)
		    {
			    comparison = -1;
		    }
	    }
	    
	    return comparison;
		
	};

	Arr.sort(sortingFunction);

    for(var i=0, ln=Arr.length; i<ln; i++){
	    if(Arr[i] != null)
    		table.appendChild(Arr[i][2]);
    }
    Arr = null;
}