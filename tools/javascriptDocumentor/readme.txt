javascript Documentor


installation:

- place javascriptDocumenter folder on the web server
- navigate to index.html


usage:

Two methods to upload the javascript source files:

1. go to the javascriptDocumenter/files folder on the web server and copy in the javascript source files
2. create a folder and place the javascript source files in there
   then on the index.html page click on Choose Files and navigate to the folder with the files and select the files
   then click on Send Files to send the javascript source files to the server folder javascriptDocumentor/files

Once you have either chosen 1 or 2 methods of uploading then click on Create Files.

To get the javascript documents go to the folder on the web server javascriptDocumentor/docs

To view the files click on the index.html file


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
  * @param {paramType} paramName paramDescription
  * @param {paramType} paramName paramDescription
  **/
functionName: function(arguments) {


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
  * @param {paramType} paramName paramDescription
  * @param {paramType} paramName paramDescription
	* 
	* @returns {returnType} description of the return object
	**/
  functionName: function() {