var CodeReuse = CodeReuse || {};

window.addEventListener("load", function() {
	
	controller = new CodeReuse.Controller();
	
	init_gridGetPost_xmlHttpRequests();
	
	init_autocomplete_inputs();
	
	init_calendar_inputs();
	
	var tabs = new CodeReuse.Tabs();
	tabs.loadHomeTenantGrid();

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
			autocomplete.autocomplete(event, "tenantSearchList", "suiteNumber,tenantName", "tenantId",  "GET", phpFile, "tenants", "building", document.getElementById("building_option").value, "tenant_input", "tenantSearchList");
		}
		
	});
	
	tenant_input.addEventListener("focusout", function() { autocomplete.focusOutHide ("tenantSearchList"); });	
	
	
}

function init_calendar_inputs() {
	
	var calendar = new CodeReuse.Calendar();
	
	var monthsArray = calendar.populateMonthsArray();

	var divCalendarId = "calendarId";
	
	document.onclick = function(e) {
		
		calendar.documentOnclick(e, divCalendarId);
		
	}

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