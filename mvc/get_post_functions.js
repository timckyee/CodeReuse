
function gridCallback(response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, tenantGridRowOnClick) {
		
	divTable.innerHTML = "";
	
	var tbl = document.createElement("table");
	tbl.id = tableHtmlObjectId;		
								
	var tableHeaderRow = document.createElement("tr");
	
	var tableHeader;
	var tableHeaderText;		
	
	for(i=0; i<gridColumnsInfo.length; i++)
	{				
		tableHeader = document.createElement("th");
			
		tableHeader.onclick = sortTableColumnOnclickHandler(tableHtmlObjectId, gridColumnsInfo, i);
		
		var columnName = gridColumnsInfo[i].colName;
		
		tableHeaderText = document.createTextNode(columnName);
		tableHeader.appendChild(tableHeaderText);
		tableHeaderRow.appendChild(tableHeader);				
	}
	
	tbl.appendChild(tableHeaderRow);
	
	response.forEach(function(item) {
	
		var row = document.createElement("tr");
		
		row.className = "tableHover";
		
		row.onclick = tenantGridRowOnClick(row, fieldsInfo, gridColumnsInfo);
		
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

function TenantGridOnClick(row, fieldsInfo, gridColumnsInfo) {
	
	return function() {
		
		var rowAttributeValue = row.attributes["gridIdField"].value;			
							
		get_populateForm(phpFile, "populate", rowAttributeValue, fieldsInfo, gridColumnsInfo, arrayOldValuesTable, get_populateForm_callback);
	}
	
}

function gridHide(divElement)
{
	var divTable = document.getElementById(divElement);
	
	divTable.innerHTML = "";
}

function grid(divElement, phpFile, queryName, gridIdField, fieldsInfo, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, callback, tenantGridRowOnClick) {
	
	var divTable = document.getElementById(divElement);
	
	window.gridXmlHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
						
			callback(response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, tenantGridRowOnClick);
					
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

function sortTableColumnOnclickHandler(sortTableHtmlObjectId, gridColumnsInfo, column) {
		
	return function() { 

		sortTable(sortTableHtmlObjectId, column);
			
	};
}

function get_populateForm_callback(response, fieldsInfo, gridColumnsInfo)
{		
	var record = response[0];
		
	for(i=0; i<fieldsInfo.length; i++)
	{		
		if(fieldsInfo[i].dbType == "date")
		{					
			var dateFromDatabase = record[fieldsInfo[i].name];
						
			var dateFormat = convertDateFromDatabase(dateFromDatabase);
			
			document.getElementById(fieldsInfo[i].htmlObjectId).value = dateFormat;
			
			arrayOldValuesTable[fieldsInfo[i].htmlObjectId] = dateFormat;
		}
		else
		{
			if(fieldsInfo[i].htmlObjectType == "autocomplete")
			{	
				document.getElementById(fieldsInfo[i].htmlObjectId).value = record[fieldsInfo[i].name + "display"];
				
				document.getElementById(fieldsInfo[i].htmlObjectId).setAttribute("rowAttributeValue", record[fieldsInfo[i].name]);
				
				arrayOldValuesTable[fieldsInfo[i].htmlObjectId] = record[fieldsInfo[i].name];
			}
			else
			{	
				document.getElementById(fieldsInfo[i].htmlObjectId).value = record[fieldsInfo[i].name];
				
				arrayOldValuesTable[fieldsInfo[i].htmlObjectId] = record[fieldsInfo[i].name];
			}
		}
	}
}

function get_populateForm(phpFile, queryName, htmlObjectPrimaryKeyValue, fieldsInfo, gridColumnsInfo, arrayOldValuesTable, callback)
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

function post_updateForm(phpFile, postType, htmlObjectPrimaryKeyValue, htmlObjectFieldsValuesUpdate, fieldsInfo, arrayOldValuesTable)
{				
	var updateString = "";
	
	for(update=0; update<fieldsInfo.length; update++)
	{		
		var htmlObjectField = fieldsInfo[update].htmlObjectId;
		var htmlObjectFieldValue = htmlObjectFieldsValuesUpdate[update];
		var databaseField = fieldsInfo[update].name;
				
		if(htmlObjectFieldValue != arrayOldValuesTable[htmlObjectField])
		{			
			if(fieldsInfo[update].dbType == "date")
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
				
				for(update=0; update<fieldsInfo.length; update++)
				{					
					arrayOldValuesTable[fieldsInfo[update].htmlObjectId] = htmlObjectFieldsValuesUpdate[update];
				}
			}
		}
	
		var formVariables = "postType" + "=" + postType + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString);
			
		window.postXmlHttpRequest.open("POST", phpFile, true);
		window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		window.postXmlHttpRequest.send(formVariables);
	}
}

function post_insertRecordForm(phpFile, postType, htmlObjectFieldsValuesInsert, fieldsInfo, inputPrimaryKey)
{		
	if(!confirm('Confirm to create new record?'))
	{
		return;
	}		
	
	var insertString = "";
	
	insertString = insertString + "(";
	
	for(insert=0; insert<fieldsInfo.length; insert++)
	{
		if(fieldsInfo[insert].htmlObjectType != "primaryKey")
			insertString = insertString + fieldsInfo[insert].name + ",";
	}
	
	insertString = insertString.substr(0, insertString.length - 1);
	
	insertString = insertString + ")";
	
	insertString = insertString + " values (";
	
	for(insert=0; insert<fieldsInfo.length; insert++)
	{	
		if(fieldsInfo[insert].htmlObjectType != "primaryKey")
		{
			var htmlObjectValueInsert = htmlObjectFieldsValuesInsert[insert];
		
			if(fieldsInfo[insert].dbType == "date")
			{
				var dateFromSystem = htmlObjectValueInsert;
												
				var dateFormat = convertDateFromSystem(dateFromSystem);
				
				insertString = insertString + "'" + dateFormat + "',";
			}
			else
			{
				insertString = insertString + "'" + htmlObjectValueInsert + "',";
			}
		}
	}
	
	insertString = insertString.substr(0, insertString.length - 1);
	
	insertString = insertString + ")";
		
	window.postXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {	
		
			var insertId = this.responseText;
			
			document.getElementById(inputPrimaryKey).value = insertId;
			
			arrayOldValuesTable[inputPrimaryKey] = insertId;
			
			for(insert=0; insert<fieldsInfo.length; insert++)
			{									
				if(fieldsInfo[insert].htmlObjectType != "primaryKey")				
					arrayOldValuesTable[fieldsInfo[insert].htmlObjectId] = htmlObjectFieldsValuesInsert[insert];
			}

		}
	}	
	
	var formVariables = "postType" + "=" + postType + "&" + "insertString" + "=" + encodeURIComponent(insertString);
		
	window.postXmlHttpRequest.open("POST", phpFile, true);
	window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	window.postXmlHttpRequest.send(formVariables);
}

function validateHtmlObjectFields(fieldsInfo)
{
	for(validate=0; validate<fieldsInfo.length; validate++)
	{
		if(fieldsInfo[validate].htmlObjectType != "primaryKey")
		{
			if(document.getElementById(fieldsInfo[validate].htmlObjectId).value == "")
			{
				alert(fieldsInfo[validate].htmlObjectId + ' ' + 'cannot be empty');
				return false;
			}
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
