/**
 * Class for storing sort functions
 * @class
 */
CodeReuse.Sort = function() {
	
};

CodeReuse.Sort.prototype = {

/**
 * Sort table in place without going to database applies to SuiteGrid and TenantGrid but not HomeTenantGrid
 * @function
 * @name Sort#sortTable
 * 
 * @param {string} tblId the table that we are sorting
 * @param {string} column the column number we are sorting
 * @param {Array} gridColumnsInfo the grid columns in the grid object (SuiteGrid or TenantGrid)
 */
sortTable: function(tblId, column, gridColumnsInfo){

	var sortColumn = gridColumnsInfo[column].id;
	
	var column_update;
	var direction_update;

	if(tblId == "tableSuite")
	{
		var sortDirection_suite = localStorage.getItem("arraySortDirection_suite");	
		
		if(sortColumn != localStorage.getItem("arraySortColumn_suite"))
		{
			localStorage.setItem("arraySortDirection_suite", "asc");
		}
		else
		{	
			if(sortDirection_suite == "asc")
			{
				localStorage.setItem("arraySortDirection_suite", "desc");	
			}
			else
			{
				if(sortDirection_suite == "desc")
					{
						localStorage.setItem("arraySortDirection_suite", "asc");
					}
			}			
		}
		
		localStorage.setItem("arraySortColumn_suite", sortColumn);

		column_update = localStorage.getItem("arraySortColumn_suite");
		direction_update = localStorage.getItem("arraySortDirection_suite");
	}
	else if(tblId == "tableTenant")
	{
		var sortDirection_tenant = localStorage.getItem("arraySortDirection_tenant");

		if(sortColumn != localStorage.getItem("arraySortColumn_tenant"))
		{
			localStorage.setItem("arraySortDirection_tenant", "asc");
		}
		else
		{	
			if(sortDirection_tenant == "asc")
			{
				localStorage.setItem("arraySortDirection_tenant", "desc");	
			}
			else
			{
				if(sortDirection_tenant == "desc")
					localStorage.setItem("arraySortDirection_tenant", "asc");
			}			
		}

		localStorage.setItem("arraySortColumn_tenant", sortColumn);

		column_update = localStorage.getItem("arraySortColumn_tenant");
		direction_update = localStorage.getItem("arraySortDirection_tenant");		
	}

	
	var table = document.getElementById(tblId);
    
    var Arr = [];
    
	var header = table.rows[0];

    for(var i=1, ln=table.rows.length; i<ln; i++){
	    
        var row = table.rows[i];
		
        Arr.push([row]);
        
    }

    if(tblId == "tableHomeTenant")
    {
	   	sortingFunctionCompareColumn = parseInt(column) + 1;
    }
    else
    {
	    sortingFunctionCompareColumn = column;
    }
        
    var sortingFunction;
    	
    if(tblId == "tableSuite")
    {
    	sortDirection = localStorage.getItem("arraySortDirection_suite");
    }
    else if(tblId == "tableTenant")
    {
	    sortDirection = localStorage.getItem("arraySortDirection_tenant");
    }	 	
	
	var primaryKeyColumn = 0;

    if(sortDirection == "asc")
    {
		sortingFunction = function(a,b) {
			
			if(b == null)
				return;
			
			var sortCol1 = a[0].cells[sortingFunctionCompareColumn].innerText.toLowerCase();
			var sortCol2 = b[0].cells[sortingFunctionCompareColumn].innerText.toLowerCase();

			var primaryKeyCol1 = a[0].cells[primaryKeyColumn].innerText.toLowerCase();
			var primaryKeyCol2 = b[0].cells[primaryKeyColumn].innerText.toLowerCase();

			if(sortCol1 < sortCol2) return -1;
			if(sortCol1 > sortCol2) return 1;
			if(primaryKeyCol1 < primaryKeyCol2) return -1;
			if(primaryKeyCol1 > primaryKeyCol2) return 1;

			return 0;
		}
	}
	else if(sortDirection == "desc")
	{
		sortingFunction = function(a,b) {
							
			if(b == null)
				return;

			var sortCol1 = a[0].cells[sortingFunctionCompareColumn].innerText.toLowerCase();
			var sortCol2 = b[0].cells[sortingFunctionCompareColumn].innerText.toLowerCase();

			var primaryKeyCol1 = a[0].cells[primaryKeyColumn].innerText.toLowerCase();
			var primaryKeyCol2= b[0].cells[primaryKeyColumn].innerText.toLowerCase();
			
			if(sortCol1 > sortCol2) return -1;
			if(sortCol1 < sortCol2) return 1;
			if(primaryKeyCol1 > primaryKeyCol2) return -1;
			if(primaryKeyCol1 < primaryKeyCol2) return 1;

			return 0;
			
		}
	}

	Arr.sort(sortingFunction);

	table.innerHTML = "";
	table.appendChild(header);

	var htmlSortIconId = tblId + "_" + column_update + "ColumnHeaderIcon";

	document.getElementById(htmlSortIconId).width = "14";
	document.getElementById(htmlSortIconId).height = "14";

	for(var i=0; i<gridColumnsInfo.length; i++)
	{
		if(tblId + "_" + gridColumnsInfo[i].id + "ColumnHeaderIcon" == htmlSortIconId)
		{
			var server = new CodeReuse.Config();

			var tableHeader_update = tblId + "_" + column_update + "ColumnHeader";
			var tableHeaderSpan_update = tblId + "_" + column_update + "Span";
			var tableHeaderIcon_update = tblId + "_" + column_update + "ColumnHeaderIcon";

			//document.getElementById(tableHeader_update).className = "description";
			//document.getElementById(tableHeaderSpan_update).className = "text";
			//document.getElementById(tableHeaderIcon_update).className = "icon";

			if(direction_update == "asc")
			{
				document.getElementById(tableHeaderIcon_update).src = server.getServerUrl() + "/images/pngfuel.com.up.gif";
			}
			else if(direction_update == "desc")
			{
				document.getElementById(tableHeaderIcon_update).src = server.getServerUrl() + "/images/pngfuel.com.down.gif";
			}
			
			document.getElementById(tableHeaderIcon_update).style.display = "inline";
		}
		else
		{
			var tableHeader = tblId + "_" + gridColumnsInfo[i].id + "ColumnHeader";
			var tableHeaderSpan = tblId + "_" + gridColumnsInfo[i].id + "Span";
			var tableHeaderIcon = tblId + "_" + gridColumnsInfo[i].id + "ColumnHeaderIcon";

			//document.getElementById(tableHeader).className = "";
			//document.getElementById(tableHeaderSpan).className = "text";
			//document.getElementById(tableHeaderIcon).className = "";

			document.getElementById(tableHeaderIcon).style.display = "none";
		}
	}

    for(var i=0, ln=Arr.length; i<ln; i++){
		table.appendChild(Arr[i][0]);
    }
    
	Arr = null;

}

}