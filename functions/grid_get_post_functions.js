var Grid_Get_Post_Functions = function() {
	
};

Grid_Get_Post_Functions.prototype = {

grid: function(divElement, phpFile, queryName, gridIdField, fieldsInfo, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, callback, tenantGridRowOnClick) {
	
	var divTable = document.getElementById(divElement);
	
	window.gridXmlHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
						
			callback(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, tenantGridRowOnClick);
					
		}
	};
	
	var queryString;
	
	if(additionalArgs != undefined)
		queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue;
	else
		queryString = "queryName" + "=" + queryName;
	
	window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.gridXmlHttpRequest.send();
	
},

get_populateForm: function(phpFile, queryName, htmlObjectPrimaryKeyValue, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTable, callback)
{	
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
			
			callback(response, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTable);
		
		}
	}
	
	var queryString = "queryName" + "=" + queryName + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue;
		
	window.getXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getXmlHttpRequest.send();
},

post_updateForm:function (phpFile, postType, htmlObjectPrimaryKeyValue, htmlObjectFieldsValuesUpdate, fieldsInfo, arrayOldValuesTable, refreshGridCallback)
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
								
				var helper = new Helper();				
												
				var dateFormat = helper.convertDateFromSystem(dateFromSystem);
				
				var calendar = new Calendar();
				
				if(calendar.validateDateFromString(dateFromSystem) == false)
				{
					alert("input format has to be dd-mmm-yyyy");
					return;
				}
				
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
					
		updateString = updateString.substr(0, updateString.length - 1);
						
		window.postXmlHttpRequest.onreadystatechange = function() {
			
			if (this.readyState == 4 && this.status == 200) {
												
				for(update=0; update<fieldsInfo.length; update++)
				{			
					arrayOldValuesTable[fieldsInfo[update].htmlObjectId] = htmlObjectFieldsValuesUpdate[update];
				}
				
				if(refreshGridCallback != undefined)
					refreshGridCallback();
				
			}
		}
	
		var formVariables = "postType" + "=" + postType + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString);
			
		window.postXmlHttpRequest.open("POST", phpFile, true);
		window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		window.postXmlHttpRequest.send(formVariables);
	}
},

post_insertRecordForm: function(phpFile, postType, htmlObjectFieldsValuesInsert, fieldsInfo, inputPrimaryKey, arrayOldValuesTable, refreshGridCallback)
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
								
				var helper = new Helper();				
												
				var dateFormat = helper.convertDateFromSystem(dateFromSystem);
				
				var calendar = new Calendar();
				
				if(calendar.validateDateFromString(dateFromSystem) == false)
				{
					alert("input format has to be dd-mmm-yyyy");
					return;
				}				
				
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
			
			if(refreshGridCallback != undefined)
				refreshGridCallback();

		}
	}	
	
	var formVariables = "postType" + "=" + postType + "&" + "insertString" + "=" + encodeURIComponent(insertString);
		
	window.postXmlHttpRequest.open("POST", phpFile, true);
	window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	window.postXmlHttpRequest.send(formVariables);
}

}
