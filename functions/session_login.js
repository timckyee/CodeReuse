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

            /*
            var platform;

            var isIOS_safari = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

            var isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
        
            var isAndroid = /Android/i.test(navigator.userAgent);
        
            if(isIOS_safari == false && isIOS == false && isAndroid == false)
            {
                if(navigator.userAgent.indexOf('Chrome') != -1)
                {
                    platform = "desktop_chrome";
                }
                else
                {
                    platform = "desktop_safari";
                }
            }
            else
            if(isIOS_safari == true)
            {
                platform = "IOS_safari";
            }
            else
            if(isIOS == true)
            {
                platform = "IOS";
            }
            else
            if(isAndroid == true)
            {
                platform  = "android";
            }
            */

            /*

            if(platform == "desktop_chrome")
            {
                //var mainPage = window.open("tabs.html?sessionId=" + response, '', "width = 1280, height = 1024");

                window.open("tabs.html?sessionId=" + response, "", "width=" + screen.availWidth + ",height=" + screen.availHeight);

                //mainPage.moveTo(0,0);
                //mainPage.resizeTo(screen.width, screen.height);                
            }
            else
            {
                window.location.href = "tabs.html?sessionId=" + response;
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