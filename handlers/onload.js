//var CodeReuse = CodeReuse || {};

var images = [];

window.addEventListener("load", function() {
	
	controller = new CodeReuse.Controller();
	
	init_gridGetPost_xmlHttpRequests();
	
	init_autocomplete_inputs();
	
	init_calendar_inputs();
	
	localStorage.clear();

	localStorage.setItem("editMode", "false");

	localStorage.setItem("homeTenantGridPageNumber", "1");

	document.getElementById("gridGetPostHomePagingPageNumber").value = "1";

	localStorage.setItem("arraySortColumn", "fieldPrimaryKey");
	
	localStorage.setItem("arraySortDirection", "asc");
	
	localStorage.setItem("gridLoadHomeGrid", "true");

	localStorage.setItem("gridLoadTenantGrid", "true");

	localStorage.setItem("arraySortColumn_suite", "suiteId");
	
	localStorage.setItem("arraySortDirection_suite", "asc");
	
	localStorage.setItem("arraySortColumn_tenant", "fieldPrimaryKey");
	
	localStorage.setItem("arraySortDirection_tenant", "asc");


	var server = new CodeReuse.Config();

	var helper = new CodeReuse.Helper();

	helper.preload(
		[server.getServerUrl() + "/images/pngfuel.com.up.png", 
		server.getServerUrl() + "/images/pngfuel.com.down.png"]
	);

	var tenant = new CodeReuse.Tenant();
	
	tenant.refreshTenantGridHome();


	//var tabs = new CodeReuse.Tabs();
	//tabs.loadHomeTenantGrid();
	
});

function init_gridGetPost_xmlHttpRequests() {
	
	window.gridXmlHttpRequest = new XMLHttpRequest();
	window.getXmlHttpRequest = new XMLHttpRequest();
	window.postXmlHttpRequest = new XMLHttpRequest();
	
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
	
	inputCalendar.addEventListener("focus", function(event){
		
		calendar.showHideCalendar(event, 'show' ,'inputCalendar', divCalendarId, monthsArray)
		
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
		
		calendar.showHideCalendar(event, 'show' ,'inputCalendarTesting', divCalendarId, monthsArray)
		
	});
	
	inputCalendarTesting.addEventListener("blur", function(event){
		
			if(calendar.validateDate(this.id) == false)
			{
				alert("input format has to be dd-mmm-yyyy");
			}
		}
		
	);	
	
	inputCalendarTesting.placeholder = "dd-mmm-yyyy";
	
}