
function removeCalendarTable(divCalendarId) {
	
	document.getElementById(divCalendarId).innerHTML = "";

};

function positionCalendar(inputCalendarId, divCalendarId) {
	
	var positionInputCalendar = document.getElementById(inputCalendarId);
	
	var left = positionInputCalendar.offsetLeft;
	var top = positionInputCalendar.offsetTop;
	
	var positionDivCalendar = document.getElementById(divCalendarId);
	
	positionDivCalendar.style.left = left;
	positionDivCalendar.style.top = top + positionInputCalendar.offsetHeight;
	
}

function createCalendarTable(inputCalendarId, divCalendarId) {
	
	var tbl = document.createElement("table");
	tbl.id = "tableCalendarId";
	tbl.className = "calendar";
	
	var row = document.createElement("tr");
	
	row.className = "calendarHover";
	
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
	header.id = "cal_cell_h1";
	headerText = document.createTextNode("S");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h2";
	headerText = document.createTextNode("M");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h3";
	headerText = document.createTextNode("T");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h4";
	headerText = document.createTextNode("W");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h5";
	headerText = document.createTextNode("T");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h6";
	headerText = document.createTextNode("F");
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h7";
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
		cell.className = "calendar";
		row.appendChild(cell);
	}
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	for(i=15; i<=21; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		cell.className = "calendar";
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

	if(showOrHide == "show")
	{		
		var regularExpressionValidation = /^(0[0-9]|1[0-9]|2[0-9]|3[0-1])\-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\-\d{4}$/g;
	
		inputCalendarObject = document.getElementById(inputCalendarId);
	
		if(inputCalendarObject.value != "")
		{
			if(!inputCalendarObject.value.match(regularExpressionValidation))
			{
				return;
			}
		}
	}

	var calendarId = document.getElementById(divCalendarId);
	
	positionCalendar(inputCalendarId, divCalendarId);
	
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
		calendar(getInputCalendarValue("month", inputCalendarId),getInputCalendarValue("year", inputCalendarId), inputCalendarId, divCalendarId);
	}
	else
	{
		var calendarDate = new Date();
		
		calendar(calendarDate.getMonth(), calendarDate.getFullYear(), inputCalendarId, divCalendarId);
	}

}

function getInputCalendarValue(dayMonthOrYear, inputCalendarId) {
	
	var inputCalendar = document.getElementById(inputCalendarId);
	
	if(inputCalendar.value == "")
		return "";
	
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
	else 
	{
		return "";
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

function calendar(month, year, inputCalendarId, divCalendarId) {
	
	clearCalendar();
	
	var calendarDate = new Date();
				
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

			var currentMonthString = currentMonthYearArray[0];
			var currentYear = currentMonthYearArray[1];
			
			for(currentMonth=0; currentMonth<12; currentMonth++)
			{
				if(monthsArray[currentMonth] == currentMonthString)
				{
					break;
				}
			}	
			
			var dayClick = obj.srcElement.innerHTML;
			
			var dayPadding = dayClick;
			
			if(dayClick.length != 2)
				dayPadding = '0' + dayPadding;
						
			document.getElementById(inputCalendarId).value = dayPadding + '-' + currentMonthString.substr(0,3).toLowerCase() + '-' + currentYear;
			
			document.getElementById(divCalendarId).style.display = "none";
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
			
	var currentMonthString = currentMonthYearArray[0];
	var currentYear = currentMonthYearArray[1];
	
	for(currentMonth=0; currentMonth<12; currentMonth++)
	{
		if(monthsArray[currentMonth] == currentMonthString)
		{
			break;
		}
	}	
	
	var calendarCurrentDate = new Date();
	var calendarCurrentDay = calendarCurrentDate.getDate();
	var calendarCurrentMonth = calendarCurrentDate.getMonth();
	var calendarCurrentYear = calendarCurrentDate.getFullYear();	
	
	var selectedDay = getInputCalendarValue("day",inputCalendarId);
	var selectedMonth = getInputCalendarValue("month",inputCalendarId);
	var selectedYear = getInputCalendarValue("year",inputCalendarId);	
	
	for(i=1; i<=42; i++)
	{
		var calCell = document.getElementById('cal_cell_' + i);
		
		if(calCell.innerHTML != "" && calCell.innerHTML != "&nbps")
		{
			if(parseInt(calCell.innerHTML) == calendarCurrentDay && currentMonth == calendarCurrentMonth && currentYear == calendarCurrentYear.toString())
			{
				calCell.className = "currentDay";
				calCell.style.fontWeight = "bold";
			}
			else
			{
				if(selectedDay != "" && (selectedMonth == 0 || selectedMonth <12) && selectedYear != "")
				{
					if(parseInt(calCell.innerHTML) == selectedDay && currentMonth == selectedMonth && currentYear == selectedYear)
					{
						calCell.className = "selectedDay";
					}
				}			
				else
					calCell.className = "normalDay";
			}
		}
	}
}

function daysInMonth(month, year) {
	
	return new Date(year, month, 0).getDate();
	
}

function moveCalendar(backOrForward, obj, inputCalendarId, divCalendarId) {
	
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
	
	calendar(newMonth, newYear, inputCalendarId, divCalendarId);

}

function clearCalendar() {
	
	for(calCellDay=1; calCellDay<=42; calCellDay++)
	{
		var calCell = document.getElementById('cal_cell_' + calCellDay);
		
		calCell.innerHTML = "";
		calCell.onclick = null;
		
		if(calCell.style.fontWeight == "bold")
			calCell.style.fontWeight = "normal";
				
		calCell.className = "normalDay";		
	}
	
}