//var CodeReuse = CodeReuse || {};

var images = [];

window.addEventListener("load", function() {
	
	controller = new CodeReuse.Controller();
	
	htmlBody_init_class();

	init_gridGetPost_xmlHttpRequests();
	
	init_autocomplete_inputs();
	
	init_calendar_inputs();
	
	localStorage.clear();

	localStorage.setItem("editMode", "false");


	localStorage.setItem("homeTenantGridPageNumber", "1");

	localStorage.setItem("homeTenantFormGridPagingPageNumber", "1");


	document.getElementById("gridGetPostHomePagingPageNumber").value = "1";

	document.getElementById("gridGetPostHomeFormGridPagingPageNumber").value = "1";


	localStorage.setItem("arraySortColumn", "fieldPrimaryKey");
	
	localStorage.setItem("arraySortDirection", "asc");


	localStorage.setItem("arraySortColumn_tenant_form_grid_paging", "fieldPrimaryKey");
	
	localStorage.setItem("arraySortDirection_tenant_form_grid_paging", "asc");


	localStorage.setItem("arraySortColumn_suite", "suiteId");
	
	localStorage.setItem("arraySortDirection_suite", "asc");
	
	localStorage.setItem("arraySortColumn_tenant", "fieldPrimaryKey");
	
	localStorage.setItem("arraySortDirection_tenant", "asc");


	var server = new CodeReuse.Config();

	var helper = new CodeReuse.Helper();

	helper.preload(
		[server.getServerUrl() + "/images/pngfuel.com.up.gif", 
		server.getServerUrl() + "/images/pngfuel.com.down.gif"]
	);


	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	var tenant = new CodeReuse.Tenant();

	var callback = new CodeReuse.Callback();

	var sortColumn = localStorage.getItem("arraySortColumn");

	var sortDirection = localStorage.getItem("arraySortDirection");

	var pageNumber = localStorage.getItem("homeTenantGridPageNumber");

	grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), tenant.getFieldsInfo(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.getRowOnClick(), "showEdit", sortColumn, sortDirection, pageNumber, '', "false", '' ,'', "true", home_tenant_grid.getHomeTenantGridPagingDiv());

	//tenant.refreshTenantGridHome();
	
});

function htmlBody_init_class() {

	var helper = new CodeReuse.Helper();

	var platform = helper.checkPlatform();

	if(platform == "IOS" || platform == "IOS_safari")
	{
		document.body.className = "bodyIOS";
	}
	else
	{
		document.body.className = "bodyDesktop";
	}

}

function init_gridGetPost_xmlHttpRequests() {
	
	window.gridXmlHttpRequest = new XMLHttpRequest();
	window.getXmlHttpRequest = new XMLHttpRequest();
	window.postXmlHttpRequest = new XMLHttpRequest();
	window.getPageNumberHttpRequest = new XMLHttpRequest();
	
}

