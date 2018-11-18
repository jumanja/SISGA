<?php
// Declaramos el fichero de conexión
include("sql_connect.php");
try {
    $conn = new PDO("mysql:host=$servidor;dbname=$nombreBD", $usuario, $password);
    // Establecer el modo de error PDO a excepción
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		//Arreglo de tablas para crear, No se borrarán pues
		//por error se podría perder información.

		$tables = array(
					"actas" => "CREATE TABLE `actas` (" .
			  						 "`frat` varchar(15) NOT NULL," .
			  						 "`id` int(11) NOT NULL AUTO_INCREMENT," .
			  						 "`estado` char(1) NOT NULL," .
			  						 "`fecha` datetime DEFAULT NULL," .
			  						 "`tipoacta` varchar(10) NOT NULL," .
			  						 "`tema` text NOT NULL," .
			  						 "`lugar` varchar(30) NOT NULL," .
			  						 "`objetivos` text NOT NULL," .
			  						 "`responsable` varchar(25) NOT NULL," .
			  						 "`conclusiones` text NOT NULL," .
			  						 "`fechasig` datetime DEFAULT NULL," .
			  						 "`lugarsig` varchar(30) NOT NULL," .
			  						 "`desarrollo` text NOT NULL," .
			  						 "`creacion` datetime NOT NULL," .
			  						 "`progreso` datetime NOT NULL," .
			  						 "`preliminar` datetime NOT NULL," .
			  						 "`retiro` datetime NOT NULL," .
			  						 "`aprobacion` datetime NOT NULL," .
			  						 "PRIMARY KEY (`id`)," .
			  						 "KEY `fx_lug_idx` (`lugar`)," .
			  						 "KEY `fx_tipacta_idx` (`tipoacta`)," .
			  						 "KEY `fx_lug2_idx` (`lugarsig`)" .
			  						 ") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8",

		 "asistentes" => "CREATE TABLE `asistentes` (" .
	                   "`idacta` int(11) NOT NULL," .
	                   "`id` int(11) NOT NULL AUTO_INCREMENT," .
	                   "`asistente` varchar(25) NOT NULL," .
	                   "`estado` char(1) NOT NULL," .
	                   "`servicio` varchar(10) NOT NULL," .
	                   "`tiposerv` varchar(15) NOT NULL," .
	                   "`fecha` datetime NOT NULL," .
	                   "PRIMARY KEY (`id`)," .
	                   "UNIQUE KEY `asistente_UNIQUE` (`idacta`,`asistente`)," .
	                   "KEY `fx_serv_idx` (`servicio`)," .
	                   "KEY `fx_asis_idx` (`asistente`)" .
	                   ") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8",

		"comentarios" => "CREATE TABLE `comentarios` (" .
	                   "`idacta` int(11) NOT NULL," .
	                   "`id` int(11) NOT NULL AUTO_INCREMENT," .
	                   "`asistente` varchar(25) NOT NULL," .
	                   "`estado` char(1) NOT NULL," .
	                   "`text` text NOT NULL," .
	                   "`fechahora` datetime NOT NULL," .
	                   "PRIMARY KEY (`id`)," .
	                   "UNIQUE KEY `asistente_UNIQUE` (`idacta`,`asistente`,`fechahora`)" .
	                   ") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8" ,

		  "etiquetas" => "CREATE TABLE `etiquetas` (" .
	                   "`frat` varchar(15) NOT NULL," .
	                   "`etiqueta` varchar(45) NOT NULL," .
	                   "`id` int(11) NOT NULL AUTO_INCREMENT," .
	                   "`estado` char(1) NOT NULL," .
	                   "PRIMARY KEY (`id`)," .
	                   "UNIQUE KEY `etiq_UNIQUE` (`etiqueta`)," .
	                   "KEY `fx_frat_idx` (`frat`)" .
									   ") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;" ,

	"etiquetasacta" => "CREATE TABLE `etiquetasacta` (" .
	                   "`idacta` int(11) NOT NULL," .
	                   "`etiqueta` varchar(45) NOT NULL," .
	                   "`id` int(11) NOT NULL AUTO_INCREMENT," .
	                   "`estado` char(1) NOT NULL," .
	                   "PRIMARY KEY (`id`)," .
	                   "UNIQUE KEY `etiqacta_UNIQUE` (`idacta`,`etiqueta`)," .
	                   "KEY `fx_etiq_idx` (`etiqueta`)" .
	                   ") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;" ,

	"fraternidades" => "CREATE TABLE `fraternidades` (" .
	                   "`frat` varchar(15) NOT NULL," .
	                   "`id` int(11) NOT NULL AUTO_INCREMENT," .
	                   "`nombre` text NOT NULL," .
	                   "`estado` char(1) NOT NULL," .
	                   "`logo` varchar(45) NOT NULL," .
	                   "`direccion` varchar(45) NOT NULL," .
	                   "`ciudad` varchar(45) NOT NULL," .
	                   "`email` varchar(45) NOT NULL," .
	                   "PRIMARY KEY (`id`)," .
	                   "UNIQUE KEY `fraterni_UNIQUE` (`frat`)" .
	                   ") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;" ,

	      "lugares" => "CREATE TABLE `lugares` (" .
	                   "`frat` varchar(15) NOT NULL," .
	                   "`lugar` varchar(45) NOT NULL," .
	                   "`id` int(11) NOT NULL AUTO_INCREMENT," .
	                   "`estado` char(1) NOT NULL," .
	                   "PRIMARY KEY (`id`)," .
	                   "UNIQUE KEY `lugares_UNIQUE` (`lugar`)," .
	                   "KEY `fk_frats_idx` (`frat`)" .
	                   ") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;" ,

 "notificaciones" => "CREATE TABLE `notificaciones` (" .
                     "`idacta` int(11) NOT NULL," .
                     "`id` int(11) NOT NULL AUTO_INCREMENT," .
                     "`estado` char(1) NOT NULL," .
                     "`estadoacta` char(1) NOT NULL," .
                     "`origen` varchar(15) NOT NULL," .
                     "`destino` varchar(15) NOT NULL," .
                     "`fechahora` datetime NOT NULL," .
                     "PRIMARY KEY (`id`)," .
                     "UNIQUE KEY `lugares_UNIQUE` (`idacta`,`fechahora`,`destino`)," .
                     "KEY `fx_origen_idx` (`origen`)," .
                     "KEY `fx_destino_idx` (`destino`)" .
                     ") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;" ,

      "servicios" => "CREATE TABLE `servicios` (" .
                     "`servicio` varchar(10) NOT NULL," .
                     "`tiposerv` varchar(15) NOT NULL," .
                     "`id` int(11) NOT NULL AUTO_INCREMENT," .
                     "`nombre` text NOT NULL," .
                     "`estado` char(1) NOT NULL," .
                     "PRIMARY KEY (`id`)," .
                     "UNIQUE KEY `servicios_UNIQUE` (`servicio`)" .
                     ") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;",

         "tareas" => "CREATE TABLE `tareas` (" .
                     "`idacta` int(11) NOT NULL," .
                     "`id` int(11) NOT NULL AUTO_INCREMENT," .
                     "`estado` char(1) NOT NULL," .
                     "`text` text NOT NULL," .
                     "`usuario` varchar(25) NOT NULL," .
                     "`creada` datetime NOT NULL," .
                     "`inicioplan` date NOT NULL," .
                     "`finalplan` date NOT NULL," .
                     "PRIMARY KEY (`id`)," .
                     "KEY `fx_usuari_idx` (`usuario`)" .
                     ") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;",

      "tipoactas" => "CREATE TABLE `tipoactas` (" .
                     "`frat` varchar(15) NOT NULL," .
                     "`tipo` varchar(11) NOT NULL," .
                     "`nombre` varchar(45) NOT NULL," .
                     "`id` int(11) NOT NULL AUTO_INCREMENT," .
                     "`estado` char(1) NOT NULL," .
                     "PRIMARY KEY (`id`)," .
                     "UNIQUE KEY `tipoactas_UNIQUE` (`tipo`)," .
                     "KEY `fk_frat_idx` (`frat`)" .
                     ") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;",

      "usuarios" => "CREATE TABLE `usuarios` (" .
										"`frat` varchar(15) NOT NULL," .
										"`id` int(11) NOT NULL AUTO_INCREMENT," .
										"`usuario` varchar(25) NOT NULL," .
										"`apellidos` text NOT NULL," .
										"`nombres` text NOT NULL," .
										"`password` text NOT NULL," .
										"`email` varchar(100) NOT NULL," .
										"`servicio` varchar(10) NOT NULL," .
										"`token` varchar(100) NOT NULL," .
										"`tokenexpira` datetime NOT NULL," .
										"`estado` char(1) NOT NULL," .
										"PRIMARY KEY (`id`)," .
										"UNIQUE KEY `usuario_UNIQUE` (`usuario`)," .
										"KEY `fk_frats` (`frat`)," .
										"KEY `fk_serv_idx` (`servicio`)" .
										") ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"

		);

/*    // Variable sql que creará la tabla
    $sql = "CREATE TABLE alumnos(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(60) NOT NULL,
    apellidos VARCHAR(60) NOT NULL,
    email VARCHAR(60),
    fecha TIMESTAMP
    )";
*/

		//Ahora ejecute cada sentencia para crear cada tabla
		foreach($tables as $key => $value) {
		    echo "Tabla=" . $key . "...";
				$conn->exec($value);
				echo "La tabla " . $key . " ha sido creada";
		    echo "<br>";
		}
		echo "<h3>Proceso Terminado. Recuerde Poblar usuario, fraternidad, servicio</h3>";
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
?>
