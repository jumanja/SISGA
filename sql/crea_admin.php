<?php
// Declaramos el fichero de conexión
include("sql_connect.php");
try {
    $conn = new PDO("mysql:host=$servidor;dbname=$nombreBD", $usuario, $password);
    // Establecer el modo de error PDO a excepción
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		//Arreglo de tablas para crear, No se borrarán pues
		//por error se podría perder información.

		$rows = array(
					"poblar_servicio" => "INSERT INTO `sisga`.`servicios` " .
					                     "(`servicio`, `tiposerv`, `id`, `nombre`, `estado`) " .
															 "VALUES ('A', 'A', '1', 'Administrador', 'A');",

		 "poblar_fraternidades" => "INSERT INTO `sisga`.`fraternidades` " .
					                     "(`frat`, `id`, `nombre`, `estado`, `logo`, `direccion`, `ciudad`, `email`) " .
															 "VALUES ('demo',1,'Fraternidad Demostracion','A','vacio.png'," .
															 "'Calle la Sierra','Bogota','jumanja@gmail.com')" ,

		      "poblar_usuarios" => "INSERT INTO `sisga`.`usuarios` " .
                               "(`frat`, `id`, `usuario`, `apellidos`, " .
															 "`nombres`, `password`, `email`, `servicio`, " .
															 "`token`, `tokenexpira`, `estado`) VALUES " .
															 "('demo', 1, 'admin', 'Del Sistema', " .
															 "'Administrador', " .
															 "'$2y$10\$kR0suOkr3Qx8bbqeLzDDyey54FcRyOgMm2p3d3PyLjCONLKWtWFju', " .
															 "'jumanja@gmail.com', 'A', " .
															 "'$2y$10\$yZGPGWIz2nV5SxzxHYJi4OjAuUWRoPtKORQ1xxDl2LusKu2IYAGyG', " .
															 "'2018-10-25 15:33:27', 'A');"
		);



		//Ahora ejecute cada sentencia para crear cada tabla
		foreach($rows as $key => $value) {
			  //if( $key == "poblar_fraternidades" ){
					echo "SQL=" . $key . "...";
					$conn->exec($value);
					echo "El SQL " . $key . " ha sido ejecutado.";
			    echo "<br>";

				//}
		}
		echo "<h3>Proceso Terminado. Ahora debes poder hacer login con admin</h3>";
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
?>
