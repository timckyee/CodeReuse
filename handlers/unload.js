
window.history.pushState({page: 1}, "", "");

window.addEventListener("popstate", function () {

    var onunload = new CodeReuse.Onunload();
    
    onunload.unlock_remove_session();

});

/*
window.addEventListener("unload", function () {

    var onunload = new CodeReuse.Onunload();
    
    onunload.unlock_remove_session();

});
*/

window.addEventListener("beforeunload", function () {

    //var onunload = new CodeReuse.Onunload();
    
    //onunload.unlock_remove_session();

});

/*
document.getElementById("tabsBody").onbeforeunload = function ()
{
    var onunload = new CodeReuse.Onunload();
    
    onunload.unlock_remove_session(); 
}
*/

/*
var needToConfirm = true;

window.onbeforeunload = confirmExit;
function confirmExit()
{
    if (needToConfirm)
    {
        return "confirm";
    }
}

function saveClicked()
{
    needToConfirm = false;
}
*/

/**
 * Class for onload functions
 * @class
 **/
 CodeReuse.Onunload = function() {
	
};

CodeReuse.Onunload.prototype = {

/**
 * Unlock the current users lock records and remove the user session
 * @function
 * @name Onunload#unlock_remove_session
 **/
 unlock_remove_session: function() {
    
    var recordLockInformation = sessionStorage.getItem("recordLockInformation");
    
    var tableName;
    var primaryKey;

    if(recordLockInformation != "" && recordLockInformation != null)
    {
        var recordLockInformationSplit = recordLockInformation.split("&");

        tableName = recordLockInformationSplit[0].split("=")[1];
        primaryKey = recordLockInformationSplit[1].split("=")[1];	
    }

    var lock = new CodeReuse.Lock();

    if(recordLockInformation != "")
    {
        lock.unlockRecordsOnExit(tableName, primaryKey, sessionStorage.getItem("userId"));
    }
    else
    {   
        var session = new CodeReuse.Session();  
        session.remove_session(sessionStorage.getItem("userId"));       
    }
}

}
