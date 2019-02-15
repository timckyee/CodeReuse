window.addEventListener("load", function() {
	
	window.gridXmlHttpRequest = new XMLHttpRequest();
	
	grid("gridTenants", "SuiteNumber,FirstName,LastName,MoveInDate,CurrentRent", "TenantId", "GET","grid.php", "tenants", "buildingId", document.getElementById("selectBuilding").value);
	
});

function selectBuildingOnChange() {
	
	grid("gridTenants", "SuiteNumber,FirstName,LastName,MoveInDate,CurrentRent", "TenantId", "GET","grid.php", "tenants", "buildingId", document.getElementById("selectBuilding").value);	
	
}

function grid(divElement, itemColumns, valueField, httpGetOrPost, phpFile, queryName, additionalArgs, additionalArgsValue) {
	
	var divTable = document.getElementById(divElement);
		
	window.gridXmlHttpRequest.abort();
	
	window.gridXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
			
			divTable.innerHTML = "";
			
			var tbl = document.createElement("table");					
										
			var tableHeaderRow = document.createElement("tr");
			
			
			var colArray = itemColumns.split(",");
			
			var tableHeader;
			var tableHeaderText;
			
			for(i=0; i<colArray.length; i++)
			{
				tableHeader = document.createElement("th");
				tableHeaderText = document.createTextNode(colArray[i]);
				tableHeader.appendChild(tableHeaderText);
				tableHeaderRow.appendChild(tableHeader);				
			}	
			
			tbl.appendChild(tableHeaderRow);
										
										
			response.forEach(function(item) {
			
				var row = document.createElement("tr");
				
				row.onclick = function() {
					var cellValue = this.cells[0].innerHTML;
					
					var rowAttributeValue = row.attributes["valueField"].value;
				};
				
				var cell;
				var cellText;
				
				for(i=0; i<colArray.length; i++)
				{
					cell = document.createElement("td");
					cellText = document.createTextNode(item[colArray[i]]);
					cell.appendChild(cellText);
					row.appendChild(cell);					
					row.setAttribute("valueField", item[valueField]);				
				}
				
				tbl.appendChild(row);
								
			});
			
			divTable.appendChild(tbl);
		}
	};
	
	var queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue;
	
	window.gridXmlHttpRequest.open(httpGetOrPost, phpFile + "?" + queryString, true);
	window.gridXmlHttpRequest.send();
	
}