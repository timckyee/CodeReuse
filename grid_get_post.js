function init()
{
	window.gridXmlHttpRequest = new XMLHttpRequest();
	window.getXmlHttpRequest = new XMLHttpRequest();
	window.postXmlHttpRequest = new XMLHttpRequest();
	
	phpFile = "grid_get_post.php";
	
	htmlObjectFieldsSelect = "inputPrimaryKey,input2,input3,input4,input5,selectWithValue,selectWithValue2";
	databaseFieldsSelect = "fieldPrimaryKey,field2,field3,field4,field5,selectField,selectField2";

	htmlObjectFieldsUpdate = "inputPrimaryKey,input2,input3,input4,input5,selectWithValue,selectWithValue2";
	databaseFieldsUpdate = "fieldPrimaryKey,field2,field3,field4,field5,selectField,selectField2";
	
	htmlObjectFieldsInsert = "input2,input3,input4,input5,selectWithValue,selectWithValue2";
	databaseFieldsInsert = "field2,field3,field4,field5,selectField,selectField2";
	
	arrayOldValuesTable = [];
}

window.addEventListener("load", function() {
	
	init();	
	
	document.getElementById("inputPrimaryKey").value = "";
	
	grid("gridGetPost", phpFile, "gridtable", "fieldPrimaryKey", databaseFieldsSelect);
	
});

function refreshGridGetPost() {
	
	grid("gridGetPost", phpFile, "gridtable", "fieldPrimaryKey", databaseFieldsSelect);
	
}

function grid(divElement, phpFile, queryName, gridIdField, databaseFieldsSelect, additionalArgs, additionalArgsValue) {
	
	var divTable = document.getElementById(divElement);
		
	window.gridXmlHttpRequest.abort();
	
	window.gridXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
			
			divTable.innerHTML = "";
			
			var tbl = document.createElement("table");					
										
			var tableHeaderRow = document.createElement("tr");
			
			var colArray = databaseFieldsSelect.split(",");
			
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
					
					var rowAttributeValue = row.attributes["gridIdField"].value;
					
					get_populateForm(phpFile, "populate", rowAttributeValue, htmlObjectFieldsSelect, databaseFieldsSelect, arrayOldValuesTable);
				};
				
				var cell;
				var cellText;
				
				for(i=0; i<colArray.length; i++)
				{
					cell = document.createElement("td");
					cellText = document.createTextNode(item[colArray[i]]);
					cell.appendChild(cellText);
					row.appendChild(cell);					
					row.setAttribute("gridIdField", item[gridIdField]);				
				}
				
				tbl.appendChild(row);
								
			});
			
			divTable.appendChild(tbl);
		}
	};
	
	var queryString;
	
	if(additionalArgs != undefined)
		queryString = "queryName" + "=" + queryName + "&" + "selectString" + "=" + encodeURIComponent(databaseFieldsSelect) + "&" + additionalArgs + "=" + additionalArgsValue;
	else
		queryString = "queryName" + "=" + queryName + "&" + "selectString" + "=" + encodeURIComponent(databaseFieldsSelect);
	
	window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.gridXmlHttpRequest.send();
	
}

function get_populateForm(phpFile, queryName, htmlObjectPrimaryKeyValue, htmlObjectFieldsSelect, databaseFieldsSelect, arrayOldValuesTable)
{	
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
			
			var record = response[0];
			
			var htmlObjectFieldsArray = htmlObjectFieldsSelect.split(",");
			var databaseFieldsArray = databaseFieldsSelect.split(",");
			
			for(i=0; i<htmlObjectFieldsArray.length; i++)
			{
				document.getElementById(htmlObjectFieldsArray[i]).value = record[databaseFieldsArray[i]];
			}
			
			for(i=0; i<htmlObjectFieldsArray.length; i++)
			{
				arrayOldValuesTable[htmlObjectFieldsArray[i]] = document.getElementById(htmlObjectFieldsArray[i]).value;
			}
		}
	}
	
	var queryString = "queryName" + "=" + queryName + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "selectString" + "=" + encodeURIComponent(databaseFieldsSelect);
	
	window.getXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getXmlHttpRequest.send();
}

