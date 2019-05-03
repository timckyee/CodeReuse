window.addEventListener("load", function() {
	
	window.gridXmlHttpRequest = new XMLHttpRequest();
	window.getXmlHttpRequest = new XMLHttpRequest();
	window.postXmlHttpRequest = new XMLHttpRequest();
	
	document.getElementById("inputPrimaryKey").value = "";
	
	arrayOldValuesTable = [];
	
	grid("gridTenants", "grid_get_post.php", "table", "tableGridGetPost", "fieldPrimaryKey", "fieldPrimaryKey,field2,field3,field4,field5,selectField,selectField2");
	
});

function selectBuildingOnChange() {
	
	grid("gridTenants", "grid_get_post.php", "table", "tableGridGetPost", "fieldPrimaryKey", "fieldPrimaryKey,field2,field3,field4,field5,selectField,selectField2");
	
}

function grid(divElement, phpFile, queryName, tableName, valueField, itemColumns, additionalArgs, additionalArgsValue) {
	
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
					
					get("grid_get_post.php", "populate", "tableGridGetPost", rowAttributeValue, "inputPrimaryKey,input2,input3,input4,input5,selectWithValue,selectWithValue2", itemColumns, arrayOldValuesTable);
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
	
	var queryString;
	
	if(additionalArgs != undefined)
		queryString = "queryName" + "=" + queryName + "&" + "tableName=" + tableName + "&" + additionalArgs + "=" + additionalArgsValue;
	else
		queryString = "queryName" + "=" + queryName + "&" + "tableName=" + tableName;
	
	window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.gridXmlHttpRequest.send();
	
}

function get(phpFile, queryName, tableName, htmlObjectPrimaryKeyValue, htmlObjectFields, databaseFields, arrayOldValuesTable)
{	
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
			
			var record = response[0];
			
			var htmlObjectFieldsArray = htmlObjectFields.split(",");
			var databaseFieldsArray = databaseFields.split(",");
			
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
	
	var queryString = "queryName" + "=" + queryName + "&" + "tableName" + "=" + tableName + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue;
	
	window.getXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getXmlHttpRequest.send();
}

function post(phpFile, updateOrInsert, postType, tableName, htmlObjectPrimaryKeyValue, htmlObjectFields, databaseFields, arrayOldValuesTable)
{		
	var htmlObjectFieldsArray = htmlObjectFields.split(",");
	var databaseFieldsArray = databaseFields.split(",");
	
	if(updateOrInsert == "update")
	{		
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
				}
			}
		
			var formVariables = "postType" + "=" + postType + "&" + "tableName" + "=" + tableName + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString);
				
			window.postXmlHttpRequest.open("POST", phpFile, true);
			window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			window.postXmlHttpRequest.send(formVariables);
		}
	}
	else if(updateOrInsert == "insert")
	{
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
			
			}
		}	
		
		var formVariables = "postType" + "=" + postType + "&" + "tableName" + "=" + tableName + "&" + "insertString" + "=" + encodeURIComponent(insertString);
			
		window.postXmlHttpRequest.open("POST", phpFile, true);
		window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		window.postXmlHttpRequest.send(formVariables);		
	}
}

function save()
{
	var htmlObjectPrimaryKey = document.getElementById("inputPrimaryKey").value;
	
	if(htmlObjectPrimaryKey != "")
	{
		post("grid_get_post.php", "update", "updateTableGridGetPost", "tableGridGetPost", document.getElementById("inputPrimaryKey").value, "inputPrimaryKey,input2,input3,input4,input5,selectWithValue,selectWithValue2", "fieldPrimaryKey,field2,field3,field4,field5,selectField,selectField2", arrayOldValuesTable);
	}
	else if(htmlObjectPrimaryKey == "")
	{
		if(validateHtmlObjectFields("input2,input3,input4,input5,selectWithValue,selectWithValue2"))
		{
			post("grid_get_post.php", "insert", "createRecordTableGridGetPost", "tableGridGetPost", "", "input2,input3,input4,input5,selectWithValue,selectWithValue2", "field2,field3,field4,field5,selectField,selectField2", "");
		}
	}
	
	selectBuildingOnChange();
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