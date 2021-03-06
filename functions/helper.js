/*
 * The CodeReuse object
 */
var CodeReuse = CodeReuse || {};


/**
 * Class for storing helper functions
 * @class
 **/
CodeReuse.Helper = function() {
	
};

CodeReuse.Helper.prototype = {

/**
 * Validate tenant form grid paging for empty values
 * @function
 * @name Helper#c
 * 
 * @param {string} fieldsInfo the fields in the tenant form grid paging object
 **/
 validateHtmlObjectFieldsTenantFormGridPaging: function(fieldsInfo)
 {
	 for(validate=0; validate<fieldsInfo.length; validate++)
	 {
		 if(fieldsInfo[validate].htmlObjectType != "primaryKey")
		 {
			 if(document.getElementById(fieldsInfo[validate].htmlObjectId).value == "")
			 {
				 alert(fieldsInfo[validate].description + ' ' + 'cannot be empty');
				 return false;
			 }
		 }
	 }
	 
	 return true;
 },

/**
 * Validate suite form for empty values
 * @function
 * @name Helper#validateHtmlObjectFieldsSuite
 * 
 * @param {Array} fieldsInfo the fields in the suite object
 **/
validateHtmlObjectFieldsSuite: function(fieldsInfo)
{
	for(validate=0; validate<fieldsInfo.length; validate++)
	{
		if(fieldsInfo[validate].htmlObjectType != "primaryKey")
		{
			if(fieldsInfo[validate].htmlObjectId != "inputLocation")
			{
				if(document.getElementById(fieldsInfo[validate].htmlObjectId).value == "")
				{
					alert(fieldsInfo[validate].description + ' ' + 'cannot be empty');
					return false;
				}
			}
		}
	}
	
	return true;
},

/**
 * Validate tenant form for empty values
 * @function
 * @name Helper#validateHtmlObjectFieldsTenant
 * 
 * @param {string} fieldsInfo the fields in the tenant object
 **/
validateHtmlObjectFieldsTenant: function(fieldsInfo)
{
	for(validate=0; validate<fieldsInfo.length; validate++)
	{
		if(fieldsInfo[validate].htmlObjectType != "primaryKey")
		{
			if(document.getElementById(fieldsInfo[validate].htmlObjectId).value == "")
			{
				alert(fieldsInfo[validate].description + ' ' + 'cannot be empty');
				return false;
			}
		}
	}
	
	return true;
},

/**
 * Validate tenant form grid paging for empty values
 * @function
 * @name Helper#validateHtmlObjectFieldsHomeTenantGrid
 * 
 * @param {string} columnsInfo the columns of the home tenant grid
 **/
 validateHtmlObjectFieldsHomeTenantGrid: function(columnsInfo)
{
	for(validate=0; validate<columnsInfo.length; validate++)
	{
		if(columnsInfo[validate].id != "fieldPrimaryKey")
		{
			if(document.getElementById(columnsInfo[validate].htmlObjectId).value == "")
			{
				alert(columnsInfo[validate].description + ' ' + 'cannot be empty');
				return false;
			}
		}
	}
	
	return true;
},

/**
 * Updating building selection for suite form
 * @function
 * @name Helper#selectBuildingSuite
 **/
 selectBuildingSuite: function(object) {

	if(object.value == '')
	{ 
		document.getElementById('gridGetPostSuite').style.display = 'none';
		document.getElementById('saveNewButtonSuite').style.display = 'none';
	}
	else 
	{
		document.getElementById('gridGetPostSuite').style.display = 'block';
		document.getElementById("inputSuiteNumber").readOnly = true;
	}

	controller.refreshSelectSuiteGrid();
	controller.resetSuiteFields();

	var formObject = new CodeReuse.Suite();

	var tableNameInDb = formObject.getTableNameInDb();

	var gridObject = new CodeReuse.SuiteGrid();

	var selectedRowId = gridObject.getSuiteSelectedRowId();

	document.getElementById("inputSuiteNumber").readOnly = false;

	if(selectedRowId != undefined && selectedRowId != "")
	{
		var lock = new CodeReuse.Lock();

		lock.unlock(tableNameInDb, selectedRowId, sessionStorage.getItem("userId"));
	}
},

/**
 * Updating building selection for tenant form
 * @function
 * @name Helper#selectBuildingTenant
 **/
 selectBuildingTenant: function(object) {

	if(object.value == '')
	{ 
		document.getElementById('gridGetPost').style.display = 'none';
		document.getElementById('saveNewButtonTenant').style.display = 'none';

		controller.refreshSelectTenantGrid();
		controller.resetTenantFields();

		var formObject = new CodeReuse.Tenant();

		var tableNameInDb = formObject.getTableNameInDb();

		var gridObject = new CodeReuse.TenantGrid();

		var selectedRowId = gridObject.getTenantSelectedRowId();

		if(selectedRowId != undefined && selectedRowId != "")
		{
			var lock = new CodeReuse.Lock();

			lock.unlock(tableNameInDb, selectedRowId, sessionStorage.getItem("userId"));
		}
	} 
	else
	{ 
		document.getElementById('gridGetPost').style.display = 'block';
		controller.loadSuiteSelections(object); 
	}
},

/**
 * Clicking on new or clear lock on Tenant Form Grid Paging
 * @function
 * @name Helper#newTenantFormGridPaging
 **/
 newTenantFormGridPaging: function() {

	var tenantFormGridPagingPrimaryKey = document.getElementById("inputPrimaryKeyFormGridPaging").value;

	controller.resetTenantFormGridPagingFields(); 
	var tenantFormGridPaging = new CodeReuse.HomeTenantFormGridPaging();
	var helper = new CodeReuse.Helper();
	helper.resetRowHighlight(tenantFormGridPaging.getTableHtmlObjectId());

	var formObject = new CodeReuse.TenantFormGridPaging();
	var tableNameInDb = formObject.getTableNameInDb();

	var lock = new CodeReuse.Lock();

	lock.unlock(tableNameInDb, tenantFormGridPagingPrimaryKey, sessionStorage.getItem("userId"));

},

/**
 * Clicking on new or clear lock on Suite Form
 * @function
 * @name Helper#newSuiteForm
 **/
 newSuiteForm: function() {
 
	var suiteFormPrimaryKey = document.getElementById("inputPrimaryKeySuite").value;
	
	controller.resetSuiteFields();
	var suiteGrid = new CodeReuse.SuiteGrid();
	var helper = new CodeReuse.Helper();
	helper.resetRowHighlight(suiteGrid.getTableHtmlObjectId());

	var formObject = new CodeReuse.Suite();
	var tableNameInDb = formObject.getTableNameInDb();

	var lock = new CodeReuse.Lock();

	lock.unlock(tableNameInDb, suiteFormPrimaryKey, sessionStorage.getItem("userId"));

},

/**
 * Clicking on new or clear lock on Tenant Form
 * @function
 * @name Helper#newTenantForm
 **/
 newTenantForm: function() {
 
	var tenantFormPrimaryKey = document.getElementById("inputPrimaryKey").value;

	controller.resetTenantFields();
	var tenantGrid = new CodeReuse.TenantGrid();
	var helper = new CodeReuse.Helper();
	helper.resetRowHighlight(tenantGrid.getTableHtmlObjectId());

	var formObject = new CodeReuse.Tenant();
	var tableNameInDb = formObject.getTableNameInDb();

	var lock = new CodeReuse.Lock();

	lock.unlock(tableNameInDb, tenantFormPrimaryKey, sessionStorage.getItem("userId"));

},

/**
 * Sets the home grid search field value
 * @function
 * @name Helper#setHomeGridSearchValue
 **/
setHomeGridSearchValue: function() {

	var searchValue = document.getElementById("homeTenantGridSearchValue").value;

	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	home_tenant_grid.setSearchValue(searchValue);


},

/**
 * Sets the home form grid paging search field value
 * @function
 * @name Helper#setHomeFormGridPagingSearchValue
 **/
setHomeFormGridPagingSearchValue: function() {

	var searchValue = document.getElementById("homeTenantFormGridPagingSearchValue").value;

	var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

	home_tenant_form_grid_paging.setSearchValue(searchValue);


},

/**
 * Show the home grid records with search filter
 * @function
 * @name Helper#getHomeGridSearchValue
 **/
getHomeGridSearchValue: function() {

	if(sessionStorage.getItem("editMode") == "true")
	{
		alert('Please cancel save mode in order to make this search');
		return;
	}

	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	var callback = new CodeReuse.Callback();

	grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), "searchValue", home_tenant_grid.getSearchValue(), callback.gridCallback, home_tenant_grid.getRowOnClick(), "showEdit", "fieldPrimaryKey", "asc", "1", '', "false", '' ,'', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');	

	sessionStorage.setItem("arraySortColumn", "fieldPrimaryKey");
	
	sessionStorage.setItem("arraySortDirection", "asc");

	sessionStorage.setItem("homeTenantGridPageNumber", "1");

	document.getElementById("gridGetPostHomePagingPageNumber").value = "1";

	sessionStorage.setItem("editMode", "false");

},

