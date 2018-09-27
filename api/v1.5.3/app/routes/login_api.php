<?php
if(!defined("SPECIALCONSTANT")) die("Acceso denegado");

$app->post('/login', function () use($app) {

	try{
      $forXSL = '../../xsl/count.xsl';
      $sqlCode = 'users_act';

      $filter = "";
      $usuario  = $app->request()->params('usuario');
      $password = $app->request()->params('password');

      //echo $usuario . " / " . $password;

      $filter .= ($usuario ==''     ? '' : " AND usuario = '" . $usuario . "' " );
      //$filter .= ($password ==''    ? '' : " AND password = '" . password_hash($usuario, PASSWORD_DEFAULT) . "'");

      //simpleReturn($app, $sqlCode, $forXSL, $filter);
      //Si dentro de los resultados está
      $query = parseQueryToPDO($app, $sqlCode, $forXSL, $filter);

      //echo "hist:" .  $query;

      $dbh = getPDO($query);
      $resultText = findInPDO($dbh, usuario, $usuario);

      normalheader($app, 'json', '');
      //setResult($resultText, $app);
      //echo "4. " . $resultText;
      $connection = null;
  		$app->response->body($resultText);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});
