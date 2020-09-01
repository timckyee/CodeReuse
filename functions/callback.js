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
 */
gridCallback: function(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, rowOnClick, showEditColumn, sortColumn, sortDirection, pageNumber, highlightRowId) {

	var tbl = document.createElement("table");
	tbl.id = tableHtmlObjectId;
	
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
								
	var tableHeaderRow = document.createElement("tr");
	
	var tableHeader;
	var tableHeaderText;
	
	if(showEditColumn == "showEdit")
	{
		tableHeader = document.createElement("th");
		
		tableHeader.style.width = "70px";
		
		tableHeaderRow.appendChild(tableHeader);
	}

	for(var i=0; i<gridColumnsInfo.length; i++)
	{	
		tableHeader = document.createElement("th");

		tableHeader.id = gridColumnsInfo[i].id + "ColumnHeader";

		//if(gridColumnsInfo[i].id == "fieldPrimaryKey")
		//{
		//	tableHeader.className = "description";
		//}

		tableHeader.style.padding = "12";
		tableHeader.style.textAlign = "left";
		tableHeader.style.whiteSpace = "nowrap";
		tableHeader.style.overflow = "hidden";
		tableHeader.style.textOverflow = "ellipsis";

        var columnName = gridColumnsInfo[i].colName;

        tableHeaderSpan = document.createElement("span");
        tableHeaderSpan.id = gridColumnsInfo[i].id + "Span";
		tableHeaderSpan.innerHTML = columnName;
		//tableHeaderSpan.className = "span";
        tableHeaderSpan.style.textDecoration = "underline";
        tableHeaderSpan.style.userSelect = "none";
        tableHeaderSpan.style.cursor = "pointer";
		tableHeaderSpan.style.paddingRight = "10";

		if(tableHtmlObjectId == "tableHomeTenant")
		{
			tableHeaderSpan.onclick = function(headerCellSpan) {

				//var columnId = headerCellSpan.srcElement.parentElement.id;
				var columnId = headerCellSpan.srcElement.id;
				for(var column=0; column<gridColumnsInfo.length; column++)
				{
					if(gridColumnsInfo[column].id + "Span" == columnId)
						break;
				}
				
				var handler = new CodeReuse.Handler();
				
				handler.sortTableColumnOnclickHandlerHomeTenantGrid(tableHtmlObjectId, gridColumnsInfo, column, pageNumber);
			}
		}
		else
		{
			tableHeaderSpan.onclick = function(headerCellSpan) {

				//var columnId = headerCellSpan.srcElement.parentElement.id;
				var columnId = headerCellSpan.srcElement.id;
				for(var column=0; column<gridColumnsInfo.length; column++)
				{
					if(gridColumnsInfo[column].id + "Span" == columnId)
						break;
				}

				var handler = new CodeReuse.Handler();

				handler.sortTableColumnOnclickHandler(tableHtmlObjectId, gridColumnsInfo, column);
			}
		}
		
        tableHeader.appendChild(tableHeaderSpan);

		tableHeaderIcon = document.createElement("img");
		tableHeaderIcon.id = tableHtmlObjectId + "_" + gridColumnsInfo[i].id + "ColumnHeaderIcon";
		//tableHeaderIcon.className = "icon";
				
		//var server = new CodeReuse.Config();

		//tableHeaderIcon.src = server.getServerUrl() + "/images/pngfuel.com.up.png";
		tableHeaderIcon.width = "0";
		tableHeaderIcon.height = "0";

		tableHeaderIcon.style.display = "none";

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
		
		if(highlightRowId != '')
		{
			if(response[tableRowCount]["fieldPrimaryKey"] == highlightRowId)
			{
				row.className = "tableHover highlightRow";
			}
		}

		row.onclick = function(rowValues) {

			//var rowPrimaryKey = rowValues.srcElement.parentNode.cells[0].innerText;

			//var rowPrimaryKey = rowValues.srcElement.parentNode.value;

			if(tableHtmlObjectId != "tableHomeTenant")
			{
				var rowPrimaryKey;

				if(rowValues.srcElement.parentNode.cells == undefined)
				{
					rowPrimaryKey = rowValues.srcElement.cells[0].innerText;
				}
				else
				{
					rowPrimaryKey = rowValues.srcElement.parentNode.cells[0].innerText;
				}

				rowOnClick(phpFile, rowPrimaryKey, fieldsInfo, gridColumnsInfo); 
			}
		};
			
		var cell;
		var cellText;
			
		if(showEditColumn == "showEdit")
		{			
			cell = document.createElement("td");
			
			cell.style.paddingLeft = "10px";
						
			//cellText = document.createTextNode("edit");
			
			cell.value = response[tableRowCount]["fieldPrimaryKey"];
			
			editButton = document.createElement("button");
			editButton.type = "button";
			//editButton.value = "edit";
			editButton.innerText = "edit";
			editButton.id = "editButton";
			editButton.style.width = "50px";

			var tenantModel = new CodeReuse.Tenant();
			
			var home_tenant_grid = new CodeReuse.HomeTenantGrid();
			
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
			
			var callback = new CodeReuse.Callback();
			
			editButton.onclick = function(tablePrimaryKey) 
			{
				var tableHtml = document.getElementById(tableHtmlObjectId);

				var tableRows = tableHtml.rows[1];
			
				var countSave = 0;
			
				for(var i=1; i<tableHtml.rows.length; i++)
				{
					if(tableHtml.rows[i].cells[0].innerText == "save")
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

						grid_get_post_functions.gridEdit(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), gridColumnsInfo, home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridEditCallback, home_tenant_grid.getRowOnClick(), tablePrimaryKeyValue, sortColumn, sortDirection, pageNumber);
											
					}
					else
					if(result == false)
					{
						return;
					}
				});
			}
			
			//cell.className = "underline";
			cell.appendChild(editButton);
			
			cell.height = 25;
			
			row.appendChild(cell);
		}			
			
		for(var i=0; i<gridColumnsInfo.length; i++)
		{	
			cell = document.createElement("td");
			cell.className = "grid";
			
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
		
		//debugger
	}
	
	divTable.innerHTML = "";
	
	divTable.appendChild(tbl);

	if(tableHtmlObjectId == "tableHomeTenant")
	{
		if(localStorage.getItem("gridLoadHomeGrid") == "false")
		{
			var column = localStorage.getItem("arraySortColumn");
			var direction = localStorage.getItem("arraySortDirection");

			for(var i=0; i<gridColumnsInfo.length; i++)
			{
				var htmlSortIconId = tableHtmlObjectId + "_" + column + "ColumnHeaderIcon";

				if(tableHtmlObjectId + "_" + gridColumnsInfo[i].id + "ColumnHeaderIcon" == htmlSortIconId)
				{
					document.getElementById(htmlSortIconId).width = "14";
					document.getElementById(htmlSortIconId).height = "14";

					var server = new CodeReuse.Config();

					if(direction == "asc")
					{
						//document.getElementById(htmlSortIconId).src = images[0].src;
						document.getElementById(htmlSortIconId).src = server.getServerUrl() + "/images/pngfuel.com.up.png";
					}
					else if(direction == "desc")
					{
						//document.getElementById(htmlSortIconId).src = images[1].src;
						document.getElementById(htmlSortIconId).src = server.getServerUrl() + "/images/pngfuel.com.down.png";
					}
					
					document.getElementById(htmlSortIconId).style.display = "inline";
				}
				else
				{
					document.getElementById(tableHtmlObjectId + "_" + gridColumnsInfo[i].id + "ColumnHeaderIcon").style.display = "none";
				}
			}
		}
		else
		{
			localStorage.setItem("gridLoadHomeGrid", "false");
		}
	}
},

