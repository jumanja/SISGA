<?php
if(!defined("SPECIALCONSTANT")) die("Acceso denegado");

$app->get("/books", function() use($app)
{
 	try{
      $sqlCode = 'books_all';
      $forXSL = '../../xsl/count.xsl';
      simpleReturn($app, $sqlCode, $forXSL);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});


$app->get('/books/count', function () use($app) {

	try{
      $sqlCode = 'books_count';
      $forXSL = '../../../xsl/count.xsl';
      simpleReturn($app, $sqlCode, $forXSL);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

