
function updatePassword(token) {

    var xhr = new XMLHttpRequest();

    var newPassword = document.getElementById("newPassword").value;
    var newPasswordConfirm = document.getElementById("newPasswordConfirm").value;
    
    if(newPassword != newPasswordConfirm)
    {
        alert('Could not confirm new password. New password and New password confirmation have to be the same')
        return;
    }

    var passwordInfo = "newPassword=" + newPassword + "&token=" + token;

    var argVariables = "passwordInfo=" + encodeURIComponent(passwordInfo);

    xhr.open("POST", "updatePassword.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {

        if (xhr.status === 200) {

            response = xhr.responseText;

            //alert(response);
            //return;

            /*
            verifyOldPassword = "User old password is not correct";

            if(response == verifyOldPassword)
            {
                alert(verifyOldPassword)
                return;
            }
            else
            {
                alert(response);
            }
            */
        }

    };

    xhr.send(argVariables);

}