<?php
if(!defined("SPECIALCONSTANT")) die(ACCESSERROR);

$app->get('/users/count', function () use($app) {

	try{
      $sqlCode = 'users_count';
      $forXSL = '../../../xsl/count.xsl';
      simpleReturn($app, $sqlCode, $forXSL);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

$app->get("/users", function() use($app)
{
 	try{
      $sqlCode = 'users_all';
      $forXSL = '../../xsl/count.xsl';
      simpleReturn($app, $sqlCode, $forXSL);
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

$app->get("/users/:id", function($id) use($app)
{
 	try{
      $sqlCode = 'users_all';
      $forXSL = '../../xsl/count.xsl';
      if($id){
        $filter = ' id = ' . $id;
        simpleReturn($app, $sqlCode, $forXSL, $filter);
      } else {
        simpleReturn($app, $sqlCode, $forXSL);
      }
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});


$app->post('/users', function () use($app) {

	try{
      $sqlCode = 'users_add';
      $forXSL = '../../xsl/count.xsl';

      $newId = null;
      $prepParams = array(
            ':frat'       => $app->request()->params('frat'),
            ':id'         => $newId,
            ':usuario'    => $app->request()->params('usuario'),
            ':apellidos'  => $app->request()->params('apellidos'),
            ':nombres'    => $app->request()->params('nombres'),
            ':password'   => password_hash($app->request()->params('password'), PASSWORD_DEFAULT),
            ':email'      => $app->request()->params('email'),
            ':servicio'   => $app->request()->params('servicio'),
            ':estado'     => $app->request()->params('estado')
      );

      $query = getSQL($sqlCode, $app->request()->params('lang'));
      $rows = getPDOPrepared($query, $prepParams);
      $resultText = '[{"rows":"'+$rows+'"}]';

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


$app->put('/users/token', function () use($app) {

	try{
      $sqlCode = 'users_tokenupdate';
      $forXSL = '../../xsl/count.xsl';

      $prepParams = array(
            ':token'   		 => $app->request()->params('token'),
            ':tokenexpira' => $app->request()->params('tokenexpira'),
						':id'          => $app->request()->params('id')
      );

      $query = getSQL($sqlCode, $app->request()->params('lang'));
      $rows = getPDOPrepared($query, $prepParams);
      $resultText = '[{"rows":"'+$rows+'"}]';

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


$app->put('/users', function () use($app) {

	try{
			$tableName = 'usuarios';
      $queryUpdate = 'UPDATE ' . $tableName . ' SET  ';

			$arr = $app->request()->put();
			foreach ( $arr as $key => $value) {
			    $queryUpdate = $queryUpdate ."{$key} = '{$value}', ";
			}
			$queryUpdate = substr($queryUpdate, 0, -2);

			$queryUpdate = $queryUpdate . " WHERE id = " . $app->request()->params('id') ;

			//echo "2. " . $queryUpdate;


      $rows = getPDO($queryUpdate);
      $resultText = '[{"rows":"'+$rows+'"}]';

      normalheader($app, 'json', '');
      //setResult($resultText, $app);
      $connection = null;
  		$app->response->body($resultText);

	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});
