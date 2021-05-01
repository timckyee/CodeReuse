/*
 * The CodeReuse object
 */
var CodeReuse = CodeReuse || {};

/**
 * Class for storing session login functions
 * @class
 **/
 CodeReuse.SessionLogin = function() {

    this.phpFileGridGetPost = "php/grid_get_post.php";

};

CodeReuse.SessionLogin.prototype = {

getPhpFile: function() {

    return this.phpFileGridGetPost;	
    
},

/**
 * To create session id when logging in
 * @function
 * @name SessionLogin#update_session
 * 
 * @param {string} userId the userId of the user
 **/
 update_session: function(userId) {

    window.getXmlHttpRequest = new XMLHttpRequest();

    window.getXmlHttpRequest.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
    
            var response = this.responseText;

            //alert(response);

            /*
            if(response != "Logging in.")
            {
                alert(response);
            }
            */

            window.location.href = "tabs.html?sessionId=" + response;
        }
    }
    
    var queryName = "update_session";
    
    var queryString = "queryName=" + queryName + "&userId=" + userId;

    window.getXmlHttpRequest.open("GET", this.getPhpFile() + "?" + queryString, true);
    window.getXmlHttpRequest.send();
            
},

}