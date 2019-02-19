
window.addEventListener("load", function() {

	calendar();
	
	monthsArray = Array();
	
	populateMonthsArray();
	
});

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

function calendar(month, year) {
	
	var calendarDate = new Date();
	
	var day = calendarDate.getDate();
	var month = calendarDate.getMonth();
	var year = calendarDate.getFullYear();
	
	//alert(day);
	//alert(month);
	//alert(year);
	
	calendarDate.setDate(1);
	calendarDate.setMonth(month + 1);
	calendarDate.setFullYear(year);
	
	var days = daysInMonth(calendarDate.getMonth() + 1, calendarDate.getFullYear());
	var calendarDay = calendarDate.getDay();
	
	var calCell;
	
	for(i=1; i<days+1; i++)
	{
		intCalCell = i + parseInt(calendarDay);
		document.getElementById('cal_cell_' + intCalCell).innerHTML = i;
		document.getElementById('cal_cell_' + intCalCell).onclick = function () {
		
		}
		
		if(i == days)
			calCell = intCalCell;
	}
	
	for(i=1; i<42; i++)
	{
		intCalCell2 = i + parseInt(calCell);
		if(intCalCell2 <= 42)
			document.getElementById('cal_cell_' + intCalCell2).innerHTML = "&nbsp;";
		else
			break;
	}
		
}

function daysInMonth(month, year) {
	
	return new Date(year, month, 0).getDate();
	
}

function moveCalendar(backOrForward, obj) {
	
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
}