/**
 * Show the home form grid paging records with search filter
 * @function
 * @name Helper#getHomeFormGridPagingSearchValue
 **/
getHomeFormGridPagingSearchValue: function() {

	var formObject = new CodeReuse.TenantFormGridPaging();

	var tableNameInDb = formObject.getTableNameInDb();

	var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

	var selectedRowId = home_tenant_form_grid_paging.getTenantForGridPagingSelectedRowId();

	var lock = new CodeReuse.Lock();

	lock.unlock_search_home_form_grid_paging(tableNameInDb, selectedRowId, sessionStorage.getItem("userId"));
},

/**
 * Get url string parameters
 * @function
 * @name Helper#parameterPassingUrl
 * 
 * @param {string} query the url including parameters
 **/
 parameterPassingUrl: function(query) {

	var GET = {};

	for (var i = 0, max = query.length; i < max; i++)
	{
		if (query[i] === "") // check for trailing & with no param
			continue;
	
		var param = query[i].split("=");
		GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
	}

	return GET;
 },

/**
 * Logout
 * @function
 * @name Helper#logout
 **/
 logout: function() {
	
	//needToConfirm = false;
	
	var confirmChoice = confirm("Do you want to logout of the system?");

	if(confirmChoice == true)
	{
		var onunload = new CodeReuse.Onunload();
    
		onunload.unlock_remove_session();
	}
 },

