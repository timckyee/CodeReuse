window.gridXmlHttpRequest = new XMLHttpRequest();
window.getXmlHttpRequest = new XMLHttpRequest();
window.postXmlHttpRequest = new XMLHttpRequest();

function grid(divElement, phpFile, queryName, gridIdField, databaseFieldsSelect, fieldsInfo, additionalArgs, additionalArgsValue) {
		
	var divTable = document.getElementById(divElement);
	
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
				
				row.className = "tableHover";
				
				row.onclick = function() {
					var cellValue = this.cells[0].innerHTML;
					
					var rowAttributeValue = row.attributes["gridIdField"].value;
					
					get_populateForm(phpFile, "populate", rowAttributeValue, htmlObjectFieldsSelect, databaseFieldsSelect, fieldsInfo, arrayOldValuesTable);
				};
				
				var cell;
				var cellText;
				
				for(i=0; i<colArray.length; i++)
				{	
					cell = document.createElement("td");
					
					var fieldInfo;
					
					for(field=0; field<fieldsInfo.length; field++)
					{
						fieldInfo = fieldsInfo[field];
						if(fieldInfo.name == colArray[i])
						{
							break;
						}
					}
					
					if(fieldInfo.dbType == "date")
					{	
						var dateFromDatabase = item[colArray[i]];
						
						var dateFormat = convertDateFromDatabase(dateFromDatabase);
						
						cellText = document.createTextNode(dateFormat);
					}
					else
					{
						cellText = document.createTextNode(item[colArray[i]]);
					}
					
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

function get_populateForm(phpFile, queryName, htmlObjectPrimaryKeyValue, htmlObjectFieldsSelect, databaseFieldsSelect, fieldsInfo, arrayOldValuesTable)
{	
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
			
			var record = response[0];
			
			var htmlObjectFieldsArray = htmlObjectFieldsSelect.split(",");
			var databaseFieldsArray = databaseFieldsSelect.split(",");
			
			for(i=0; i<htmlObjectFieldsArray.length; i++)
			{
				var fieldInfo;
				
				for(field=0; field<fieldsInfo.length; field++)
				{
					fieldInfo = fieldsInfo[field];
					
					if(fieldInfo.name == databaseFieldsArray[i])
					{
						break;
					}
				}
				
				if(fieldInfo.dbType == "date")
				{
					var dateFromDatabase = record[databaseFieldsArray[i]];
					
					var dateFormat = convertDateFromDatabase(dateFromDatabase);
					
					document.getElementById(htmlObjectFieldsArray[i]).value = dateFormat;
				}
				else
				{
					document.getElementById(htmlObjectFieldsArray[i]).value = record[databaseFieldsArray[i]];
				}
				
				arrayOldValuesTable[htmlObjectFieldsArray[i]] = document.getElementById(htmlObjectFieldsArray[i]).value;

				if(fieldInfo.htmlObjectType == "autocomplete")
				{
					document.getElementById(htmlObjectFieldsArray[i]).setAttribute("rowAttributeValue", document.getElementById(htmlObjectFieldsArray[i]).value);
					
				}
			}			
		}
	}
	
	var queryString = "queryName" + "=" + queryName + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "selectString" + "=" + encodeURIComponent(databaseFieldsSelect);
	
	window.getXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getXmlHttpRequest.send();
}

function post_updateForm(phpFile, postType, htmlObjectPrimaryKeyValue, htmlObjectFieldsUpdate, htmlObjectFieldsValuesUpdate, databaseFieldsUpdate, fieldsInfo, arrayOldValuesTable)
{		
	var htmlObjectFieldsArray = htmlObjectFieldsUpdate.split(",");
	var htmlObjectFieldsValuesArray = htmlObjectFieldsValuesUpdate.split(",");
	var databaseFieldsArray = databaseFieldsUpdate.split(",");
			
	var updateString = "";
	
	for(update=0; update<htmlObjectFieldsArray.length; update++)
	{
		var fieldInfo;
		
		for(field=0; field<fieldsInfo.length; field++)
		{
			fieldInfo = fieldsInfo[field];
			
			if(fieldInfo.name == databaseFieldsArray[update])
			{
				break;
			}
		}
		
		var htmlObjectField = htmlObjectFieldsArray[update];
		var htmlObjectFieldValue = htmlObjectFieldsValuesArray[update];
		var databaseField = databaseFieldsArray[update];
		
		if(htmlObjectFieldValue != arrayOldValuesTable[htmlObjectField])
		{
			if(fieldInfo.dbType == "date")
			{
				var dateFromSystem = htmlObjectFieldValue;
												
				var dateFormat = convertDateFromSystem(dateFromSystem);				
				
				updateString = updateString + databaseField + "='" + dateFormat + "',";
			}
			else
			{
				updateString = updateString + databaseField + "='" + htmlObjectFieldValue + "',";
			}
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
				
				for(update=0; update<htmlObjectFieldsArray.length; update++)
				{
					arrayOldValuesTable[htmlObjectFieldsArray[update]] = htmlObjectFieldsValuesArray[update]
				}
			}
		}
	
		var formVariables = "postType" + "=" + postType + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString);
			
		window.postXmlHttpRequest.open("POST", phpFile, true);
		window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		window.postXmlHttpRequest.send(formVariables);
	}
}

