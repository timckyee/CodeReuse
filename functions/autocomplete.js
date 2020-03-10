
CodeReuse.Autocomplete = function() {
		
};

CodeReuse.Autocomplete.prototype = {

positionAutocomplete: function(inputAutocompleteId, divListId) {
	
	//debugger
	
	var positionInputAutocomplete = document.getElementById(inputAutocompleteId);
	
	var left = positionInputAutocomplete.offsetLeft;
	var top = positionInputAutocomplete.offsetTop;
	
	/*
	const rect = positionInputAutocomplete.getBoundingClientRect();
	
	var left = rect.left;
	var top = rect.top;
	*/
	
	var positionDivList = document.getElementById(divListId);
	
	positionDivList.style.left = left;
	positionDivList.style.top = top + positionInputAutocomplete.offsetHeight;
	
},

focusOutHide: function(div) {
	
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
},

oldValue: function(saveOrGet, arrayItem, arrayValue) {
		
	if(saveOrGet == "save")
	{			
		oldValuesArray[arrayItem] = arrayValue;
	}
	else if(saveOrGet == "get")
	{		
		return oldValuesArray[arrayItem];
	}
	
},

submitTest: function() {

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
	
},

/*
resetInputFields: function(queryName)
{
	if(queryName == "buildings")
	{
		document.getElementById("tenant_input").value = "";
	}
},
*/

autocomplete: function(event, divElement, itemColumns, valueField, httpGetOrPost, phpFile, queryName, additionalArgs, additionalArgsValue, positionResultsListInput, positionResultsListDiv) {
				
	var input = event.target;
	
	var searchList = document.getElementById(divElement);
	
	var min_character = 0;

	if(input.value.length < min_character) {
		return;
	} else {
		
		this.positionAutocomplete(positionResultsListInput, positionResultsListDiv);
		
		window.autocompleteXmlHttpRequest.onreadystatechange = function() {
			
			
			if (this.readyState == 4 && this.status == 200) {
				
				var response = JSON.parse(this.responseText);
				
				//this.positionAutocomplete(positionResultsListInput, positionResultsListDiv);
				
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
							document.getElementById("tenant_input").value = "";
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

}