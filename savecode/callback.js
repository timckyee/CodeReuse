


function get_populateGrid_callback(response, divElement, fieldsInfo, gridColumnsInfo, autocompleteInputs, arrayOldValuesTableGridEdit, tableHtml, tableRowNumber, fieldPrimaryKey, tableHtmlObjectId) {    
    
    /*

	var tableEdit = tableHtml;

	var rowReplace = tableEdit.rows[tableRowNumber + 1];

	//var newRow = document.createElement("tr");

	var newRow = tableEdit.insertRow(tableRowNumber);

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
			autocomplete.autocomplete(event, "tenantSearchList", "suiteNumber,tenantName", "tenantId",  "GET", home_tenant_grid.getPhpFile(), "tenants", "building", document.getElementById("building_option_grid").selectedIndex, "tenant_input_grid", "tenantSearchList");
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

    */

}