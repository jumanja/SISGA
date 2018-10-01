<?php
if(!defined("SPECIALCONSTANT")) die(ACCESSERROR);

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
      $resultText = findInPDO($dbh, "password", $password);

			//Ahora genere token, tokenexpira y actualícelo en la db
			//echo "4. " . $resultText;
			if(contains("myTokenExpira", $query) == ''){

				$json = json_decode($resultText, true);
				//echo "3.9. " . $json[0]['id'];
/*
				$currentTime = new DateTime();
				$myToken = $currentTime->format('Y-m-d H:i:s');
				//echo $myToken->format('Y-m-d H:i:s');

				$expiraTime = new DateTime();
				$myTokenExpira = $expiraTime->format('Y-m-d H:i:s');
				*/
			//	$dt = date("Y-m-d H:i:s");
				//echo $dt;
				$myToken = date('Y-m-d H:i:s', strtotime("now"));
				$myTokenExpira = date('Y-m-d H:i:s',strtotime('+1 hour +1 minutes',strtotime($myToken)));
				$prepParams = array(
							':token'   		 => $myToken,
							':tokenexpira' => $myTokenExpira,
							':id'          => $json[0]['id']
				);

				$resultText = str_replace("myTokenExpira", $myToken, $resultText);
				$resultText = str_replace("myToken", $myTokenExpira, $resultText);

				$sqlCode = 'users_tokenupdate';
				$query = getSQL($sqlCode, $app->request()->params('lang'));
				$rows = getPDOPrepared($query, $prepParams);
				//echo "8. " . $rows;
				/*if($rows == 1){

				}*/
			}

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
