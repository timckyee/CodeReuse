
window.addEventListener("load", function() {

	var building_input = document.getElementById("building_input");
	
	building_input.addEventListener("keyup", function(event){autocomplete(event, "buildingSearchList", "BuildingCode", "BuildingId", "GET", "filter.php", "buildings", "", "", "building_input", "buildingSearchList")});

	var tenant_input = document.getElementById("tenant_input");
	
	tenant_input.addEventListener("keyup", function(event){autocomplete(event, "tenantSearchList", "SuiteNumber,TenantName", "TenantId",  "GET", "filter.php", "tenants", "building", document.getElementById("building_input").getAttribute("rowAttributeValue"), "tenant_input", "tenantSearchList")});
	
	building_input.addEventListener("focusout", function() { focusOutHide ("buildingSearchList"); });
	tenant_input.addEventListener("focusout", function() { focusOutHide ("tenantSearchList"); });
		
	window.autocompleteXmlHttpRequest = new XMLHttpRequest();
	
	var config = Config();
	var server = config.server;
					
	oldValuesArray = Array();	
	
});

function positionAutcomplete(inputAutocompleteId, divListId) {
	
	var positionInputAutocomplete = document.getElementById(inputAutocompleteId);
	
	var left = positionInputAutocomplete.offsetLeft;
	var top = positionInputAutocomplete.offsetTop;
	
	var positionDivList = document.getElementById(divListId);
	
	positionDivList.style.left = left;
	positionDivList.style.top = top + positionInputAutocomplete.offsetHeight;
	
}

function focusOutHide(div) {
	
	if(div == "buildingSearchList")
	{
		if(document.getElementById("buildingSearchList").innerHTML != "")
		{
			document.getElementById("building_input").focus();
			return;
		}
	}
	else
	if(div == "tenantSearchList")
	{
		if(document.getElementById("tenantSearchList").innerHTML != "")
		{
			document.getElementById("tenant_input").focus();
			return;
		}
	}
}

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

	var tenant_input_object = document.getElementById("tenant_input");
	var tenant_input_old_values = oldValues("get", "tenant_input");
	
	if(tenant_input_object.value != "")
	{		
		if(tenant_input_object.value != tenant_input_old_values)
		{
			alert('not same');
		}
		else
		{
			alert('same');
		}
	}
	
	oldValues("save", "tenant_input", tenant_input_object.value);
	
};

function resetInputFields(input)
{
	if(input == "buildings")
	{
		document.getElementById("tenant_input").value = "";
	}	
}

function autocomplete(event, divElement, itemColumns, valueField, httpGetOrPost, phpFile, queryName, additionalArgs, additionalArgsValue, positionResultsListInput, positionResultsListDiv) {
		
	var input = event.target;
	
	var searchList = document.getElementById(divElement);
	
	var min_character = 0;

	if(input.value.length < min_character) {
		return;
	} else {
		
		window.autocompleteXmlHttpRequest.onreadystatechange = function() {
			
			
			if (this.readyState == 4 && this.status == 200) {
				
				var response = JSON.parse(this.responseText);
				
				positionAutcomplete(positionResultsListInput, positionResultsListDiv);
				
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
						
						input.setAttribute("rowAttributeValue", rowAttributeValue);
						
						if(queryName == "buildings")
						{
							resetInputFields("buildings");
						}
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
					
					row.className = "autocomplete";
					
					tbl.appendChild(row);
					
			  	});
				
				searchList.appendChild(tbl);
			}
		}
		
	};
	
	var queryString;
	if(additionalArgs == "")
		queryString = "queryName" + "=" + queryName + "&filter=" + input.value;
	else
		queryString = "queryName" + "=" + queryName + "&filter=" + input.value + "&" + additionalArgs + "=" + additionalArgsValue;
	
	window.autocompleteXmlHttpRequest.open(httpGetOrPost, phpFile + "?" + queryString, true);
	window.autocompleteXmlHttpRequest.send();
	
}