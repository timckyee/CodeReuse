window.gridXmlHttpRequest = new XMLHttpRequest();
window.getXmlHttpRequest = new XMLHttpRequest();
window.postXmlHttpRequest = new XMLHttpRequest();

function gridCallback(response, divTable, sortTableHtmlObjectId, sortTableColumns, fieldsInfo, gridIdField, gridColumnsInfo) {
		
	divTable.innerHTML = "";
	
	var tbl = document.createElement("table");
	tbl.id = sortTableHtmlObjectId;		
								
	var tableHeaderRow = document.createElement("tr");
	
	var tableHeader;
	var tableHeaderText;		
				
	for(i=0; i<gridColumnsInfo.length; i++)
	{				
		tableHeader = document.createElement("th");
			
		tableHeader.onclick = sortTableColumnOnclickHandler(sortTableHtmlObjectId, sortTableColumns, gridColumnsInfo, i);
		
		var columnName = gridColumnsInfo[i].colName;
		
		tableHeaderText = document.createTextNode(columnName);
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
								
			get_populateForm(phpFile, "populate", rowAttributeValue, htmlObjectFieldsSelect, databaseFieldsSelect, fieldsInfo, gridColumnsInfo, arrayOldValuesTable, get_populateForm_callback);
		};
		
		var cell;
		var cellText;
		
		for(i=0; i<gridColumnsInfo.length; i++)
		{	
			cell = document.createElement("td");
			
			var colType = gridColumnsInfo[i].colType;
			
			if(colType == "date")
			{	
				var dateFromDatabase = item[gridColumnsInfo[i].id];
				
				var dateFormat = convertDateFromDatabase(dateFromDatabase);
				
				cellText = document.createTextNode(dateFormat);
			}
			else
			{
				cellText = document.createTextNode(item[gridColumnsInfo[i].id]);
			}
			
			cell.appendChild(cellText);
			row.appendChild(cell);				
			row.setAttribute("gridIdField", item[gridIdField]);		
		}
		
		tbl.appendChild(row);
		
	});
	
	divTable.appendChild(tbl);
	
}

function grid(divElement, phpFile, queryName, gridIdField, databaseFieldsSelect, fieldsInfo, gridColumnsInfo, sortTableHtmlObjectId, sortTableColumns, additionalArgs, additionalArgsValue, callback) {
	
	var divTable = document.getElementById(divElement);
	
	window.gridXmlHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
						
			callback(response, divTable, sortTableHtmlObjectId, sortTableColumns, fieldsInfo, gridIdField, gridColumnsInfo);
					
		}
	};
	
	var queryString;
	
	if(additionalArgs != undefined)
		queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue;
	else
		queryString = "queryName" + "=" + queryName;
	
	window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.gridXmlHttpRequest.send();
	
}

function sortTableColumnOnclickHandler(sortTableHtmlObjectId, sortTableColumns, gridColumnsInfo, column) {
	
	return function() { 
	
		var sortTableColumnsCount = sortTableColumns.split(",").length;

		for(sort=0; sort<sortTableColumnsCount; sort++)
		{
			var sortFieldArray = sortTableColumns.split(",");
			var sortFieldKeyValue = sortFieldArray[sort].split("=");
			var sortFieldKey = sortFieldKeyValue[0];
			var sortFieldValue = sortFieldKeyValue[1];
			
			if(sortFieldKey == gridColumnsInfo[column].id)
			{
				sortTable(sortTableHtmlObjectId, sortFieldValue);
			}
		};			
	};
}

function get_populateForm_callback(response, fieldsInfo, gridColumnsInfo)
{
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
			var dateFromDatabase = record[gridColumnsInfo[i].id];
			
			var dateFormat = convertDateFromDatabase(dateFromDatabase);
			
			document.getElementById(htmlObjectFieldsArray[i]).value = dateFormat;
			
			arrayOldValuesTable[htmlObjectFieldsArray[i]] = dateFormat;
		}
		else
		{
			if(fieldInfo.htmlObjectType == "autocomplete")
			{	
				document.getElementById(htmlObjectFieldsArray[i]).value = record[gridColumnsInfo[i].id + "display"];
				
				document.getElementById(htmlObjectFieldsArray[i]).setAttribute("rowAttributeValue", record[gridColumnsInfo[i].id]);
				
				arrayOldValuesTable[htmlObjectFieldsArray[i]] = record[gridColumnsInfo[i].id];
			}
			else
			{	
				document.getElementById(htmlObjectFieldsArray[i]).value = record[gridColumnsInfo[i].id];
				
				arrayOldValuesTable[htmlObjectFieldsArray[i]] = record[gridColumnsInfo[i].id];
			}
		}
	}
}

function get_populateForm(phpFile, queryName, htmlObjectPrimaryKeyValue, htmlObjectFieldsSelect, databaseFieldsSelect, fieldsInfo, gridColumnsInfo, arrayOldValuesTable, callback)
{		
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
			
			callback(response, fieldsInfo, gridColumnsInfo);
		
		}
	}
	
	var queryString = "queryName" + "=" + queryName + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue;
		
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
					arrayOldValuesTable[htmlObjectFieldsArray[update]] = htmlObjectFieldsValuesArray[update];
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