/**
 * Callback when the XMLHttpRequest get method returns from function Grid_Get_Post_Functions gridEdit
 * @callback gridEditCallback
 * @name Callback#gridEditCallback
 * 
 * @param {string} phpFile php file name and location
 * @param {string} response the response from the XMLHttpRequest get
 * @param {string} divTable the html div object to attach the table to
 * @param {string} tableHtmlObjectId the html table id
 * @param {Array} fieldsInfo form object array of fields
 * @param {string} gridIdField the primary key for the table rows
 * @param {Array} gridColumnsInfo grid object array of columns 
 * @param {function} tenantGridRowOnClick no need for this param
 * @param {string} rowId field primary key for populating the grid row when editing
 * @param {string} sortColumn the grid column which is currently sorted
 * @param {string} sortDirection the direction which is currently sorted
 * @param {string} pageNumber the page number of the table we are currently showing
 */
gridEditCallback: function(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, tenantGridRowOnClick, rowId, sortColumn, sortDirection, pageNumber) {

	localStorage.setItem("editMode", "true");

	var tbl = document.createElement("table");
	tbl.id = tableHtmlObjectId;
	tbl.className = "homeGrid";
	
	var tableHeaderRow = tbl.insertRow();					
								
	//var tableHeaderRow = document.createElement("tr");
	
	var tableHeader;
	var tableHeaderText;		
	
	tableHeader = document.createElement("th");
	tableHeader.style.width = "70px";
	
	tableHeaderRow.appendChild(tableHeader);	
	
	for(var i=0; i<gridColumnsInfo.length; i++)
	{	
		tableHeader = document.createElement("th");

		tableHeader.id = gridColumnsInfo[i].id + "ColumnHeader";

		//if(gridColumnsInfo[i].id == "fieldPrimaryKey")
		//{
		//	tableHeader.className = "description";
		//}

		tableHeader.style.padding = "12";
		tableHeader.style.textAlign = "left";
		tableHeader.style.whiteSpace = "nowrap";
		tableHeader.style.overflow = "hidden";
		tableHeader.style.textOverflow = "ellipsis";

        var columnName = gridColumnsInfo[i].colName;

        tableHeaderSpan = document.createElement("span");
        tableHeaderSpan.id = gridColumnsInfo[i].id + "Span";
		tableHeaderSpan.innerHTML = columnName;
		//tableHeaderSpan.className = "span";
        tableHeaderSpan.style.textDecoration = "underline";
        tableHeaderSpan.style.userSelect = "none";
        tableHeaderSpan.style.cursor = "pointer";
		tableHeaderSpan.style.paddingRight = "10";
		
		if(tableHtmlObjectId == "tableHomeTenant")
		{
			tableHeaderSpan.onclick = function() {

				alert('Please click on save to leave save mode before sorting');
			
			}
		}

        tableHeader.appendChild(tableHeaderSpan);

		tableHeaderIcon = document.createElement("img");
		tableHeaderIcon.id = tableHtmlObjectId + "_" + gridColumnsInfo[i].id + "ColumnHeaderIcon";
		//tableHeaderIcon.className = "icon";
				
		//var server = new CodeReuse.Config();

		//tableHeaderIcon.src = server.getServerUrl() + "/images/pngfuel.com.up.png";
		tableHeaderIcon.width = "0";
		tableHeaderIcon.height = "0";

		tableHeaderIcon.style.display = "none";

        tableHeader.appendChild(tableHeaderIcon);

        tableHeaderRow.appendChild(tableHeader);
    
	}
	
	tbl.appendChild(tableHeaderRow);
	
	var tableRowCount;

	for(tableRowCount=0; tableRowCount<response.length; tableRowCount++)
	{
		var row = tbl.insertRow();

		cell = document.createElement("td");
				
		cell.style.paddingLeft = "10px";
		
		cell.value = response[tableRowCount]["fieldPrimaryKey"];
		
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

			var tableHtml = document.getElementById(tableHtmlObjectId);

			var tableRows = tableHtml.rows[1];
		
			var countSave = 0;
		
			for(var i=1; i<tableHtml.rows.length; i++)
			{
				if(tableHtml.rows[i].cells[0].innerText == "save")
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
			
					grid_get_post_functions.gridEdit(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridEditCallback, home_tenant_grid.getRowOnClick(), tablePrimaryKeyValue, sortColumn, sortDirection, pageNumber);
					//grid_get_post_functions.gridEdit(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridEditCallback, home_tenant_grid.getRowOnClick(), tablePrimaryKeyValue, localStorage.getItem("arraySortColumn"), localStorage.getItem("arraySortDirection"), pageNumber);
				}
				else
				if(result == false)
				{
					return;
				}
			});
		};
											
		//cell.className = "underline";	
		cell.appendChild(editButton);
		
		cell.height = 25;
		
		row.appendChild(cell);


		
		for(i=0; i<gridColumnsInfo.length; i++)
		{	
			
			cell = document.createElement("td");
			
			cell.className = "grid";
				
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

	//var fieldPrimaryKey = response[tableRowNumber - 1]["fieldPrimaryKey"].toString();
	var fieldPrimaryKey = rowId;

	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();

	var tenantModel = new CodeReuse.Tenant();
	
	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	var autocompleteInputs = tenantModel.getAutocompleteInputs();
	
	var callback = new CodeReuse.Callback();
	
	grid_get_post_functions.get_populateGrid(phpFile, home_tenant_grid.getGridGetPostDivElement(), "populategrid", fieldPrimaryKey, tenantModel.getFieldsInfo(), home_tenant_grid.getColumnsInfo(), home_tenant_grid.getAutocompleteInputs(), home_tenant_grid.arrayOldValuesTableGridEdit, callback.get_populateGrid_callback, tbl, fieldPrimaryKey, home_tenant_grid.getTableHtmlObjectId());

},

