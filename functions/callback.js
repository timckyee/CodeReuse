/**
 * Class for storing callback functions
 * @class
 */
CodeReuse.Callback = function() {
	
};

CodeReuse.Callback.prototype = {

/**
 * Callback when the XMLHttpRequest get method returns from function Grid_Get_Post_Functions grid
 * @callback gridCallback
 * @name Callback#gridCallback
 * 
 * @param {string} phpFile php file name and location
 * @param {string} response the response from the XMLHttpRequest get
 * @param {string} divTable the html div object to attach the table to 
 * @param {string} tableHtmlObjectId the html table id
 * @param {Array} fieldsInfo form object array of fields
 * @param {string} gridIdField the primary key for the table rows
 * @param {Array} gridColumnsInfo grid object array of columns 
 * @param {function} rowOnClick the handler to call when the user clicks on row in the table
 * @param {string} showEditColumn to show or hide the edit column in the table
 * @param {string} sortColumn the grid column which is currently sorted
 * @param {string} sortDirection the direction which is currently sorted
 * @param {string} pageNumber the page number of the table we are currently showing
 * @param {string} highlightRowId the row in the table which is highlighted after editing and saving the row
 * @param {string} showEditRow show the edit row html objects
 * @param {string} savePrimaryKeyValue the primary key value of the edit row were are saving
 * @param {string} highlightRow flag to highlight the row after save
 */
gridCallback: function(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, rowOnClick, showEditColumn, sortColumn, sortDirection, pageNumber, highlightRowId, showEditRow, savePrimaryKeyValue, highlightRow) {

	var tbl = document.createElement("table");
	tbl.id = tableHtmlObjectId;
	
	var helper = new CodeReuse.Helper();

	var platform = helper.checkPlatform();

	if(platform == "desktop")
	{
		if(tableHtmlObjectId == "tableHomeTenant")
		{
			tbl.className = "homeGrid";
		}
		else if(tableHtmlObjectId == "tableSuite")
		{
			tbl.className = "suiteGrid";
		}
		else if(tableHtmlObjectId == "tableTenant")
		{
			tbl.className = "tenantGrid";
		}
	}
	else
	if(platform == "IOS_safari")
	{
		if(tableHtmlObjectId == "tableHomeTenant")
		{
			tbl.className = "homeGridIOS_safari";
		}
		else if(tableHtmlObjectId == "tableSuite")
		{
			tbl.className = "suiteGridIOS_safari";
		}
		else if(tableHtmlObjectId == "tableTenant")
		{
			tbl.className = "tenantGridIOS_safari";
		}
	}
	else
	if(platform == "IOS")
	{
		if(tableHtmlObjectId == "tableHomeTenant")
		{
			tbl.className = "homeGridIOS";
		}
		else if(tableHtmlObjectId == "tableSuite")
		{
			tbl.className = "suiteGridIOS";
		}
		else if(tableHtmlObjectId == "tableTenant")
		{
			tbl.className = "tenantGridIOS";
		}
	}
	else
	if(platform == "android")
	{
		if(tableHtmlObjectId == "tableHomeTenant")
		{
			tbl.className = "homeGridMobile";
		}
		else if(tableHtmlObjectId == "tableSuite")
		{
			tbl.className = "suiteGridMobile";
		}
		else if(tableHtmlObjectId == "tableTenant")
		{
			tbl.className = "tenantGridMobile";
		}
	}	
								
	var tableHeaderRow = document.createElement("tr");

	var tableHeader;
	var tableHeaderText;
	
	if(showEditColumn == "showEdit")
	{
		tableHeader = document.createElement("th");
		
		tableHeader.style.width = "70px";
		//tableHeader.style.height = "25px";

		tableHeaderRow.appendChild(tableHeader);
	}

	for(var i=0; i<gridColumnsInfo.length; i++)
	{	
		tableHeader = document.createElement("th");

		tableHeader.id = tableHtmlObjectId + "_" + gridColumnsInfo[i].id + "ColumnHeader";
		
		var tableHeaderStyle = tableHeader.style;

		//tableHeaderStyle.height = "25px";
		tableHeaderStyle.paddingBottom = "10px";
		tableHeaderStyle.textAlign = "left";
		tableHeaderStyle.whiteSpace = "nowrap";
		tableHeaderStyle.overflow = "hidden";
		tableHeaderStyle.className = "grid";
		tableHeaderStyle.textOverflow = "ellipsis";

        var columnName = gridColumnsInfo[i].colName;

        tableHeaderSpan = document.createElement("span");
        tableHeaderSpan.id = tableHtmlObjectId + "_" + gridColumnsInfo[i].id + "Span";
		tableHeaderSpan.innerHTML = columnName;

		var tableHeaderSpanStyle = tableHeaderSpan.style;
		
        tableHeaderSpanStyle.textDecoration = "underline";
        tableHeaderSpanStyle.userSelect = "none";
		tableHeaderSpanStyle.cursor = "pointer";
		tableHeaderSpanStyle.paddingLeft = "10px";
		//tableHeaderSpanStyle.paddingRight = "10px";

		if(tableHtmlObjectId == "tableHomeTenant")
		{
			tableHeaderSpan.onclick = function(headerCellSpan) {

				if(localStorage.getItem("editMode") == "true")
				{
					var helper = new CodeReuse.Helper();

					helper.msgBox('alert', 'You are in edit mode. Please click save to leave save mode before sorting.', function (result) {

						return;
						
					});
				}
				else
				{
					var columnId = headerCellSpan.srcElement.id;
					for(var column=0; column<gridColumnsInfo.length; column++)
					{
						if(tableHtmlObjectId + "_" + gridColumnsInfo[column].id + "Span" == columnId)
							break;
					}
					
					var handler = new CodeReuse.Handler();
					
					handler.sortTableColumnOnclickHandlerHomeTenantGrid(tableHtmlObjectId, gridColumnsInfo, column.toString(), pageNumber);					
				}
			}
		}
		else
		{
			tableHeaderSpan.onclick = function(headerCellSpan) {

				var columnId = headerCellSpan.srcElement.id;
				for(var column=0; column<gridColumnsInfo.length; column++)
				{
					if(tableHtmlObjectId + "_" + gridColumnsInfo[column].id + "Span" == columnId)
						break;
				}

				var handler = new CodeReuse.Handler();

				handler.sortTableColumnOnclickHandler(tableHtmlObjectId, gridColumnsInfo, column.toString());
			}
		}
		
        tableHeader.appendChild(tableHeaderSpan);

		tableHeaderIcon = document.createElement("img");
		tableHeaderIcon.id = tableHtmlObjectId + "_" + gridColumnsInfo[i].id + "ColumnHeaderIcon";
		
		var server = new CodeReuse.Config();

		/*
		var column;
		var direction;

		if(tableHtmlObjectId == "tableHomeTenant")
		{
			column = localStorage.getItem("arraySortColumn");
			direction = localStorage.getItem("arraySortDirection");
		}
		else if(tableHtmlObjectId == "tableSuite")
		{
			column = localStorage.getItem("arraySortColumn_suite");
			direction = localStorage.getItem("arraySortDirection_suite");
		}
		else if(tableHtmlObjectId == "tableTenant")
		{
			column = localStorage.getItem("arraySortColumn_tenant");
			direction = localStorage.getItem("arraySortDirection_tenant");
		}
		*/

		//var column = sortColumn;
		//var direction = sortDirection;

		if(gridColumnsInfo[i].id == sortColumn)
		{
			tableHeaderIcon.width = "14";
			tableHeaderIcon.height = "14";

			tableHeader.className = "description";

			tableHeaderSpan.className = "text";

			tableHeaderIcon.className = "icon";

			if(sortDirection == "asc")
			{
				tableHeaderIcon.src = server.getServerUrl() + "/images/pngfuel.com.up.gif";
			}
			else if(sortDirection == "desc")
			{
				tableHeaderIcon.src = server.getServerUrl() + "/images/pngfuel.com.down.gif";
			}

			tableHeaderIcon.style.display = "inline";
		}
		else
		{
			tableHeader.className = "";

			tableHeaderSpan.className = "text";

			tableHeaderIcon.className = "";

			tableHeaderIcon.style.display = "none";
		}

        tableHeader.appendChild(tableHeaderIcon);

        tableHeaderRow.appendChild(tableHeader);
    
	}
	
	tbl.appendChild(tableHeaderRow);

	for(tableRowCount=0; tableRowCount<response.length; tableRowCount++)
	{
		var row = document.createElement("tr");
		
		if(tableHtmlObjectId == "tableSuite" || tableHtmlObjectId == "tableTenant")
		{
			row.className = "tableHover";
		}
	
		if(highlightRowId != '' && highlightRowId != undefined)
		{
			if(tableHtmlObjectId == "tableSuite")
			{
				if(response[tableRowCount]["suiteId"] == highlightRowId)
				{
					row.className = "tableHover highlightRow";
				}
			}
			else if(tableHtmlObjectId == "tableTenant")
			{
				if(response[tableRowCount]["fieldPrimaryKey"] == highlightRowId)
				{
					row.className = "tableHover highlightRow";
				}
			}

			if(highlightRow == "true")
			{
				if(tableHtmlObjectId == "tableHomeTenant")
				{
					if(response[tableRowCount]["fieldPrimaryKey"] == highlightRowId)
					{
						row.className = "tableHoverHomeGrid highlightRowHomeGrid";
					}
				}
			}
		}

		row.onclick = function(rowValues) {

			if(tableHtmlObjectId != "tableHomeTenant")
			{
				var rowPrimaryKey;

				if(rowValues.target.parentNode.cells == undefined)
				{
					rowPrimaryKey = rowValues.target.cells[0].innerText;
				}
				else
				{
					rowPrimaryKey = rowValues.target.parentNode.cells[0].innerText;
				}

				rowOnClick(phpFile, rowPrimaryKey, fieldsInfo, gridColumnsInfo, tableHtmlObjectId); 
			}
		};
			
		var cell;
		var cellText;
		
		if(showEditColumn == "showEdit")
		{			
			cell = document.createElement("td");
			cell.className = "grid";
			
			cell.style.padding = "10px";
			
			cell.value = response[tableRowCount]["fieldPrimaryKey"];
			
			editButton = document.createElement("a");
			editButton.innerText = "edit";
			editButton.id = "editLink";
			editButton.className = "underline";

			var editButtonStyle = editButton.style;

			editButtonStyle.cursor = "pointer";
			editButtonStyle.width = "50px";

			//var tenantModel = new CodeReuse.Tenant();
			
			var home_tenant_grid = new CodeReuse.HomeTenantGrid();
			
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
			
			var callback = new CodeReuse.Callback();
			
			editButton.onclick = function(tablePrimaryKey) 
			{

				var tablePrimaryKeyValue = tablePrimaryKey.target.parentNode.parentNode.cells[1].innerText;

				var helper = new CodeReuse.Helper();

				if(localStorage.getItem("editMode") == "true")
				{
					helper.msgBox('alert', 'You are in edit mode. Please click save to leave save mode.', function (result) {

						return;
						
					});
				}
				else
				{

					/*
					var tableEdit = document.getElementById(tableHtmlObjectId);

					for(var i=1; i<tableEdit.rows.length; i++)
					{
						var row = tableEdit.rows[i];
						if(row.cells[1].innerText == tablePrimaryKeyValue)
						{
							row.cells[0].style.textDecoration = "underline";
						}
					}
					*/

					var grid_get_post_function = new CodeReuse.Grid_Get_Post_Functions;
	
					var home_tenant_grid = new CodeReuse.HomeTenantGrid();

					grid_get_post_function.showTheGrid(tablePrimaryKeyValue, "gridEdit");

					/*
					helper.msgBox('confirm', 'Would you like to edit this row?', function (result) {

						if(result == true)
						{

							var grid_get_post_function = new CodeReuse.Grid_Get_Post_Functions;
	
							var home_tenant_grid = new CodeReuse.HomeTenantGrid();

							grid_get_post_function.showTheGrid(tablePrimaryKeyValue, "gridEdit");

						}
						else
						if(result == false)
						{
							return;
						}
					});
					*/			
				}
			}
			
			cell.appendChild(editButton);

			/*
			saveButton = document.createElement("a");
			saveButton.innerText = "save";
			saveButton.id = "saveLink";
			saveButton.className = "underlineNo";

			var saveButtonStyle = saveButton.style;

			saveButtonStyle.cursor = "pointer";
			saveButtonStyle.width = "50px";

			saveButton.onclick = function(tablePrimaryKey) {

				var helper = new CodeReuse.Helper();

				if(localStorage.getItem("editMode") == "true")
				{
					helper.msgBox('alert', 'You are in edit mode. Please click save to leave save mode.', function (result) {

						return;

					});
				}
				else
				{
					helper.msgBox('alert', 'You are not in edit mode. Please click on edit.', function (result) {

						return;

					});
				}

			}
			
			cell.appendChild(saveButton)

			*/
			
			//cell.height = 25;

			//cell.className = "heightCell";

			row.appendChild(cell);
		}			
		
		//row.className = "heightRow";
			
		for(var i=0; i<gridColumnsInfo.length; i++)
		{	
			cell = document.createElement("td");
			cell.className = "grid";

			cell.style.padding = "10px";

			var colType = gridColumnsInfo[i].colType;
			
			if(colType == "date")
			{	
				var dateFromDatabase = response[tableRowCount][gridColumnsInfo[i].id];
				
				var helper = new CodeReuse.Helper();
				
				var dateFormat = helper.convertDateFromDatabase(dateFromDatabase);
				
				cellText = document.createTextNode(dateFormat);
			}
			else
			{
				if(gridColumnsInfo[i].hasIdHiddenField == true)
				{						
					cell.value = response[tableRowCount][gridColumnsInfo[i].idDbField];
				}						
				
				cellText = document.createTextNode(response[tableRowCount][gridColumnsInfo[i].id]);
			}
			
			cell.appendChild(cellText);
			
			row.appendChild(cell);
			
			row.setAttribute("gridIdField", response[tableRowCount][gridIdField]);
		}
		
		tbl.appendChild(row);
	}

	divTable.innerHTML = "";
	
	divTable.appendChild(tbl);
	

	if(showEditRow == "true")
	{
		var tenantModel = new CodeReuse.Tenant();
			
		var home_tenant_grid = new CodeReuse.HomeTenantGrid();
		
		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
		
		var callback = new CodeReuse.Callback();

		var tableEdit = document.getElementById(tableHtmlObjectId);
				
		grid_get_post_functions.get_populateGrid(home_tenant_grid.getPhpFile(), "populategrid", home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.arrayOldValuesTableGridEdit, callback.get_populateGrid_callback, tbl, savePrimaryKeyValue);
	}

},

/**
 * Callback when the XMLHttpRequest get method returns from function Grid_Get_Post_Functions get_populateGrid
 * @callback get_populateGrid_callback
 * @name Callback#get_populateGrid_callback
 * 
 * @param {string} response the response from the XMLHttpRequest get
 * @param {string} divElement the html div id to use to attach the table to 
 * @param {Array} arrayOldValuesTableGridEdit array to keep track of row old values used for updating fields
 * @param {Object} tableHtml the html table object used to replace the row edited with form objects
 * @param {string} fieldPrimaryKey the table row primary key
 */
get_populateGrid_callback: function(response, gridColumnsInfo, arrayOldValuesTableGridEdit, tableHtml, fieldPrimaryKey) {

	var record = response[0];

	var tableEdit = tableHtml;

	for(tableEditCount=0; tableEditCount<tableEdit.rows.length; tableEditCount++)
	{
		row = tableEdit.rows[tableEditCount + 1];

		if(row.cells[1].innerText == fieldPrimaryKey)
		{
			break;
		}
	}
	
	tableEdit.rows[tableEditCount + 1].innerHTML = "<td height=\"25\" class=\"grid\" style=\"padding: 10px\"><a id=\"saveLink2\" class=\"underline\" style=\"cursor: pointer width: 50px\">save</a></td><td class=\"grid\"><span id=\"inputPrimaryKey_grid\"></span></td><td class=\"grid\"><select id=\"building_option_grid\"><option value=\"\"><option value=\"1\">building</option><option value=\"2\">building2</option></select></td><td class=\"grid\"><input id=\"tenant_input_grid\" value=\"\" style=\"position: relative; z-index: 1; background-color: white; width: 200\" \"/></td><td class=\"grid\"><input id=\"inputCalendar_grid\" style=\"position: relative; z-index: 1; background-color: white; width: 142\" value=\"\" /></td><td class=\"grid\"><input id=\"inputCalendarTesting_grid\" style=\"position: relative; z-index: 1; background-color: white; width: 142\" value=\"\"</td>";

	//tableEdit.rows[tableEditCount + 1].innerHTML = "<td height=\"25\" class=\"grid\" style=\"padding: 10px\"><a id=\"saveLink2\" class=\"underline\" style=\"cursor: pointer; width: 50px\">save</a></td><td class=\"grid\"><span id=\"inputPrimaryKey_grid\"></span></td><td class=\"grid\"><select id=\"building_option_grid\"><option value=\"\"><option value=\"1\">building</option><option value=\"2\">building2</option></select></td><td class=\"grid\"><input id=\"tenant_input_grid\" value=\"\" style=\"position: relative; z-index: 1; background-color: white; width: 200\" \"/></td><td class=\"grid\"><input id=\"inputCalendar_grid\" style=\"position: relative; z-index: 1; background-color: white; width: 142\" value=\"\" /></td><td class=\"grid\"><input id=\"inputCalendarTesting_grid\" style=\"position: relative; z-index: 1; background-color: white; width: 142\" value=\"\"</td>";

	var gridEventFunctions = new CodeReuse.GridEventFunctions();

	/*
	document.getElementById("editLink2").onclick = function() 
	{
		gridEventFunctions.editLink2Onclick();
	}
	*/

	document.getElementById("saveLink2").onclick = function() 
	{
		gridEventFunctions.saveLink2Onclick();
	}

	document.getElementById("inputPrimaryKey_grid").innerText = fieldPrimaryKey;

	document.getElementById("building_option_grid").selectedIndex = record["field3"];


	document.getElementById("tenant_input_grid").value = record["field4display"];

	document.getElementById("tenant_input_grid").setAttribute("rowAttributeValue", record["field4"]);

	//document.getElementById("tenant_input_grid").style.position = "relative";
	//document.getElementById("tenant_input_grid").style.zIndex = "1";
	//document.getElementById("tenant_input_grid").style.backgroundColor = "white";
	//document.getElementById("tenant_input_grid").width = "200";		

	document.getElementById("tenant_input_grid").onkeyup = function() 
	{
		gridEventFunctions.tenant_input_grid_onKeyUp();
	}

	document.getElementById("tenant_input_grid").onfocus = function() 
	{
		this.select();
		//gridEventFunctions.tenant_input_grid_onFocus();
	}	
	
	//document.getElementById("inputCalendar_grid").style.position = "relative";
	//document.getElementById("inputCalendar_grid").style.zIndex = "1";
	//document.getElementById("inputCalendar_grid").style.backgroundColor = "white";
	//document.getElementById("inputCalendar_grid").style.width = "142";
	

	var calendar = new CodeReuse.Calendar();
	
	document.getElementById("inputCalendar_grid").onfocus = function() 
	{
		gridEventFunctions.inputCalendar_grid_onFocus();
	}

	/*
	document.getElementById("inputCalendar_grid").addEventListener("focus", function(event){
		
		var calendar = new CodeReuse.Calendar();
		calendar.showHideCalendar('show' ,'inputCalendar_grid', "calendarId", monthsArray);
	
	});
	*/
	
	document.getElementById("inputCalendar_grid").onblur = function() 
	{
		gridEventFunctions.inputCalendar_grid_onBlur();
	}

	/*
	document.getElementById("inputCalendar_grid").addEventListener("blur", function(event)
	{
		var calendar = new CodeReuse.Calendar();
		
		if(calendar.validateDate(this.id) == false)
		{
			alert("input format has to be dd-mmm-yyyy");
		}
	});
	*/

	var helper = new CodeReuse.Helper();
				
	var dateFormat = helper.convertDateFromDatabase(record["field1"]);
	
	document.getElementById("inputCalendar_grid").value = dateFormat;


	//document.getElementById("inputCalendarTesting_grid").style.position = "relative";
	//document.getElementById("inputCalendarTesting_grid").style.zIndex = "1";
	//document.getElementById("inputCalendarTesting_grid").style.backgroundColor = "white";
	//document.getElementById("inputCalendarTesting_grid").width = "142";			
	
	/*
	document.getElementById("inputCalendarTesting_grid").addEventListener("focus", function(event){
		
		var calendar = new CodeReuse.Calendar();
		calendar.showHideCalendar('show' ,'inputCalendarTesting_grid', "calendarId", monthsArray)
	
	});
	*/
	
	document.getElementById("inputCalendarTesting_grid").onfocus = function() 
	{
		gridEventFunctions.inputCalendarTesting_grid_onFocus();
	}

	/*
	document.getElementById("inputCalendarTesting_grid").addEventListener("blur", function(event){
	
		var calendar = new CodeReuse.Calendar();
		if(calendar.validateDate(this.id) == false)
		{
			alert("input format has to be dd-mmm-yyyy");
		}
	});
	*/

	document.getElementById("inputCalendarTesting_grid").onblur = function() 
	{
		gridEventFunctions.inputCalendarTesting_grid_onBlur();
	}	
				
	var dateFormat = helper.convertDateFromDatabase(record["field2"]);

	inputCalendarTesting_grid.value = dateFormat;

	
	for(i=0; i<gridColumnsInfo.length; i++)
	{
		var hiddenFieldFlag = gridColumnsInfo[i].hasIdHiddenField;
		//var hiddenField = gridColumnsInfo[i].idDbField;	
				
		if(hiddenFieldFlag == true)
		{			
			arrayOldValuesTableGridEdit[gridColumnsInfo[i].htmlObjectId] = record[gridColumnsInfo[i].idDbField];
		}
		else
		if(gridColumnsInfo[i].colType == "date")
		{					
			var dateFromDatabase = record[gridColumnsInfo[i].id];
			
			var helper = new CodeReuse.Helper();			
						
			var dateFormat = helper.convertDateFromDatabase(dateFromDatabase);
			
			//document.getElementById(gridColumnsInfo[i].htmlObjectId).value = dateFormat;
			
			arrayOldValuesTableGridEdit[gridColumnsInfo[i].htmlObjectId] = dateFormat;	
		}
		else
		{
			arrayOldValuesTableGridEdit[gridColumnsInfo[i].htmlObjectId] = record[gridColumnsInfo[i].id];

			/*
			if(gridColumnsInfo[i].htmlObjectType == "autocomplete")
			{
				for(input=0; input<autocompleteInputs.length; input++)
				{
					if(gridColumnsInfo[i].id == autocompleteInputs[input].value)
					{
						//document.getElementById(gridColumnsInfo[i].htmlObjectId).value = record[autocompleteInputs[input].display];
						//break;
					}
				}
				
				//document.getElementById(gridColumnsInfo[i].htmlObjectId).setAttribute("rowAttributeValue", record[gridColumnsInfo[i].id]);
				
				arrayOldValuesTableGridEdit[gridColumnsInfo[i].htmlObjectId] = record[gridColumnsInfo[i].id];
			}
			else
			{	
				//document.getElementById(gridColumnsInfo[i].htmlObjectId).value = record[gridColumnsInfo[i].id];
				
				arrayOldValuesTableGridEdit[gridColumnsInfo[i].htmlObjectId] = record[gridColumnsInfo[i].id];
			}
			*/
		}
	}
},

/**
 * Refresh Suite grid after inserting or updating Suite record
 * @callback refreshGridCallbackSuite
 * @name Callback#refreshGridCallbackSuite
 * 
 * @param {string} highlightId the primary key row id to highlight
 */
refreshGridCallbackSuite: function(highlightId)
{
	
	var suiteModel = new CodeReuse.Suite();

	suiteModel.refreshSuiteGrid(highlightId);
	
},

/**
 * Refresh Tenant grid after inserting or updating Tenant record
 * @callback refreshGridCallback
 * @name Callback#refreshGridCallback
 * 
 * @param {string} highlightId the primary key row id to highlight
 */
refreshGridCallback: function(highlightId)
{
	
	var tenantModel = new CodeReuse.Tenant();
	
	tenantModel.refreshTenantGrid(highlightId);	
	
},

/**
 * Refresh Home Tenant grid after updating Tenant record
 * @callback refreshGridCallbackHomeTenantGrid
 * @name Callback#refreshGridCallbackHomeTenantGrid
 */
refreshGridCallbackHomeTenantGrid: function()
{
	
	var tenantModel = new CodeReuse.Tenant();
	
	tenantModel.refreshTenantGridHome();	
	
},

/**
 * Callback when the XMLHttpRequest get method returns from function Grid_Get_Post_Functions get_populateForm
 * @callback get_populateForm_callback
 * @name Callback#get_populateForm_callback
 * 
 * @param {string} response the response from the XMLHttpRequest get
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} autocompleteInputs array of autocomplete inputs
 * @param {Array} arrayOldValuesTable array to keep track of form old values used for updating fields
 */
get_populateForm_callback: function(response, fieldsInfo, autocompleteInputs, arrayOldValuesTable)
{	
	var record = response[0];
	
	for(i=0; i<fieldsInfo.length; i++)
	{		
		if(fieldsInfo[i].dbType == "date")
		{					
			var dateFromDatabase = record[fieldsInfo[i].name];
			
			var helper = new CodeReuse.Helper();			
						
			var dateFormat = helper.convertDateFromDatabase(dateFromDatabase);
			
			document.getElementById(fieldsInfo[i].htmlObjectId).value = dateFormat;
			
			arrayOldValuesTable[fieldsInfo[i].htmlObjectId] = dateFormat;	
		}
		else
		{
			if(fieldsInfo[i].htmlObjectType == "autocomplete")
			{
				for(input=0; input<autocompleteInputs.length; input++)
				{
					if(fieldsInfo[i].name == autocompleteInputs[input].value)
					{
						document.getElementById(fieldsInfo[i].htmlObjectId).value = record[autocompleteInputs[input].display];
						break;
					}
				}
				
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

}