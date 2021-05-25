Code Reuse Project - Web Application Reusable Components

This project includes reusable components that can be used in web applications.

There is an api library of code which can be used to create these components.

To view the api library navigate to CodeReuse/tools/javascriptDocumentor/docs folder 
and click on index.html.

To re-generate, view the readme.txt in CodeReuse/tools/javascriptDocumentor


The main important components:
- autocomplete (input box with drop down selection list) - onkey press filters results
- calendar (date picker) - format is dd-mmm-yyyy
- grid sorting (on server using paging, or client side) - two way sorting ascending or descending
- grid paging (navigate using left and right arrows, also update page number and clicking on go)
- grid search (server, enter search string, click on search then data filters)
- saving of grid edit record or form record will preserve sort order of record
on the grid if sort column is clicked.
- clicking on grid populates form, can click save to update record or new.
- the forms also have Clear Lock button (see Lock component below) which has to be clicked
  before navigating to a new tab if a form record is selected to unlock the record
- grids with paging (home grid edit and home form grid paging) show the total number of pages
- dynamically populating select list html object
(shown on Tenants Form - Suite Number select field refreshes when updating Building selection)

Login component: (note this component requires the website to use SSL)
- main login page: login.html (Username, Password to Login)
- every time the user logs in a session id is created. this is to prevent multiple logins and also prevent
  users trying to access page with an invalid session id to access the page.
- note: each tab or browser which is open will have a separate set of sessionStorage variables.
- when login is verified then Session Id is passed to the main ui page: tabs.html?sessionId=<sessionId>
- once reaches this page the Session Id is verified (Session Id has to exist in database) or redirect to login html page
- on clicking logout, clicking on browser back button, or refresh button,
  the Session Id in database is deleted, along with user table locks and redirection is made to the login.html page
- important note:
  if click on the browser or browser tab exit button the session Id and user table locks will remain in the system
  if login again there is a notification that the session Id still exists and if the user wants to recover session
  to avoid this message always click on the Logout button
  clicking on the Logout button will remove session and user lock records
- after verification the userId is set in the sessionStorage and used mainly for creating and releasing locks

- create new user page: go to login.html and click on Create New User link (file: createUser.html)
  creates user with firstname, lastname, username, email, and password (where password is encrypted
  using openssl_encrypt)

- forgot password page: go to login.html and click on Forgot Password link (file: resetPasswordEmail.html)
- when navigate to the forgot password page, need to enter user email
- if email exists then send user and email with instructions to reset password (file: verifyEmail.php)
- if email does not exist then notify user
- the email has a php hyper link to the server with a token which is the encrypted email using openssl_encrypt
- the php hyperlink shown in the email links to verifyEmailForm.php which displays the update user password form
- the update password form has two inputs: new password, and confirm new password
- the update password form includes javascript verifyEmailForm.js which has the updatePassword function to check 
  if new password is the same as confirm password
- if new password is same as confirm password then go to the updatePassword.php
- from updatePassword.php, update the new password in database with the user email.

- administration page to reset the password for user
- go to login/resetPasswordAdmin/resetPassword.html
- to update the password for a user enter the user email address
- then enter the user new password and click on Reset Password

Lock component:
- there is a Lock class which has functions to lock and unlock records so users cannot overwite each others information
- there are 2 types of lock: one for edit grid and other for the form grids
- edit grid - grid_checkdelete_checklock_lock which checks whether record exists, then check if there is a lock
  on the record, then if no lock then locks the record, then show grid edit row
- form grid - (tenant form grid paging, suite grid, tenant grid) - form_unlock to unlock the previous form selection
  then form_checkdelete_checklock_lock - which check whether record exists, then check if there is a lock
  on the record, then if there is no lock then locks the record, then populates the form with the onclick row information
- there are 2 other functions to unlock - grid_unlock_cancel and grid_unlock_update
  these two functions unlock the grid edit when clicking on cancel and also after and record update
- there is 1 other functions lock - form_lock_insertRecord
  this function locks the new form record created
- on page unload (including refreshing the webpage) the unlockRecordsOnExit function is called which unlocks
  the lock table records which the User Id has locked. same as clicking on Logout.


