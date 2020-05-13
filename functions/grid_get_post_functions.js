CodeReuse.Grid_Get_Post_Functions = function() {
	
};

CodeReuse.Grid_Get_Post_Functions.prototype = {

grid: function(divElement, phpFile, queryName, gridIdField, fieldsInfo, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, callback, rowOnClick, showEditColumn, sortColumn, sortDirection, tableRowNumber, tableFieldsValues, pageNumber) {

	var divTable = document.getElementById(divElement);
	
	window.gridXmlHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {

			var response = JSON.parse(this.responseText);				
						
			callback(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, rowOnClick, showEditColumn, sortColumn, sortDirection, tableRowNumber, tableFieldsValues, pageNumber);
					
		}
	};
	
	var queryString;

	if(tableHtmlObjectId == "tableHomeTenant")
	{
		if(additionalArgs != "")
		{
			queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber;
		}
		else
		{
			queryString = "queryName" + "=" + queryName + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber;
		}
	}
	else if(tableHtmlObjectId == "tableSuite" || tableHtmlObjectId == "tableTenant")
	{
		if(additionalArgs != "")
		{
			queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue;
		}
		else
		{
			queryString = "queryName" + "=" + queryName;
		}
	}


	window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.gridXmlHttpRequest.send();
	
},

