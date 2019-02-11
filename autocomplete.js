
window.addEventListener("load", function() {

	var building_input = document.getElementById('building_input');
	
	building_input.addEventListener("keyup", function(event){autocomplete(event, "buildingSearchList", "BuildingCode", "BuildingId", "GET", "filter.php", "buildings")});

	var tenant_input = document.getElementById('tenant_input');
	
	tenant_input.addEventListener("keyup", function(event){autocomplete(event, "tenantSearchList", "SuiteNumber,FirstName,LastName", "TenantId", "GET", "filter.php", "tenants", "building", document.getElementById("building_input").value)});
	
	window.autocompleteXHR = new XMLHttpRequest();
	
});


function autocomplete(event, divElement, itemColumns, valueField, httpGetOrPost, phpFile, queryName, additionalArgs, additionalArgsValue) {
		
	var input = event.target;
	
	var searchList = document.getElementById(divElement);
	
	var min_character = 0;

	if(input.value.length < min_character) {
		return;
	} else {
		
		window.autocompleteXHR.abort();
		
		window.autocompleteXHR.onreadystatechange = function() {
			
			
			if (this.readyState == 4 && this.status == 200) {
				
				var response = JSON.parse(this.responseText);
				
				searchList.innerHTML = "";
				
				var tbl = document.createElement("table");
											
				response.forEach(function(item) {
				
					var row = document.createElement("tr");
					
					row.onclick = function() {
						var cellValue = this.cells[0].innerHTML;
						input.value = cellValue;
						searchList.innerHTML = "";
						
						var rowAttributeValue = row.attributes[0].value;
					};
					
					var cell = document.createElement("td");
					
					var colArray = itemColumns.split(",");

					var cellText;
					if(colArray.length == 1)		
						cellText = document.createTextNode(item[colArray[0]]);
					else
						cellText = document.createTextNode(item[colArray[0]] + ' ' + item[colArray[1]] + ' ' + item[colArray[2]]);
					
					cell.appendChild(cellText);
					row.appendChild(cell);
					
					row.setAttribute("value", item[valueField]);
					
					tbl.appendChild(row);
					
				})
				
				searchList.appendChild(tbl);
			}
		}
		
	};
	
	
	var queryString;
	if(additionalArgs == "")
		queryString = "queryName" + "=" + queryName + "&filter=" + input.value
	else
		queryString = "queryName" + "=" + queryName + "&filter=" + input.value + "&" + additionalArgs + "=" + additionalArgsValue;
	
	window.autocompleteXHR.open(httpGetOrPost, phpFile + "?" + queryString, true);
	window.autocompleteXHR.send();

}