function post_insertRecordForm(phpFile, postType, htmlObjectFieldsInsert, htmlObjectFieldsValuesInsert, databaseFieldsInsert, fieldsInfo, inputPrimaryKey)
{	
	var htmlObjectFieldsArray = htmlObjectFieldsInsert.split(",");
	var htmlObjectFieldsValuesArray = htmlObjectFieldsValuesInsert.split(",");
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
		var fieldInfo;
		
		for(field=0; field<fieldsInfo.length; field++)
		{
			fieldInfo = fieldsInfo[field];
			
			if(fieldInfo.name == databaseFieldsArray[insert])
			{
				break;
			}
		}		

		var htmlObjectFieldsArrayInsertValue = htmlObjectFieldsValuesArray[insert];
	
		if(fieldInfo.dbType == "date")
		{
			var dateFromSystem = htmlObjectFieldsArrayInsertValue;
											
			var dateFormat = convertDateFromSystem(dateFromSystem);
			
			insertString = insertString + "'" + dateFormat + "',";
		}
		else
		{
			insertString = insertString + "'" + htmlObjectFieldsArrayInsertValue + "',";
		}
	}
	
	insertString = insertString.substr(0, insertString.length - 1);
	
	insertString = insertString + ")";
		
	window.postXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {	
		
			var insertId = this.responseText;
			
			document.getElementById(inputPrimaryKey).value = insertId;
			
			arrayOldValuesTable[inputPrimaryKey] = insertId;
						
			for(insert=0; insert<htmlObjectFieldsArray.length; insert++)
			{
				arrayOldValuesTable[htmlObjectFieldsArray[insert]] = htmlObjectFieldsValuesArray[insert];
			}
		}
	}	
	
	var formVariables = "postType" + "=" + postType + "&" + "insertString" + "=" + encodeURIComponent(insertString);
		
	window.postXmlHttpRequest.open("POST", phpFile, true);
	window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	window.postXmlHttpRequest.send(formVariables);
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

function convertDateFromDatabase(date)
{	
	var dateFromDatabase = date;
	
	var year = dateFromDatabase.substring(0,4);
	var month = dateFromDatabase.substring(5,7);
	var day = dateFromDatabase.substring(8,10);
	
	var dateFormat = day + "-" + dateMonthNumberToStringConversion(month) + "-" + year;
	
	return dateFormat;

}

function convertDateFromSystem(date)
{	
	var dateFromSystem = date;
	
	var day = dateFromSystem.substring(0,2);
	var month = dateFromSystem.substring(3,6);
	var year = dateFromSystem.substring(7,11);
	
	var dateFormat = year + "-" + dateMonthStringToNumberConversion(month) + "-" + day;
	
	return dateFormat;

}

function dateMonthStringToNumberConversion(monthString)
{
	var monthArray = [];
	
	monthArray["jan"] = "01";
	monthArray["feb"] = "02";
	monthArray["mar"] = "03";
	monthArray["apr"] = "04";
	monthArray["may"] = "05";
	monthArray["jun"] = "06";
	monthArray["jul"] = "07";
	monthArray["aug"] = "08";
	monthArray["sep"] = "09";
	monthArray["oct"] = "10";
	monthArray["nov"] = "11";
	monthArray["dec"] = "12";
	
	return monthArray[monthString];
}

function dateMonthNumberToStringConversion(monthNumber)
{
	var monthArray = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	
	return monthArray[parseInt(monthNumber) - 1];
}
