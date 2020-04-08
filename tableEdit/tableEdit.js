
window.addEventListener("load", function() {

	var divTable = document.getElementById('gridTable');

    var phpFile = "tableEdit.php";
    var queryName = "gridtablehome";
    var sortColumn = "fieldPrimaryKey";
    var sortDirection = "asc";
    var callback = gridCallbackTable;

    window.gridXmlHttpRequest = new XMLHttpRequest(); 

	window.gridXmlHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {
            
			var response = JSON.parse(this.responseText);				
            
            callback(divTable, response);

		}
	};
        
    var queryString = "queryName" + "=" + queryName + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection;

	window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.gridXmlHttpRequest.send();

});


function gridCallbackTable(divTable, response) {

	var tbl = document.createElement("table");
    tbl.id = 'tableEdit';

    var row;
    var cell;
    var cellText;

    for(var i = 0; i < response.length; i++)
    {
        row = document.createElement("tr");

        cell = document.createElement("td");
				
        cell.style.paddingLeft = "10px";
                    
        cellText = document.createTextNode("edit");
        
        cell.value = response[i].fieldPrimaryKey;
        
        cell.onclick = function(editCellObject) { 

            var fieldPrimaryKey = editCellObject.srcElement.parentNode.cells[0].value;

            alert('edit: ' + 'rowid=' + fieldPrimaryKey); 
            
        }	
            
        cell.className = "underline";
        cell.appendChild(cellText);
        
        cell.height = 25;
        
        row.appendChild(cell);


        cell = document.createElement("td");
        cellText = document.createTextNode(response[i].fieldPrimaryKey);
        cell.appendChild(cellText);
        
        row.appendChild(cell); 

        cell = document.createElement("td");
        cellText = document.createTextNode(response[i].buildingName);
        cell.appendChild(cellText);  
        
        row.appendChild(cell);
        
        cell = document.createElement("td");
        cellText = document.createTextNode(response[i].tenantName);
        cell.appendChild(cellText);  
        
        row.appendChild(cell);     
        
        cell = document.createElement("td");
        cellText = document.createTextNode(response[i].field1);
        cell.appendChild(cellText);  
        
        row.appendChild(cell);    
        
        cell = document.createElement("td");
        cellText = document.createTextNode(response[i].field2);
        cell.appendChild(cellText);  
        
        row.appendChild(cell);  
       
        tbl.appendChild(row);

    }

    var tableEdit = tbl;

    // replace second row with save
    var rowReplace = tableEdit.rows[1];
    
    // new row
    var newRow = document.createElement('tr');
    
    var cell = document.createElement("td");
				
    cell.style.paddingLeft = "10px";
                
    var cellText = document.createTextNode("save");
    
    // cell value 2
    cell.value = '2';
    
    cell.onclick = function(saveCellObject) { 
        
        var fieldPrimaryKey = saveCellObject.srcElement.parentNode.cells[0].value;

        alert('save: ' + 'rowid=' + fieldPrimaryKey); 
        
    }	
        
    cell.className = "underline";
    cell.appendChild(cellText);
    
    cell.height = 25;
    
    newRow.appendChild(cell);

    // create text node 2
    cell = document.createElement("td");
    cellText = document.createTextNode('2');
    cell.appendChild(cellText);
    
    newRow.appendChild(cell); 

    cell = document.createElement("td");
    cellText = document.createTextNode('building');
    cell.appendChild(cellText);  
    
    newRow.appendChild(cell);
    
    cell = document.createElement("td");
    cellText = document.createTextNode('firstname1 lastname');
    cell.appendChild(cellText);  
    
    newRow.appendChild(cell);     
    
    cell = document.createElement("td");
    cellText = document.createTextNode('2019-08-01');
    cell.appendChild(cellText);  
    
    newRow.appendChild(cell);    
    
    cell = document.createElement("td");
    cellText = document.createTextNode('2019-08-04');
    cell.appendChild(cellText);  
    
    newRow.appendChild(cell);


    rowReplace.parentNode.replaceChild(newRow, rowReplace)

    divTable.innerText = "";
	
	divTable.appendChild(tbl);

}