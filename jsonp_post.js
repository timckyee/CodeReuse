
window.addEventListener("load", function() {

	window.octopartsXmlHttpRequest = new XMLHttpRequest();

	var queries = [
	    {'mpn': 'GMC31X5R107M6R3NT'},
	    {'mpn': 'CC1206MKX5R5BB107'},
	    {'mpn': 'GRM31CR60J157ME11L'}
	];
	
	var args = {
	    queries: JSON.stringify(queries)
	};
	
	var url = 'http://octopart.com/api/v3/parts/match?';
	url += '&queries=' + args["queries"];
	//url += '&queries=[{"mpn":"GMC31X5R107M6R3NT"},{"mpn":"CC1206MKX5R5BB107"},{"mpn":"GRM31CR60J157ME11L"}]';
	url += '&apikey=5a43787e';
	url += '&callback=callbackjsonp';
	
	JsonpHttpRequest(url, "callbackjsonp");
}

function JsonpHttpRequest(url, callback) {
	
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
    window[callback] = function(data) {
	    
	    for(i=0; i<data["results"].length; i++)
	    {
	    	var results = data["results"][i];
	    
			console.log(data["results"]);
	    	
	    	//resultsPostXmlHttpRequest(results);
	    	
	    	//return;
	    }
    }
}

function resultsPostXmlHttpRequest(results) {
	
	window.octopartsXmlHttpRequest.onreadystatechange = function() {
	
		if (this.readyState == 4 && this.status == 200) {
			
			var response = this.responseText;

		}
	}
	
    var json = [
		results
    ];
	
	var data = { jsonString: JSON.stringify(json) };
	
	window.octopartsXmlHttpRequest.open("POST", "http://localhost:8888/CodeIgniter-3.1.10/octoparts/viewResults", true);
	window.octopartsXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	window.octopartsXmlHttpRequest.send("jsonString=" + encodeURIComponent(data["jsonString"]));
}