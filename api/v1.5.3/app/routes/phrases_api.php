<?php
if(!defined("SPECIALCONSTANT")) die("Acceso denegado");

$app->get("/phrases", function() use($app)
{
 	try{
      $sqlCode = 'phrases_all';
      $forXSL = '../../xsl/count.xsl';
      simpleReturn($app, $sqlCode, $forXSL);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

$app->get('/phrases/count', function () use($app) {

	try{
      $sqlCode = 'phrases_count';
      $forXSL = '../../../xsl/count.xsl';
      simpleReturn($app, $sqlCode, $forXSL);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

$app->get('/phrases/empty', function () use($app) {

	try{
      $sqlCode = 'phrases_empty';
      $forXSL = '../../../xsl/count.xsl';
      simpleReturn($app, $sqlCode, $forXSL);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

$app->get("/phrases/nextempty", function() use($app)
{
 	try{
 	    $sqlCode = 'phrases_empty';
      $forXSL = '../../../xsl/count.xsl';

      $resultString = getTextContentFromEmpty($app, $sqlCode, '', 'json');

      //echo 'debug_1:' . $resultString . '<br>';
      /*$resultString = getReadings($app, 'readings_day', $resultString, 'json');
      echo 'debug_2:' . $resultString . '<br>';
      $resultString = getReadingsContent($app, 'readings_content', $resultString, 'json');
      echo 'debug_3:' . $resultString . '<br>';*/


      //$resultText .= PDO2json($dbh, '');
      $connection = null;
      //echo  $resultString;
      $app->response->headers->set("Access-Control-Allow-Origin","*");
      $app->response->headers->set("Access-control-allow-credentials","true"); 
      $app->response->headers->set("Content-type", "application/json; charset=utf-8");
      $app->response->body($resultString);
  }
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});


$app->get('/phrases/update/:id', function ($id) use($app) {

	try{
      $forXSL = '../../../../xsl/count.xsl';
      $sqlCode = 'phrases_update';

        $filter = "id='" . $id . "'";

        simpleReturn($app, $sqlCode, $forXSL, $filter);

	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});
