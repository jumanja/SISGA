<?php
/*******************************************
* API: users
********************************************/
/*
Si no está definida estaq constante, se está intentando acceder
accediendo por fuera de la api, retorna Acceso Denegado
*/
if(!defined("SPECIALCONSTANT")) die(ACCESSERROR);

/*--
URL: /users/count
MÉTODO: GET
REQUERIMIENTOS: TO-DO Tabla de Usuarios mostrar cuenta
TESTS: api/users_count.sh

DESCRIPCIÓN: Cuenta y retorna cuántos usuarios hay en la
						base de datos.

ENTRADA: Token y el Id del usuario.
PROCESO: Comprueba si el token es válido mediante el método checkToken, y si es
				 válido cuenta cuántos usuarios hay en la bd.
SALIDA:  Si el token y id son válidos, retorna en json, ejemplo:
				 [{"count":"8"}]

				 Si no es válido:
					[{
						"acceso":"Denegado.",
						"motivo":"Token no existe o Ya ha expirado."
					}]

				 Si hubo error de programación no resuelto en el servidor:
				 <br />
				 <b>Parse error</b>:  parse error .. y el mensaje de error.

SQLS: 	 users_count
--*/
$app->get('/users/count', function () use($app) {

	try{
			$resultText = checkToken($app);
			if(contains("validtoken", $resultText) ){
	      $sqlCode = 'users_count';
	      $forXSL = '../../../xsl/count.xsl';
	      simpleReturn($app, $sqlCode, $forXSL);
			} else {
				$connection = null;
				$app->response->body($resultText);
			}
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

/*--
URL: /users
MÉTODO: GET
REQUERIMIENTOS: TO-DO TAbla de Usuarios
TESTS: api/users_all.sh

DESCRIPCIÓN: Retorna la información de todos los usuarios hay en la
						base de datos.

ENTRADA: Token y el Id del usuario.
PROCESO: Comprueba si el token es válido mediante el método checkToken, y si es
				 válido retorna la información de todos los usuarios de la bd.
SALIDA:  Si el token y id son válidos, retorna en json, ejemplo:
					[{
					"frat":"demo",
					"id":"1",
					"usuario":"admin",
					"apellidos":"Del Sistema",
					"nombres":"Administrador",
					"password":"$2y$10$a/j70S8aDh3cwNi2J4UmeeE7OcesoUTp0KXoh87B1MbX4DoGO0SZa",
					"email":"jumanja@gmail.com",
					"servicio":"A",
					"estado":"A"},
					{"frat":"demo",
					"id":"2",
					...
					"estado":"A"
					}]

				 Si no es válido:
					[{
						"acceso":"Denegado.",
						"motivo":"Token no existe o Ya ha expirado."
					}]

				 Si hubo error de programación no resuelto en el servidor:
				 <br />
				 <b>Parse error</b>:  parse error .. y el mensaje de error.

SQLS: 	 users_all
--*/
$app->get("/users", function() use($app)
{
 	try{
			$resultText = checkToken($app);
			if(contains("validtoken", $resultText) ){
				$sqlCode = 'users_all';
	      $forXSL = '../../xsl/count.xsl';
	      simpleReturn($app, $sqlCode, $forXSL);
			} else {
				$connection = null;
				$app->response->body($resultText);
			}
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

/*--
URL: /users/:id
MÉTODO: GET
REQUERIMIENTOS: TO-DO COnsulta de Usuarios
TESTS: api/users_id.sh

DESCRIPCIÓN: Retorna la información de un usuarios en la
						base de datos.

ENTRADA: Token y el Id del usuario de la sesión, y el Id del usuario a retornar.
PROCESO: Comprueba si el token es válido mediante el método checkToken, y si es
				 válido retorna la información de todos los usuarios de la bd.
SALIDA:  Si el token y id son válidos, y existe es usuario con ese id, retorna en json, ejemplo:
				 [{
				 		"frat":"demo",
						"id":"3",
						"usuario":"secretaria",
						"apellidos":"Apellidos Secretaria",
						"nombres":"Nombres Secretaria",
						"password":"$2y$10$9Jdu2a5VL2Xq3DqPatTKkOviMMutujM./bXWbB7mRKeVTA5g8QMmK",
						"email":"secre@demo.com",
						"servicio":"S",
						"estado":"A"
					}]

				 Si no es válido:
					[{
						"acceso":"Denegado.",
						"motivo":"Token no existe o Ya ha expirado."
					}]

 				 Si no se encontró un usuario con ese id:
				 []

				 Si hubo error de programación no resuelto en el servidor:
				 <br />
				 <b>Parse error</b>:  parse error .. y el mensaje de error.

SQLS: 	 users_all (filtrado por id del usuario a buscar)
--*/
$app->get("/users/:id", function($id) use($app)
{
 	try{
		$resultText = checkToken($app);
		if(contains("validtoken", $resultText) ){
			$sqlCode = 'users_all';
      $forXSL = '../../xsl/count.xsl';
      if($id){
        $filter = ' id = ' . $id;
        simpleReturn($app, $sqlCode, $forXSL, $filter);
      }

		} else {
			$connection = null;
			$app->response->body($resultText);
		}

	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});


/*--
URL: /users
MÉTODO: POST
REQUERIMIENTOS: TO-DO adicion de usuarios
TESTS: api/users_add.sh

DESCRIPCIÓN: Agrega un usuario en la base de datos.

ENTRADA: Token y el Id del usuario de la sesión, y los datos del usuario a retornar,
				 recibidos por el método POST, los datos a recibir (ejemplo):
				 frat=demo
				 usuario=admin
				 apellidos=Del Sistema
				 nombres=Administrador
				 password=webmaster
				 email=jumanja@gmail.com
				 servicio=A
				 estado=A

PROCESO: Comprueba si el token es válido mediante el método checkToken, y si es
				 válido intenta adicionar un usuario en la bd con los datos recibidos.
SALIDA:  Si el token y id son válidos, y existe es usuario con ese id, retorna en json, ejemplo:
				 [{
				 		"frat":"demo",
						"id":"3",
						"usuario":"secretaria",
						"apellidos":"Apellidos Secretaria",
						"nombres":"Nombres Secretaria",
						"password":"$2y$10$9Jdu2a5VL2Xq3DqPatTKkOviMMutujM./bXWbB7mRKeVTA5g8QMmK",
						"email":"secre@demo.com",
						"servicio":"S",
						"estado":"A"
					}]

				 Si no es válido:
					[{
						"acceso":"Denegado.",
						"motivo":"Token no existe o Ya ha expirado."
					}]

 				 Si no se encontró un usuario con ese id:
				 []

				 Si hubo error de programación no resuelto en el servidor:
				 <br />
				 <b>Parse error</b>:  parse error .. y el mensaje de error.

SQLS: 	 users_all (filtrado por id del usuario a buscar)
--*/
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
