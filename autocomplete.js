
window.addEventListener("load", function() {

	var building_input = document.getElementById('building_input');
	
	building_input.addEventListener("keyup", function(event){autocomplete(event, "buildingSearchList", "BuildingCode", "BuildingId", "GET", "filter.php", "buildings")});

	var tenant_input = document.getElementById('tenant_input');
	
	tenant_input.addEventListener("keyup", function(event){autocomplete(event, "tenantSearchList", "SuiteNumber,TenantName", "TenantId",  "GET", "filter.php", "tenants", "building", document.getElementById("building_input").value)});
	
	window.autocompleteXmlHttpRequest = new XMLHttpRequest();
	
	var config = Config();
	var server = config.server;
					
	oldValuesArray = Array();	
	
	oldValues("save", "testinput", "test");
	oldValues("save", "testinput2", "test2");
	
	//alert(oldValues("get", "testinput"));
	//alert(oldValues("get", "testinput2"));
	
});

function oldValues(saveOrGet, arrayItem, arrayValue) {
	
	if(saveOrGet == "save")
	{			
		oldValuesArray[arrayItem] = arrayValue;
	}
	else if(saveOrGet == "get")
	{
		return oldValuesArray[arrayItem];
	}
	
}

function submitTest() {
	
	if(oldValues("get", "testinput") != document.getElementById('tenant_input').value)
	{
		alert('not same');
	}
	else
	{
		alert('same');
	}
	
};

function autocomplete(event, divElement, itemColumns, valueField, httpGetOrPost, phpFile, queryName, additionalArgs, additionalArgsValue) {
		
	var input = event.target;
	
	var searchList = document.getElementById(divElement);
	
	var min_character = 0;

	if(input.value.length < min_character) {
		return;
	} else {
		
		window.autocompleteXmlHttpRequest.abort();
		
		window.autocompleteXmlHttpRequest.onreadystatechange = function() {
			
			
			if (this.readyState == 4 && this.status == 200) {
				
				var response = JSON.parse(this.responseText);
				
				searchList.innerHTML = "";
				
				var tbl = document.createElement("table");
											
				response.forEach(function(item) {
				
					var row = document.createElement("tr");
					
					row.onclick = function() {
						
						var cellsCount = this.cells.length;
						var cellValue = "";
						
						if(cellsCount == 1)
							cellValue = this.cells[0].innerHTML;
						else {
							
							for(i=0; i<this.cells.length; i++)
								cellValue = cellValue + this.cells[i].innerHTML + ' ';
						}
						
						input.value = cellValue.trim();
						searchList.innerHTML = "";
						
						var rowAttributeValue = row.attributes[0].value;
					};
					
					var colArray = itemColumns.split(",");

					var cell;
					var cellText;
					
					for(i=0; i<colArray.length; i++)
					{
						cell = document.createElement("td");
						cellText = document.createTextNode(item[colArray[i]]);
						cell.appendChild(cellText);
						row.appendChild(cell);
						row.setAttribute("value", item[valueField]);
					}
					
					tbl.appendChild(row);
					
			  	});
				
				searchList.appendChild(tbl);
			}
		}
		
	};
	
	
	var queryString;
	if(additionalArgs == "")
		queryString = "queryName" + "=" + queryName + "&filter=" + input.value
	else
		queryString = "queryName" + "=" + queryName + "&filter=" + input.value + "&" + additionalArgs + "=" + additionalArgsValue;
	
	window.autocompleteXmlHttpRequest.open(httpGetOrPost, phpFile + "?" + queryString, true);
	window.autocompleteXmlHttpRequest.send();
	
}