<?php
if(!defined("SPECIALCONSTANT")) die(ACCESSERROR);

$app->get('/echo', function () use($app) {
		echo "echo !: Current PHP version: " . phpversion();
});

function parseQueryToPDO($app, $sqlCode, $style, $filter = '') {

    $format = $app->request()->params('format');
    $max = $app->request()->params('max');
    $flds = $app->request()->params('fields');
    $sort = $app->request()->params('sort');
    $lang = $app->request()->params('lang');

    $query = parseParams($sqlCode, $flds, $sort, $max, $filter, $lang);

		//echo "1:" . $query;
		return $query;
}

function getPDO($query) {

    $connection = getConnection();
    $dbh = $connection->prepare($query);
		$dbh->execute();

		return $dbh;
}

function getPDOPrepared($query, $arrayParams) {
		$connection = getConnection();

		$dbh = $connection->prepare($query);

		//echo '9.1 ';
		$dbh->execute($arrayParams);
		//echo '9. getPDOPrepared_query:' . $query . ' ';
		//echo '9.1 ' . $arrayParams[":token"];
		//echo '9.2 ' . $arrayParams[":tokenexpira"];
		//echo '9.3 ' . $arrayParams[":id"];

		//echo '9.2 ' . $dbh->rowCount();
		return $dbh->rowCount();
}

//$resultText .= PDO2json($dbh, '');
function findInPDO($dbh, $fldname, $fldvalue) {
	  //echo "2:" . $fldname . "/".  $fldvalue;

		$found = false;
		$table =  "";
		while ($fila = $dbh->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
				$rec = '';
				$rec .= '{';
        foreach($fila as $key => $value ) {

						if($key == $fldname){
							//echo "\n<br>debug findInPDO: " . $fila . "/" . $key . "/" . $fldname . "/" . $fldvalue . "/" .  $value;

							if($fldname == "password"){
								 if (password_verify($fldvalue, $value)) {
									 $found = true;
								 }
							} else {
								if($value == $fldvalue){
									$found = true;
								}
							}

						}
						$rec .= '"' . $key . '":"' . $value . '",';
        }
				$rec = substr($rec, 0, -1);
				$rec .= '},';

				$table .= $rec;

    }

		if($table == '') {
			$table = '[]';
		} else {
			$table = '[' . substr($table, 0, -1) . ']';
		}

		//echo "\n<br>debug PDO2json: " . $table;
		if(!$found){
			$table = '[{"acceso":"Denegado.","motivo":"Usuario y Clave No Encontrados."}]';
		} else {

			//Si estamos procesando intento de login
			if($fldname == "password"){
					$tokenstr = ',"token":"myToken",
											"tokenexpira":"myTokenExpira"';
					$table = substr_replace($table, $tokenstr, strlen($table)-2, 0);
			}

		}
		return $table;

}

function setResult($resultText, $app) {

		$connection = null;
		$app->response->body($resultText);

		//echo "3:" . $resultText;

}

