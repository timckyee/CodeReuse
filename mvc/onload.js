window.addEventListener("load", function() {	
			
	controller = new Controller();
	
	arrayOldValuesTable = [];
	
	init_gridGetPost_xmlHttpRequests();
	
	init_autocomplete_inputs();
	
	init_calendar_inputs();	
});

function init_gridGetPost_xmlHttpRequests() {
	
	window.gridXmlHttpRequest = new XMLHttpRequest();
	window.getXmlHttpRequest = new XMLHttpRequest();
	window.postXmlHttpRequest = new XMLHttpRequest();		
	
}

function init_autocomplete_inputs() {
	
	window.autocompleteXmlHttpRequest = new XMLHttpRequest();
	
	var tenantModel = new Tenant();
	var phpFile = tenantModel.getPhpFile();
	
	var tenant_input = document.getElementById("tenant_input");
	
	tenant_input.addEventListener("keyup", function(event){autocomplete(event, "tenantSearchList", "suiteNumber,tenantName", "tenantId",  "GET", phpFile, "tenants", "building", document.getElementById("selectBuilding").value, "tenant_input", "tenantSearchList")});
	
	tenant_input.addEventListener("focusout", function() { focusOutHide ("tenantSearchList"); });	
	
	
}

function init_calendar_inputs() {
	
	monthsArray = Array();
	
	populateMonthsArray();

	var divCalendarId = "calendarId";
	
	document.onclick = function(e) {

		var calendarId = document.getElementById(divCalendarId);
		
		if(e.target.id == "" && e.target.id != "back" && e.target.id != "forward") {
			calendarId.style.display = "none";
		}
		
	};

	var inputCalendar = document.getElementById('inputCalendar');
	
	var inputCalendarTesting = document.getElementById('inputCalendarTesting');
	
	inputCalendar.addEventListener("focus", function(event){showHideCalendar(event, 'show' ,'inputCalendar', divCalendarId)});
	
	inputCalendar.placeholder = "dd-mmm-yy";
	
	inputCalendarTesting.addEventListener("focus", function(event){showHideCalendar(event, 'show' ,'inputCalendarTesting', divCalendarId)});
	
	inputCalendarTesting.placeholder = "dd-mmm-yy";
	
}