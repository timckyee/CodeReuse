
function gridHide(divElement)
{
	var divTable = document.getElementById(divElement);
	
	divTable.innerHTML = "";
}

function validateHtmlObjectFields(fieldsInfo)
{
	for(validate=0; validate<fieldsInfo.length; validate++)
	{
		if(fieldsInfo[validate].htmlObjectType != "primaryKey")
		{
			if(document.getElementById(fieldsInfo[validate].htmlObjectId).value == "")
			{
				alert(fieldsInfo[validate].htmlObjectId + ' ' + 'cannot be empty');
				return false;
			}
		}
	}
	
	return true;
}

function convertDateFromDatabase(date)
{	
	var dateFromDatabase = date;
	
	var year = dateFromDatabase.substring(0,4);
	var month = dateFromDatabase.substring(5,7);
	var day = dateFromDatabase.substring(8,10);
	
	var dateFormat = day + "-" + dateMonthNumberToStringConversion(month) + "-" + year;
	
	return dateFormat;

}

function convertDateFromSystem(date)
{	
	var dateFromSystem = date;
	
	var day = dateFromSystem.substring(0,2);
	var month = dateFromSystem.substring(3,6);
	var year = dateFromSystem.substring(7,11);
	
	var dateFormat = year + "-" + dateMonthStringToNumberConversion(month) + "-" + day;
	
	return dateFormat;

}

function dateMonthStringToNumberConversion(monthString)
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
}

function dateMonthNumberToStringConversion(monthNumber)
{
	var monthArray = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	
	return monthArray[parseInt(monthNumber) - 1];
}