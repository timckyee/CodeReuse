//var CodeReuse = CodeReuse || {};

var images = [];

window.addEventListener("load", function() {
	
	controller = new CodeReuse.Controller();
	
	var onload = new CodeReuse.Onload;

	onload.htmlBody_init_class();

	onload.init_gridGetPost_xmlHttpRequests();
	
	onload.init_autocomplete_inputs();
	
	onload.init_calendar_inputs();
	
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
	
	localStorage.setItem("arraySortColumn_tenant", "tenantId");
	
	localStorage.setItem("arraySortDirection_tenant", "asc");


	var server = new CodeReuse.Config();

	var helper = new CodeReuse.Helper();

	helper.preload(
		[server.getServerUrl() + "/images/pngfuel.com.up.gif", 
		server.getServerUrl() + "/images/pngfuel.com.down.gif"]
	);


	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	var callback = new CodeReuse.Callback();

	var sortColumn = localStorage.getItem("arraySortColumn");

	var sortDirection = localStorage.getItem("arraySortDirection");

	var pageNumber = localStorage.getItem("homeTenantGridPageNumber");

	grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.getRowOnClick(), "showEdit", sortColumn, sortDirection, pageNumber, '', "false", '' ,'', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), "true");

	//tenant.refreshTenantGridHome();
	
});

/**
 * Class for onload functions
 * @class
 **/
CodeReuse.Onload = function() {
	
};

CodeReuse.Onload.prototype = {

/**
 * init html body
 * @function
 * @name Onload#htmlBody_init_class
 **/
htmlBody_init_class: function() {

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

},

/**
 * init grid get post http requests
 * @function
 * @name Onload#init_gridGetPost_xmlHttpRequests
 **/
init_gridGetPost_xmlHttpRequests: function() {
	
	window.gridXmlHttpRequest = new XMLHttpRequest();
	window.getXmlHttpRequest = new XMLHttpRequest();
	window.postXmlHttpRequest = new XMLHttpRequest();
	window.getPageNumberHttpRequest = new XMLHttpRequest();
	
},

/**
 * init autocomplete inputs
 * @function
 * @name Onload#init_autocomplete_inputs
 **/
init_autocomplete_inputs: function() {

	window.autocompleteXmlHttpRequest = new XMLHttpRequest();
	
	var tenantModel = new CodeReuse.Tenant();

	var phpFile = tenantModel.getPhpFile();
		
	var autocomplete = new CodeReuse.Autocomplete();

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

	tenant_input_form_grid_paging.addEventListener("focusout", function(event) { 

		autocomplete.focusOutHide ("tenantSearchList");
	
	});
	
	tenant_input_form_grid_paging.addEventListener("focusin", function() { this.select(); });

	tenant_input_form_grid_paging.placeholder = "suite# or first or last name";

},

/**
 * init calendar inputs
 * @function
 * @name Onload#init_calendar_inputs
 **/
init_calendar_inputs: function() {
	
	var calendar = new CodeReuse.Calendar();
	
	var monthsArray = calendar.populateMonthsArray();

	var divCalendarId = "calendarId";
	
	/*
	document.onclick = function(e) {
		
		calendar.documentOnclick(e, divCalendarId);
		
	}
	*/

	var inputCalendarFormGridPaging = document.getElementById('inputCalendarFormGridPaging');

	var inputCalendarTestingFormGridPaging = document.getElementById('inputCalendarTestingFormGridPaging');


	var inputCalendarFormGridPagingIcon = document.getElementById('inputCalendarFormGridPagingIcon');

	var inputCalendarTestingFormGridPagingIcon = document.getElementById('inputCalendarTestingFormGridPagingIcon');


	inputCalendarFormGridPaging.addEventListener("blur", function(event) {
		
			if(calendar.validateDate(this.id) == false)
			{
				alert("input format date has to be dd-mmm-yyyy");
			}
		}
		
	);
	
	inputCalendarFormGridPaging.placeholder = "dd-mmm-yyyy";


	inputCalendarTestingFormGridPaging.addEventListener("blur", function(event) {
		
			if(calendar.validateDate(this.id) == false)
			{
				alert("input format date has to be dd-mmm-yyyy");
			}
		}
		
	);
	
	inputCalendarTestingFormGridPaging.placeholder = "dd-mmm-yyyy";


	inputCalendarFormGridPagingIcon.addEventListener("click", function(event) {

			var divCalendar = document.getElementById(divCalendarId);

			if(divCalendar.style.display == "block")
			{
				calendar.showHideCalendar('hide' ,'inputCalendarFormGridPaging', divCalendarId, monthsArray);
			}
			else
			if(divCalendar.style.display == "none")
			{
				calendar.showHideCalendar('show' ,'inputCalendarFormGridPaging', divCalendarId, monthsArray);
			}
		
		}

	);

	inputCalendarTestingFormGridPagingIcon.addEventListener("click", function(event) {

			var divCalendar = document.getElementById(divCalendarId);

			if(divCalendar.style.display == "block")
			{
				calendar.showHideCalendar('hide' ,'inputCalendarTestingFormGridPaging', divCalendarId, monthsArray);
			}
			else
			if(divCalendar.style.display == "none")
			{
				calendar.showHideCalendar('show' ,'inputCalendarTestingFormGridPaging', divCalendarId, monthsArray);
			}			
		}
	);
}

}