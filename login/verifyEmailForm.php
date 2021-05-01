<?php

session_start();

$token = urldecode(substr($_SERVER['QUERY_STRING'],6));

$_SESSION["token"] = $token;

echo "<html>";
echo "<head>";
echo "<script src=\"verifyEmailForm.js\"></script>";
echo "</head>";
echo "<body>";
echo "<br>";
echo "<br>";
echo "<center>";
echo "<form>";
echo "<table>";
echo "<tr>";
echo "<td>";
echo "Old Password:";
echo "</td>";
echo "<td>";
echo "<input type=\"text\" id=\"oldPassword\" value=\"testpassword\"/>";
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td>";
echo "New Password:";
echo "</td>";
echo "<td>";
echo "<input type=\"text\" id=\"newPassword\" value=\"newpassword\" />";
echo "</td>";
echo "</tr>";
echo "<tr>";
echo "<td>";
echo "Confirm New Password:";
echo "</td>";
echo "<td>";
echo "<input type=\"text \" id=\"newPasswordConfirm\" value=\"newpassword\"/>";
echo "</td>";
echo "</tr>";
echo "</table>";
echo "</form>";
echo "<br>";
echo "<br>";
echo "<button onclick=\"updatePassword()\">update</button>";
echo "</center>";
echo "</body>";
echo "</html>";

?>
