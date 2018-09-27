<?php
if(!defined("SPECIALCONSTANT")) die("Acceso denegado");

$app->get("/readings/day", function() use($app)
{
 	try{
      $format = $app->request()->params('format');
      //echo $format;
      $style = '';
      $forXSL = '../../../xsl/count.xsl';
      $fecha = new DateTime();      
      $resultString = getDaySpec($fecha->format('Y-m-d'), 'json');
      
      if ($format == 'xml' || $format == 'xsl') {
          if ($format == 'xsl') {
              $style = $forXSL;
              normalheader($app, $format, $style);
          } else {
              normalheader($app, 'xml', $style);
          }
          
          $json = json_decode($resultString);
          $table = '<?xml version="1.0" encoding="UTF-8" ?>';
          if(!$style == ''){
            $table .='<?xml-stylesheet type="text/xsl" href="' . $style . '" ?>';
          }
          $table .=  "<matrix>";
          foreach($json as $fila ) {
              $rec = '';
              $rec .= '<row>';
              foreach($fila as $key => $value ) {
                  $rec .= '<col><name>' . $key . '</name><value>' . $value . '</value></col>';
              }
              $rec .= '</row>';    
              $table .= $rec;
          } 
          $table .= '</matrix>';
          $app->response->body($table);

      } else {
          normalheader($app, 'json', '');
          $json = json_decode($resultString);
          $app->response->body(json_encode($json));
      }
  }
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

$app->get("/readings/codes", function() use($app)
{
 	try{
      $format = $app->request()->params('format');
      $date = $app->request()->params('date');
      //echo $format;
      $style = '';
      $forXSL = '../../../xsl/count.xsl';
      $fecha = new DateTime();      
      if(!$date == ''){
        $fechaArr = explode('-', $date);
        $fecha->setDate($fechaArr[0], $fechaArr[1], $fechaArr[2] );
      }
      $resultString = getDaySpec($fecha->format('Y-m-d'), 'plain');    
      //echo '<br>debug_1:' . $resultString . '<br>';
      $resultString = getReadings($app, 'readings_day', $resultString, 'json');
      //echo '<br>debug_2:' . $resultString . '<br>';
      
      $json = json_decode($resultString);
      $app->response->body(json_encode($json));
      /*if ($format == 'xml' || $format == 'xsl') {
          if ($format == 'xsl') {
              $style = $forXSL;
              normalheader($app, $format, $style);
          } else {
              normalheader($app, 'xml', $style);
          }
          
          $table = '<?xml version="1.0" encoding="UTF-8" ?>';
          if(!$style == ''){
            $table .='<?xml-stylesheet type="text/xsl" href="' . $style . '" ?>';
          }
          $table .=  "<matrix>";
          foreach($json as $fila ) {
              $rec = '';
              $rec .= '<row>';
              foreach($fila as $key => $value ) {
                  $rec .= '<col><name>' . $key . '</name><value>' . $value . '</value></col>';
              }
              $rec .= '</row>';    
              $table .= $rec;
          } 
          $table .= '</matrix>';
          $app->response->body($table);

      } else {
          normalheader($app, 'json', '');
          $json = json_decode($resultString);
          $app->response->body(json_encode($json));
      } */
  }
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

$app->get("/readings", function() use($app)
{
 	try{
      $format = $app->request()->params('format');
      $date = $app->request()->params('date');
      //echo $format;
      $style = '';
      $forXSL = '../../../xsl/count.xsl';
      $fecha = new DateTime();      
      if(!$date == ''){
        $fechaArr = explode('-', $date);
        $fecha->setDate($fechaArr[0], $fechaArr[1], $fechaArr[2] );
      }
      $resultString = getDaySpec($fecha->format('Y-m-d'), 'plain');    
      //echo 'debug_1:' . $resultString . '<br>';
      $resultString = getReadings($app, 'readings_day', $resultString, 'json');
      //echo 'debug_2:' . $resultString . '<br>';
      $resultString = getReadingsContent($app, 'readings_content', $resultString, 'json');
      //echo 'debug_3:' . $resultString . '<br>';
      
      //$json = json_decode($resultString);
      //$app->response->body(json_encode($json));
      //normalheader($app, 'json', '');
      //$app->response->body($resultString);

      /*if ($format == 'xml' || $format == 'xsl') {
          if ($format == 'xsl') {
              $style = $forXSL;
              normalheader($app, $format, $style);
          } else {
              normalheader($app, 'xml', $style);
          }
          
          $table = '<?xml version="1.0" encoding="UTF-8" ?>';
          if(!$style == ''){
            $table .='<?xml-stylesheet type="text/xsl" href="' . $style . '" ?>';
          }
          $table .=  "<matrix>";
          foreach($json as $fila ) {
              $rec = '';
              $rec .= '<row>';
              foreach($fila as $key => $value ) {
                  $rec .= '<col><name>' . $key . '</name><value>' . $value . '</value></col>';
              }
              $rec .= '</row>';    
              $table .= $rec;
          } 
          $table .= '</matrix>';
          $app->response->body($table);

      } else {
          normalheader($app, 'json', '');
          $json = json_decode($resultString);
          $app->response->body(json_encode($json));
      } */
  }
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

$app->get('/readings/count', function () use($app) {

	try{
      $sqlCode = 'readings_count';
      $forXSL = '../../../xsl/count.xsl';
      simpleReturn($app, $sqlCode, $forXSL);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});


$app->get("/readings/:codigo", function($codigo) use($app)
{
	try{
		$connection = getConnection();
		$dbh = $connection->prepare(getSQL("readings_all", '') . " WHERE codigo = ?");
		$dbh->bindParam(1, $codigo);
		$dbh->execute();
		//$readings = $dbh->fetchAll();
		//$connection = null;

    $resultText = '';
    normalheader($app, $format, $style);
    if($format == '' || $format = 'json') {
        $resultText = PDO2json($dbh);
    } elseif ($format == 'xml') {
        $resultText = PDO2xml($dbh, $style);
    }   
    //print $table;
    
		$connection = null;

    $app->response->body($resultText);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

