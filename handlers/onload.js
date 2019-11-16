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
	
	var building_input = document.getElementById("building_input");
		
	building_input.addEventListener("keyup", function(event){autocomplete(event, "buildingSearchList", "buildingName", "buildingId",  "GET", phpFile, "buildings", "", "", "building_input", "buildingSearchList")});
	
	building_input.addEventListener("focusout", function() { focusOutHide ("buildingSearchList"); });		
	
	
	var tenant_input = document.getElementById("tenant_input");
	
	tenant_input.addEventListener("keyup", function(event){autocomplete(event, "tenantSearchList", "suiteNumber,tenantName", "tenantId",  "GET", phpFile, "tenants", "building", document.getElementById("building_input").getAttribute("rowAttributeValue"), "tenant_input", "tenantSearchList")});
	
	tenant_input.addEventListener("focusout", function() { focusOutHide ("tenantSearchList"); });	
	
	
}

function init_calendar_inputs() {
	
	monthsArray = Array();
	
	populateMonthsArray();

	var divCalendarId = "calendarId";
	
	document.onclick = function(e) {
		
		documentOnclick(e, divCalendarId);
		
	}

	var inputCalendar = document.getElementById('inputCalendar');
	
	var inputCalendarTesting = document.getElementById('inputCalendarTesting');
	
	inputCalendar.addEventListener("focus", function(event){showHideCalendar(event, 'show' ,'inputCalendar', divCalendarId)});
	
	inputCalendar.addEventListener("blur", function(event){
		
			if(validateDate(this.id) == false)
			{
				alert("input format has to be dd-mmm-yyyy");
			}
		}
		
	);
	
	inputCalendar.placeholder = "dd-mmm-yyyy";
	
	
	inputCalendarTesting.addEventListener("focus", function(event){showHideCalendar(event, 'show' ,'inputCalendarTesting', divCalendarId)});
	
	inputCalendarTesting.addEventListener("blur", function(event){
		
			if(validateDate(this.id) == false)
			{
				alert("input format has to be dd-mmm-yyyy");
			}
		}
		
	);	
	
	inputCalendarTesting.placeholder = "dd-mmm-yyyy";
	
}