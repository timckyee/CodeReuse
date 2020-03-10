CodeReuse.Callback = function() {
	
};

CodeReuse.Callback.prototype = {

gridCallback: function(phpFile, response, divTable, tableHtmlObjectId, fieldsInfo, gridIdField, gridColumnsInfo, tenantGridRowOnClick) {
				
	divTable.innerHTML = "";
	
	var tbl = document.createElement("table");
	tbl.id = tableHtmlObjectId;		
								
	var tableHeaderRow = document.createElement("tr");
	
	var tableHeader;
	var tableHeaderText;		
	
	for(i=0; i<gridColumnsInfo.length; i++)
	{				
		tableHeader = document.createElement("th");
			
		var handler = new CodeReuse.Handler();	
			
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
				
			tenantGridRowOnClick(phpFile, row, fieldsInfo, gridColumnsInfo); 
			
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
	
	divTable.appendChild(tbl);
		
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