//gridEdit: function(divElement, phpFile, queryName, gridIdField, fieldsInfo, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, callback, rowOnClick, rowId, sortColumn, sortDirection, pageNumber) {
gridEdit: function(divElement, phpFile, queryName, gridIdField, fieldsInfo, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, callback, rowOnClick, rowId, sortColumn, sortDirection, tableRowNumber, tableFieldsValue, pageNumber) {

	//return function() {

			var tableObject = document.getElementById(tableHtmlObjectId);
			
			var tablePrimaryKey = rowId;
			
			var tableHomeTenant = document.getElementById("tableHomeTenant");
			
			var tableHomeTenantRows = tableHomeTenant.rows;
			
			var tableRowNumber = 0;
			
			var building_option_grid;
			var buildingSelectOption;
			var tenant_input_grid;
			var tenant_input_grid_value;
			var inputCalendar_grid;
			var inputCalendarTesting_grid;

			for(var i=1; i<tableHomeTenantRows.length; i++)
			{
				if(tableHomeTenantRows[i].cells[1] != undefined)
				{
					var tableHomeTenantRowsCellValue = parseInt(tableHomeTenantRows[i].cells[1].innerText);
					
					if(tableHomeTenantRowsCellValue == tablePrimaryKey)
					{
						tableRowNumber = i;
						
						building_option_grid = tableHomeTenantRows[i].cells[2].innerText;			
						buildingSelectOption = tableHomeTenantRows[i].cells[2].value				
						tenant_input_grid = tableHomeTenantRows[i].cells[3].innerText;
						tenant_input_grid_value = tableHomeTenantRows[i].cells[3].value;					
						inputCalendar_grid = tableHomeTenantRows[i].cells[4].innerText;
						inputCalendarTesting_grid = tableHomeTenantRows[i].cells[5].innerText;
						break;
					}
				}
				
			}

			var tableFieldsValue = [];
			
			tableFieldsValue["fieldPrimaryKey"] = tablePrimaryKey;
			tableFieldsValue["buildingName"] = building_option_grid;
			tableFieldsValue["buildingId"] = buildingSelectOption;
			tableFieldsValue["tenantName"] = tenant_input_grid;
			tableFieldsValue["tenantId"] = tenant_input_grid_value;
			tableFieldsValue["field1"] = inputCalendar_grid;
			tableFieldsValue["field2"] = inputCalendarTesting_grid;

		
			tableRowNumber = i.toString();


		var divTable = document.getElementById(divElement);

		window.gridXmlHttpRequest.onreadystatechange = function() {
					
			if (this.readyState == 4 && this.status == 200) {

				var response = JSON.parse(this.responseText);
							
				callback(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, rowOnClick, rowId, sortColumn, sortDirection, tableRowNumber, tableFieldsValue, pageNumber);			
				
			}
		};
		
		var queryString;
		
		if(additionalArgs != "")
		{
			queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber;
		}
		else
		{
			queryString = "queryName" + "=" + queryName + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber;
		}
	
			
		window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
		window.gridXmlHttpRequest.send();		
		
	//}
	
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

get_populateGrid: function(phpFile, divElement, queryName, htmlObjectPrimaryKeyValue, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTableGridEdit, callback, tableHtml, tableRowNumber, fieldPrimaryKey, tableHtmlObjectId)
{	
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);

			callback(response, divElement, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTableGridEdit, tableHtml, tableRowNumber, fieldPrimaryKey, tableHtmlObjectId);
		
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
								
				var helper = new CodeReuse.Helper();				
								
				debugger

				var dateFormat = helper.convertDateFromSystem(dateFromSystem);
				
				var calendar = new CodeReuse.Calendar();
				
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
	
	if(updateString == "")
	{
		alert("There are no changes to this record");

		return;
	}
	
	if(updateString != "")
	{
		var helper = new CodeReuse.Helper();

		helper.msgBox('confirm', 'There are changes to the fields. Continue with the update?', function (result) {

			if(result == true)
			{
				alert(updateString);

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
			else
			if(result == false)
			{
				return;
			}
		});		
	}
},

post_updateGrid: function(phpFile, postType, htmlObjectPrimaryKeyValue, htmlObjectFieldsValuesUpdate, columnsInfo, arrayOldValuesTableGridEdit, refreshGridCallbackEditGrid, tableRowNumber, tableFieldsValue, pageNumber)
{	
	var updateString = "";
	
	for(update=0; update<columnsInfo.length; update++)
	{			
		var htmlObjectField = columnsInfo[update].htmlObjectId;
		var htmlObjectFieldValue = htmlObjectFieldsValuesUpdate[update];
		var databaseField = columnsInfo[update].id;		
		
		var hiddenFieldFlag = columnsInfo[update].hasIdHiddenField;
		var hiddenField = columnsInfo[update].idDbField;	
			
		/*
		if(hiddenFieldFlag == true)
		{			
			if(htmlObjectFieldValue != arrayOldValuesTableGridEdit[hiddenField])
			{
				updateString = updateString + hiddenField + "='" + htmlObjectFieldValue + "',";
			}
		}
		else
		{
		*/
			if(htmlObjectFieldValue != arrayOldValuesTableGridEdit[htmlObjectField])
			{
				if(hiddenFieldFlag == true)
				{			
						updateString = updateString + hiddenField + "='" + htmlObjectFieldValue + "',";
				}
				else
				if(columnsInfo[update].colType == "date")
				{				
					var dateFromSystem = htmlObjectFieldValue;
									
					var helper = new CodeReuse.Helper();				
										
					debugger

					var dateFormat = helper.convertDateFromSystem(dateFromSystem);
					
					var calendar = new CodeReuse.Calendar();
					
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
		//}
	}
	
	if(updateString == "")
	{
		var helper = new CodeReuse.Helper();

		helper.msgBox('alert', 'There are no changes to this record', function (result) {
		
			if(result == true)
			{		
				var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
					
				var tenantModel = new CodeReuse.Tenant();
					
				var home_tenant_grid = new CodeReuse.HomeTenantGrid();
		
				var callback = new CodeReuse.Callback();
		

				


				//grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.rowOnClick, "showEdit", localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), tableRowNumber, tableFieldsValue, pageNumber);

				//return;
			}
			else
			if(result == false)
			{
				return;
			}
		});
	}

	if(updateString != "")
	{
		var helper = new CodeReuse.Helper();

		helper.msgBox('confirm', 'There are changes to the fields. Continue with the update?', function (result) {

			if(result == true)
			{
				alert(updateString);

				updateString = updateString.substr(0, updateString.length - 1);
						
				window.postXmlHttpRequest.onreadystatechange = function() {
					
					if (this.readyState == 4 && this.status == 200) {
				
						grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
			
						tenantModel = new CodeReuse.Tenant();
							
						home_tenant_grid = new CodeReuse.HomeTenantGrid();
			
						var callback = new CodeReuse.Callback();
			
						//grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.rowOnClick, "showEdit", localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), tableRowNumber, tableFieldsValue, pageNumber);

						grid_get_post_functions.post_updateGrid_reset(home_tenant_grid.getGridGetPostDivElement(), tableRowNumber, home_tenant_grid.getTableHtmlObjectId(), htmlObjectPrimaryKeyValue);

					}
				}
			
				var formVariables = "postType" + "=" + postType + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString);
					
				window.postXmlHttpRequest.open("POST", phpFile, true);
				window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				window.postXmlHttpRequest.send(formVariables);				
			}
			else
			if(result == false)
			{
				return;
			}
		});
	}
},


onclickEditButtonGrid: function(tablePrimaryKey) {

	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	var tableHtmlEditButton = document.getElementById(home_tenant_grid.getTableHtmlObjectId());

	var tableRows = tableHtmlEditButton.rows[1];

	var countSave = 0;

	for(var i=1; i<tableHtmlEditButton.rows.length; i++)
	{
		if(tableHtmlEditButton.rows[i].cells[0].innerText == "save")
		{
			countSave = countSave + 1;
			break;
		}
	}

	if(countSave == 1)
	{
		alert('Please click on save to leave save mode');
		return;	
	}

	var helper = new CodeReuse.Helper();

	helper.msgBox('confirm', 'Would you like to edit this row?', function (result) {

		if(result == true)
		{
			var tablePrimaryKeyValue = tablePrimaryKey.parentNode.parentNode.childNodes[1].innerText;		
	
			var tenantModel = new CodeReuse.Tenant();

			var callback = new CodeReuse.Callback();

			grid_get_post_functions.gridEdit(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), "gridtablehome", "fieldPrimaryKey", tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridEditCallback, home_tenant_grid.getRowOnClick(), tablePrimaryKeyValue, localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), '', '', localStorage.getItem("homeTenantGridPageNumber"));
		}
		else
		if(result == false)
		{
			return;
		}
	});
},


