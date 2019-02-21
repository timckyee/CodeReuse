
window.addEventListener("load", function() {

	var calendarDate = new Date();

	var month = calendarDate.getMonth();
	var year = calendarDate.getFullYear();

	monthsArray = Array();
	
	populateMonthsArray();

	document.getElementById('monthYear').innerHTML = monthsArray[month] + ' ' + year;

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
			
			var calCurrentMonthYear = obj.srcElement.parentElement.parentElement.childNodes[0].innerText;
			var calCurrentMonthYearForwardSign = calCurrentMonthYear.substr(1, calCurrentMonthYear.length-1).trim();
			var calCurrentMonthYearNoBackForwardSign = calCurrentMonthYearForwardSign.substr(0, calCurrentMonthYearForwardSign.length - 1).trim();
			
			var currentMonthYear = calCurrentMonthYearNoBackForwardSign.split(' ');

			var currentMonth = currentMonthYear[0];
			var currentYear = currentMonthYear[1];
			
			for(month=0; month<12; month++)
			{
				if(monthsArray[month] == currentMonth)
				{
					break;
				}
			}	
			
			var day = obj.srcElement.innerHTML;
			
			var dayPadding = day;
			
			if(day.length != 2)
				dayPadding = '0' + dayPadding;
						
			document.getElementById(inputId).value = dayPadding + '-' + currentMonth.substr(0,3).toLowerCase() + '-' + calendarDateYear;
			
			document.getElementById(divCalendarId).style.display = "none";
			
			for(calCellDay=1; calCellDay<=42; calCellDay++)
			{
				if(document.getElementById('cal_cell_' + calCellDay).innerHTML == day)
					document.getElementById('cal_cell_' + calCellDay).className = "selectedDay";
				else
				{
					if(document.getElementById('cal_cell_' + calCellDay).className != "currentDay")
						document.getElementById('cal_cell_' + calCellDay).className = "normalDay";
				}
			}
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
		
		var calCurrentMonthYearBackForwardSign = calCell.parentElement.parentElement.childNodes[0].innerText;
		var calCurrentMonthYearBackForwardSignTrim = calCurrentMonthYearBackForwardSign.trim();
		var calCurrentMonthYearForwardSign = calCurrentMonthYearBackForwardSignTrim.substr(1, calCurrentMonthYearBackForwardSignTrim.length-1).trim();
		var calCurrentMonthYearNoBackForwardSign = calCurrentMonthYearForwardSign.substr(0, calCurrentMonthYearForwardSign.length - 1).trim();
		
		var currentMonthYear = calCurrentMonthYearNoBackForwardSign.split(' ');
		
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
			calCell.className = "currentDay";
			calCell.style.fontWeight = "bold";
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
		
		var calCurrentMonthYear = calCell.parentElement.parentElement.childNodes[0].innerText;
		var calCurrentMonthYearForwardSign = calCurrentMonthYear.substr(1, calCurrentMonthYear.length-1).trim();
		var calCurrentMonthYearNoBackForwardSign = calCurrentMonthYearForwardSign.substr(0, calCurrentMonthYearForwardSign.length - 1).trim();
		
		var currentMonthYear = calCurrentMonthYearNoBackForwardSign.split(' ');
		
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
			calCell.className = "normalDay";
			calCell.style.fontWeight = "normal";
			break;
		}
	}
	
	for(calCellDay=1; calCellDay<=42; calCellDay++)
	{
		document.getElementById('cal_cell_' + calCellDay).className = "normalDay";
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