function post_updateForm(phpFile, postType, htmlObjectPrimaryKeyValue, htmlObjectFieldsUpdate, databaseFieldsUpdate, arrayOldValuesTable)
{		
	var htmlObjectFieldsArray = htmlObjectFieldsUpdate.split(",");
	var databaseFieldsArray = databaseFieldsUpdate.split(",");
			
	var updateString = "";
	
	for(update=0; update<htmlObjectFieldsArray.length; update++)
	{
		var htmlObjectField = htmlObjectFieldsArray[update];
		var databaseField = databaseFieldsArray[update];
		
		if(document.getElementById(htmlObjectField).value != arrayOldValuesTable[htmlObjectField])
		{
			updateString = updateString + databaseField + "=" + document.getElementById(htmlObjectField).value + ",";
		}
	}
	
	if(updateString != "")
	{
		if(!confirm('There are changes to the fields. Continue with the update?'))
		{
			return;
		}
					
		updateString = updateString.substr(0, updateString.length - 1)
						
		window.postXmlHttpRequest.onreadystatechange = function() {
			
			if (this.readyState == 4 && this.status == 200) {	
			
				//var response = this.responseText;
				
				for(update=0; update<htmlObjectFieldsArray.length; update++)
				{
					arrayOldValuesTable[htmlObjectFieldsArray[update]] = document.getElementById(htmlObjectFieldsArray[update]).value;
				}
				
				refreshGridGetPost();
			}
		}
	
		var formVariables = "postType" + "=" + postType + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString);
			
		window.postXmlHttpRequest.open("POST", phpFile, true);
		window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		window.postXmlHttpRequest.send(formVariables);
	}
}

function post_insertRecordForm(phpFile, postType, htmlObjectFieldsInsert, databaseFieldsInsert)
{
	var htmlObjectFieldsArray = htmlObjectFieldsInsert.split(",");
	var databaseFieldsArray = databaseFieldsInsert.split(",");	
	
	if(!confirm('Confirm to create new record?'))
	{
		return;
	}		
	
	var insertString = "";
	
	insertString = insertString + "(";
	
	for(insert=0; insert<databaseFieldsArray.length; insert++)
	{
		insertString = insertString + databaseFieldsArray[insert] + ",";
	}
	
	insertString = insertString.substr(0, insertString.length - 1);
	
	insertString = insertString + ")";
	
	insertString = insertString + " values (";
	
	for(insert=0; insert<htmlObjectFieldsArray.length; insert++)
	{
		var htmlObjectFieldsArrayInsertValue = document.getElementById(htmlObjectFieldsArray[insert]).value;
					
		if(htmlObjectFieldsArrayInsertValue != "")
			insertString = insertString + document.getElementById(htmlObjectFieldsArray[insert]).value + ",";
		else
			insertString = insertString + "'',";
	}
	
	insertString = insertString.substr(0, insertString.length - 1);
	
	insertString = insertString + ")";
		
	window.postXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {	
		
			//var response = this.responseText;
		
			refreshGridGetPost();
		
		}
	}	
	
	var formVariables = "postType" + "=" + postType + "&" + "insertString" + "=" + encodeURIComponent(insertString);
		
	window.postXmlHttpRequest.open("POST", phpFile, true);
	window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	window.postXmlHttpRequest.send(formVariables);
}

function save()
{
	var htmlObjectPrimaryKey = document.getElementById("inputPrimaryKey").value;
	
	if(htmlObjectPrimaryKey != "")
	{
		post_updateForm(phpFile, "updateTableGridGetPost", document.getElementById("inputPrimaryKey").value, htmlObjectFieldsUpdate, databaseFieldsUpdate, arrayOldValuesTable);
	}
	else if(htmlObjectPrimaryKey == "")
	{
		if(validateHtmlObjectFields(htmlObjectFieldsInsert))
		{
			post_insertRecordForm(phpFile, "createRecordTableGridGetPost", htmlObjectFieldsInsert, databaseFieldsInsert);
		}
	}
}

function newRecord()
{
	document.getElementById("inputPrimaryKey").value = "";
	document.getElementById("input2").value = "";
	document.getElementById("input3").value = "";
	document.getElementById("input4").value = "";
	document.getElementById("input5").value = "";
	document.getElementById("selectWithValue").value = "";
	document.getElementById("selectWithValue2").value = "";
}

function validateHtmlObjectFields(htmlObjectFields)
{
	var htmlObjectFieldsArray = htmlObjectFields.split(",");
	
	for(validate=0; validate<htmlObjectFieldsArray.length; validate++)
	{
		if(document.getElementById(htmlObjectFieldsArray[validate]).value == "")
		{
			alert(htmlObjectFieldsArray[validate] + ' ' + 'cannot be empty');
			return false;
		}
	}
	
	return true;
}