function init_autocomplete_inputs() {
	
	window.autocompleteXmlHttpRequest = new XMLHttpRequest();
	
	var tenantModel = new CodeReuse.Tenant();

	var phpFile = tenantModel.getPhpFile();
	
	//var building_input = document.getElementById("building_input");
		
	var autocomplete = new CodeReuse.Autocomplete();
	
	/*	
	building_input.addEventListener("keyup", function(event){ 
		
		if(document.getElementById("building_input").value == "")
		{
			document.getElementById("buildingSearchList").innerHTML = "";
		}
		else
		{
			autocomplete.autocomplete(event, "buildingSearchList", "buildingName", "buildingId",  "GET", phpFile, "buildings", "", "", "building_input", "buildingSearchList");
		}
	});
	
	building_input.addEventListener("focusout", function() { autocomplete.focusOutHide ("buildingSearchList"); });
	*/		
	

	var tenant_input_form_grid_paging = document.getElementById("tenant_input_form_grid_paging");
	
	tenant_input_form_grid_paging.addEventListener("keyup", function(event){

		if(document.getElementById("tenant_input_form_grid_paging").value == "")
		{
			document.getElementById("tenantSearchList").innerHTML = "";			
		}
		else
		{
			autocomplete.autocomplete(event, "formInput", "tenantSearchList", "suiteNumber,tenantName", "tenantId",  "GET", phpFile, "tenants", "building", document.getElementById("building_option_form_grid_paging").value, "tenant_input_form_grid_paging", "tenantSearchList");
		}
		
	});
	
	tenant_input_form_grid_paging.addEventListener("focusout", function() { autocomplete.focusOutHide ("tenantSearchList"); });
	
	tenant_input_form_grid_paging.addEventListener("focusin", function() { this.select(); });



	var tenant_input = document.getElementById("tenant_input");
	
	tenant_input.addEventListener("keyup", function(event){

		if(document.getElementById("tenant_input").value == "")
		{
			document.getElementById("tenantSearchList").innerHTML = "";			
		}
		else
		{
			autocomplete.autocomplete(event, "formInput", "tenantSearchList", "suiteNumber,tenantName", "tenantId",  "GET", phpFile, "tenants", "building", document.getElementById("building_option").value, "tenant_input", "tenantSearchList");
		}
		
	});
	
	tenant_input.addEventListener("focusout", function() { autocomplete.focusOutHide ("tenantSearchList"); });
	
	tenant_input.addEventListener("focusin", function() { this.select(); });
}

function init_calendar_inputs() {
	
	var calendar = new CodeReuse.Calendar();
	
	var monthsArray = calendar.populateMonthsArray();

	var divCalendarId = "calendarId";
	
	/*
	document.onclick = function(e) {
		
		calendar.documentOnclick(e, divCalendarId);
		
	}
	*/

	var inputCalendar = document.getElementById('inputCalendar');
	
	var inputCalendarTesting = document.getElementById('inputCalendarTesting');
	
	var inputCalendarFormGridPaging = document.getElementById('inputCalendarFormGridPaging');

	var inputCalendarTestingFormGridPaging = document.getElementById('inputCalendarTestingFormGridPaging');

	
	inputCalendar.addEventListener("focus", function(event){
		
		calendar.showHideCalendar('show' ,'inputCalendar', divCalendarId, monthsArray)
		
	});
	
	inputCalendar.addEventListener("blur", function(event){
		
			if(calendar.validateDate(this.id) == false)
			{
				alert("input format has to be dd-mmm-yyyy");
			}
		}
		
	);
	
	inputCalendar.placeholder = "dd-mmm-yyyy";
	
	
	inputCalendarTesting.addEventListener("focus", function(event){
		
		calendar.showHideCalendar('show' ,'inputCalendarTesting', divCalendarId, monthsArray)
		
	});
	
	inputCalendarTesting.addEventListener("blur", function(event){
		
			if(calendar.validateDate(this.id) == false)
			{
				alert("input format has to be dd-mmm-yyyy");
			}
		}
		
	);	
	
	inputCalendarTesting.placeholder = "dd-mmm-yyyy";
	

	inputCalendarFormGridPaging.addEventListener("focus", function(event){
		
		calendar.showHideCalendar('show' ,'inputCalendarFormGridPaging', divCalendarId, monthsArray)
		
	});
	
	inputCalendarFormGridPaging.addEventListener("blur", function(event){
		
			if(calendar.validateDate(this.id) == false)
			{
				alert("input format has to be dd-mmm-yyyy");
			}
		}
		
	);
	
	inputCalendarFormGridPaging.placeholder = "dd-mmm-yyyy";


	inputCalendarTestingFormGridPaging.addEventListener("focus", function(event){
		
		calendar.showHideCalendar('show' ,'inputCalendarTestingFormGridPaging', divCalendarId, monthsArray)
		
	});
	
	inputCalendarTestingFormGridPaging.addEventListener("blur", function(event){
		
			if(calendar.validateDate(this.id) == false)
			{
				alert("input format has to be dd-mmm-yyyy");
			}
		}
		
	);
	
	inputCalendarTestingFormGridPaging.placeholder = "dd-mmm-yyyy";	
}