
window.addEventListener("load", function() {

	monthsArray = Array();
	
	populateMonthsArray();

	var divCalendarId = "calendarId";

	document.onclick = function(e) {

		var calendarId = document.getElementById(divCalendarId);
		
		if(e.target.id != "back" && e.target.id != "forward") {
			calendarId.style.display = "none";
		}
		
	};

	var inputCalendar = document.getElementById('inputCalendar');
	
	inputCalendar.addEventListener("focus", function(event){showHideCalendar(event, 'show' ,'inputCalendar', 'calendarId')});
	
});

function removeCalendarTable(divCalendarId) {
	
	document.getElementById(divCalendarId).innerHTML = "";

};

function createCalendarTable(inputCalendarId, divCalendarId) {
	
	var tbl = document.createElement("table");
	tbl.id = "tableCalendarId";
	
	var row = document.createElement("tr");
	
	var cell = document.createElement("td");
	cell.id = "back";
	cell.style.textAlign = "center";
	cell.onclick = function() { moveCalendar('back',this, inputCalendarId, divCalendarId); };
	cellText = document.createTextNode("<");
	
	cell.appendChild(cellText);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	cell.id = "monthYear";
	cell.colSpan = "5";
	cell.style.textAlign = "center";
	
	row.appendChild(cell);
	
	cell = document.createElement("td");
	cell.id = "forward";
	cell.style.textAlign = "center";
	cell.onclick = function() { moveCalendar('forward',this, inputCalendarId, divCalendarId); };
	cellText = document.createTextNode(">");		
	
	cell.appendChild(cellText);
	row.appendChild(cell);
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	header = document.createElement("th");
	headerText = document.createTextNode("S");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	headerText = document.createTextNode("M");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	headerText = document.createTextNode("T");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	headerText = document.createTextNode("W");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	headerText = document.createTextNode("T");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	headerText = document.createTextNode("F");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	headerText = document.createTextNode("S");	
	
	header.appendChild(headerText);
	row.appendChild(header);
		
	tbl.appendChild(row);	
	
	row = document.createElement("tr");
	
	for(i=1; i<=7; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		row.appendChild(cell);
	}
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	for(i=8; i<=14; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		row.appendChild(cell);
	}
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	for(i=15; i<=21; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		row.appendChild(cell);
	}
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	for(i=22; i<=28; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		row.appendChild(cell);
	}
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	for(i=29; i<=35; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		row.appendChild(cell);
	}
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	for(i=36; i<=42; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		row.appendChild(cell);
	}	
	
	tbl.appendChild(row);
	
	var calendarId = document.getElementById(divCalendarId);
	
	calendarId.appendChild(tbl);
	
}

function showHideCalendar(event, showOrHide, inputCalendarId, divCalendarId) {

	var calendarId = document.getElementById(divCalendarId);
	
	if(showOrHide == "show")
	{
		calendarId.style.display = "block";
	}
	else
	if(showOrHide == "hide")
	{
		calendarId.style.display = "none";
		return;
	}

	var inputCalendar = document.getElementById(inputCalendarId);
	
	removeCalendarTable(divCalendarId);
	createCalendarTable(inputCalendarId, divCalendarId);
	
	if(inputCalendar.value != "")
	{
		calendar(getInputCalendarValue("day", inputCalendarId),getInputCalendarValue("month", inputCalendarId),getInputCalendarValue("year", inputCalendarId), inputCalendarId, divCalendarId);
	}
	else
	{
		var calendarDate = new Date();
		
		calendar(calendarDate.getDate(),calendarDate.getMonth(), calendarDate.getFullYear(), inputCalendarId, divCalendarId);
	}

}

