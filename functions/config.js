CodeReuse.Config = function() {
    
    this.serverUrl = "http://staging.closedarea.com";    

};

CodeReuse.Config.prototype = {

    getServerUrl: function() {

        return this.serverUrl;

    }

}