/**
 * Callback when the XMLHttpRequest get method returns from function Grid_Get_Post_Functions get_populateGrid
 * @callback get_populateGrid_callback
 * @name Callback#get_populateGrid_callback
 * 
 * @param {string} response the response from the XMLHttpRequest get
 * @param {string} divElement the html div id to use to attach the table to
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} gridColumnsInfo grid object array of columns
 * @param {Array} autocompleteInputs array of autocomplete inputs
 * @param {Array} arrayOldValuesTableGridEdit array to keep track of row old values used for updating fields
 * @param {Object} tableHtml the html table object used to replace the row edited with form objects
 * @param {string} fieldPrimaryKey the table row primary key
 * @param {string} tableHtmlObjectId no need for this param
 */
get_populateGrid_callback: function(response, divElement, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTableGridEdit, tableHtml, fieldPrimaryKey, tableHtmlObjectId) {
	
	var record = response[0];

	//tableRowNumber = tableRowNumber - 1;


	var tableEdit = tableHtml;

	var rowReplace;

	for(tableEditCount=0; tableEditCount<tableEdit.rows.length; tableEditCount++)
	{		
		row = tableEdit.rows[tableEditCount + 1];
		if(row.cells[1].innerText == fieldPrimaryKey)
		{
			rowReplace = tableEdit.rows[tableEditCount + 1];
			break;
		}
	}

	//var rowReplace = tableEdit.rows[tableRowNumber + 1];

	var newRow = document.createElement("tr");

	//var newRow = tableEdit.insertRow(tableEditCount);

	var cell = document.createElement("td");
						
	cell.style.paddingLeft = "10px";

	cell.value = fieldPrimaryKey;

	saveButton = document.createElement("button");
	saveButton.type = "button";
	//saveButton.value = "save";
	saveButton.innerText = "save";
	saveButton.id = "saveButton";
	saveButton.style.width = "50px";
	
	var tenantModel = new CodeReuse.Tenant();
	
	var home_tenant_grid = new CodeReuse.HomeTenantGrid();
	
	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
	
	var callback = new CodeReuse.Callback();
	
	saveButton.onclick = function(tablePrimaryKey)
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

		helper.msgBox('confirm', 'Would you like to save this row?', function (result) {

			if(result == true)
			{
				controller.homeTenantGridSave();

				localStorage.setItem("gridLoadHomeGrid", "true");
			}
			else
			if(result == false)
			{
				return;
			}
		});
	};

	//cell.className = "underline";	
	cell.appendChild(saveButton);
	
	cell.height = 25;
	
	newRow.appendChild(cell);
		
	
	cell = document.createElement("td");

	cell.className = "grid";
	
	inputPrimaryKey = document.createElement("span");
	inputPrimaryKey.id = "inputPrimaryKey_grid";
	inputPrimaryKey.innerHTML = fieldPrimaryKey;
	
	cell.appendChild(inputPrimaryKey);
			
	newRow.appendChild(cell);

	
	cell = document.createElement("td");
	cell.className = "grid";
	
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

	building_option_grid.selectedIndex = record["field3"];

	cell.appendChild(building_option_grid);
					
	newRow.appendChild(cell);

	
	cell = document.createElement("td");
	cell.className = "grid";
	
	tenant_input_grid = document.createElement("input");
	tenant_input_grid.id = "tenant_input_grid";
	
	tenant_input_grid.value = record["field4display"];
	tenant_input_grid.setAttribute("rowAttributeValue", record["field4"]);
	
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
			autocomplete.autocomplete(event, "formInput", "tenantSearchList", "suiteNumber,tenantName", "tenantId",  "GET", home_tenant_grid.getPhpFile(), "tenants", "building", document.getElementById("building_option_grid").selectedIndex, "tenant_input_grid", "tenantSearchList");
		}
		
	});		
	
	tenant_input_grid.addEventListener("focusout", function() { autocomplete.focusOutHide ("tenantSearchList"); });	


	cell.appendChild(tenant_input_grid);
	
	newRow.appendChild(cell);

	
	cell = document.createElement("td");
	cell.className = "grid";
	
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
				
	var dateFormat = helper.convertDateFromDatabase(record["field1"]);

	inputCalendar_grid.value = dateFormat;
	
	cell.appendChild(inputCalendar_grid);
	
	newRow.appendChild(cell);

	
	cell = document.createElement("td");
	cell.className = "grid";
	
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
				
	var dateFormat = helper.convertDateFromDatabase(record["field2"]);

	inputCalendarTesting_grid.value = dateFormat;
	
	cell.appendChild(inputCalendarTesting_grid);

	newRow.appendChild(cell);

	rowReplace.parentNode.replaceChild(newRow, rowReplace);

	var divTable = document.getElementById(divElement);

	divTable.innerText = "";

	divTable.appendChild(tableEdit);


	var record = response[0];
	
	for(i=0; i<gridColumnsInfo.length; i++)
	{
		var hiddenFieldFlag = gridColumnsInfo[i].hasIdHiddenField;
		var hiddenField = gridColumnsInfo[i].idDbField;	
				
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
		}
	}
},

/**
 * Refresh Suite grid after inserting or updating Suite record
 * @function
 * @name refreshGridCallbackSuite
 */
refreshGridCallbackSuite: function()
{
	
	var suiteModel = new CodeReuse.Suite();
	
	suiteModel.refreshSuiteGrid();
	
},

/**
 * Refresh Tenant grid after inserting or updating Tenant record
 * @function
 * @name refreshGridCallback
 */
refreshGridCallback: function()
{
	
	var tenantModel = new CodeReuse.Tenant();
	
	tenantModel.refreshTenantGrid();	
	
},

/**
 * Refresh Home Tenant grid after updating Tenant record
 * @function
 * @name refreshGridCallbackHomeTenantGrid
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
 * @param {Array} gridColumnsInfo grid object array of columns
 * @param {Array} autocompleteInputs array of autocomplete inputs
 * @param {Array} arrayOldValuesTable array to keep track of form old values used for updating fields
 */
get_populateForm_callback: function(response, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTable)
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