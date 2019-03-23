
window.addEventListener("load", function() {
	
	sortTable();
	
});

function sortTable(){	
		
	var sortCol = 0;
			
    var table = document.getElementById("tblSort");
        
    var Arr = [];
    
    
    for(var i=0, ln=table.rows.length; i<ln; i++){
	    
        var row = table.rows[i];
        var firstCell = row.cells[sortCol].textContent;
        
		Arr.push([firstCell, row]);  //temporary array
    }

	// skip the header rows
	Arr[0] = null;

	Arr.sort();

    for(var i=0, ln=Arr.length; i<ln; i++){
	    if(Arr[i] != null)
    		table.appendChild(Arr[i][1]);
    }
    Arr = null;
}