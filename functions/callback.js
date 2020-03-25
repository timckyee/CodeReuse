CodeReuse.Callback = function() {
	
};

CodeReuse.Callback.prototype = {

gridCallback: function(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, tenantGridRowOnClick, showEditColumn, sortColumn, sortDirection) {
	
	//debugger
	
	//divTable.innerHTML = "";
	
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
			
		var handler = new CodeReuse.Handler();	
		
		if(tableHtmlObjectId == "tableHomeTenant")
			tableHeader.onclick = handler.sortTableColumnOnclickHandlerHomeTenantGrid(tableHtmlObjectId, gridColumnsInfo, i);
		else
			tableHeader.onclick = handler.sortTableColumnOnclickHandler(tableHtmlObjectId, gridColumnsInfo, i);
		
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
				
			if(tableHtmlObjectId != "tableHomeTenant")
				tenantGridRowOnClick(phpFile, row, fieldsInfo, gridColumnsInfo); 
			
		};
		
		var cell;
		var cellText;
		
		if(showEditColumn == "showEdit")
		{			
			cell = document.createElement("td");
			//cell.className = "homeGridEdit";
			
			cell.style.paddingLeft = "10px";
						
			cellText = document.createTextNode("edit");
			
			var tenantModel = new CodeReuse.Tenant();
			
			var home_tenant_grid = new CodeReuse.HomeTenantGrid();
			
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
			
			var callback = new CodeReuse.Callback();
								
			/*	
			var sortColumn = "fieldPrimaryKey";
			
			var sortDirection = localStorage.getItem("arraySortDirection");
			
			if(sortDirection == "asc")
			{
				localStorage.setItem("arraySortDirection", "desc");	
			}
			else
			{
				localStorage.setItem("arraySortDirection", "asc");
			}
			*/				
									
			//cell.onclick = grid_get_post_functions.gridEdit(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), "gridtablehome", "fieldPrimaryKey", tenantModel.getFieldsInfo(), gridColumnsInfo, home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridEditCallback, '', "showEdit", sortColumn, localStorage.getItem("arraySortDirection"));							
									
			cell.onclick = grid_get_post_functions.gridEdit(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), "gridtablehome", "fieldPrimaryKey", tenantModel.getFieldsInfo(), gridColumnsInfo, home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridEditCallback, home_tenant_grid.getRowOnClick(), item["fieldPrimaryKey"], sortColumn, sortDirection);				
				
				
			cell.className = "underline";	
			cell.appendChild(cellText);
			
			cell.height = 25;
			
			row.appendChild(cell);
		}
		
		
		for(i=0; i<gridColumnsInfo.length; i++)
		{	
			
			cell = document.createElement("td");
			cell.className = "grid";
					
			var colType = gridColumnsInfo[i].colType;
			
			if(colType == "date")
			{	
				var dateFromDatabase = item[gridColumnsInfo[i].id];
				
				var helper = new CodeReuse.Helper();
				
				var dateFormat = helper.convertDateFromDatabase(dateFromDatabase);
				
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
	
	divTable.innerHTML = "";
	
	divTable.appendChild(tbl);
	
},


gridEditCallback: function(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, tenantGridRowOnClick, rowId, sortColumn, sortDirection) {
					
	divTable.innerHTML = "";
	
	var tbl = document.createElement("table");
	tbl.id = tableHtmlObjectId;
	tbl.className = "homeGrid";
								
	var tableHeaderRow = document.createElement("tr");
	
	var tableHeader;
	var tableHeaderText;		
	
	tableHeader = document.createElement("th");
	tableHeader.style.width = "70px";
	
	tableHeaderRow.appendChild(tableHeader);	
	
	for(i=0; i<gridColumnsInfo.length; i++)
	{				
		tableHeader = document.createElement("th");
			
		var handler = new CodeReuse.Handler();	
			
		//tableHeader.onclick = handler.sortTableColumnOnclickHandler(tableHtmlObjectId, gridColumnsInfo, i);
		
		var columnName = gridColumnsInfo[i].colName;
		
		tableHeaderText = document.createTextNode(columnName);
		tableHeader.appendChild(tableHeaderText);
		tableHeaderRow.appendChild(tableHeader);				
	}
	
	tbl.appendChild(tableHeaderRow);
	
	var itemCurrent;
	
	response.forEach(function(item) {
					
		var row = tbl.insertRow();
		
		row.className = "tableHover";
				
		var cell;
		var cellText;
		
		if(item["fieldPrimaryKey"] == rowId)
		{
			cell = document.createElement("td");
			
			//cell.className = "grid";
			
			cell.style.paddingLeft = "10px";
			
			cellText = document.createTextNode("save");
			
			var tenantModel = new CodeReuse.Tenant();
			
			var home_tenant_grid = new CodeReuse.HomeTenantGrid();
			
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
			
			var callback = new CodeReuse.Callback();
			
			cell.onclick = function() {
				
				controller.homeTenantGridSave();
			};
				
			cell.className = "underline";	
			cell.appendChild(cellText);
			
			cell.height = 25;
			
			row.appendChild(cell);
			
			itemCurrent = item;
		}
		else
		{
			cell = document.createElement("td");
			
			//cell.className = "grid";
			
			cell.style.paddingLeft = "10px";
			
			cellText = document.createTextNode("edit");
			
			var tenantModel = new CodeReuse.Tenant();
			
			var home_tenant_grid = new CodeReuse.HomeTenantGrid();
			
			var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();	
			
			var callback = new CodeReuse.Callback();
							
			/*		
			var sortColumn = "fieldPrimaryKey";
			
			var sortDirection = localStorage.getItem("arraySortDirection");
			
			if(sortDirection == "asc")
			{
				localStorage.setItem("arraySortDirection", "desc");	
			}
			else
			{
				localStorage.setItem("arraySortDirection", "asc");
			}
			*/									
												
			//cell.onclick = grid_get_post_functions.gridEdit(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), "gridtablehome", "fieldPrimaryKey", tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridEditCallback, home_tenant_grid.rowOnClick, item["fieldPrimaryKey"], sortColumn, sortDirection);
							
			cell.onclick = grid_get_post_functions.gridEdit(home_tenant_grid.getGridGetPostDivElement(), tenantModel.getPhpFile(), "gridtablehome", "fieldPrimaryKey", tenantModel.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridEditCallback, home_tenant_grid.getRowOnClick(), item["fieldPrimaryKey"], sortColumn, sortDirection);								
												
			cell.className = "underline";	
			cell.appendChild(cellText);
			
			cell.height = 25;
			
			row.appendChild(cell);
		}
		
		if(item["fieldPrimaryKey"] == rowId)
		{
			cell = row.insertCell();
			cell.className = "grid";
			
			inputPrimaryKey = document.createElement("span");
			inputPrimaryKey.id = "inputPrimaryKey_grid";
			inputPrimaryKey.innerHTML = rowId;
			
			cell.appendChild(inputPrimaryKey);
					
			
			cell = row.insertCell();
			cell.className = "grid";
			
			building_option_grid = document.createElement("select");
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
						
			//building_option_grid.value = item["field3"];
		
			building_option_grid.selectedIndex = item["field3"];
		
			cell.appendChild(building_option_grid);
			
			/*
			building_input_grid = document.createElement("input");
			building_input_grid.id = "building_input_grid";
			
			building_input_grid.value = item["buildingName"];
			building_input_grid.setAttribute("rowAttributeValue", item["field3"]);
						
			building_input_grid.style.position = "relative";
			building_input_grid.style.zIndex = "1";
			building_input_grid.style.backgroundColor = "white";
			building_input_grid.width = "200";			
			
			var autocomplete = new CodeReuse.Autocomplete();
				
			building_input_grid.addEventListener("keyup", function(event){ 
				
				if(document.getElementById("building_input_grid").value == "")
				{
					document.getElementById("buildingSearchList").innerHTML = "";
				}
				else
				{
					autocomplete.autocomplete(event, "buildingSearchList", "buildingName", "buildingId",  "GET", phpFile, "buildings", "", "", "building_input_grid", "buildingSearchList");
				}
			});
			
			building_input_grid.addEventListener("focusout", function() { autocomplete.focusOutHide ("buildingSearchList"); });			
			
			cell.appendChild(building_input_grid);
			*/
			
			
			cell = row.insertCell();
			cell.className = "grid";
			
			tenant_input_grid = document.createElement("input");
			tenant_input_grid.id = "tenant_input_grid";
			
			tenant_input_grid.value = item["tenantName"];
			tenant_input_grid.setAttribute("rowAttributeValue", item["field4"]);
			
			tenant_input_grid.style.position = "relative";
			tenant_input_grid.style.zIndex = "1";
			tenant_input_grid.style.backgroundColor = "white";
			tenant_input_grid.width = "200";				
			
			var autocomplete = new CodeReuse.Autocomplete();
			
			tenant_input_grid.addEventListener("keyup", function(event){
					
				if(document.getElementById("tenant_input_grid").value == "")
				{
					document.getElementById("tenantSearchList").innerHTML = "";			
				}
				else
				{
					autocomplete.autocomplete(event, "tenantSearchList", "suiteNumber,tenantName", "tenantId",  "GET", phpFile, "tenants", "building", document.getElementById("building_option_grid").selectedIndex, "tenant_input_grid", "tenantSearchList");
				}
				
			});		
			
			tenant_input_grid.addEventListener("focusout", function() { autocomplete.focusOutHide ("tenantSearchList"); });	
			
			cell.appendChild(tenant_input_grid);
			
			
			cell = row.insertCell();
			cell.className = "grid";
			
			var helper = new CodeReuse.Helper();			
			var dateFormatCalendar = helper.convertDateFromDatabase(item["field1"]);
			
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
			
			inputCalendar_grid.value = dateFormatCalendar;
			
			cell.appendChild(inputCalendar_grid);
			
			
			cell = row.insertCell();
			cell.className = "grid";
			
			var dateFormatCalendarTesting = helper.convertDateFromDatabase(item["field2"]);
			
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
			
			inputCalendarTesting_grid.value = dateFormatCalendarTesting;
			
			cell.appendChild(inputCalendarTesting_grid);
			
			
			row.appendChild(cell);
		}	
		else
		{
			for(i=0; i<gridColumnsInfo.length; i++)
			{	
				
				cell = document.createElement("td");
				
				cell.className = "grid";
				
				var colType = gridColumnsInfo[i].colType;
				
				if(colType == "date")
				{	
					var dateFromDatabase = item[gridColumnsInfo[i].id];
					
					var helper = new CodeReuse.Helper();
					
					var dateFormat = helper.convertDateFromDatabase(dateFromDatabase);
					
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
		}
		
		tbl.appendChild(row);
		
	});
	
	divTable.appendChild(tbl);
	
	/*
	var divCalendar = document.createElement("div");
	divCalendar.id = "calendarIdTenantGrid";
	divCalendar.style.position = "absolute";
	divCalendar.style.display = "none";
	divCalendar.style.zIndex = "2";
	divCalendar.style.backgroundColor = "white";
	
	document.body.appendChild(divCalendar);

	var buildingSearchListGrid = document.createElement("div");
	buildingSearchListGrid.id = "buildingSearchListGrid";
	buildingSearchListGrid.style.position = "absolute";
	buildingSearchListGrid.style.zIndex = "2";
	buildingSearchListGrid.style.backgroundColor = "white";
	
	document.body.appendChild(buildingSearchListGrid);	
	
	var tenantSearchListGrid = document.createElement("div");
	tenantSearchListGrid.id = "tenantSearchListGrid";
	tenantSearchListGrid.style.position = "absolute";
	tenantSearchListGrid.style.zIndex = "2";
	tenantSearchListGrid.style.backgroundColor = "white";
	
	document.body.appendChild(tenantSearchListGrid);
	*/
	
	//debugger
	
	//console.dir(localStorage.getItem("sortTableColumn"));
	
	var handler = new CodeReuse.Handler();	
		
	//handler.sortTableColumnOnclickHandlerTest("tableHomeTenant", gridColumnsInfo, (localStorage.getItem("sortTableColumn")));	
	
	//handler.sortTableColumnOnclickHandlerResortDirection("tableHomeTenant", gridColumnsInfo, localStorage.getItem("sortTableColumn"));
	
	//debugger
	
	//alert(localStorage.getItem("sortTableColumn"));
	
	//handler.sortTableColumnOnclickHandlerResortDirection("tableHomeTenant", gridColumnsInfo, 1);	
	
	//localStorage.setItem("arraySortDirection", "asc");
		
	
	var record = itemCurrent;
	
	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	var autocompleteInputs = home_tenant_grid.getAutocompleteInputs();

	var arrayOldValuesTableGridEdit = home_tenant_grid.arrayOldValuesTableGridEdit;
	
	for(i=0; i<gridColumnsInfo.length; i++)
	{			
		if(gridColumnsInfo[i].colType == "date")
		{					
			var dateFromDatabase = record[gridColumnsInfo[i].dbField];
			
			var helper = new CodeReuse.Helper();			
						
			var dateFormat = helper.convertDateFromDatabase(dateFromDatabase);
			
			//document.getElementById(fieldsInfo[i].htmlObjectId).value = dateFormat;
			
			arrayOldValuesTableGridEdit[gridColumnsInfo[i].dbField] = dateFormat;	
		}
		else
		{
			if(gridColumnsInfo[i].htmlObjectId == "autocomplete")
			{
				for(input=0; input<autocompleteInputs.length; input++)
				{
					if(gridColumnsInfo[i].name == autocompleteInputs[input].value)
					{
						//document.getElementById(fieldsInfo[i].htmlObjectId).value = record[autocompleteInputs[input].display];
						//break;
					}
				}
				
				//document.getElementById(fieldsInfo[i].htmlObjectId).setAttribute("rowAttributeValue", record[fieldsInfo[i].name]);
				
				arrayOldValuesTableGridEdit[gridColumnsInfo[i].dbField] = record[gridColumnsInfo[i].dbField];
			}
			else
			{	
				//document.getElementById(fieldsInfo[i].htmlObjectId).value = record[fieldsInfo[i].name];
				
				arrayOldValuesTableGridEdit[gridColumnsInfo[i].dbField] = record[gridColumnsInfo[i].dbField];
			}
		}
	}
	
	//console.dir('test');
	//console.dir(arrayOldValuesTableGridEdit);
	
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