function simpleReturn($app, $sqlCode, $style, $filter = '') {

    $format = $app->request()->params('format');
    $max = $app->request()->params('max');
    $flds = $app->request()->params('fields');
    $sort = $app->request()->params('sort');
    $lang = $app->request()->params('lang');

    $query = parseParams($sqlCode, $flds, $sort, $max, $filter, $lang);

    //echo $query . '\n';
    $connection = getConnection();
    $dbh = $connection->prepare($query);
		$dbh->execute();

		if($format == 'xml' || $format == 'xsl') {
        $xslt = ($format == 'xsl' ? $style : '');
        $resultText = '';

        normalheader($app, 'xml', $xslt);
        $resultText .= PDO2xml($dbh, $xslt);
        $connection = null;

        $app->response->body($resultText);

		} else {

        /*$readings = $dbh->fetchAll();
        $connection = null;

        $app->response->body(json_encode($readings)); */
        normalheader($app, 'json', '');
        $resultText .= PDO2json($dbh, '');
        $connection = null;

        $app->response->body($resultText);
    }

}
function normalHeader($app, $format, $style) {
    //$typeHeader = false;
    $typeHeader = true;
    if($typeHeader) {
      if($format == '' || $format == 'json') {
        $app->response->headers->set("Content-type", "application/json; charset=utf-8");
      } else if($format == 'xml'){
        $app->response->headers->set("Content-type", "text/xml; charset=utf-8");
      }
    } else {
        $app->response->headers->set("Content-type", "application/json; charset=utf-8");
    }
		$app->response->headers->set("Access-Control-Allow-Origin","*");
		$app->response->headers->set("Access-control-allow-credentials","true");
		$app->response->headers->set("Expires", "Mon, 26 Jul 1997 05:00:00 GMT");
		$app->response->headers->set("Cache-Control", "no-cache, no-store, must-revalidate");
		$app->response->headers->set("Pragma", "no-cache");
		$app->response->status(200);
		return;
}

function PDO2json($dbh) {
		$table =  "";
		while ($fila = $dbh->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
        $rec = '';
        $rec .= '{';
        foreach($fila as $key => $value ) {
            $rec .= '"' . $key . '":"' . $value . '",';
        }
        $rec = substr($rec, 0, -1);
        $rec .= '},';

        $table .= $rec;

    }
		if($table == '') {
			$table = '[]';
		} else {
			$table = '[' . substr($table, 0, -1) . ']';
		}

    //echo "\n<br>debug PDO2json: " . $table;
    return $table;
}

function PDO2xml($dbh, $style) {

    $table = '<?xml version="1.0" encoding="UTF-8" ?>';
    if(!$style == ''){
      $table .='<?xml-stylesheet type="text/xsl" href="' . $style . '" ?>';
    }
		$table .=  "<matrix>";
		while ($fila = $dbh->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
        $rec = '';
        $rec .= '<row>';
        foreach($fila as $key => $value ) {
            $rec .= '<col><name>' . $key . '</name><value>' . $value . '</value></col>';
        }
        $rec .= '</row>';
        $table .= $rec;
    }
    $table .= '</matrix>';

    return $table;
}

function json2xml($json, $style) {
return "alguisimo";
    $table = '<?xml version="1.0" encoding="UTF-8" ?>';
    if(!$style == ''){
      $table .='<?xml-stylesheet type="text/xsl" href="' . $style . '" ?>';
    }
		$table .=  "<matrix>";
/*		foreach($json as $fila ) {
        $rec = '';
        $rec .= '<row>';
        foreach($fila as $key => $value ) {
            $rec .= '<col><name>' . $key . '</name><value>' . $value . '</value></col>';
        }
        $rec .= '</row>';
        $table .= $rec;
    } */
    $table .= '</matrix>';

    return $table;
}

function parseParams($name, $flds, $sort, $max, $filter, $lang) {

   $query = getSQL($name, $lang);
   if(!$flds == ''){
      $query = str_replace(" * ", " " . $flds . " ", $query );
   }

   if(!$filter == ''){
   		if(contains("WHERE", $query) ){
				$query .= $filter . " ";
   		} else {
				$query .= " WHERE " . $filter . " ";
			}
   }

   if(!$sort == '') {
     $pos = strrpos($sort, "-");
      if ($pos === false) { // nota: tres signos de igual
          // no encontrado...
          $sort = " ORDER BY " . $sort . " ASC ";
      } else {
          $sort = str_replace("-", "", $sort );
          $sort = " ORDER BY " . $sort . " DESC ";
      }
      $query.= $sort;
   }
   $query.= ($max == '' ? '' : ' limit ' . $max);

//	 echo "query: " . $query ;

   return $query;
}

// returns true if $needle is a substring of $haystack
function contains($needle, $haystack)
{
    return strpos($haystack, $needle) !== false;
}
