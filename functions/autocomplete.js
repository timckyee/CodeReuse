/**
 * Class for creating autocomplete input box
 * @class
 **/
CodeReuse.Autocomplete = function() {
		
};

CodeReuse.Autocomplete.prototype = {

/**
 * Position and align the autocomplete dropdown list with the input box
 * @function
 * @name Autocomplete#positionAutocomplete
 * 
 * @param {string} inputAutocompleteId input box html id
 * @param {string} divListId div list html id
 **/
positionAutocomplete: function(inputAutocompleteId, divListId) {
		
	var positionInputAutocomplete = document.getElementById(inputAutocompleteId);
	
	var left = positionInputAutocomplete.offsetLeft;
	var top = positionInputAutocomplete.offsetTop;
	
	var positionDivList = document.getElementById(divListId);
	
	positionDivList.style.left = left;
	positionDivList.style.top = top + positionInputAutocomplete.offsetHeight;
	
},

/**
 * On focus out of autocomplete tenant input force user to select value from drop down list
 * @function
 * @name Autocomplete#focusOutHide
 * 
 * @param {string} div id of the autocomplete drop down list
 **/
focusOutHide: function(div) {
	
	/*
	if(div == "buildingSearchList")
	{
		if(document.getElementById("buildingSearchList").innerHTML != "")
		{
			document.getElementById("building_input").focus();
			return;
		}
	}
	*/

	/*
	if(div == "tenantSearchList")
	{
		if(document.getElementById("tenantSearchList").innerHTML != "")
		{
			document.getElementById("tenant_input").focus();
			return;
		}
	}
	*/
},

/**
 * The main autocomplete function
 * @function
 * @name Autocomplete#autocomplete
 *  
 * @param {Object} event key up event when user types in the input box
 * @param {string} object no need for this param
 * @param {string} divElement div search list id
 * @param {string} itemColumns comma separated list of database field columns to show in teh search list
 * @param {string} valueField primary key of the search list row
 * @param {string} httpGetOrPost http method get or post
 * @param {string} phpFile php file name and location
 * @param {string} queryName the php query name for http method
 * @param {string} additionalArgs additional arguments to pass into the XMLHttpRequest get
 * @param {string} additionalArgsValue additional arguments value to pass into the XMLHttpRequest get
 * @param {string} positionResultsListInput input box html id
 * @param {string} positionResultsListDiv div list html id
 **/
autocomplete: function(event, object, divElement, itemColumns, valueField, httpGetOrPost, phpFile, queryName, additionalArgs, additionalArgsValue, positionResultsListInput, positionResultsListDiv) {

	var input;

	/*
	if(object == "gridInput")
	{
		input = event;
	}
	else if(object == "formInput")
	{
		input = event.target;
	}
	*/

	input = event.target;
	
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
				tbl.className = "autocomplete";
											
				response.forEach(function(item) {
				
					var row = document.createElement("tr");
					
					row.onclick = function() {

						var cellValue = this.cells[1].innerHTML;
												
						input.value = cellValue.trim();
						searchList.innerHTML = "";
						
						var rowAttributeValue = row.attributes[0].value;
						
						input.setAttribute("rowAttributeValue", rowAttributeValue);
						
						if(queryName == "buildings")
						{							
							document.getElementById("tenant_input").value = "";
						}
						
						searchList.style.display = "none";
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
					
					//row.className = "autocomplete";
					
					tbl.appendChild(row);
					
			  	});
				
				searchList.appendChild(tbl);

				searchList.style.display = "block";
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