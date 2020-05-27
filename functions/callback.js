CodeReuse.Callback = function() {
	
};

CodeReuse.Callback.prototype = {

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
	
	for(i=0; i<gridColumnsInfo.length; i++)
	{	
		tableHeader = document.createElement("th");
		tableHeader.className = "underline";	

		var handler = new CodeReuse.Handler();	
		
		if(tableHtmlObjectId == "tableHomeTenant")
			tableHeader.onclick = handler.sortTableColumnOnclickHandlerHomeTenantGrid(tableHtmlObjectId, gridColumnsInfo, i, pageNumber);
		else
			tableHeader.onclick = handler.sortTableColumnOnclickHandler(tableHtmlObjectId, gridColumnsInfo, i);
		
		var columnName = gridColumnsInfo[i].colName;
		
		tableHeaderText = document.createTextNode(columnName);
		tableHeader.appendChild(tableHeaderText);
		tableHeaderRow.appendChild(tableHeader);				
	}
	
	tbl.appendChild(tableHeaderRow);

	for(tableRowCount=0; tableRowCount<response.length; tableRowCount++)
	{
			
		var row = document.createElement("tr");
		
		row.className = "tableHover";
		
		if(highlightRowId != '')
		{
			if(response[tableRowCount]["fieldPrimaryKey"] == highlightRowId)
			{
				row.className = "tableHover highlightRow";
			}
		}
		else
		{
			row.className = "tableHover";
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
			
				var highlightRow = i;

				if(countSave == 1)
				{
					alert('Please click on save to leave save mode');
					return;	
				}

				var helper = new CodeReuse.Helper();

				helper.msgBox('confirm', 'Would you like to edit this row?', function (result) {

					if(result == true)
					{
						//var table = document.getElementById(home_tenant_grid.getTableHtmlObjectId());

						var tablePrimaryKeyValue = tablePrimaryKey.srcElement.parentNode.parentNode.cells[1].innerText;
				
						/*
						for(var i=0; i<table.rows.length; i++)
						{
							if(table.rows[i].cells[1].innerText == tablePrimaryKeyValue)
							{
								table.rows[i].className = "highlightRow";
								break;
							}
						}
						*/

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

},

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
	
	for(i=0; i<gridColumnsInfo.length; i++)
	{				
		tableHeader = document.createElement("th");
		tableHeader.className = "underline";	

		var handler = new CodeReuse.Handler();

		tableHeader.onclick = handler.sortTableColumnOnclickHandlerHomeTenantGrid(tableHtmlObjectId, gridColumnsInfo, i, pageNumber);
		//tableHeader.onclick = handler.sortTableColumnOnclickHandlerHomeTenantGrid(tableHtmlObjectId, gridColumnsInfo, i, localStorage.getItem("homeTenantGridPageNumber"));

		var columnName = gridColumnsInfo[i].colName;
		
		tableHeaderText = document.createTextNode(columnName);
		tableHeader.appendChild(tableHeaderText);
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

onkeyupTenantInput: function(event){
			
	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	if(document.getElementById("tenant_input_grid").value == "")
	{
		document.getElementById("tenantSearchList").innerHTML = "";			
	}
	else
	{
		var autocomplete = new CodeReuse.Autocomplete();

		autocomplete.autocomplete(event, "gridInput", "tenantSearchList", "suiteNumber,tenantName", "tenantId",  "GET", home_tenant_grid.getPhpFile(), "tenants", "building", document.getElementById("building_option_grid").selectedIndex, "tenant_input_grid", "tenantSearchList");
	}
	
},

onfocusoutTenantInput: function() { 
	
	var autocomplete = new CodeReuse.Autocomplete();

	autocomplete.focusOutHide ("tenantSearchList");
 },

onclickGridSaveButton: function(tablePrimaryKey)
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
		}
		else
		if(result == false)
		{
			return;
		}
	});

},

onfocusGridCalendarInput: function(event){

	var calendar = new CodeReuse.Calendar();
	calendar.showHideCalendar(event, 'show' ,'inputCalendar_grid', "calendarId", monthsArray)

},

onblurGridCalendarInput: function(event){

	var calendar = new CodeReuse.Calendar();

	if(calendar.validateDate(event.id) == false)
	{
		alert("input format has to be dd-mmm-yyyy");
	}

	/*
	if(calendar.validateDate(this.id) == false)
	{
		alert("input format has to be dd-mmm-yyyy");
	}
	*/
},

onfocusGridCalendarInputTesting: function(event){

	var calendar = new CodeReuse.Calendar();
	calendar.showHideCalendar(event, 'show' ,'inputCalendarTesting_grid', "calendarId", monthsArray)

},

onblurGridCalendarInputTesting: function(event){

	var calendar = new CodeReuse.Calendar();

	if(calendar.validateDate(event.id) == false)
	{
		alert("input format has to be dd-mmm-yyyy");
	}

	/*
	if(calendar.validateDate(this.id) == false)
	{
		alert("input format has to be dd-mmm-yyyy");
	}
	*/
},

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


	/*
	var row = document.getElementById(tableHtmlObjectId).rows[parseInt(tableRowNumber) + 1];

	var helper = new CodeReuse.Helper();
				
	var dateFormat_inputCalendar_grid = helper.convertDateFromDatabase(record["field1"]);
	var dateFormat_inputCalendarTesting_grid = helper.convertDateFromDatabase(record["field2"]);
	*/

//<td height=\"25" style="padding-left: 10px;">
//<button type="button" id="saveButton" style="width: 50px;" onclick="alert('test')">save</button>
//</td>
//<td class="grid"><span id="inputPrimaryKey_grid">1</span></td>
//<td class="grid"><select id="building_option_grid"><option></option><option>building</option>
//<option>building2</option></select></td>
//<td class="grid">
//<input id="tenant_input_grid" rowattributevalue="1" width="200" style="position: relative; z-index: 1; background-color: white;"></td>
//<td class="grid"><input id="inputCalendar_grid" style="position: relative; z-index: 1; background-color: white; width: 142px;"></td>
//<td class="grid"><input id="inputCalendarTesting_grid" width="142" style="position: relative; z-index: 1; background-color: white;"></td>
	
	/*
	var selectOption = record["field3"];
	var selectHtml;

	if(selectOption == "1")
	{
		selectHtml = "<td class=\"grid\">" +
	"<select id=\"building_option_grid\"><option value=\"\"></option><option value=\"1\" selected>building</option><option value=\"2\">building2</option></select>" +
	"</td>";
	}
	else if(selectOption == "2")
	{
		selectHtml = "<td class=\"grid\">" +
	"<select id=\"building_option_grid\"><option value=\"\"></option><option value=\"1\">building</option><option value=\"2\" selected>building2</option></select>" +
	"</td>";		
	}

	var html = "<td height=\"25\" style=\"padding-left: 10px;\">" +
	"<button id=\"saveButton\" style=\"width: 50px;\"onclick =\"var callback = new CodeReuse.Callback();callback.onclickGridSaveButton();\">save</button>" +
	"</td>" +
	"<td class=\"grid\">" +
	"<span id =\"inputPrimaryKey_grid\">" + fieldPrimaryKey + "</span>" +
	"</td>" +
	"<td class=\"grid\">" +
	"<select id=\"building_option_grid\"><option value=\"\"></option><option value=\"1\">building</option><option value=\"2\">building2</option></select>" +
	"</td>" +
	"<td class=\"grid\">" +
	"<input id=\"tenant_input_grid\" rowattributevalue=\"" + record["field4"] +  "\" width=\"200\" style=\"position: relative; z-index: 1; background-color: white;\" onkeyup=\"var callback = new CodeReuse.Callback();callback.onkeyupTenantInput(this);\" onfocusout=\"var callback = new CodeReuse.Callback();callback.onfocusoutTenantInput();\" value=\"" + record["field4display"] + "\" />" +
	"</td>" +
	"<td class=\"grid\">" +
	"<input id=\"inputCalendar_grid\" style=\"position: relative; z-index: 1; background-color: white; width: 142px;\" onfocus=\"var callback = new CodeReuse.Callback();callback.onfocusGridCalendarInput(this);\" onblur=\"var callback = new CodeReuse.Callback();callback.onblurGridCalendarInput(this);\" value=\"" + dateFormat_inputCalendar_grid + "\"></td>" +
	"</td>" +
	"<td class=\"grid\">" +
	"<input id=\"inputCalendarTesting_grid\" style=\"position: relative; z-index: 1; background-color: white; width: 142px;\" onfocus=\"var callback = new CodeReuse.Callback();callback.onfocusGridCalendarInputTesting(this);\" onblur=\"var callback = new CodeReuse.Callback();callback.onblurGridCalendarInputTesting(this);\" value=\"" + dateFormat_inputCalendarTesting_grid + "\"></td>" +
	"</td>";

	row.innerHTML = html;

	document.getElementById("building_option_grid").selectedIndex = record["field3"];

	*/

	//row.innerHTML = newRow.innerHTML;

	/*
	var row = document.getElementById(tableHtmlObjectId).rows[2];

	row.cells[1].innerHTML = "test";
	*/


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

refreshGridCallbackSuite: function()
{
	
	var suiteModel = new CodeReuse.Suite();
	
	suiteModel.refreshSuiteGrid();
	
},

refreshGridCallback: function()
{
	
	var tenantModel = new CodeReuse.Tenant();
	
	tenantModel.refreshTenantGrid();	
	
},

refreshGridCallbackHomeTenantGrid: function()
{
	
	var tenantModel = new CodeReuse.Tenant();
	
	tenantModel.refreshTenantGridHome();	
	
},

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