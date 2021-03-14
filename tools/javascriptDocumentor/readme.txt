javascript Documentor


installation:

- place javascriptDocumenter folder on the web server
- navigate to index.html


usage:

First click on Reset Files Folder to clear old source files from the ./files directory


Then use either one of two methods to upload the javascript source files:

Create a folder and place the javascript source files in there

1. go to index.html page under tools/javascriptDocumenter click on Choose Files and navigate to the folder with the source files and select the files
   then click on Send Files to send the javascript source files to the server folder tools/javascriptDocumentor/files

2. or go to the tools/javascriptDocumenter/files folder on the web server and copy the source files to there
   note: in this case there is no need to click on Send Files

After choosing one of the options above and there are source files in the tools/javascriptDocumenter/files directory
then click on Create Files to generate the documents

To get the javascript documents go to the folder on the web server tools/javascriptDocumentor/docs

To view the documents click on tools/javascriptDocumentor/docs/index.html


the format of the comments:

start the documenting block with: /**
end the documenting block with: **/


At the top of the class javascript file place this commenting block
/**
 * description of the class
 * @class
 **/
functionName = function() {


After the class declaration there is a prototype declaration of the class
className.prototype = {


After the class prototype declaration comment the variables of the class
/**
  * description of variable
  * @var {Array} variableName
  **/
variableName: [],


After the variables of the class comment the functions of the class
/**
  * function description
  * @function
  * @name className#functionName
  * 
  * @param {paramType} paramNameFirst paramDescription
  * @param {paramType} paramNameSecond paramDescription
  **/
functionName: function(paramNameFirst, paramNameSecond) {


If there is a function that has a return value use this comment block
/**
  * function description
  * @function
  * @name className#functionName
  * 
  * @returns {returnType} description of the return object
  **/
functionName: function() {


If there is a function that has a return value with parameters use this comment block
/**
	* function description
	* @function
	* @name className#functionName
	* 
  * @param {paramType} paramNameFirst paramDescription
  * @param {paramType} paramNameSecond paramDescription
	* 
	* @returns {returnType} description of the return object
	**/
  functionName: function(paramNameFirst, paramNameSecond) {