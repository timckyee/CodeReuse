Code Reuse Project - Web Application Reusable Components

This project includes reusable components that can be used in web applications.

There is an api library of code which can be used to create these components.

The main important components:
- autocomplete (input box with drop down selection list)
- calendar (calendar picker)
- grid sorting (on server using paging, or client side) - two way sorting ascending or descending
- grid paging (navigate using left and right arrows, also update page number and clicking on go)
- grid search (server, enter search string, click on search then data filters)
- saving of grid edit record or form record will preserve sort order of record
on the grid if sort column is clicked.
- dynamically populating select list html object
(shown on Tenants Form - Suite Number field when updating Building selection)


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

calendar: this is a custom calendar picker. onclick on icon to show the picker or can enter date text in
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

Tenants Form (left hand side tab selection): shows the tenants in the system. Grid refreshes when pudating Building selection.
On click of the grid row will populate the form. Can update or create new records. Sorting columns onclick ascending or descending
on client. There is no paging but shows list with scrolling. There is highlight of the record after saving.