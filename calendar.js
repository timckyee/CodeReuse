
window.addEventListener("load", function() {

	var calendarDate = new Date();

	monthsArray = Array();
	
	populateMonthsArray();

	var inputCalendar = document.getElementById('inputCalendar');
	
	inputCalendar.addEventListener("focus", function(event){showHideCalendar(event)});

	calendar(calendarDate.getMonth(), calendarDate.getFullYear(), 'inputCalendar', 'calendarId');
	
});

function showHideCalendar() {
	
	var calendarDate = new Date();

	var calendarId = document.getElementById('calendarId');
	
	if(calendarId.style.display != "block")
	{
		calendarId.style.display = "block";
		calendar(calendarDate.getMonth(), calendarDate.getFullYear(), 'inputCalendar', 'calendarId');
	}
	
}

function populateMonthsArray() {
	
	monthsArray[0] = "January";
	monthsArray[1] = "February";
	monthsArray[2] = "March";
	monthsArray[3] = "April";
	monthsArray[4] = "May";
	monthsArray[5] = "Jun";
	monthsArray[6] = "July";
	monthsArray[7] = "August";
	monthsArray[8] = "September";
	monthsArray[9] = "October";
	monthsArray[10] = "November";
	monthsArray[11] = "December";
	
}

function calendar(month, year, inputId, divCalendarId) {
	
	clearCalendar();
	
	var calendarDate = new Date();
	
	var calendarDateDay = calendarDate.getDate();
	var calendarDateMonth = calendarDate.getMonth();
	var calendarDateYear = calendarDate.getFullYear();
				
	calendarDate.setDate(1);
	calendarDate.setMonth(month);
	calendarDate.setFullYear(year);
	
	var days = daysInMonth(calendarDate.getMonth() + 1, calendarDate.getFullYear());
	var calendarDayStart = calendarDate.getDay();
	
	var calendarDayEnd;
	
	for(i=1; i<days+1; i++)
	{
		intCalCell = i + parseInt(calendarDayStart);
		document.getElementById('cal_cell_' + intCalCell).innerHTML = i;	
		
		document.getElementById('cal_cell_' + intCalCell).onclick = function (obj) {
			
			var monthYear = obj.srcElement.parentElement.parentElement.childNodes[0].innerText;
			
			var day = obj.srcElement.innerHTML;
			
			var currentMonthYear = monthYear.substr(2, monthYear.length).substr(0,monthYear.length-4).split(' ');
			
			var currentMonth = currentMonthYear[0];
			var currentYear = currentMonthYear[1];
						
			for(month=0; month<12; month++)
			{
				if(monthsArray[month] == currentMonth)
				{
					break;
				}
			}	
						
			if(day.length != 2)
				day = '0' + day;
						
			document.getElementById(inputId).value = day + '-' + currentMonth.substr(0,3).toLowerCase() + '-' + calendarDateYear;
			
			document.getElementById(divCalendarId).style.display = "none";
						
		};
		
		if(i == days)
			calendarDayEnd = intCalCell;
	}
	
	for(i=1; i<=42; i++)
	{
		intCalCell = i + parseInt(calendarDayEnd);
		if(intCalCell <= 42)
			document.getElementById('cal_cell_' + intCalCell).innerHTML = "&nbsp;";
		else
			break;
	}
	
	for(i=1; i<=42; i++)
	{
		var calCell = document.getElementById('cal_cell_' + i);
		
		var monthYear = calCell.parentElement.parentElement.childNodes[0].innerText;
		
		var currentMonthYear = monthYear.substr(2, monthYear.length).substr(0,monthYear.length-4).split(' ');
		
		var currentMonth = currentMonthYear[0];
		var currentYear = currentMonthYear[1];
		
		for(month=0; month<12; month++)
		{
			if(monthsArray[month] == currentMonth)
			{
				break;
			}
		}
		
		if(parseInt(calCell.innerHTML) == calendarDateDay && calendarDateMonth == month && calendarDateYear == currentYear)
		{
			calCell.style.backgroundColor = "lightgray";
			break;
		}
	}	
}

function daysInMonth(month, year) {
	
	return new Date(year, month, 0).getDate();
	
}

function moveCalendar(backOrForward, obj) {
	
	var calendarDate = new Date();
	
	var calendarDateDay = calendarDate.getDate();
	var calendarDateMonth = calendarDate.getMonth();
	var calendarDateYear = calendarDate.getFullYear();
	
	for(i=1; i<=42; i++)
	{
		var calCell = document.getElementById('cal_cell_' + i);
		
		var monthYear = calCell.parentElement.parentElement.childNodes[0].innerText;
		
		var currentMonthYear = monthYear.substr(2, monthYear.length).substr(0,monthYear.length-4).split(' ');
		
		var currentMonth = currentMonthYear[0];
		var currentYear = currentMonthYear[1];
		
		for(month=0; month<12; month++)
		{
			if(monthsArray[month] == currentMonth)
			{
				break;
			}
		}
		
		if(parseInt(calCell.innerHTML) == calendarDateDay && calendarDateMonth == month && calendarDateYear == currentYear)
		{
			calCell.style.backgroundColor = "transparent";
			break;
		}
	}
	
	var monthYear = obj.parentElement.cells[1].innerHTML;
	var monthYearArray = monthYear.split(" ");
	
	var month = monthYearArray[0];
	
	var year = monthYearArray[1];
	
	var numMonths = 12;
	
	var monthIndex;
	
	for(i=0; i<numMonths-1; i++)
	{
		if(monthsArray[i] == month)
		{
			break;
		}
	}
	
	var newYear, newMonth;
	
	if(backOrForward == "back")
	{
		if(i == 0)
		{
			newYear = parseInt(year) - 1;
			newMonth = 11;
		}
		else
		{
			newYear = parseInt(year);
			newMonth = i - 1;
		}
	}
	else
	if(backOrForward == "forward")
	{
		if(i == 11)
		{
			newYear = parseInt(year) + 1;
			newMonth = 0;
		}
		else
		{
			newYear = parseInt(year);
			newMonth = i + 1;
		}		
	}

	obj.parentElement.cells[1].innerHTML = monthsArray[newMonth] + ' ' + newYear;
	
	calendar(newMonth, newYear, 'inputCalendar', 'calendarId');
}

function clearCalendar() {
	
	for(i=1; i<=42; i++)
	{
		document.getElementById('cal_cell_' + i).innerHTML = "";
	}
	
}