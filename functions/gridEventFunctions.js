/**
 * Class for storing grid edit functions
 * @class
 **/
CodeReuse.GridEventFunctions = function() {
	
};

CodeReuse.GridEventFunctions.prototype = {
    
	/**
	 * The save link onclick event
	 * @function
	 * @name GridEventFunctions#saveLink2Onclick
	 **/    
    saveLink2Onclick: function()
    {
        if(document.getElementById("tenantSearchList").innerHTML != "")
        {
            alert('Please select Tenant Name');
            return;
        }
    
        if(document.getElementById('calendarId').style.display == "block")
        {
            alert('Please select field date');
            return;
        }

       controller.homeTenantGridSave();
    },
    
	/**
	 * The tenant input keyup event
	 * @function
	 * @name GridEventFunctions#tenant_input_grid_onKeyUp
	 **/    
    tenant_input_grid_onKeyUp: function(event) 
    {
        var autocomplete = new CodeReuse.Autocomplete();
    
        var home_tenant_grid = new CodeReuse.HomeTenantGrid();
    
        if(document.getElementById("tenant_input_grid").value == "")
        {
            document.getElementById("tenantSearchList").innerHTML = "";			
        }
        else
        {
            autocomplete.autocomplete(event, "gridInput", "tenantSearchList", "suiteNumber,tenantName", "tenantId",  "GET", home_tenant_grid.getPhpFile(), "tenants", "building", document.getElementById("building_option_grid").selectedIndex, "tenant_input_grid", "tenantSearchList");
        }
    },
    
 	/**
	 * The input calendar inputCalendar_grid onblur event
	 * @function
	 * @name GridEventFunctions#inputCalendar_grid_onBlur
	 **/       
    inputCalendar_grid_onBlur: function()
    {
        var calendar = new CodeReuse.Calendar();
    
        if(calendar.validateDate("inputCalendar_grid") == false)
        {
            alert("input format date has to be dd-mmm-yyyy");
        }
    },
    
 	/**
	 * The input calendar inputCalendarTesting_grid onblur event
	 * @function
	 * @name GridEventFunctions#inputCalendarTesting_grid_onBlur
	 **/      
    inputCalendarTesting_grid_onBlur: function()
    {
        var calendar = new CodeReuse.Calendar();
            
        if(calendar.validateDate("inputCalendarTesting_grid") == false)
        {
            alert("input format date has to be dd-mmm-yyyy");
        }
    }

}