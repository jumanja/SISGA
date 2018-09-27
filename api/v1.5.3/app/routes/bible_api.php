<?php
if(!defined("SPECIALCONSTANT")) die("Acceso denegado");

$app->get("/bible", function() use($app)
{
 	try{
      $sqlCode = 'bible_all';
      $forXSL = '../../xsl/count.xsl';
      simpleReturn($app, $sqlCode, $forXSL);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

$app->get('/bible/count', function () use($app) {

	try{
      $sqlCode = 'bible_count';
      $forXSL = '../../../xsl/count.xsl';
      simpleReturn($app, $sqlCode, $forXSL);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});


$app->get('/bible/books/:codigo', function ($codigo) use($app) {

	try{
      $forXSL = '../../../../xsl/count.xsl';
      $sqlCode = 'bible_books';
      if (in_array($codigo, array('AT', 'NT', 'EV'))){
          $sqlCode = 'bible_' . $codigo;
          simpleReturn($app, $sqlCode, $forXSL);
      } else {
        $filter = "libro='" . $codigo . "'";
        $chapter = $app->request()->params('chapter');
        $chapterFrom = $app->request()->params('chapterFrom');
        $chapterTo = $app->request()->params('chapterTo');
        $verse = $app->request()->params('verse');
        $verseFrom = $app->request()->params('verseFrom');
        $verseTo = $app->request()->params('verseTo');
        
        $filter .= ($chapter==''?'': ' AND capit = ' . $chapter );
        $filter .= ($chapterFrom==''?'' : ' AND capit >= ' . $chapterFrom );
        $filter .= ($chapterTo==''?'' : ' AND capit <= ' . $chapterTo );
        $filter .= ($verse==''?'' : ' AND versIni = ' . $verse );
        $filter .= ($verseFrom=='' ? '' : ' AND versIni >= ' . $verseFrom );
        $filter .= ($verseTo=='' ? '' : ' AND versFin <= ' . $verseTo );
        
        simpleReturn($app, $sqlCode, $forXSL, $filter);
      }
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