/**
 * Update the grid page number (setting input box beside the go button) and refresh the grid
 * @function
 * @name Helper#updateGridPage
 * 
 * @param {string} object points to the current html object (this)
 * @param {string} pageNumber gridGetPostHomePagingPageNumber input box value
 **/
updateGridPage: function(object, pageNumber)
{
	if(sessionStorage.getItem("editMode") == "true")
	{
		alert('Please click on save to leave save mode');
		return;
	}

	if(isNaN(parseInt(pageNumber)))
	{
		alert('Page number has to be an integer');
		return;
	}

	if(pageNumber == "0")
	{
		alert('Please enter page number greater than 0');
		return;
	}

	var pagingFooter = object.parentNode.id;

	var pageNumberUpdate;

	if(pagingFooter == "gridGetPostHomePaging")
	{
		var inputPage = document.getElementById("gridGetPostHomePagingPageNumber").value;
		var totalPagesString = document.getElementById("gridGetPostHomePagingPages").innerText;
		var totalPages = totalPagesString.substr(3, totalPagesString.length);
		
		if(parseInt(inputPage) > totalPages)
		{
			alert('This page number is greater than the total number of pages');
			return;
		}


		sessionStorage.setItem("homeTenantGridPageNumber", pageNumber);
			
		pageNumberUpdate = sessionStorage.getItem("homeTenantGridPageNumber");

		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();

		var home_tenant_grid = new CodeReuse.HomeTenantGrid();

		var callback = new CodeReuse.Callback();

		var column = sessionStorage.getItem("arraySortColumn");
		var direction = sessionStorage.getItem("arraySortDirection");

		var searchValue = home_tenant_grid.getSearchValue();
		
		if(searchValue == "" || searchValue == undefined)
		{
			grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_grid.getRowOnClick, "showEdit", column, direction, pageNumberUpdate, '', "false", '' ,'', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
		}
		else
		{
			grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_grid.getGridIdField(),home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, home_tenant_grid.getRowOnClick, "showEdit", column, direction, pageNumberUpdate, '', "false", '' ,'', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
		}
	}
	else
	if(pagingFooter == "gridGetPostHomeFormGridPagingFooter")
	{
		var inputPage = document.getElementById("gridGetPostHomeFormGridPagingPageNumber").value;
		var totalPagesString = document.getElementById("gridGetPostHomeFormGridPagingPages").innerText;
		var totalPages = totalPagesString.substr(3, totalPagesString.length);
		
		if(parseInt(inputPage) > totalPages)
		{
			alert('This page number is greater than the total number of pages');
			return;
		}

		var formObject = new CodeReuse.TenantFormGridPaging();

		var tableNameInDb = formObject.getTableNameInDb();

		var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

		var selectedRowId = home_tenant_form_grid_paging.getTenantForGridPagingSelectedRowId();

		var lock = new CodeReuse.Lock();

		lock.unlock_update_page_number(pageNumber, tableNameInDb, selectedRowId, sessionStorage.getItem("userId"));
	}
},

