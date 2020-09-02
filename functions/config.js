CodeReuse.Config = function() {
    
    this.serverUrl = "http://staging.closedarea.com";
    //this.serverUrl = "http://localhost:8888/codereuse";

};

CodeReuse.Config.prototype = {

    getServerUrl: function() {

        return this.serverUrl;

    }

}