post_updateGrid_reset: function(divElement, tableRowNumber, tableHtml, fieldPrimaryKey) {

	localStorage.setItem("editMode", "false");

	tableRowNumber = tableRowNumber - 1;


	var tableEdit = document.getElementById(tableHtml);


	var rowReplace = tableEdit.rows[tableRowNumber + 1];

	//var newRow = document.createElement("tr");

	var newRow = tableEdit.insertRow(tableRowNumber);

	var cell = document.createElement("td");
						
	cell.style.paddingLeft = "10px";

	cell.value = fieldPrimaryKey;

	editButton = document.createElement("button");
	editButton.type = "button";
	editButton.innerText = "edit";
	editButton.id = "editButton";
	editButton.style.width = "50px";
	
	var tenantModel = new CodeReuse.Tenant();
	
	var home_tenant_grid = new CodeReuse.HomeTenantGrid();
	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
	
	var callback = new CodeReuse.Callback();
	
	editButton.onclick = function(tablePrimaryKey) {

		var tableHtmlEditButton = document.getElementById(tableHtml);

		var tableRows = tableHtmlEditButton.rows[1];
	
		var countSave = 0;
	
		for(var i=1; i<tableHtmlEditButton.rows.length; i++)
		{
			if(tableHtmlEditButton.rows[i].cells[0].innerText == "save")
			{
				countSave = countSave + 1;
				break;
			}
		}
	
		if(countSave == 1)
		{
			alert('Please click on save to leave save mode');
			return;	
		}

		var helper = new CodeReuse.Helper();

		helper.msgBox('confirm', 'Would you like to edit this row?', function (result) {

			if(result == true)
			{
				var tablePrimaryKeyValue = tablePrimaryKey.srcElement.parentNode.parentNode.cells[1].innerText;		
		
				grid_get_post_functions.gridEdit(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), "gridtablehome", "fieldPrimaryKey", tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridEditCallback, home_tenant_grid.getRowOnClick(), tablePrimaryKeyValue, localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), '', '', localStorage.getItem("homeTenantGridPageNumber"));
			}
			else
			if(result == false)
			{
				return;
			}
		});
	};

	/*
	editButton.onclick = function(tablePrimaryKey)
	{	
		if(document.getElementById("tenantSearchList").innerHTML != "")
		{
			alert('Please select Tenant Name');
			return;
		}

		if(document.getElementById('calendarId').style.display == "block")
		{
			alert('Please select field date');
			return;
		}

		var helper = new CodeReuse.Helper();

		helper.msgBox('confirm', 'Would you like to edit this row?', function (result) {

			if(result == true)
			{
				controller.homeTenantGridSave();
			}
			else
			if(result == false)
			{
				return;
			}
		});
	};
	*/

		
	//cell.className = "underline";	
	cell.appendChild(editButton);
	
	cell.height = 25;
	
	newRow.appendChild(cell);
		
	
	cell = document.createElement("td");

	cell.className = "grid";
	
	cellText = document.createTextNode(fieldPrimaryKey);


	inputPrimaryKey = document.createElement("span");
	inputPrimaryKey.id = "inputPrimaryKey_grid";
	inputPrimaryKey.innerHTML = fieldPrimaryKey;

	
	cell.appendChild(cellText);
			
	newRow.appendChild(cell);

	
	cell = document.createElement("td");
	cell.className = "grid";
	
	cellText = document.createTextNode(document.getElementById("building_option_grid").value);


	building_option_grid = document.createElement("select");

	building_option_grid.id = "building_option_grid";

	option = document.createElement("option");
	option.text = "";
	building_option_grid.options.add(option,"");			
	option = document.createElement("option");
	option.text = "building";
	building_option_grid.options.add(option,1);
	option = document.createElement("option");
	option.text = "building2";
	building_option_grid.options.add(option,2);
	
	building_option_grid.id = "building_option_grid";

	//alert('gridEditCallback table row save');

	//building_option_grid.selectedIndex = record["field3"];


	cell.appendChild(cellText);
					
	newRow.appendChild(cell);

	
	cell = document.createElement("td");
	cell.className = "grid";
	
	cellText = document.createTextNode(document.getElementById("tenant_input_grid").value);


	tenant_input_grid = document.createElement("input");
	tenant_input_grid.id = "tenant_input_grid";
	
	//tenant_input_grid.value = record["field4display"];
	//tenant_input_grid.setAttribute("rowAttributeValue", record["field4"]);
	
	tenant_input_grid.style.position = "relative";
	tenant_input_grid.style.zIndex = "1";
	tenant_input_grid.style.backgroundColor = "white";
	tenant_input_grid.width = "200";				
	
	var autocomplete = new CodeReuse.Autocomplete();
	
	tenant_input_grid.addEventListener("keyup", function(event){
			
		var home_tenant_grid = new CodeReuse.HomeTenantGrid();

		if(document.getElementById("tenant_input_grid").value == "")
		{
			document.getElementById("tenantSearchList").innerHTML = "";			
		}
		else
		{
			autocomplete.autocomplete(event, "tenantSearchList", "suiteNumber,tenantName", "tenantId",  "GET", home_tenant_grid.getPhpFile(), "tenants", "building", document.getElementById("building_option_grid").selectedIndex, "tenant_input_grid", "tenantSearchList");
		}
		
	});		
	
	tenant_input_grid.addEventListener("focusout", function() { autocomplete.focusOutHide ("tenantSearchList"); });	
	


	cell.appendChild(cellText);
	
	newRow.appendChild(cell);

	
	cell = document.createElement("td");
	cell.className = "grid";
	
	cellText = document.createTextNode(document.getElementById("inputCalendar_grid").value);

	//var helper = new CodeReuse.Helper();			
	//var dateFormatCalendar = helper.convertDateFromDatabase(tableFieldsValue["field1"]);
	

	inputCalendar_grid = document.createElement("input");
	inputCalendar_grid.id = "inputCalendar_grid";
	
	inputCalendar_grid.style.position = "relative";
	inputCalendar_grid.style.zIndex = "1";
	inputCalendar_grid.style.backgroundColor = "white";
	inputCalendar_grid.style.width = "142";
	
	var calendar = new CodeReuse.Calendar();
	
	inputCalendar_grid.addEventListener("focus", function(event){
		
		var calendar = new CodeReuse.Calendar();
		calendar.showHideCalendar(event, 'show' ,'inputCalendar_grid', "calendarId", monthsArray)
	
	});
	
	inputCalendar_grid.addEventListener("blur", function(event){
	
		var calendar = new CodeReuse.Calendar();
		
		if(calendar.validateDate(this.id) == false)
		{
			alert("input format has to be dd-mmm-yyyy");
		}
	});
	
	var helper = new CodeReuse.Helper();
				
	//var dateFormat = helper.convertDateFromDatabase(record["field1"]);

	//inputCalendar_grid.value = dateFormat;


	cell.appendChild(cellText);
	
	newRow.appendChild(cell);

	
	cell = document.createElement("td");
	cell.className = "grid";
	
	cellText = document.createTextNode(document.getElementById("inputCalendarTesting_grid").value);

	//var dateFormatCalendarTesting = helper.convertDateFromDatabase(tableFieldsValue["field2"]);
	

	inputCalendarTesting_grid = document.createElement("input");
	inputCalendarTesting_grid.id = "inputCalendarTesting_grid";
	
	inputCalendarTesting_grid.style.position = "relative";
	inputCalendarTesting_grid.style.zIndex = "1";
	inputCalendarTesting_grid.style.backgroundColor = "white";
	inputCalendarTesting_grid.width = "142";			
	
	inputCalendarTesting_grid.addEventListener("focus", function(event){
		
		var calendar = new CodeReuse.Calendar();
		calendar.showHideCalendar(event, 'show' ,'inputCalendarTesting_grid', "calendarId", monthsArray)
	
	});
	
	inputCalendarTesting_grid.addEventListener("blur", function(event){
	
		var calendar = new CodeReuse.Calendar();
		if(calendar.validateDate(this.id) == false)
		{
			alert("input format has to be dd-mmm-yyyy");
		}
	});			
	
	var helper = new CodeReuse.Helper();
				
	//var dateFormat = helper.convertDateFromDatabase(record["field2"]);

	//inputCalendarTesting_grid.value = dateFormat;


	cell.appendChild(cellText);

	newRow.appendChild(cell);
	

	rowReplace.parentNode.replaceChild(newRow, rowReplace);

	//rowReplace.parentNode.replaceWith(newRow);

	var divTable = document.getElementById(divElement);

	divTable.innerText = "";

	divTable.appendChild(tableEdit);

	/*
	var row = document.getElementById(tableHtml).rows[tableRowNumber + 1];

	var building_option; 
	var building_option_text;
	var tenant_input;
	var inputCalendar;
	var inputCalendarTesting;

	building_option = document.getElementById("building_option_grid")[document.getElementById("building_option_grid").value];
	building_option_text = building_option.innerHTML;
	tenant_input = document.getElementById("tenant_input_grid").value;
	inputCalendar = document.getElementById("inputCalendar_grid").value;
	inputCalendarTesting = document.getElementById("inputCalendarTesting_grid").value;

	var html = "<td height=\"25\" style=\"padding-left: 10px;\">" +
	"<button id=\"editButton\" style=\"width: 50px;\"onclick =\"var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();grid_get_post_functions.onclickEditButtonGrid(this);\">edit</button>" +
	"</td>" +
	"<td class=\"grid\">" +
	"<span id =\"inputPrimaryKey\">" + fieldPrimaryKey + "</span>" +
	"</td>" +
	"<td class=\"grid\">" +
	"<span id =\"building_option\">" + building_option_text + "</span>" +
	"</td>" +
	"<td class=\"grid\">" +
	"<span id =\"tenant_input\">" + tenant_input + "</span>" +
	"</td>" +
	"<td class=\"grid\">" +
	"<span id =\"inputCalendar\">" + inputCalendar + "</span>" +
	"</td>" +
	"<td class=\"grid\">" +
	"<span id =\"inputCalendarTesting\">" + inputCalendarTesting + "</span>" +
	"</td>";

	row.innerHTML = html;
	*/

},

post_insertRecordForm: function(phpFile, postType, htmlObjectFieldsValuesInsert, fieldsInfo, inputPrimaryKeyId, arrayOldValuesTable, refreshGridCallback)
{	
	var helper = new CodeReuse.Helper();

	helper.msgBox('confirm', 'Confirm to create new record?', function (result) {
	
		if(result == true)
		{
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
										
						var helper = new CodeReuse.Helper();				
								
						debugger

						var dateFormat = helper.convertDateFromSystem(dateFromSystem);
						
						var calendar = new CodeReuse.Calendar();
						
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
					
					document.getElementById(inputPrimaryKeyId).value = insertId;
					
					arrayOldValuesTable[inputPrimaryKeyId] = insertId;
					
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
		else
		if(result == false)
		{
			return;
		}
	});
}

}
