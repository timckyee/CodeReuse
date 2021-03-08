<?php
		
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');

    $user = 'root';
    $password = 'root';
    $db = 'codereuse';
    $host = 'localhost';
    $port = 8889;

    $mysqli = new mysqli($host, $user, $password, $db, $port);

    if($mysqli->connect_error) {
        echo "connection error";
    }

    $paramTypes[0] = "{string}";
    $paramTypes[1] = "{Array}";
    $paramTypes[2] = "{function}";
    $paramTypes[3] = "{Object}";

    //print_r($_FILES);
    //var_dump($_FILES);

    //echo '<pre>';
    //var_dump($_FILES);
    //echo '</pre>';

    //return;

    $files = scandir('./files');

    //echo '<pre>';
    //var_dump($files);
    //echo '</pre>';

    //return;

    for($file = 0; $file < count($files); $file++)
    { 

        if($files[$file] == "." || $files[$file] == ".." || $files[$file] == ".DS_Store")
            continue;

        $newContent = "";
        $array = [];
        $array2 = [];

        //echo $files[$file] . "<br>";

    //echo htmlspecialchars(file_get_contents('./files/onclickhandler.js'));

    //if($files[$file] == "onload.js")
        //continue;

    $lines = file('./files/' . trim($files[$file]));

    //$lines = file('./files/Tenant.js');

    /*
    for ($i = 0; $i < count($lines); $i++) {
    
        if($i == 4)
        {
            echo 'break';
            break;
        }

        echo $i;

    }

    return;
    */
    

    //echo '<pre>';
    //var_dump($lines);
    //echo '</pre>';
    //return;

    //echo $files[$file];

    $start;
    $end;

    $tag;

    $functionName;

    $array;
    $array2;

    /*
    for ($i = 0; $i < count($lines); $i++) {
        
        $line = htmlspecialchars($lines[$i]);

        echo "Line " . $i . ": " . $line . "<br>";
    }

    return;
    */

    for ($i = 0; $i < count($lines); $i++) {
        
        $line = htmlspecialchars($lines[$i]);

        if(trim($line) == "/**")
        {
            $start = $i;

            if(trim(htmlspecialchars($lines[$i+2])) == "* @class")
            {
                $tag = "class";
            }            
        }
        else if(trim($line) == "**/")
        {           
            $end = $i + 1;
            
            $functionNameTemp = explode(".", trim(htmlspecialchars($lines[$i + 1])));

            $functionNameTemp = explode("=", $functionNameTemp[1]);

            $functionName = trim($functionNameTemp[0]);

            $array[$tag][$functionName] = $start . "," . $end;

            break;
        }
    }

    for ($i24 = $end + 1; $i24 < count($lines); $i24++) {

        $line = htmlspecialchars($lines[$i24]);
        
        if(trim($line) == "/**")
        {
            $start = $i24;

            if(strpos(trim(htmlspecialchars($lines[$i24+2])), "@var") != "")
            {
                $tag = "variables";
            }
            else
            if(strpos(trim(htmlspecialchars($lines[$i24+2])), "@function") != "")
            {
                $tag = "functions";
            }
        }
        else if(trim($line) == "**/")
        {           
            $endVariables = $i24 + 1;
            
            $variableNameTemp = explode(":", trim(htmlspecialchars($lines[$i24 + 1])));
            
            $variableName = $variableNameTemp[0];

            $array2[$tag][$variableName] = $start . "," . $endVariables;
        }
    }

    ksort($array2["variables"], SORT_STRING | SORT_FLAG_CASE);

    //echo '<pre>';
    //var_dump($array2["variables"]);
    //echo '</pre>';

    ksort($array2["functions"], SORT_STRING | SORT_FLAG_CASE);

    //echo '<pre>';
    //var_dump($array2["functions"]);
    //echo '</pre>';

    //return;

    $keys = array_keys($array["class"]);

    $newContent = $newContent . "<h2>Class</h2>"; 

    $arrayIndexes = explode(",", $array["class"][$keys[0]]);
    $begin = $arrayIndexes[0];
    $end = $arrayIndexes[1];

    $functionNameTemp = explode("=", trim(htmlspecialchars($lines[$end])));

    $functionName = trim($functionNameTemp[0]);

    $classFunctionName = trim($functionNameTemp[0]);

    $newContent = $newContent . "<br>" . "<u><b>Name:</b></u>&nbsp;&nbsp;" . $functionName . "<br><br>";

    $newContent = $newContent . "<u><b>Description:</b></u>&nbsp;&nbsp;" . substr(trim($lines[$begin + 1]), 2) . "<br>";

    $newContent = $newContent . "<br><br>";

    //echo '<pre>';
    //var_dump($keys);
    //echo '</pre>';

    //return;


    $keys24 = array_keys($array2["variables"]);

    for($i4 = 0; $i4 < count($keys24); $i4++)
    {
        if($i4 == 0)
        {
            $newContent = $newContent . "<h2>Variables</h2>";
        }

        $arrayIndexes2 = explode(",", $array2["variables"][$keys24[$i4]]);
        $begin = $arrayIndexes2[0];
        $end = $arrayIndexes2[1];

        $functionNameTemp = explode(".", trim(htmlspecialchars($lines[$end])));
                    
        $functionNameTemp = explode(":", $functionNameTemp[0]);

        $functionName = trim($functionNameTemp[0]);

        $newContent = $newContent . "<br>" . "<u><b>Name:</b></u>&nbsp;&nbsp;" . $functionName . "<br><br>";

        $newContent = $newContent . "<u><b>Description:</b></u>&nbsp;&nbsp;" . substr(trim($lines[$begin + 1]), 2) . "<br>";

        $newContent = $newContent . "<br>";

        $beginParam = $begin + 5;

        $beginParamFilter = trim($lines[$beginParam]);
        $beginParamFilter2 = explode("{", $beginParamFilter);


        $endParam = $end - 2;

        $totalParams = $endParam - $beginParam + 1;

        $newContent = $newContent . "<br>";

    }


    $keys2 = array_keys($array2["functions"]);

    //echo '<pre>';
    //var_dump($keys2);
    //echo '</pre>';

    for($i4 = 0; $i4 < count($keys2); $i4++)
    {
        if($i4 == 0)
        {
            $newContent = $newContent . "<h2>Functions</h2>";
        }

      $arrayIndexes2 = explode(",", $array2["functions"][$keys2[$i4]]);
      $begin = $arrayIndexes2[0];
      $end = $arrayIndexes2[1];

      $functionNameTemp = explode(".", trim(htmlspecialchars($lines[$end])));
      
      $functionNameTemp = explode(":", $functionNameTemp[0]);

      $functionName = trim($functionNameTemp[0]);

      $newContent = $newContent . "<br>" . "<u><b>Name:</b></u>&nbsp;&nbsp;" . $functionName . "<br><br>";

      $newContent = $newContent . "<u><b>Description:</b></u>&nbsp;&nbsp;" . substr(trim($lines[$begin + 1]), 2) . "<br>";

      $newContent = $newContent . "<br>";


      $beginParam = $begin + 5;

      $beginParamFilter = trim($lines[$beginParam]);
      $beginParamFilter2 = explode("{", $beginParamFilter);

      
      $endParam = $end - 2;

      $totalParams = $endParam - $beginParam + 1;


      $newContent = $newContent . "<br>";

      for($params = $beginParam, $paramIndex = 0; $paramIndex < $totalParams + 1; $params++, $paramIndex++)
      {
        if($params == $beginParam)
        {
            $newContent = $newContent . "<table style=\"border-collapse: collapse;\">";

            if(strpos($lines[$beginParam + $paramIndex], "@param") != "")
            {
                $newContent = $newContent . "<tr style=\"background-color: lightgrey; padding: 25px;\">";
                $newContent = $newContent . "<td style=\"border: 1px solid black;padding: 14px;\"><b>Param Type</b></td>";
                $newContent = $newContent . "<td style=\"border: 1px solid black;padding: 14px;\"><b>Param Name</b></td>";
                $newContent = $newContent . "<td style=\"border: 1px solid black;padding: 14px;\"><b>Param Description</b></td>";
            }

            $newContent = $newContent . "</tr>";
        }
        else
        if($params == $endParam + 1)
        {
            $newContent = $newContent . "</table>";
            $newContent = $newContent . "<br><br>";
        }        

        if(strpos($lines[$beginParam + $paramIndex], "@returns") != "")
        {
            $parseParam = substr(trim($lines[$beginParam + $paramIndex]), 12);
            $newContent = $newContent . "<tr style=\"background-color: lightgrey; padding: 25px;\">";
            $newContent = $newContent . "<td style=\"border: 1px solid black;padding: 14px;\"><b>Return Type</b></td>";
            $newContent = $newContent . "<td style=\"border: 1px solid black;padding: 14px;\"><b>Return Variable Name</b></td>";
            $newContent = $newContent . "<td style=\"border: 1px solid black;padding: 14px;\"><b>Return Description</b></td>";
            $newContent = $newContent . "</tr>";
        }   
        else
        {
            $parseParam = substr(trim($lines[$beginParam + $paramIndex]), 10);
        }

        $parseParamType = trim(explode("}", $parseParam)[0]);
        $parseParamNameAndDescription = trim(explode("}", $parseParam)[1]);

        $parseParamName = trim(explode(" ", $parseParamNameAndDescription)[0]);

        $parseNameCount = strlen($parseParamName);

        $parseParamDescription = trim(substr($parseParamNameAndDescription, $parseNameCount));

        $newContent = $newContent . "<tr>";
        $newContent = $newContent . "<td style=\"border: 1px solid black;padding: 14px;\">";
        $newContent = $newContent . $parseParamType;
        $newContent = $newContent . "</td>";

        $newContent = $newContent . "<td style=\"border: 1px solid black;padding: 14px;\">";
        $newContent = $newContent . $parseParamName;
        $newContent = $newContent . "</td>";

        $newContent = $newContent . "<td style=\"border: 1px solid black;padding: 14px;\">";
        $newContent = $newContent .  $parseParamDescription;
        $newContent = $newContent . "</td>";
        $newContent = $newContent . "</tr>";
        
       }
    }

    //echo $newContent;

    //return;

    //if (!file_exists('./docs/newname.html')) {

        file_put_contents('./docs/' . $classFunctionName . '.html', $newContent );

    }

    $mainPage = "<br><br><h2>&nbsp;Classes</h2><br><br>";

    $files = scandir('./docs');

    for($filesIndex = 3; $filesIndex < count($files); $filesIndex++)
    {
        if($files[$filesIndex] != "index.html")
            $mainPage = $mainPage . "&nbsp;&nbsp;<a href=\"" . $files[$filesIndex] . "\">" . $files[$filesIndex] . "</a><br>";
    }

    file_put_contents('./docs/index.html', $mainPage);

?>