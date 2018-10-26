<?php
/*******************************************
* API: frats
********************************************/
/*
Si no está definida estaq constante, se está intentando acceder
accediendo por fuera de la api, retorna Acceso Denegado
*/
if(!defined("SPECIALCONSTANT")) die(ACCESSERROR);

/*--
URL: /[tabla]/count
MÉTODO: GET
REQUERIMIENTOS: TO-DO identificar el requermiento de la Tabla correspondiente a mostrar cuenta
TESTS: api/[tabla]_count.sh

DESCRIPCIÓN: Cuenta y retorna cuántos registros hay en la
						base de datos para esta tabla.

ENTRADA: Token y el Id del usuario.

PROCESO: Comprueba si el token es válido mediante el método checkToken, y si es
				 válido cuenta cuántos registros de esta tabla hay en la bd.

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

SQLS: 	 [tabla]_count
--*/
$app->get('/frats/count', function () use($app) {

	try{
			$authorized = checkPerm('GET:/frats/count', $app);
			if($authorized){
				$resultText = checkToken($app);
				if(contains("validtoken", $resultText) ){
		      $sqlCode = 'frats_count';
		      $forXSL = '../../../xsl/count.xsl';
		      simpleReturn($app, $sqlCode, $forXSL);
				} else {
					$connection = null;
					$app->response->body($resultText);
				}
			}	else {
				$connection = null;
				$app->response->body("/frats/count " . ACCESSERROR);

			}
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

/*--
URL: /[tabla]
MÉTODO: GET
REQUERIMIENTOS: TO-DO identificar el requerimiento de esta Tabla
TESTS: api/[tabla]_all.sh

DESCRIPCIÓN: Retorna la información de todos los registros que hay de
esta tabla en la base de datos.

ENTRADA: Token y el Id del usuario.

PROCESO: Comprueba si el token es válido mediante el método checkToken, y si es
				 válido retorna la información de todos los registros de esta tabla en la bd.

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

SQLS: 	 [tabla]_all
--*/
$app->get("/frats", function() use($app)
{
 	try{
			$authorized = checkPerm('GET:/frats', $app);
			if($authorized){
					$resultText = checkToken($app);
					if(contains("validtoken", $resultText) ){
						if($app->request()->params('selpop') == "1"){
							$sqlCode = 'frats_sel';
					  } else {
							$sqlCode = 'frats_all';
						}
			      $forXSL = '../../xsl/count.xsl';
			      simpleReturn($app, $sqlCode, $forXSL);
					} else {
						$connection = null;
						$app->response->body($resultText);
					}
				}	else {
					$connection = null;
					$app->response->body("/frats " . ACCESSERROR);
		}
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

/*--
URL: /[tabla]/:id
MÉTODO: GET
REQUERIMIENTOS: TO-DO identificar el requermiento de Consulta de esta tabla
TESTS: [tabla]/frats_id.sh

DESCRIPCIÓN: Retorna la información de un registro de esta tabla en la
						base de datos.

ENTRADA: Token y el Id del usuario de la sesión, y el Id del registro a retornar.

PROCESO: Comprueba si el token es válido mediante el método checkToken, y si es
				 válido retorna la información de todos los registros de esta tabla de la bd.

SALIDA:  Si el token y id son válidos, y existe ese registro con ese id, retorna en json, ejemplo:
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
$app->get("/frats/:id", function($id) use($app)
{
 	try{
		$authorized = checkPerm('GET:/frats/:id', $app);
		if($authorized){
				$resultText = checkToken($app);
				if(contains("validtoken", $resultText) ){
					$sqlCode = 'frats_all';
		      $forXSL = '../../xsl/count.xsl';
		      if($id){
		        $filter = ' id = ' . $id;
		        simpleReturn($app, $sqlCode, $forXSL, $filter);
		      }

				} else {
					$connection = null;
					$app->response->body($resultText);
				}
		}	else {
			$connection = null;
			$app->response->body("/frats/:id " . ACCESSERROR);

		}
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

/*--
URL: /[tabla]
MÉTODO: POST
REQUERIMIENTOS: TO-DO identificar el req adicion de un registro en esta tabla
TESTS: api/[tabla]_add.sh

DESCRIPCIÓN: Agrega un registro de esta tabla en la base de datos.

ENTRADA: Token y el Id del usuario de la sesión, y los datos del registro a retornar,
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
				 válido intenta adicionar un registro en esta tabla en la bd con los
				 datos recibidos.

SALIDA:  Si el token y id son válidos, y existe un registro con ese id, retorna
				 la cantidad de registros, ejemplo:
				 [{
				 		"rows":"1"
					}]';

				 Si no es válido el token, retorna en json:
					[{
						"acceso":"Denegado.",
						"motivo":"Token no existe o Ya ha expirado."
					}]

				 Si hubo error de programación no resuelto en el servidor:
				 <br />
				 <b>Parse error</b>:  parse error .. y el mensaje de error.

SQLS: 	 [tabla]_add
--*/
$app->post('/frats', function () use($app) {

	try{
		$authorized = checkPerm('POST:/frats', $app);
		if($authorized){
					$resultText = checkToken($app);
					if(contains("validtoken", $resultText) ){
/*
Hasta aquí se inhabilititaría si se quisiera agregar sin tener sesión iniciada
*/
							$sqlCode = 'frats_add';
							$forXSL = '../../xsl/count.xsl';

							$newId = null;
							$prepParams = array(
										':frat'       => $app->request()->params('frat'),
										':id'         => $newId,
										':nombre'    	=> $app->request()->params('nombre'),
										':estado'     => $app->request()->params('estado'),
										':logo'  			=> $app->request()->params('logo'),
										':direccion'  => $app->request()->params('direccion'),
										':ciudad' 		=> $app->request()->params('ciudad'),
										':email'      => $app->request()->params('email')
							);

							$query = getSQL($sqlCode, $app);
							$rows = getPDOPrepared($query, $prepParams);
							$resultText = '[{"rows":"'.$rows.'"}]';

							normalheader($app, 'json', '');
							//setResult($resultText, $app);
							//echo "4. " . $resultText;
							$connection = null;
							$app->response->body($resultText);
		/*
		 Inhabilitar siguiente bloque hasta el catch para agregar usuarios sin
		 necesidad de terne sesión iniciada via token
		*/
						} else {
							$connection = null;
							$app->response->body($resultText);
						}
			}	else {
				$connection = null;
				$app->response->body("/frats (POST) " . ACCESSERROR);

			}


	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

/*--
URL: /[tabla]
MÉTODO: PUT
REQUERIMIENTOS: TO-DO identificar el req actualización de registros de esta tabla
TESTS: api/[tabla]_update.sh

DESCRIPCIÓN: Actualiza los datos de un registro de esta tabla en la base de datos.

ENTRADA: Token y el Id del usuario de la sesión, y el id del registro de
 				 la tabla a retirar, recibidos por el método PUT. Los datos a recibir
				 (ejemplo):

				 id=2
				 iddelete=10
				 token=updatedToken

PROCESO: Comprueba si el token es válido mediante el método checkToken, y si es
				 válido intenta modificar los datos del registro en la bd con los datos
				 recibidos.

SALIDA:  Si el token y id son válidos, y existe un registro con ese id, retorna
				 la cantidad de registros actualizados, ejemplo:

				 Si realizó algún cambio en el registro:
				 [{"rows":"1"}]

				 Si la información estaba igual y no actualizó nada:
				 [{"rows":"0"}]

				 Si no es válido el token, retorna en json:
					[{
						"acceso":"Denegado.",
						"motivo":"Token no existe o Ya ha expirado."
					}]

				 Si hubo error de programación no resuelto en el servidor:
				 <br />
				 <b>Parse error</b>:  parse error .. y el mensaje de error.

SQLS: 	 autogenerado
--*/
$app->put('/frats', function () use($app) {

	try{
		$authorized = checkPerm('PUT:/frats', $app);
		if($authorized){
				$resultText = checkToken($app);
				if(contains("validtoken", $resultText) ){
					$tableName = 'fraternidades';
		      $queryUpdate = 'UPDATE ' . $tableName . ' SET  ';

					$arr = $app->request()->put();
					foreach ( $arr as $key => $value) {
							if($key == 'id'){
								$queryUpdate = $queryUpdate .
															 "{$key} = '" .
															 $app->request()->params('idupdate') . "', ";
							} else {
								if($key == 'idupdate' || $key == 'token' || $key == 'tokenexpira'){
									//saltese idupdate, token y tokenexpira. El id no se puede actualizar
								} else {
									$queryUpdate = $queryUpdate ."{$key} = '{$value}', ";
								}
							}
					}
					$queryUpdate = substr($queryUpdate, 0, -2);

					$queryUpdate = $queryUpdate .
												 " WHERE id = " . $app->request()->params('idupdate') ;

					//echo "2. " . $queryUpdate;


		      $rows = getPDO($queryUpdate);
		      $resultText = '[{"rows":"'. $rows->rowCount() .'"}]';

		      normalheader($app, 'json', '');
		      //setResult($resultText, $app);
		      $connection = null;
		  		$app->response->body($resultText);

				} else {
					$connection = null;
					$app->response->body($resultText);
				}

			}	else {
				$connection = null;
				$app->response->body("/frats (PUT) " . ACCESSERROR);

			}
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});


/*--
URL: /[tabla]/delete
MÉTODO: PUT (el método DELETE da problemas no está implementado correctamente)
REQUERIMIENTOS: TO-DO identificar el requerimiento de actualización de esta
tabla.
TESTS: api/[tabla]_delete.sh

DESCRIPCIÓN: Actualiza el estado a R (Retirado) a un registro de esta tabla en
						 la base de datos, borrado lógico.

ENTRADA: Token y el Id del usuario de la sesión, y los datos del registro
 				 a actualizar,
				 los datos a recibir (ejemplo):

				 id=2
				 email=nuevoemail@email.com
				 token=updatedToken
				 tokenexpira=2018-12-31 11:59:59

PROCESO: Comprueba si el token es válido mediante el método checkToken, y si es
				 válido intenta retirar el registro (cambiando su estado a R) en la bd
				 con los datos recibidos.

SALIDA:  Si el token y id son válidos, y existe el registro con ese id, retorna
				 la cantidad de registros actualizados, ejemplo:

				 Si realizó algún cambio en el registro:
				 [{"rows":"1"}]

				 Si la información estaba igual y no actualizó nada:
				 [{"rows":"0"}]

				 Si no es válido el token, retorna en json:
					[{
						"acceso":"Denegado.",
						"motivo":"Token no existe o Ya ha expirado."
					}]

				 Si hubo error de programación no resuelto en el servidor:
				 <br />
				 <b>Parse error</b>:  parse error .. y el mensaje de error.

SQLS: 	 autogenerado
--*/
$app->put('/frats/delete', function () use($app) {

	try{
		$authorized = checkPerm('PUT:/frats/delete', $app);
		if($authorized){
					$resultText = checkToken($app);
					if(contains("validtoken", $resultText) ){
						$tableName = 'fraternidades';
			      $queryUpdate = "UPDATE " . $tableName . " SET ESTADO = 'R' ".
													 " WHERE id = " . $app->request()->params('iddelete') ;

						//echo "21. " . $queryUpdate;


			      $rows = getPDO($queryUpdate);
			      $resultText = '[{"rows":"'. $rows->rowCount() .'"}]';

			      normalheader($app, 'json', '');
			      //setResult($resultText, $app);
			      $connection = null;
			  		$app->response->body($resultText);

					} else {
						$connection = null;
						$app->response->body($resultText);
					}
			}	else {
				$connection = null;
				$app->response->body("/frats/delete (PUT) " . ACCESSERROR);

			}

	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});
