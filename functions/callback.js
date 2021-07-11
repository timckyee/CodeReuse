/**
 * Class for storing callback functions
 * @class
 **/
CodeReuse.Callback = function() {
	
};

CodeReuse.Callback.prototype = {

/**
 * Callback when the XMLHttpRequest get method returns from function Grid_Get_Post_Functions grid
 * @function
 * @name Callback#gridCallback
 * 
 * @param {string} phpFile php file name and location
 * @param {string} response the response from the XMLHttpRequest get
 * @param {string} divTable the html div object to attach the table to 
 * @param {string} tableHtmlObjectId the html table id
 * @param {string} gridIdField the primary key for the table rows
 * @param {Array} gridColumnsInfo grid object array of columns 
 * @param {function} rowOnClick the handler to call when the user clicks on row in the table
 * @param {string} showEditColumn to show or hide the edit column in the table
 * @param {string} sortColumn the grid column which is currently sorted
 * @param {string} sortDirection the direction which is currently sorted
 * @param {string} pageNumber the page number of the table we are currently showing
 * @param {string} highlightRowId the row in the table which is highlighted after editing and saving the row
 * @param {string} showEditRow show the edit row html objects - not using this field
 * @param {string} savePrimaryKeyValue the primary key value of the edit row were are saving
 * @param {string} highlightRow flag to highlight the row after save
 * @param {string} showPagingFooter if there is a grid footer for paging
 * @param {string} divPagingFooter the paging footer div
 * @param {string} onload whether this is the first time loading grid to load second grid
 **/
gridCallback: function(phpFile, response, divTable, tableHtmlObjectId, gridIdField, gridColumnsInfo, rowOnClick, showEditColumn, sortColumn, sortDirection, pageNumber, highlightRowId, showEditRow, savePrimaryKeyValue, highlightRow, showPagingFooter, divPagingFooter, onload) {

	var tbl = document.createElement("table");
	tbl.id = tableHtmlObjectId;
	
	var helper = new CodeReuse.Helper();

	var platform = helper.checkPlatform();

	if(platform == "desktop_safari")
	{
		if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
		{
			tbl.className = "homeGrid_safari";
		}
		else
		if(tableHtmlObjectId == "tableHomeTenant")
		{
			tbl.className = "homeGrid_safari";
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
	if(platform == "desktop_chrome")
	{
		if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
		{
			tbl.className = "homeGrid_chrome";
		}
		else
		if(tableHtmlObjectId == "tableHomeTenant")
		{
			tbl.className = "homeGrid_chrome";
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
		if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
		{
			tbl.className = "homeGridIOS_safari";
		}
		else
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
		if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
		{
			tbl.className = "homeGridIOS";
		}
		else		
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
		if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
		{
			tbl.className = "homeGridMobile";
		}
		else		
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

		if(tableHtmlObjectId == "tableHomeTenant" || tableHtmlObjectId == "tableHomeTenantFormGridPaging")
		{
			tableHeaderSpan.onclick = function(headerCellSpan) {

				if(tableHtmlObjectId == "tableHomeTenant")
				{
					if(sessionStorage.getItem("editMode") == "true")
					{
						var helper = new CodeReuse.Helper();

						helper.msgBox('alert', 'You are in edit mode. Please click save to leave save mode before sorting.');

						return;
					}
				}

				var columnId = headerCellSpan.srcElement.id;
				for(var column=0; column<gridColumnsInfo.length; column++)
				{
					if(tableHtmlObjectId + "_" + gridColumnsInfo[column].id + "Span" == columnId)
						break;
				}
				
				var handler = new CodeReuse.Handler();

				if(tableHtmlObjectId == "tableHomeTenant")
				{
					handler.sortTableColumnOnclickHandlerHomeTenantGrid(gridColumnsInfo, column.toString(), pageNumber);
				}
				else
				if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
				{
					handler.sortTableColumnOnclickHandlerHomeTenantFormGridPaging(gridColumnsInfo, column.toString(), pageNumber);
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

		tableHeaderSpaceFiller = document.createElement("span");
		tableHeaderSpaceFiller.innerHTML = "&nbsp;&nbsp";

		tableHeader.appendChild(tableHeaderSpaceFiller);

		tableHeaderIcon = document.createElement("img");
		tableHeaderIcon.id = tableHtmlObjectId + "_" + gridColumnsInfo[i].id + "ColumnHeaderIcon";
		
		var server = new CodeReuse.Config();

		if(gridColumnsInfo[i].id == sortColumn)
		{
			tableHeaderIcon.width = "14";
			tableHeaderIcon.height = "14";

			//tableHeader.className = "description";

			//tableHeaderSpan.className = "text";

			//tableHeaderIcon.className = "icon";

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
			//tableHeader.className = "";

			//tableHeaderSpan.className = "text";

			//tableHeaderIcon.className = "";

			tableHeaderIcon.style.display = "none";
		}

        tableHeader.appendChild(tableHeaderIcon);

        tableHeaderRow.appendChild(tableHeader);
    
	}
	
	tbl.appendChild(tableHeaderRow);

	for(tableRowCount=0; tableRowCount<response.length; tableRowCount++)
	{
		var row = document.createElement("tr");
		
		if(tableHtmlObjectId == "tableSuite" || tableHtmlObjectId == "tableTenant" || tableHtmlObjectId == "tableHomeTenantFormGridPaging")
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
				if(response[tableRowCount]["tenantId"] == highlightRowId)
				{
					row.className = "tableHover highlightRow";
				}
			}
			else if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
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

				if(tableHtmlObjectId == "tableHomeTenant")
				{
					return;
				}
				
				var formObject;
				var previousSelection;
				var tableNameInDb;
				var primaryKeyFieldName;
				var inputPrimaryKey;
				var gridObject;
				var selectedRowId;
				
				if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
				{
					formObject = new CodeReuse.TenantFormGridPaging();

					tableNameInDb = formObject.getTableNameInDb();

					primaryKeyFieldName = formObject.getFieldsInfo()[0].name;

					previousSelection = formObject.getPreviousSelection();

					inputPrimaryKey = document.getElementById("inputPrimaryKeyFormGridPaging").value;

					gridObject = new CodeReuse.HomeTenantFormGridPaging();

					selectedRowId = gridObject.getTenantForGridPagingSelectedRowId();
				}
				else
				if(tableHtmlObjectId == "tableSuite")
				{
					formObject = new CodeReuse.Suite();

					tableNameInDb = formObject.getTableNameInDb();

					primaryKeyFieldName = formObject.getFieldsInfo()[0].name;

					previousSelection = formObject.getPreviousSelection();

					inputPrimaryKey = document.getElementById("inputPrimaryKeySuite").value;
				
					gridObject = new CodeReuse.SuiteGrid();

					selectedRowId = gridObject.getSuiteSelectedRowId();
				}
				else
				if(tableHtmlObjectId == "tableTenant")
				{
					formObject = new CodeReuse.Tenant();

					tableNameInDb = formObject.getTableNameInDb();

					primaryKeyFieldName = formObject.getFieldsInfo()[0].name;

					previousSelection = formObject.getPreviousSelection();

					inputPrimaryKey = document.getElementById("inputPrimaryKey").value;
				
					gridObject = new CodeReuse.TenantGrid();

					selectedRowId = gridObject.getTenantSelectedRowId();
				}

				if(inputPrimaryKey != "" && selectedRowId != "")
				{
					if(previousSelection != undefined)
					{
						if(previousSelection == rowPrimaryKey)
						{
							alert('You have selected the same record.');
							return;
						}
					}
				}

				var lock = new CodeReuse.Lock();

				if(previousSelection == undefined)
				{
					//alert('no unlock');
					lock.form_checkdelete_checklock_lock(tableNameInDb, primaryKeyFieldName, rowPrimaryKey, sessionStorage.getItem("userId"), rowOnClick, phpFile, tableHtmlObjectId);
				}
				else
				{
					//alert('unlock');
					lock.form_unlock(tableNameInDb, previousSelection, primaryKeyFieldName, rowPrimaryKey, sessionStorage.getItem("userId"), rowOnClick, phpFile, tableHtmlObjectId);
				}
			}
		};
			
		var cell;
		var cellText;
		
		if(showEditColumn == "showEdit")
		{			
			cell = document.createElement("td");
			//cell.className = "grid";

			cell.style.padding = "10px";
			
			cell.value = response[tableRowCount]["fieldPrimaryKey"];
			
			editButton = document.createElement("a");
			editButton.innerText = "edit";
			editButton.id = "editLink";
			editButton.className = "underline";

			var editButtonStyle = editButton.style;

			editButtonStyle.cursor = "pointer";
			editButtonStyle.width = "50px";
			
			editButton.onclick = function(tablePrimaryKey) 
			{		
				var tableEdit = document.getElementById(tableHtmlObjectId);

				var tablePrimaryKeyValue = tablePrimaryKey.target.parentNode.parentNode.cells[1].innerText;
				
				var helper = new CodeReuse.Helper();

				if(sessionStorage.getItem("editMode") == "true")
				{
					helper.msgBox('alert', 'You are in edit mode. Please click save to leave save mode.');
				
					return;
				}

				helper.resetRowHighlight(tableHtmlObjectId);

				
				var gridObject;
				var tableNameInDb;
				var primaryKeyFieldName;
				
				if(tableHtmlObjectId == "tableHomeTenant")
				{
					gridObject = new CodeReuse.HomeTenantGrid();

					tableNameInDb = gridObject.getTableNameInDb();

					primaryKeyFieldName = gridObject.getGridColumnsInfo()[0].id;
				}


				var tableName_primaryKey = "tableName=" + tableNameInDb + "&primaryKey=" + tablePrimaryKeyValue;

				sessionStorage.setItem("recordLockInformation", tableName_primaryKey);				

				
				var lock = new CodeReuse.Lock();

				lock.grid_checkdelete_checklock_lock(tableNameInDb, primaryKeyFieldName, tablePrimaryKeyValue, sessionStorage.getItem("userId"), tableEdit);
			}
			
			cell.appendChild(editButton);
			
			//cell.height = 25;

			//cell.className = "heightCell";

			row.appendChild(cell);
		}			
		
		//row.className = "heightRow";
			
		for(var i=0; i<gridColumnsInfo.length; i++)
		{	
			cell = document.createElement("td");

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


	if(tableHtmlObjectId == "tableHomeTenant" && document.getElementById("homeTenantGridSearchInputAndButton").style.display != "block")
	{
		document.getElementById("homeTenantGridSearchInputAndButton").style.display = "block";
	}
	else
	if(tableHtmlObjectId == "tableHomeTenantFormGridPaging" && document.getElementById("homeTenantFormGridPagingSearchInputAndButton").style.display != "block")
	{
		document.getElementById("homeTenantFormGridPagingSearchInputAndButton").style.display = "block";
	}	

	divTable.appendChild(tbl);

	if(tableHtmlObjectId == "tableHomeTenantFormGridPaging" && document.getElementById("saveNewButtonTenantFormGridPaging").style.display != "block")
	{
		document.getElementById("saveNewButtonTenantFormGridPaging").style.display = "block";
	}
	else
	if(tableHtmlObjectId == "tableSuite" && document.getElementById("saveNewButtonSuite").style.display != "block")
	{
		document.getElementById("saveNewButtonSuite").style.display = "block";
	}
	else
	if(tableHtmlObjectId == "tableTenant" && document.getElementById("saveNewButtonTenant").style.display != "block")
	{
		document.getElementById("saveNewButtonTenant").style.display = "block";
	}

	// if showPagingFooter == "true" and sessionStorage.getItem("editMode") != "true"
	// then update the total pageNumbers
	// the get_pageNumbers onload parameter will help preload the second grid, HomeTenantFormGridPaging
	if(showPagingFooter == "true" && sessionStorage.getItem("editMode") != "true")
	{	
		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		if(tableHtmlObjectId == "tableHomeTenant")
		{
			var home_tenant_grid = new CodeReuse.HomeTenantGrid();

			var searchValue = home_tenant_grid.getSearchValue();

			if(searchValue == "" || searchValue == undefined)
			{
				grid_get_post_functions.get_pageNumbers(home_tenant_grid.getPhpFile(), divPagingFooter, home_tenant_grid.getPageNumbersQueryName(), home_tenant_grid.getPageSize(), home_tenant_grid.getTableHtmlObjectId(), '', '', onload);
			}
			else
			{
				grid_get_post_functions.get_pageNumbers(home_tenant_grid.getPhpFile(), divPagingFooter, home_tenant_grid.getPageNumbersQueryName(), home_tenant_grid.getPageSize(), home_tenant_grid.getTableHtmlObjectId(), "searchValue", searchValue, onload);
			}
		}
		else
		if(tableHtmlObjectId == "tableHomeTenantFormGridPaging")
		{
			var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

			var searchValue = home_tenant_form_grid_paging.getSearchValue();

			if(searchValue == "" || searchValue == undefined)
			{
				grid_get_post_functions.get_pageNumbers(home_tenant_form_grid_paging.getPhpFile(), divPagingFooter, home_tenant_form_grid_paging.getPageNumbersQueryName(), home_tenant_form_grid_paging.getPageSize(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', onload);
			}
			else
			{
				grid_get_post_functions.get_pageNumbers(home_tenant_form_grid_paging.getPhpFile(), divPagingFooter, home_tenant_form_grid_paging.getPageNumbersQueryName(), home_tenant_form_grid_paging.getPageSize(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", searchValue, onload);
			}
		}
	}	

},

/**
 * Callback when the XMLHttpRequest get method returns from function Grid_Get_Post_Functions get_populateGrid
 * @function
 * @name Callback#get_populateGrid_callback
 * 
 * @param {string} response the response from the XMLHttpRequest get
 * @param {string} divElement the html div id to use to attach the table to 
 * @param {Array} arrayOldValuesTableGridEdit array to keep track of row old values used for updating fields
 * @param {Object} tableHtml the html table object used to replace the row edited with form objects
 * @param {string} fieldPrimaryKey the table row primary key
 * @param {string} tableHtmlObjectId the html table object
 **/
get_populateGrid_callback: function(response, gridColumnsInfo, arrayOldValuesTableGridEdit, tableHtml, fieldPrimaryKey, tableHtmlObjectId) {

	var record = response[0];

	if(record == undefined)
	{
		alert('Record no longer exists. Please refresh the grid.');
		sessionStorage.setItem("editMode", "false");	
		return;
	}

	var tableEdit = tableHtml;

	for(tableEditCount=0; tableEditCount<tableEdit.rows.length; tableEditCount++)
	{
		row = tableEdit.rows[tableEditCount + 1];

		if(row.cells[1].innerText == fieldPrimaryKey)
		{
			break;
		}
	}

	var helper = new CodeReuse.Helper();

	//var homeTenantGrid = new CodeReuse.HomeTenantGrid();

	//helper.resetRowHighlight(homeTenantGrid.getTableHtmlObjectId());

	tableEdit.rows[tableEditCount + 1].className = "highlightRow";
	
	tableEdit.rows[tableEditCount + 1].innerHTML = "<td height=\"25\" class=\"grid\" style=\"padding: 10px\"><a id=\"saveLink2\" class=\"underline\" style=\"cursor: pointer; width: 50px\">save</a></td><td class=\"grid\"><span id=\"inputPrimaryKey_grid\"></span></td><td class=\"grid\"><select id=\"building_option_grid\"><option value=\"\"><option value=\"1\">building</option><option value=\"2\">building2</option></select></td><td class=\"grid\"><input id=\"tenant_input_grid\" value=\"\" style=\"position: relative; z-index: 1; background-color: white; width: 200\" \"/></td><td class=\"grid\"><input id=\"inputCalendar_grid\" style=\"position: relative; z-index: 1; background-color: white; width: 100\" value=\"\" />&nbsp;&nbsp;<img id=\"inputCalendar_grid_icon\" src=\"images/favpng_font-awesome-calendar-font.png\" width=\"14\" height=\"14\" style=\"cursor: pointer\"></td><td class=\"grid\"><input id=\"inputCalendarTesting_grid\" style=\"position: relative; z-index: 1; background-color: white; width: 100\" value=\"\"/>&nbsp;&nbsp;<img id=\"inputCalendarTesting_grid_icon\" src=\"images/favpng_font-awesome-calendar-font.png\" width=\"14\" height=\"14\" style=\"cursor: pointer\"></td>";

	var gridEventFunctions = new CodeReuse.GridEventFunctions();

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

	document.getElementById("tenant_input_grid").onkeyup = function(event) 
	{
		gridEventFunctions.tenant_input_grid_onKeyUp(event);
	}

	document.getElementById("tenant_input_grid").onfocus = function() 
	{
		this.select();
	}

	document.getElementById("tenant_input_grid").placeholder = "suite# or first or last name";
	
	//document.getElementById("inputCalendar_grid").style.position = "relative";
	//document.getElementById("inputCalendar_grid").style.zIndex = "1";
	//document.getElementById("inputCalendar_grid").style.backgroundColor = "white";
	//document.getElementById("inputCalendar_grid").style.width = "142";
	

	var calendar = new CodeReuse.Calendar();
	
	/*
	document.getElementById("inputCalendar_grid").onfocus = function() 
	{
		gridEventFunctions.inputCalendar_grid_onFocus();
	}
	*/
	
	document.getElementById("inputCalendar_grid").onblur = function() 
	{
		gridEventFunctions.inputCalendar_grid_onBlur();
	}

	var helper = new CodeReuse.Helper();
				
	var dateFormat = helper.convertDateFromDatabase(record["field1"]);
	
	document.getElementById("inputCalendar_grid").value = dateFormat;


	//document.getElementById("inputCalendarTesting_grid").style.position = "relative";
	//document.getElementById("inputCalendarTesting_grid").style.zIndex = "1";
	//document.getElementById("inputCalendarTesting_grid").style.backgroundColor = "white";
	//document.getElementById("inputCalendarTesting_grid").width = "142";
	
	/*
	document.getElementById("inputCalendarTesting_grid").onfocus = function() 
	{
		gridEventFunctions.inputCalendarTesting_grid_onFocus();
	}
	*/

	document.getElementById("inputCalendarTesting_grid").onblur = function() 
	{
		gridEventFunctions.inputCalendarTesting_grid_onBlur();
	}
				
	var dateFormat = helper.convertDateFromDatabase(record["field2"]);

	inputCalendarTesting_grid.value = dateFormat;


	var divCalendarId = "calendarId";

	document.getElementById("inputCalendar_grid_icon").onclick = function() {

			var divCalendar = document.getElementById(divCalendarId);

			if(divCalendar.style.display == "block")
			{
				calendar.showHideCalendar('hide' ,'inputCalendar_grid', divCalendarId, monthsArray);
			}
			else
			if(divCalendar.style.display == "none")
			{
				calendar.showHideCalendar('show' ,'inputCalendar_grid', divCalendarId, monthsArray);
			}
	}

	document.getElementById("inputCalendarTesting_grid_icon").onclick = function() {

			var divCalendar = document.getElementById(divCalendarId);
		
			if(divCalendar.style.display == "block")
			{
				calendar.showHideCalendar('hide' ,'inputCalendarTesting_grid', divCalendarId, monthsArray);
			}
			else
			if(divCalendar.style.display == "none")
			{
				calendar.showHideCalendar('show' ,'inputCalendarTesting_grid', divCalendarId, monthsArray);
			}			
	}	
	

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
		}


		// to update the total page numbers when entering edit mode
		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		if(tableHtmlObjectId == "tableHomeTenant")
		{
			var home_tenant_grid = new CodeReuse.HomeTenantGrid();

			var searchValue = home_tenant_grid.getSearchValue();
			
			if(searchValue == "" || searchValue == undefined)
			{
				grid_get_post_functions.get_pageNumbers(home_tenant_grid.getPhpFile(), home_tenant_grid.getDivPagingFooter(), home_tenant_grid.getPageNumbersQueryName(), home_tenant_grid.getPageSize(), home_tenant_grid.getTableHtmlObjectId(), '', '', onload);
			}
			else
			{
				grid_get_post_functions.get_pageNumbers(home_tenant_grid.getPhpFile(), home_tenant_grid.getDivPagingFooter(), home_tenant_grid.getPageNumbersQueryName(), home_tenant_grid.getPageSize(), home_tenant_grid.getTableHtmlObjectId(), "searchValue", searchValue, onload);
			}
		}

	}
},

/**
 * Refresh Suite grid after inserting or updating Suite record
 * @function
 * @name Callback#refreshGridCallbackSuite
 * 
 * @param {string} highlightId the primary key row id to highlight
 **/
refreshGridCallbackSuite: function(highlightId)
{
	
	var suiteModel = new CodeReuse.Suite();

	suiteModel.refreshSuiteGrid(highlightId);
	
},

/**
 * Refresh Tenant grid after inserting or updating Tenant record
 * @function
 * @name Callback#refreshGridCallback
 * 
 * @param {string} highlightId the primary key row id to highlight
 **/
refreshGridCallback: function(highlightId)
{
	
	var tenantModel = new CodeReuse.Tenant();
	
	tenantModel.refreshTenantGrid(highlightId);	
	
},

/**
 * Callback when the XMLHttpRequest get method returns from function Grid_Get_Post_Functions get_populateForm
 * @function
 * @name Callback#get_populateForm_callback
 * 
 * @param {string} response the response from the XMLHttpRequest get
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} autocompleteInputs array of autocomplete inputs
 * @param {Array} arrayOldValuesTable array to keep track of form old values used for updating fields
 **/
get_populateForm_callback: function(response, fieldsInfo, autocompleteInputs, arrayOldValuesTable)
{	
	var record = response[0];
	
	if(record == undefined)
	{
		alert('Record no longer exists. Please refresh the grid.');
		return;
	}

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