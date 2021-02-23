/**
 * The CodeReuse object
 */
var CodeReuse = CodeReuse || {};


/**
 * Class for storing helper functions
 * @class
 */
CodeReuse.Helper = function() {
	
};

CodeReuse.Helper.prototype = {

/**
 * Validate suite form for empty values
 * @function
 * @name Helper#validateHtmlObjectFieldsSuite
 * 
 * @param {Array} fieldsInfo the fields in the suite object
 */
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
 */
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
 * Validate tenant home grid for empty values
 * @function
 * @name Helper#validateHtmlObjectFieldsHomeTenantGrid
 * 
 * @param {string} columnsInfo the columns of the home grid
 */
validateHtmlObjectFieldsHomeTenantGrid: function(columnsInfo)
{
	for(validate=0; validate<columnsInfo.length; validate++)
	{
		if(columnsInfo[validate].id != "fieldPrimaryKey")
		{
			if(document.getElementById(columnsInfo[validate].htmlObjectId).value == "")
			{
				alert(columnsInfo[validate].htmlObjectId + ' ' + 'cannot be empty');
				return false;
			}
		}
	}
	
	return true;
},

/**
 * Sets the home grid search field value
 * @function
 * @name Helper#setHomeGridSearchValue
 */
setHomeGridSearchValue: function() {

	var searchValue = document.getElementById("homeTenantGridSearchValue").value;

	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	home_tenant_grid.setSearchValue(searchValue);


},

/**
 * Sets the home form grid paging search field value
 * @function
 * @name Helper#setHomeFormGridPagingSearchValue
 */
setHomeFormGridPagingSearchValue: function() {

	var searchValue = document.getElementById("homeTenantFormGridPagingSearchValue").value;

	var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

	home_tenant_form_grid_paging.setSearchValue(searchValue);


},

/**
 * Show the home grid records with search filter
 * @function
 * @name Helper#getHomeGridSearchValue
 */
getHomeGridSearchValue: function() {

	if(localStorage.getItem("editMode") == "true")
	{
		alert('Please cancel save mode in order to continue');
		return;
	}

	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
	var home_tenant_grid = new CodeReuse.HomeTenantGrid();

	var callback = new CodeReuse.Callback();

	grid_get_post_functions.grid(home_tenant_grid.getGridGetPostDivElement(), home_tenant_grid.getPhpFile(), home_tenant_grid.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_grid.getGridIdField(), home_tenant_grid.getGridColumnsInfo(), home_tenant_grid.getTableHtmlObjectId(), "searchValue", home_tenant_grid.getSearchValue(), callback.gridCallback, home_tenant_grid.getRowOnClick(), "showEdit", "fieldPrimaryKey", "asc", "1", '', "false", '' ,'', "true", home_tenant_grid.getHomeTenantGridPagingDiv(), home_tenant_grid.getPageSize(), '');	

	localStorage.setItem("arraySortColumn", "fieldPrimaryKey");
	
	localStorage.setItem("arraySortDirection", "asc");

	localStorage.setItem("homeTenantGridPageNumber", "1");

	document.getElementById("gridGetPostHomePagingPageNumber").value = "1";

	localStorage.setItem("editMode", "false");

},

/**
 * Show the home form grid paging records with search filter
 * @function
 * @name Helper#getHomeFormGridPagingSearchValue
 */
getHomeFormGridPagingSearchValue: function() {

	var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
	var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

	var callback = new CodeReuse.Callback();

	grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", home_tenant_form_grid_paging.getSearchValue(), callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', "fieldPrimaryKey", "asc", "1", '', "false", '' ,'', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');	

	localStorage.setItem("arraySortColumn_tenant_form_grid_paging", "fieldPrimaryKey");
	
	localStorage.setItem("arraySortDirection_tenant_form_grid_paging", "asc");

	localStorage.setItem("homeTenantFormGridPagingPageNumber", "1");

	document.getElementById("gridGetPostHomeFormGridPagingPageNumber").value = "1";

},

/**
 * Update the grid page number (setting input box beside the go button) and refreshing the grid
 * @function
 * @name Helper#updateGridPage
 * 
 * @param {string} pageNumber gridGetPostHomePagingPageNumber input box value
 */
updateGridPage: function(object, pageNumber)
{
	if(localStorage.getItem("editMode") == "true")
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


		localStorage.setItem("homeTenantGridPageNumber", pageNumber);
			
		pageNumberUpdate = localStorage.getItem("homeTenantGridPageNumber");
		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();

		var home_tenant_grid = new CodeReuse.HomeTenantGrid();

		var callback = new CodeReuse.Callback();

		var column = localStorage.getItem("arraySortColumn");
		var direction = localStorage.getItem("arraySortDirection");

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


		localStorage.setItem("homeTenantFormGridPagingPageNumber", pageNumber);
			
		pageNumberUpdate = localStorage.getItem("homeTenantFormGridPagingPageNumber");
		
		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
		var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();
	
		var callback = new CodeReuse.Callback();
	
		var column = localStorage.getItem("arraySortColumn_tenant_form_grid_paging");
		var direction = localStorage.getItem("arraySortDirection_tenant_form_grid_paging");
	
		var searchValue = home_tenant_form_grid_paging.getSearchValue();
		
		if(searchValue == "" || searchValue == undefined)
		{
			grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryName(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberUpdate, '', "false", '' ,'', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
		}
		else
		{
			grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberUpdate, '', "false", '' ,'', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
		}
	}
},

/**
 * Click on the left or right arrows to update the grid page number and refreshing the grid
 * @function
 * @name Helper#updateGridPageArrows
 * 
 * @param {string} direction the left or right arrow
 * @param {string} pageNumber gridGetPostHomePagingPageNumber input box value before the update
 */
updateGridPageArrows: function(object, direction, pageNumber)
{
	if(localStorage.getItem("editMode") == "true")
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
	
		localStorage.setItem("homeTenantGridPageNumber", pageNumberUpdate.toString());

		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
		var home_tenant_grid = new CodeReuse.HomeTenantGrid();
	
		var callback = new CodeReuse.Callback();
	
		var column = localStorage.getItem("arraySortColumn");
		var direction = localStorage.getItem("arraySortDirection");
	
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
			} else {
				pageNumberUpdate = parseInt(pageNumber) - 1;
				document.getElementById('gridGetPostHomeFormGridPagingPageNumber').value = pageNumberUpdate;
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

			
			pageNumberUpdate = parseInt(pageNumber) + 1;
			document.getElementById('gridGetPostHomeFormGridPagingPageNumber').value = pageNumberUpdate;
		}
	
		localStorage.setItem("homeTenantFormGridPagingPageNumber", pageNumberUpdate.toString());		
	
		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
	
		var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();
	
		var callback = new CodeReuse.Callback();
	
		var column = localStorage.getItem("arraySortColumn_tenant_form_grid_paging");
		var direction = localStorage.getItem("arraySortDirection_tenant_form_grid_paging");
	
		var searchValue = home_tenant_form_grid_paging.getSearchValue();
	
		if(searchValue == "" || searchValue == undefined)
		{
			grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryName(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberUpdate.toString(), '', "false", '', '', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
		}
		else
		{
			grid_get_post_functions.grid(home_tenant_form_grid_paging.getGridGetPostDivElement(), home_tenant_form_grid_paging.getPhpFile(), home_tenant_form_grid_paging.getRefreshHomeTenantGridQueryNameSearch(), home_tenant_form_grid_paging.getGridIdField(), home_tenant_form_grid_paging.getGridColumnsInfo(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", searchValue, callback.gridCallback, home_tenant_form_grid_paging.getRowOnClick(), '', column, direction, pageNumberUpdate.toString(), '', "false", '', '', "true", home_tenant_form_grid_paging.getHomeTenantGridPagingDiv(), home_tenant_form_grid_paging.getPageSize(), '');
		}
	}
},

/**
 * Convert date from database to dd-mmm-yyyy format
 * @function
 * @name Helper#convertDateFromDatabase
 * 
 * @param {string} date the date from the database
 */
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
 */
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
 */
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
 */
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
 */
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
 */
preload: function(preload) {

	for (i = 0; i < preload.length; i++) {
		images[i] = new Image();
		images[i].src = preload[i];
	}
},

/**
 * On cursor mouse over the rows of Suite or Tenant form grid show pointer
 * @function
 * @name Helper#resetRowHighlight
 * 
 * @param {string} tableHtmlObjectId either tableSuite in SuiteGrid or tableTenant in TenantGrid
 */
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
 */
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
