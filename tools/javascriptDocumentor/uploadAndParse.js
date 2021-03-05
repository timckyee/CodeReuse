
function sendFile() {

    var myFile = document.getElementById("myFile");
    
    var files = myFile.files;

    var formData = new FormData();

    
    for(var i=0; i<files.length; i++)
    {
       formData.append("myFile[]", files[i], files[i].name);
    }

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "upload.php", true);

    xhr.onload = function () {

    if (xhr.status === 200) {

        alert("File successfully uploaded")

    } else {

        alert("File upload failed");

    }

    };

    xhr.send(formData);

};

function createJavascriptDocuments() {
    
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "parse.php", true);

    xhr.onload = function () {

        if (xhr.status === 200) {

            //document.body.innerHTML = xhr.responseText;

            alert("Javascript documents created");

        } else {

            alert("Javascript documents creation failed");

        }

    };
    
    xhr.send();

}