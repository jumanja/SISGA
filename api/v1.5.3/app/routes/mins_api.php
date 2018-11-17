<?php
/*******************************************
* API: mins
********************************************/
/*
Si no está definida esta constante, se está intentando acceder
accediendo por fuera de la api, retorna Acceso Denegado
*/
if(!defined("SPECIALCONSTANT")) die(ACCESSERROR);

/*--
URL: /[tabla]/count
MÉTODO: GET
REQUERIMIENTOS: TO-DO identificar el req Tabla de Actas mostrar cuenta
TESTS: api/mins_count.sh

DESCRIPCIÓN: Cuenta y retorna cuántas actas hay en la
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

SQLS: 	 mins_count
--*/
$app->get('/mins/count', function () use($app) {

	try{
			$authorized = checkPerm('GET:/mins/count', $app);
			if($authorized){
				$resultText = checkToken($app);
				if(contains("validtoken", $resultText) ){
					$sqlCode = ($app->request()->params('sqlCode') == "" ? 'mins_count' : $app->request()->params('sqlCode') );

		      $forXSL = '../../../xsl/count.xsl';
		      simpleReturn($app, $sqlCode, $forXSL);
				} else {
					$connection = null;
					$app->response->body($resultText);
				}
			}	else {
				$connection = null;
				$app->response->body("/mins/count " . ACCESSERROR);

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
REQUERIMIENTOS: TO-DO identificar el req guardar el acta
TESTS: api/[tabla]_add.sh

DESCRIPCIÓN: Guardar el acta.

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
$app->post('/mins', function () use($app) {

	try{
		$authorized = checkPerm('POST:/mins', $app);
		if($authorized){
					$resultText = checkToken($app);
					if(contains("validtoken", $resultText) ){

						$sqlCode = "";
						if ($app->request()->params('mod_acta') == "add"){
							$sqlCode = 'mins_add';
						}
						if ($app->request()->params('mod_acta') == "edit"){
							$sqlCode = 'mins_update';
						}
						if ($app->request()->params('mod_acta') == "ret"){
							$sqlCode = 'mins_ret';
						}
						if ($app->request()->params('mod_acta') == "aprob"){
							$sqlCode = 'mins_aprob';
						}
						if ($app->request()->params('mod_acta') == "prelim"){
							$sqlCode = 'mins_prelim';
						}
						if ($app->request()->params('mod_acta') == "progre"){
							$sqlCode = 'mins_progre';
						}

						$forXSL = '../../xsl/count.xsl';

						$newId = null;
						$idacta = $app->request()->params('edit_idupdate');
						if( $app->request()->params('mod_acta') == "add" ){
							$prepParams = array(
										':frat'      	 	=> $app->request()->params('frat'),
										':id'         	=> $newId,
										':estado'     	=> $app->request()->params('add_estado'),
										':fecha'    		=> $app->request()->params('add_fecacta'),
										':tipoacta'  		=> $app->request()->params('add_tipo_de_acta'),
										':tema'    			=> $app->request()->params('add_temaacta'),
										':lugar'   			=> $app->request()->params('add_lugar_reunion'),
										':objetivos'  	=> $app->request()->params('add_objetivos'),
										':desarrollo'  	=> $app->request()->params('add_desarrollo'),
										':responsable'  => $app->request()->params('usuario'),
										':conclusiones' => $app->request()->params('add_conclusiones'),
										':fechasig' 		=> $app->request()->params('add_fecproxima'),
										':lugarsig'   	=> $app->request()->params('add_lugar_proxima'),
										':creacion' 		=> $app->request()->params('add_creacion'),
										':progreso' 		=> $app->request()->params('add_progreso'),
										':preliminar' 	=> $app->request()->params('add_preliminar'),
										':retiro' 			=> $app->request()->params('add_retiro'),
										':aprobacion' 	=> $app->request()->params('add_aprobacion')
							);

						} //if add

						if( $app->request()->params('mod_acta') == "edit" ){

									$prepParams = array(
												':id'         	=> $app->request()->params('edit_idupdate'),
												':estado'     	=> $app->request()->params('edit_estado'),
												':fecha'    		=> $app->request()->params('edit_fecacta'),
												':tipoacta'  		=> $app->request()->params('edit_tipo_de_acta'),
												':tema'    			=> $app->request()->params('edit_temaacta'),
												':lugar'   			=> $app->request()->params('edit_lugar_reunion'),
												':objetivos'  	=> $app->request()->params('edit_objetivos'),
												':desarrollo'  	=> $app->request()->params('edit_desarrollo'),
												':conclusiones' => $app->request()->params('edit_conclusiones'),
												':fechasig' 		=> $app->request()->params('edit_fecproxima'),
												':lugarsig' 		=> $app->request()->params('edit_lugar_proxima'),
												':creacion' 		=> $app->request()->params('edit_creacion'),
												':progreso' 		=> $app->request()->params('edit_progreso'),
												':preliminar' 	=> $app->request()->params('edit_preliminar'),
												':retiro' 			=> $app->request()->params('edit_retiro'),
												':aprobacion' 	=> $app->request()->params('edit_aprobacion')
									);

						} //if edit

						if( $app->request()->params('mod_acta') == "ret" ){
									$idacta = $app->request()->params('ret_idupdate');
									$prepParams = array(
												':id'         	=> $app->request()->params('ret_idupdate'),
												':estado'     	=> $app->request()->params('ret_estado'),
												':retiro' 			=> $app->request()->params('ret_retiro')
									);

						} //if ret

						if( $app->request()->params('mod_acta') == "aprob" ){
									$idacta = $app->request()->params('aprob_idupdate');
									$prepParams = array(
												':id'         	=> $app->request()->params('aprob_idupdate'),
												':estado'     	=> $app->request()->params('aprob_estado'),
												':aprobacion' 	=> $app->request()->params('aprob_aprobacion')
									);

						} //if aprob

						if( $app->request()->params('mod_acta') == "prelim" ){
									$idacta = $app->request()->params('prelim_idupdate');
									$prepParams = array(
												':id'         	=> $app->request()->params('prelim_idupdate'),
												':estado'     	=> $app->request()->params('prelim_estado'),
												':preliminar' 	=> $app->request()->params('prelim_preliminar')
									);

						} //if prelim

						if( $app->request()->params('mod_acta') == "progre" ){
									$idacta = $app->request()->params('progre_idupdate');
									$prepParams = array(
												':id'         	=> $app->request()->params('progre_idupdate'),
												':estado'     	=> $app->request()->params('progre_estado'),
												':progreso'	 	  => $app->request()->params('progre_progreso')
									);

						} //if progre

						$query = getSQL($sqlCode, $app);

						//echo "7,5 query: " . $query;
						if( $app->request()->params('mod_acta') == "add" ){
							$rows = getPDOPreparedIns($query, $prepParams);
							$resultText = '[{"newId":"'.$rows.'"}]';

							//Acta creada, tome el id
							$idacta = $rows;
						} //if adding user insert

						if(
							$app->request()->params('mod_acta') == "ret" ||
							(
								$app->request()->params('mod_acta') == "aprob" &&
								$app->request()->params('aprob_aprobador') == "S"
							)||
							$app->request()->params('mod_acta') == "prelim" ||
							$app->request()->params('mod_acta') == "progre"
							){
							$rows = getPDOPrepared($query, $prepParams);
							$resultText = '[{"rows":"'.$rows.'"}]';
						} //if retiring, use ret

						//NO apruebe si no era elúltimo aprobador
						if(
							$app->request()->params('mod_acta') == "aprob" &&
							$app->request()->params('aprob_aprobador') == "N"
						){
							$resultText = '[{"rows":"0"}]';
						}

						if( $app->request()->params('mod_acta') == "edit" ){
							$rows = getPDOPrepared($query, $prepParams);
							$resultText = '[{"rows":"'.$rows.'"}]';

							$sqlCode = "tags_mindelete";
							$prepParams = array(
										':idacta'       => $idacta,
							);
							$query = getSQL($sqlCode, $app);
							$rows = getPDOPrepared($query, $prepParams);
							//echo "tags_mindelete: " + $rows;

							//Borre asistentesActa
							$sqlCode = "asis_mindelete";
							$prepParams = array(
										':idacta'       => $idacta,
							);
							$query = getSQL($sqlCode, $app);
							$rows = getPDOPrepared($query, $prepParams);
							//echo "asis_mindelete: " + $rows;

							//Borre notificaciones
							$sqlCode = "notif_mindelete";
							$prepParams = array(
										':idacta'       => $idacta,
							);
							$query = getSQL($sqlCode, $app);
							$rows = getPDOPrepared($query, $prepParams);
							//echo "notif_mindelete: " + $rows;

							//Borre tareasActa
							$sqlCode = "tasks_mindelete";
							$prepParams = array(
										':idacta'       => $idacta,
							);
							$query = getSQL($sqlCode, $app);
							$rows = getPDOPrepared($query, $prepParams);
							//echo "tasks_mindelete: " + $rows;

						} //if editing

						//Actualice Etiquetas
						$tags = $app->request()->params('upd_etiquetasActa');
						if($tags != ""){

							$sqlCode = "tags_minadd";
							$query = getSQL($sqlCode, $app);

							$connection = getConnection();

							$dbh = $connection->prepare($query);
							$arrayTags = explode(',', $tags);
							//print_r($arrayTags);
							foreach($arrayTags as $tag){
								//print_r($tag);

								$prepParams = array(
											':idacta'     => $idacta,
											':etiqueta'   => $tag,
											':estado'  	  => 'A',
								);

								$dbh->execute($prepParams);

							} //foreach tags
						} //if tags

						//Actualice Asistentes, pero si es aprobación toca borrarlos 1ero
						if($app->request()->params('mod_acta') == "aprob"){
							//Borre asistentesActa
							$sqlCode = "asis_mindelete";
							$prepParams = array(
										':idacta'       => $idacta,
							);
							$query = getSQL($sqlCode, $app);
							$rows = getPDOPrepared($query, $prepParams);
							//echo "asis_mindelete: " + $rows;
						}

						$asis = $app->request()->params('upd_asistentesActa');
						if($asis != ""){

							$sqlCode = "asis_minadd";
							$query = getSQL($sqlCode, $app);

							$connection = getConnection();

							$dbh = $connection->prepare($query);
							$arrayAsis = explode(',', $asis);
							//print_r($arrayTags);
							foreach($arrayAsis as $asis){
								//print_r($asis);
								$arrayItem = explode(':', $asis);
								$prepParams = array(
											':idacta'     => $idacta,
											':asistente'  => $arrayItem[2],
											':estado'  	  => $arrayItem[1],
											':servicio'   => $arrayItem[4],
											':tiposerv'   => $arrayItem[3],
											':fecha'  	  => $arrayItem[5],
								);

								$dbh->execute($prepParams);

							} //foreach asis

							//Si es Preliminar, añada Notificaciones.
							//Para pruebas, activar G (en Progreso)
							//echo "7,8 aquí: ";
							if (
									$app->request()->params('notificar') == "S"
									) {

										//Borre notificaciones
										$sqlCode = "notif_mindelete";
										$prepParams = array(
													':idacta'       => $idacta,
										);
										$query = getSQL($sqlCode, $app);
										$rows = getPDOPrepared($query, $prepParams);
										//echo "notif_mindelete: " + $rows;
										//echo "7,9 aquí: ";

										$mod        = $app->request()->params('mod_acta');
										$estadoacta = $app->request()->params($mod . '_estado');

										$maxfechahora = $app->request()->params($mod . '_creacion');
										$maxfechahora = ($maxfechahora < $app->request()->params($mod . '_progreso') ?
																		 $app->request()->params($mod . '_progreso') : $maxfechahora);
										$maxfechahora = ($maxfechahora < $app->request()->params($mod . '_preliminar') ?
																		 $app->request()->params($mod . '_preliminar') : $maxfechahora);
										$maxfechahora = ($maxfechahora < $app->request()->params($mod . '_retiro') ?
																		 $app->request()->params($mod . '_retiro') : $maxfechahora);
										$maxfechahora = ($maxfechahora < $app->request()->params($mod . '_aprobacion') ?
																		$app->request()->params($mod . '_aprobacion') : $maxfechahora);

										$sqlCode = "notif_minadd";
										$query = getSQL($sqlCode, $app);

										$connection = getConnection();

										$dbh = $connection->prepare($query);
										//Tome de Nuevo
										//echo "\n7,8,5 " . $app->request()->params( 'usuario');
										foreach($arrayAsis as $asis){

											//print_r($asis);

											$arrayItem = explode(':', $asis);
											//Saltarse a los que No asistieron
											if($arrayItem[1] != 'N'){
												$prepParams = array(
															':idacta'     => $idacta,
															':origen'  	  => $app->request()->params('usuario'),
															':destino'  	=> $arrayItem[2],
															':estado'  	  => 'P',
															':estadoacta' => $estadoacta,
															':fechahora'   => $maxfechahora
												);

												$dbh->execute($prepParams);
											} //if asistestado <> N

										} // foreach asis

								} // if prelim

						} //if asis

						//Actualice Tareas
						$tasks = $app->request()->params('upd_tareasActa');
						if($tasks != ""){

							$sqlCode = "tasks_minadd";
							$query = getSQL($sqlCode, $app);

							$connection = getConnection();

							$dbh = $connection->prepare($query);
							$arrayTasks = explode('ç', $tasks);
							//print_r($arrayTasks);
							foreach($arrayTasks as $taskItem){
								//print_r($taskItem);
								$arrayItem = explode('|', $taskItem);
								$prepParams = array(
											':idacta'     => $idacta,
											':estado'  		=> $arrayItem[0],
											':text'  			=> $arrayItem[1],
											':usuario'  	=> $arrayItem[2],
											':creada'   	=> $arrayItem[3],
											':inicioplan' => $arrayItem[4],
											':finalplan'  => $arrayItem[5]
								);

								$dbh->execute($prepParams);

							}
						}

						//Actualice Comentarios? si, solo los no-secretarios

						normalheader($app, 'json', '');
						//setResult($resultText, $app);
						//echo "8.1. " . $resultText;
						$connection = null;
						$app->response->body($resultText);

					} else {
						$connection = null;
						$app->response->body($resultText);
					} //if validtoken
			}	else {
				$connection = null;
				$app->response->body("/mins (POST) " . ACCESSERROR);

			} //end if authorized


	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});
/*--
URL: /[tabla]
MÉTODO: GET
REQUERIMIENTOS: TO-DO identificar el req Tabla de Actas
TESTS: api/[tabla]_all.sh

DESCRIPCIÓN: Retorna la información de todos las actas que hay en la
						base de datos.

ENTRADA: Token y el Id del usuario.

PROCESO: Comprueba si el token es válido mediante el método checkToken, y si es
				 válido retorna la información de todos las actas de la bd.

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
$app->get("/mins", function() use($app)
{
 	try{
			$authorized = checkPerm('GET:/mins', $app);
			if($authorized){
					$resultText = checkToken($app);
					if(contains("validtoken", $resultText) ){
						$sqlCode = ($app->request()->params('sqlCode') == "" ? 'mins_all' : $app->request()->params('sqlCode') );
						$forXSL = '../../xsl/count.xsl';
						simpleReturn($app, $sqlCode, $forXSL);

					} else {
						$connection = null;
						$app->response->body($resultText);
					}
				}	else {
					$connection = null;
					$app->response->body("/mins " . ACCESSERROR);
		}
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

/*--
URL: /[tabla]/items
MÉTODO: GET
REQUERIMIENTOS: TO-DO identificar el req Tabla de Actas
TESTS: api/[tabla]_items.sh

DESCRIPCIÓN: Retorna la información de todos los items del acta en la bd.

ENTRADA: Token y el Id del usuario.

PROCESO: Comprueba si el token es válido mediante el método checkToken, y si es
				 válido retorna la información de todos las etiquetas del acta de la bd.

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

SQLS: 	 items_all
--*/
$app->get("/mins/items", function() use($app)
{
 	try{
			$authorized = checkPerm('GET:/mins/items', $app);
			if($authorized){
					$resultText = checkToken($app);
					if(contains("validtoken", $resultText) ){
						$sqlCode = ($app->request()->params('sqlCode') == "" ? 'mins_all' : $app->request()->params('sqlCode') );
						$forXSL = '../../xsl/count.xsl';

						//Recupere EtiquetasActa
						$prepParams = array(
									':idacta'       => $app->request()->params('nroActa')
						);
						$query = getSQL($sqlCode, $app);

						/*echo "<br>\r\n789. query:" .  $sqlCode .
								" idacta:" . $app->request()->params('nroActa') .
								" :<br>\r\n" . $query . '\r\n';

						print_r($prepParams);*/

						$connection = getConnection();
						$dbh = $connection->prepare($query);
						$dbh->execute($prepParams);

						$resultText = "";
						normalheader($app, 'json', '');
		        $resultText .= PDO2json($dbh, '');
		        $connection = null;

		        $app->response->body($resultText);

					} else {
						$connection = null;
						$app->response->body($resultText);
					}
				}	else {
					$connection = null;
					$app->response->body("/mins/items " . ACCESSERROR);
		}
	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});

/*--
URL: /[tabla]/query
MÉTODO: POST
REQUERIMIENTOS: TO-DO identificar el req buscar el acta
TESTS: api/[tabla]_query.sh

DESCRIPCIÓN: Hacer un Query Avanzdo para buscar el acta.

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
$app->post('/mins/query', function () use($app) {

	try{
		$authorized = checkPerm('POST:/mins/query', $app);
		if($authorized){
					$resultText = checkToken($app);
					if(contains("validtoken", $resultText) ){

						$sqlCode = 'mins_' . $app->request()->params('state');
						$forXSL = '../../xsl/count.xsl';

						//params
						$qryFrat     = $app->request()->params('frat');
						$qryEstado   = $app->request()->params('qry_estado');
						$qryFecini	 = $app->request()->params('qry_fecini');
						$qryFecfin	 = $app->request()->params('qry_fecfin');
						$qryNroini	 = $app->request()->params('qry_nroini');
						$qryNrofin	 = $app->request()->params('qry_nrofin');
						$qryTipoacta = $app->request()->params('qry_tipoacta');
						$qryTemaacta = $app->request()->params('qry_temaacta');
						$qryLugar    = $app->request()->params('qry_lugar');

						//Fix params
						$qryEstado   = ( (is_null( $qryEstado ) || $qryEstado == '' ) ? 'ZZZ' : $qryEstado );
						$qryNrofin   = ( (is_null( $qryNrofin ) || $qryNrofin == '' ) ? 'ZZZ' : $qryNrofin );
						$qryTipoacta = ( (is_null($qryTipoacta) || $qryTipoacta == '' ) ? 'ZZZ' : $qryTipoacta );
						$qryTemaacta = ( (is_null($qryTemaacta) || $qryTemaacta == '' ) ? 'ZZZ' : $qryTemaacta );
						$qryLugar    = ( (is_null( $qryLugar ) || $qryLugar == '') ? 'ZZZ' : $qryLugar );

						//Prep params
						$prepParams = array(
									':frat'      	 	=> $qryFrat,
									':estado'     	=> $qryEstado,
									':fecini'    		=> $qryFecini,
									':fecfin'    		=> $qryFecfin,
									':nroini'    		=> $qryNroini,
									':nrofin'    		=> $qryNrofin,
									':tipoacta'  		=> $qryTipoacta,
									':temaacta'  		=> $qryTemaacta,
									':lugar'   			=> $qryLugar

						);

						$query = getSQL($sqlCode, $app);

						/*echo "<br>\r\n789. query:" .  $sqlCode .
								" idacta:" . $app->request()->params('nroActa') .
								" :<br>\r\n" . $query . '\r\n';

						print_r($prepParams);
*/
						$connection = getConnection();
						$dbh = $connection->prepare($query);
						$dbh->execute($prepParams);

						$resultText = "";
						normalheader($app, 'json', '');
		        $resultText .= PDO2json($dbh, '');
		        $connection = null;

		        $app->response->body($resultText);

					} else {
						$connection = null;
						$app->response->body($resultText);
					}
			}	else {
				$connection = null;
				$app->response->body("/mins/query (POST) " . ACCESSERROR);

			}


	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});