/**
 * Click on the left or right arrows to update the grid page number and refresh the grid
 * @function
 * @name Helper#updateGridPageArrows
 * 
 * @param {string} object points to the current html object (this) 
 * @param {string} direction the left or right arrow
 * @param {string} pageNumber gridGetPostHomePagingPageNumber input box value before the update
 **/
updateGridPageArrows: function(object, direction, pageNumber)
{
	if(sessionStorage.getItem("editMode") == "true")
	{
		alert('Please click on save to leave save mode');
		return;
	}		

	if(isNaN(parseInt(pageNumber)))
	{
		alert('Page number has to be an integer');
		return;
	}

	if(pageNumber == "0")
	{
		alert('Please enter page number greater than 0');
		return;
	}

	var pageNumberUpdate;

	var pagingFooter = object.parentNode.id;

	if(pagingFooter == "gridGetPostHomePaging")
	{
		if(direction == "left") {
			if(pageNumber == "1") {
				alert('You are on the first page');
				return;
			} else {
				pageNumberUpdate = parseInt(pageNumber) - 1;
				document.getElementById('gridGetPostHomePagingPageNumber').value = pageNumberUpdate;
			}
		} else if(direction == "right") {

			var inputPage = pageNumber;
			var totalPagesString = document.getElementById("gridGetPostHomePagingPages").innerText;
			var totalPages = totalPagesString.substr(3, totalPagesString.length);
			
			if(parseInt(inputPage) == parseInt(totalPages))
			{
				alert('You have reached the last page');
				return;
			}


			pageNumberUpdate = parseInt(pageNumber) + 1;
			document.getElementById('gridGetPostHomePagingPageNumber').value = pageNumberUpdate;
		}
	
		sessionStorage.setItem("homeTenantGridPageNumber", pageNumberUpdate.toString());

		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
		var home_tenant_grid = new CodeReuse.HomeTenantGrid();
	
		var callback = new CodeReuse.Callback();
	
		var column = sessionStorage.getItem("arraySortColumn");
		var direction = sessionStorage.getItem("arraySortDirection");
	
		var searchValue = home_tenant_grid.getSearchValue();
	
		if(searchValue == "" || searchValue == undefined)
		{
			grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryName(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), '', '', callback.gridCallback, '', "showEdit", column, direction, pageNumberUpdate.toString(), '', "false", '', '', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
		}
		else
		{
			grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, '', "showEdit", column, direction, pageNumberUpdate.toString(), '', "false", '', '', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');
		}		
	}
	else
	if(pagingFooter == "gridGetPostHomeFormGridPagingFooter")
	{
		if(direction == "left") {

			if(pageNumber == "1") {
				alert('You are on the first page');
				return;
			}

		} else if(direction == "right") {

			var inputPage = pageNumber;
			var totalPagesString = document.getElementById("gridGetPostHomeFormGridPagingPages").innerText;
			var totalPages = totalPagesString.substr(3, totalPagesString.length);
			
			if(parseInt(inputPage) == parseInt(totalPages))
			{
				alert('You have reached the last page');
				return;
			}
		}

		var formObject = new CodeReuse.TenantFormGridPaging();

		var tableNameInDb = formObject.getTableNameInDb();

		var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

		var selectedRowId = home_tenant_form_grid_paging.getTenantForGridPagingSelectedRowId();
		
		var lock = new CodeReuse.Lock();
		
		lock.unlock_update_page_direction(direction, pageNumber, tableNameInDb, selectedRowId, sessionStorage.getItem("userId"));
	}
},

/**
 * Convert date from database to dd-mmm-yyyy format
 * @function
 * @name Helper#convertDateFromDatabase
 * 
 * @param {string} date the date from the database
 **/
convertDateFromDatabase: function(date)
{	
	var dateFromDatabase = date;
	
	var year = dateFromDatabase.substring(0,4);
	var month = dateFromDatabase.substring(5,7);
	var day = dateFromDatabase.substring(8,10);
	
	var dateFormat = day + "-" + this.dateMonthNumberToStringConversion(month) + "-" + year;
	
	return dateFormat;

},

