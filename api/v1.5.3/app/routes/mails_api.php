<?php
/*******************************************
* API: mails
********************************************/
/*
Si no está definida esta constante, se está intentando acceder
accediendo por fuera de la api, retorna Acceso Denegado
*/
if(!defined("SPECIALCONSTANT")) die(ACCESSERROR);

/*--
URL: /[tabla]
MÉTODO: POST
REQUERIMIENTOS: TO-DO identificar el req envío de un email
TESTS: api/[tabla]_add.sh

DESCRIPCIÓN: Enviar un mail.

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
$app->post('/mails', function () use($app) {

	try{
		$authorized = checkPerm('POST:/mails', $app);
		if($authorized){
					$resultText = checkToken($app);
					if(contains("validtoken", $resultText) ){
/*
Hasta aquí se inhabilititaría si se quisiera agregar sin tener sesión iniciada
*/
							$sqlCode = 'notif_minquery';
							$forXSL = '../../xsl/count.xsl';

							$prepParams = array(
										':idacta'   	=> $app->request()->params('nroActa')
							);

							$query = getSQL($sqlCode, $app);

							/*
							echo "<br>\r\n789. query:" .  $sqlCode .
									" idacta:" . $app->request()->params('nroActa') .
									" :<br>\r\n" . $query . '\r\n';

							print_r($prepParams);
							*/

							$connection = getConnection();
							$dbh = $connection->prepare($query);
							$dbh->execute($prepParams);

							//Tome los resultados en json de una vez, recorralos y
							//envíe los emails correspondientes
							$correos  = 0;
							$enviados = 0;

							$json = json_decode(PDO2json($dbh, ''), true); // decode the JSON into an associative array
							foreach($json as $fila ) {
										//print_r($fila);
										//print_r($fila['emaildestino']);
										//Procesar cada mail, siempre y cuando tenga destino
										if($fila['emaildestino'] != ''){

											$nomestado = "";
											if($fila['estadoacta'] == 'G'){
												$nomestado = "EN PROGRESO";
											}
											if($fila['estadoacta'] == 'P'){
												$nomestado = "Disponible de forma PRELIMINAR";
											}
											if($fila['estadoacta'] == 'F'){
												$nomestado = "APROBADA";
											}
											if($fila['estadoacta'] == 'R'){
												$nomestado = "RETIRADA";
											}

											$to      = $fila['emaildestino'];
											$subject = 'El Acta: ' . $fila['idacta'] . ' ' .
																 'está: ' . $nomestado;

											$message = 'Cordial Saludo\r\n\r\n' .
																 'Atención: ' .
																 $fila['nomdestino'] . ' ' . $fila['apedestino'] . '\r\n\r\n\r\n\r\n' .
																 'Por medio del presente correo, se le notifica que el Acta Número: ' .
																  $fila['idacta'] . ' ' .
																 'está ' . $nomestado . ' ' .
																 '\r\n\r\n\r\n' .
																 'Se envía este correo en representación de:\r\n' .
																 $fila['nomorigen'] . ' ' . $fila['apeorigen'] . ' ' .
																 'Efectivo desde :' . $fila['fechahora'] . ' ' .
																 '\r\n\r\n\r\n' .
																 'Por favor No responda a este correo, ya que es generado automáticamente. ' .
																 'Pero si desea, puede contactar a: ' . $fila['nomorigen'] . ' a su correo electrónico: ' .
																 $fila['emailorigen'] .
																 '\r\n\r\n\r\n' .
																 '\r\n\r\n\r\n' .
																 '\r\n\r\n\r\n' .
																 'SISGA - Sistema para Gestión de Actas v1.0';

											$headers = 'From: sisga@jumanja.net' . "\r\n" .
													'Reply-To: ' . $fila['emailorigen'] . "\r\n" .
													'X-Mailer: PHP/' . phpversion();

											if (mail($to, $subject, $message, $headers)) {
													$enviados++;
											};

											//Solo se cuentan si el correo No está en blanco
											$correos++;

										}
							}

							$resultText = '[{' .
															'"rows":"' . $correos . '",' .
															'"sent":"' . $enviados . '"' .
														'}]';

							normalheader($app, 'json', '');
			        $connection = null;
			        $app->response->body($resultText);

/*
							<?php
							$to      = 'nobody@example.com';
							$subject = 'the subject';
							$message = 'hello';
							$headers = 'From: webmaster@example.com' . "\r\n" .
							    'Reply-To: webmaster@example.com' . "\r\n" .
							    'X-Mailer: PHP/' . phpversion();

							mail($to, $subject, $message, $headers);
							?>
*/
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
				$app->response->body("/mails (POST) " . ACCESSERROR);

			}


	}
	catch(PDOException $e)
	{
		echo "Error: " . $e->getMessage();
	}
});
