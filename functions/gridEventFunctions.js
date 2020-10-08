CodeReuse.GridEventFunctions = function() {
	
};

CodeReuse.GridEventFunctions.prototype = {

    editLink2Onclick: function()
    {
    
        if(localStorage.getItem("editMode") == "true")
        {
            var helper = new CodeReuse.Helper();
    
            helper.msgBox('confirm', 'You are in edit mode. Please click on OK then save or Cancel.', function (result) {	
                
                if(result == true)
                {
    
                }
    
            });				
        }	
    
    },
    
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
    
        var helper = new CodeReuse.Helper();
    
        helper.msgBox('confirm', 'Would you like to save this row?', function (result) {
    
            if(result == true)
            {
                controller.homeTenantGridSave();
            }
            else
            if(result == false)
            {
                return;
            }
        });	
    },
    
    tenant_input_grid_onKeyUp: function() 
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
    
    inputCalendar_grid_onFocus: function()
    {
        var calendar = new CodeReuse.Calendar();
        calendar.showHideCalendar(event, 'show' ,'inputCalendar_grid', "calendarId", monthsArray);	
    },
    
    inputCalendar_grid_onBlur: function()
    {
        var calendar = new CodeReuse.Calendar();
    
        if(calendar.validateDate("inputCalendar_grid") == false)
        {
            alert("input format has to be dd-mmm-yyyy");
        }
    },
    
    inputCalendarTesting_grid_onFocus: function()
    {
        var calendar = new CodeReuse.Calendar();
        calendar.showHideCalendar(event, 'show' ,'inputCalendarTesting_grid', "calendarId", monthsArray);	
    },
    
    inputCalendarTesting_grid_onBlur: function()
    {
        var calendar = new CodeReuse.Calendar();
            
        if(calendar.validateDate("inputCalendarTesting_grid") == false)
        {
            alert("input format has to be dd-mmm-yyyy");
        }
    }

}