Session component:
- there is a SessionLogin (session_login.js) and Session (session.js) class which has functions to create, update, verify and remove the session
- SessionLogin class creates or update session record in database
  if UserId is not found in session table then create Session Id record using bin2hex(random_bytes(16)) and returns to client
  if UserId is found in the session table then use return same Session Id that was created before
  if either option after Session Id is sent back to client then go to the main page (tabs.html)
  passing in the sessionId to the url.
- onload of the tabs.html file, we get the Session Id from the query string 
  then call the verify_session passing in the Session Id
  if the Session Id does not exist in the table then redirect to the login.html page
  if Session Id exists then continue to initialize and load the page


Password Encryption component (php files):
- description: two methods for encrypting passwords or sensitive data.
- php/password_encrypt_hash_verify.php - one-way encryption method used for passwords using hash (recommended)
- php/password_encrypt_openssl.php - two-way encryption used for passwords or sensitive data using openssl
- view the comments in the appropriate files for instructions on how to test encryption or decryption


Programming Languages:

This project uses javascript, html, css files (for client) and php files (for server).


Features details:

controller: layer between html and codereuse api
includes main functions for saving to database
- suite form (Suite Form Object)
- tenant form (Tenant Form Object)
- home grid edit (Home Tenant Grid Object)
- home form grid paging (Tenant Form Grid Paging Form Object)

gridEventFunctions: the event functions when in home grid edit mode.

sort: can sort grid that goes to the server or sort grid on the client.

tabs: change the pages depending on the tab chosen

autocomplete: this is an input box which when entering text will show drop down list of records.
in this project the autocomplete box is the tenant name (found on Home Grid Edit or Home Form Grid Paging tab). 
user either enters in a suite number or tenant first or last name in the input box then filters accordingly.

calendar: this is a custom date picker. onclick on icon to show the picker or can enter date text in
dd-mmm-yyyy format

grids: 4 grids
- Home Grid Edit columns - Primary Key, Building, Tenant Name, Date First, Date Second
- Home Form Grid Paging colums - Primary Key, Building, Tenant Name, Date First, Date Second
- Suite Form Grid - colums Primary Key, Suite Number, Building, Location
- Tenants Form Grid - columns Primary Key, Building ,Tenant Name, First Name, Last Name

objects (or forms): 3 objects
- Suite - Suites Form
- Tenant - Tenants Form
- TenantFormGridPaging - Home Grid Paging Form

There are 4 tabs: Home Grid Edit, Home Form Grid Paging, Suites Form, Tenants Form:

Home Grid Edit (left hand side tab selection) is a grid with edit/save button to do inline saving of records.
Sorting columns onclick ascending or descending goes to server. Has search (filter records) capability.
The grid uses paging to server and to navigate there is footer which can move pages forward or backward or skip
when updating the Page Number and clicking on go. Note: the Page Number total is also shown.
When click on Edit (the text of Edit will update to Save) then the row selected will show html objects.
User can make updates to the record. If there are changes to the record then there will be a notification
to save or not to save. There is highlight of the record after updating. On this page there is no option to create a new record (you can do this
in the next tab: Home Form Grid Paging).

Home Form Grid Paging (left hand side tab selection) is a form with grid.
When click on grid will populate form. Sorting columns onclick ascending or descending goes to server.
Has search (filter records) capability. The grid uses paging to server and to navigate there is 
as well as footer which can move pages forward or backward or skip when updating the Page Number and clicking on go.
Note: the Page Number total is also shown. User can make updates to the record. If there are changes to the record 
then there will be a notification to save or not to save. You can update record and create new record
on this page. There is highlight of the record after saving.

Suites Form (left hand side tab selection): shows the suites in the system. Grid refreshes when updating Building selection.
On click of the grid row will populate the form. Can update or create new records. Sorting columns onclick ascending or descending
on client. There is no paging but shows list with scrolling. There is highlight of the record after saving.

Tenants Form (left hand side tab selection): shows the tenants in the system. Grid refreshes when updating Building selection.
There is select list (Suite Number) which is dynamically popuated when updating Building selection.
On click of the grid row will populate the form. Can update or create new records. Sorting columns onclick ascending or descending
on client. There is no paging but shows list with scrolling. There is highlight of the record after saving.