function getInputCalendarValue(dayMonthOrYear, inputCalendarId) {
	
	var inputCalendar = document.getElementById(inputCalendarId);
	
	if(inputCalendar.value == "")
		return;
	
	var day, month, year;
	
	var inputCalendarArray = inputCalendar.value.split('-');
	
	day = inputCalendarArray[0];
	if(day.substr(0,1) == '0')
		day = day.substr(1,day.length)
	
	for(i=0; i<12; i++)
	{
		if(inputCalendarArray[1] == monthsArray[i].substr(0,3).toLowerCase())
			break;
	}
	
	month = i;
	
	year = inputCalendarArray[2];
	
	if (day == "" || month == 12 || year == "")
		return "";
	
	if(dayMonthOrYear == "day")
	{
		return day;
	}
	else if(dayMonthOrYear == "month")
	{
		return month;
	}
	else if(dayMonthOrYear == "year")
	{
		return year;
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

function calendar(day, month, year, inputCalendarId, divCalendarId) {
	
	clearCalendar();
	
	var calendarDate = new Date();
	
	var calendarDateDay = calendarDate.getDate();
	var calendarDateMonth = calendarDate.getMonth();
	var calendarDateYear = calendarDate.getFullYear();
				
	calendarDate.setDate(1);
	calendarDate.setMonth(month);
	calendarDate.setFullYear(year);
	
	document.getElementById('monthYear').innerHTML = monthsArray[month] + ' ' + year;
	
	var days = daysInMonth(calendarDate.getMonth() + 1, calendarDate.getFullYear());
	var calendarDayStart = calendarDate.getDay();
	
	var calendarDayEnd;
	
	for(i=1; i<days+1; i++)
	{
		intCalCell = i + parseInt(calendarDayStart);
		document.getElementById('cal_cell_' + intCalCell).innerHTML = i;
		
		document.getElementById('cal_cell_' + intCalCell).onclick = function (obj) {
			
			var currentMonthYear = document.getElementById('monthYear').innerHTML;
			
			var currentMonthYearArray = currentMonthYear.split(' ');

			var currentMonth = currentMonthYearArray[0];
			var currentYear = currentMonthYearArray[1];
			
			for(month=0; month<12; month++)
			{
				if(monthsArray[month] == currentMonth)
				{
					break;
				}
			}	
			
			var dayClick = obj.srcElement.innerHTML;
			
			var selectedDay = getInputCalendarValue("day",inputCalendarId);
			var selectedMonth = getInputCalendarValue("month",inputCalendarId);
			var selectedYear = getInputCalendarValue("year",inputCalendarId);
			
			var dayPadding = dayClick;
			
			if(dayClick.length != 2)
				dayPadding = '0' + dayPadding;
						
			document.getElementById(inputCalendarId).value = dayPadding + '-' + currentMonth.substr(0,3).toLowerCase() + '-' + currentYear;
			
			document.getElementById(divCalendarId).style.display = "none";
			
			for(calCellDay=1; calCellDay<=42; calCellDay++)
			{
				calCell = document.getElementById('cal_cell_' + calCellDay);
				
				if(calCell.innerHTML != "" && calCell.innerHTML != "&nbps")
				{	
					if(calCell.innerHTML == selectedDay && month == selectedMonth && currentYear == selectedYear)
					{
						calCell.className = "selectedDay";
					}
					else
					{
						if(calCell.className != "currentDay")
						{
							calCell.className = "normalDay";
						}
					}
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
			document.getElementById('cal_cell_' + intCalCell).innerHTML = "&nbsp";
		else
			break;
	}
	
	var currentMonthYear = document.getElementById('monthYear').innerHTML;
	
	var currentMonthYearArray = currentMonthYear.split(' ');
			
	var currentMonth = currentMonthYearArray[0];
	var currentYear = currentMonthYearArray[1];
	
	var selectedDay = getInputCalendarValue("day",inputCalendarId);
	var selectedMonth = getInputCalendarValue("month",inputCalendarId);
	var selectedYear = getInputCalendarValue("year",inputCalendarId);
	
	for(i=1; i<=42; i++)
	{
		var calCell = document.getElementById('cal_cell_' + i);
		
		if(calCell.innerHTML != "" && calCell.innerHTML != "&nbps")
		{
			if(parseInt(calCell.innerHTML) == calendarDateDay && month == calendarDateMonth && currentYear == calendarDateYear)
			{
				calCell.className = "currentDay";
				calCell.style.fontWeight = "bold";
			}
			else
			{
				calCell.className = "normalDay";
			}
			
			if(selectedDay != "" && selectedMonth != "" && selectedYear != "")
			{
				if(parseInt(calCell.innerHTML) == selectedDay && month == selectedMonth && year == selectedYear)
				{
					calCell.className = "selectedDay";
				}
			}
		}
	}
}

function daysInMonth(month, year) {
	
	return new Date(year, month, 0).getDate();
	
}

function moveCalendar(backOrForward, obj, inputCalendarId, divCalendarId) {
	
	for(calCellDay=1; calCellDay<=42; calCellDay++)
	{
		document.getElementById('cal_cell_' + calCellDay).onclick = null;
	}

	for(calCellDay=1; calCellDay<=42; calCellDay++)
	{
		var calCell = document.getElementById('cal_cell_' + calCellDay);
		
		if(calCell.style.fontWeight == "bold")
			calCell.style.fontWeight = "normal";
				
		calCell.className = "normalDay";
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
	
	calendar(1, newMonth, newYear, inputCalendarId, divCalendarId);

}

function clearCalendar() {
	
	for(i=1; i<=42; i++)
	{
		document.getElementById('cal_cell_' + i).innerHTML = "";
	}
	
}