/**
 * Convert date from system to database yyyy-mm-dd format
 * @function
 * @name Helper#convertDateFromSystem
 * 
 * @param {string} date the date from the system
 **/
convertDateFromSystem: function(date)
{	
	var dateFromSystem = date;
	
	var day = dateFromSystem.substring(0,2);
	var month = dateFromSystem.substring(3,6);
	var year = dateFromSystem.substring(7,11);
	
	var dateFormat = year + "-" + this.dateMonthStringToNumberConversion(month) + "-" + day;
	
	return dateFormat;

},

/**
 * Convert month character string to number string
 * @function
 * @name Helper#dateMonthStringToNumberConversion
 * 
 * @param {string} monthString the month as character string
 **/
dateMonthStringToNumberConversion: function(monthString)
{
	var monthArray = [];
	
	monthArray["jan"] = "01";
	monthArray["feb"] = "02";
	monthArray["mar"] = "03";
	monthArray["apr"] = "04";
	monthArray["may"] = "05";
	monthArray["jun"] = "06";
	monthArray["jul"] = "07";
	monthArray["aug"] = "08";
	monthArray["sep"] = "09";
	monthArray["oct"] = "10";
	monthArray["nov"] = "11";
	monthArray["dec"] = "12";
	
	return monthArray[monthString];
},

/**
 * Convert month number to month character string
 * @function
 * @name Helper#dateMonthStringToNumberConversion
 * 
 * @param {string} monthNumber the month number we are converting
 **/
dateMonthNumberToStringConversion: function(monthNumber)
{
	var monthArray = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	
	return monthArray[parseInt(monthNumber) - 1];
},

/**
 * Custom message box for alert and confirm
 * @function
 * @name Helper#msgBox
 * 
 * @param {string} buttonType alert or confirm
 * @param {string} msg the message that is shown
 * @param {function} msgbox_callback the function called onclick of OK or Cancel button
 **/
msgBox: function (buttonType, msg, msgbox_callback) {

	var modal = document.getElementById("myModal");
	
	document.getElementById('popupText').innerHTML = msg;
	
	if(buttonType == 'alert')
	{
	document.getElementById('buttonOK').style.display = 'block';
	document.getElementById('buttonCancel').style.display = 'none';
	}  
	else if(buttonType == 'confirm')
	{
	document.getElementById('buttonOK').style.display = 'block';
	document.getElementById('buttonCancel').style.display = 'block';
	}
	
	modal.style.display = "block";
	
	var buttonOK = document.getElementById("buttonOK");
	buttonOK.className = "button";

	buttonOK.onclick = function() {

		modal.style.display = "none";
	
		if(msgbox_callback != null)
			msgbox_callback(true);
	
	};
	
	var buttonCancel = document.getElementById("buttonCancel");
	buttonCancel.className = "button";

	buttonCancel.onclick = function() {

		modal.style.display = "none";

		msgbox_callback(false);
		
	}
	
},

/**
 * Preload images in the onload handler
 * @function
 * @name Helper#preload
 * 
 * @param {Array} preload array of images including path
 **/
preload: function(preload) {

	for (i = 0; i < preload.length; i++) {
		images[i] = new Image();
		images[i].src = preload[i];
	}
},

/**
 * Clear the row highlight for the given table
 * @function
 * @name Helper#resetRowHighlight
 * 
 * @param {string} tableHtmlObjectId the html table object
 **/
resetRowHighlight: function(tableHtmlObjectId) {

	var tableReset = document.getElementById(tableHtmlObjectId);
	var row;

	for(var i=0; i<tableReset.rows.length; i++)
	{
		row = tableReset.rows[i];
		row.className = "rowClickCursor";
	}	

},

/**
 * Check the platform which is in use
 * @function
 * @name Helper#checkPlatform
 **/
checkPlatform: function() {

	var isIOS_safari = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

	var isIOS = /iPad|iPhone|iPod/.test(navigator.platform);

	var isAndroid = /Android/i.test(navigator.userAgent);

	if(isIOS_safari == false && isIOS == false && isAndroid == false)
	{
		if(navigator.userAgent.indexOf('Chrome') != -1)
		{
			return "desktop_chrome";
		}
		else
		{
			return "desktop_safari";
		}
	}
	else
	if(isIOS_safari == true)
	{
		return "IOS_safari";
	}
	else
	if(isIOS == true)
	{
		return "IOS";
	}
	else
	if(isAndroid == true)
	{
		return "android";
	}

}

}
