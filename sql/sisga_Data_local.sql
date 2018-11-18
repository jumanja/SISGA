-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: sisga
-- ------------------------------------------------------
-- Server version	5.1.69

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `actas`
--

LOCK TABLES `actas` WRITE;
/*!40000 ALTER TABLE `actas` DISABLE KEYS */;
INSERT INTO `actas` VALUES ('demo',7,'R','2018-11-04 17:00:00','N','Tema de Resil 7 otro','2','Mis Objetivos otro mas','s','Mis Conclusiones otro menos','2018-11-30 20:00:00','1','El desarrollo dela reunión.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','2018-11-14 23:03:55','0000-00-00 00:00:00'),('demo',6,'R','2018-11-04 16:36:00','N','Varios 6','2','obj','s','conc','2018-11-04 19:30:00','6','','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',8,'R','2018-11-04 17:00:00','N','Resil 8','2','Mis Objetivos','s','Mis Conclusiones','2018-11-30 20:00:00','1','Este es el desarrollo de la reunión que llevamos a cabo y que originó el acta, se incluyen varias líneas con las que se espera el documento PDF pueda realizar su labor de cálculo de varias líneas y extenderse el contenido del acta a varias páginas, al menos dos páginas deberían generarse junto con el resto de los cambpos y encabezado ya agregados.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',9,'R','2018-11-04 17:00:00','N','Resil 9','2','Mis Objetivos','s','Mis Conclusiones','2018-11-30 20:00:00','1','','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',10,'R','2018-11-04 17:00:00','N','Resil 10','2','Mis Objetivos','s','Mis Conclusiones','2018-11-30 20:00:00','1','','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',11,'R','2018-11-04 17:00:00','N','Resil 11','2','Mis Objetivos','s','Mis Conclusiones','2018-11-30 20:00:00','1','','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',12,'R','2018-11-04 17:00:00','N','Resil 12','2','Mis Objetivos','s','Mis Conclusiones','2018-11-30 20:00:00','1','','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',13,'G','2018-11-04 17:00:00','N','Resil 13','2','Mis Objetivos de la 13','s','Mis Conclusiones del acta 13','2018-11-30 20:00:00','1','','0000-00-00 00:00:00','2018-11-17 16:01:03','2018-11-17 15:59:50','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',14,'G','2018-11-05 17:30:00','N','El Retiro','1','El objetivo es el retiro espiritual','s','La conclusión es la fecha del retiro','2018-12-13 18:30:00','6','','0000-00-00 00:00:00','2018-11-17 16:01:18','2018-11-17 15:59:56','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',15,'R','2018-10-25 09:30:00','N','La Capacitación del SISGA','1','obj acta capac','s','conc acta capac','2018-12-02 20:30:00','6','','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',16,'G','2018-10-29 19:30:00','N','Replicación de Capacitación','6','Replicar capacitación','s','Usaremos SISGA','2018-12-02 20:30:00','6','','0000-00-00 00:00:00','2018-11-17 11:53:04','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',17,'G','2018-10-29 18:30:00','N','Nueva Acta','6','Renovar Objetivos','s','Mejorar Conclusiones','2018-11-30 18:30:00','2','Desarrollo de la 17','0000-00-00 00:00:00','2018-11-15 09:13:41','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',18,'F','2018-09-30 11:00:00','N','Nuevo Software','1','Presentación del nuevo Software','s','Se va a recibir el progreso periódicamente junto con el manual de usuario actualizado','2018-11-25 11:00:00','6','Este es el desarrollo de la reunión acta 18 que llevamos a cabo y que originó el acta, se incluyen varias líneas con las que se espera el documento PDF pueda realizar su labor de cálculo de varias líneas y extenderse el contenido del acta a varias páginas, al menos dos páginas deberían generarse junto con el resto de los cambpos y encabezado ya agregados.','2018-11-01 09:00:00','2018-11-17 12:42:09','2018-11-17 12:42:50','0000-00-00 00:00:00','2018-11-17 15:16:06'),('demo',19,'G','2018-10-22 16:00:00','N','Encuentro Regional','1','Mi objetivos 19','s','Mis conclusiones 19','2018-11-26 18:00:00','6','Inicia la reunión. Se Desarrolla la Reunión. Termina la Reunión.','0000-00-00 00:00:00','2018-11-15 09:22:36','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',20,'G','2018-10-15 17:32:00','N','Temas Varios','6','Se requiere buscar fondos para realizar una animación. Los fondos se usarán para contratar voces especializadas','s','No se podrán realizar actividades sin la aprobación del Guardián del Seminario. La prioridad serán los fondos para el Encuentro 2019','2018-12-16 18:00:00','6','','0000-00-00 00:00:00','2018-11-17 16:01:43','2018-11-17 16:00:01','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',21,'G','2018-10-20 15:20:00','N','Vinculación nuevos aspirante Fraternidad','2','Elaborar plan de vinculación','s','Se necesitará más tiempo','2018-12-16 16:20:00','6','','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',22,'G','2018-08-17 11:00:00','J','Varios','1','mis hfhfhfj','s','de una vez','2018-12-04 15:00:00','1','','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',23,'G','2018-11-13 18:00:00','J','Primera Acta de junta Formal','6','El objetivo principal','s','La conclusión','2018-11-30 18:30:00','6','El desarrollo','2018-11-14 18:30:35','2018-11-14 18:30:35','2018-11-14 23:05:27','0000-00-00 00:00:00','0000-00-00 00:00:00'),('demo',24,'R','2018-11-28 05:33:00','N','por error','2','','s','','0000-00-00 00:00:00','null','','2018-11-17 11:33:57','2018-11-17 11:33:57','0000-00-00 00:00:00','2018-11-17 11:35:28','0000-00-00 00:00:00'),('demo',25,'F','2018-11-01 00:00:00','J','Acta de Junta','2','','s','','0000-00-00 00:00:00','null','','2018-11-17 11:56:17','2018-11-17 12:05:02','2018-11-17 12:05:13','0000-00-00 00:00:00','2018-11-17 12:05:28');
/*!40000 ALTER TABLE `actas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `asistentes`
--

LOCK TABLES `asistentes` WRITE;
/*!40000 ALTER TABLE `asistentes` DISABLE KEYS */;
INSERT INTO `asistentes` VALUES (18,445,'secretaria','F','S','I','2018-11-17 12:00:00'),(18,444,'s','F','S','I','2018-11-17 12:00:00'),(18,443,'presiret','F','P','I','2018-11-17 12:00:00'),(18,442,'presidenta','N','P','I','2018-11-17 12:00:00'),(19,311,'s','N','S','I','0000-00-00 00:00:00'),(19,310,'presiret','S','P','I','0000-00-00 00:00:00'),(19,309,'presidenta','S','P','I','0000-00-00 00:00:00'),(20,464,'presiret','S','P','I','2018-11-17 16:00:00'),(20,465,'s','N','S','I','2018-11-17 16:00:00'),(20,466,'secretaria','S','S','I','2018-11-17 16:00:00'),(20,467,'tesorero','S','T','I','2018-11-17 16:00:00'),(19,312,'secretaria','N','S','I','0000-00-00 00:00:00'),(21,194,'tesorero','N','T','I','0000-00-00 00:00:00'),(21,193,'secretaria','S','S','I','0000-00-00 00:00:00'),(21,190,'presidenta','S','P','I','0000-00-00 00:00:00'),(21,191,'presiret','N','P','I','0000-00-00 00:00:00'),(21,192,'s','S','S','I','0000-00-00 00:00:00'),(21,195,'formadora','S','F','I','0000-00-00 00:00:00'),(21,196,'espiritual','N','E','I','0000-00-00 00:00:00'),(22,197,'presidenta','S','P','I','0000-00-00 00:00:00'),(22,198,'secretaria','N','S','I','0000-00-00 00:00:00'),(22,199,'tesorero','S','T','I','0000-00-00 00:00:00'),(22,200,'formadora','N','F','I','0000-00-00 00:00:00'),(22,201,'espiritual','S','E','I','0000-00-00 00:00:00'),(22,202,'presiret','N','P','I','0000-00-00 00:00:00'),(22,203,'s','N','S','I','0000-00-00 00:00:00'),(19,313,'tesorero','N','T','I','0000-00-00 00:00:00'),(23,248,'s','N','S','I','2018-11-14 23:00:00'),(23,246,'presidenta','S','P','I','2018-11-14 23:00:00'),(23,247,'presiret','N','P','I','2018-11-14 23:00:00'),(23,249,'secretaria','S','S','I','2018-11-14 23:00:00'),(23,250,'tesorero','S','T','I','2018-11-14 23:00:00'),(23,251,'formadora','N','F','I','2018-11-14 23:00:00'),(23,252,'espiritual','S','E','I','2018-11-14 23:00:00'),(19,314,'formadora','S','F','I','0000-00-00 00:00:00'),(19,315,'espiritual','S','E','I','0000-00-00 00:00:00'),(24,316,'presidenta','N','P','I','0000-00-00 00:00:00'),(24,317,'secretaria','N','S','I','0000-00-00 00:00:00'),(24,318,'tesorero','N','T','I','0000-00-00 00:00:00'),(24,319,'formadora','N','F','I','0000-00-00 00:00:00'),(24,320,'espiritual','N','E','I','0000-00-00 00:00:00'),(24,321,'presiret','N','P','I','0000-00-00 00:00:00'),(24,322,'s','N','S','I','0000-00-00 00:00:00'),(20,463,'presidenta','S','P','I','2018-11-17 16:00:00'),(25,364,'espiritual','N','E','I','2018-11-17 12:00:00'),(25,363,'formadora','N','F','I','2018-11-17 12:00:00'),(25,362,'tesorero','S','T','I','2018-11-17 12:00:00'),(25,361,'secretaria','N','S','I','2018-11-17 12:00:00'),(25,358,'presidenta','N','P','I','2018-11-17 12:00:00'),(25,359,'presiret','N','P','I','2018-11-17 12:00:00'),(25,360,'s','S','S','I','2018-11-17 12:00:00'),(20,468,'formadora','N','F','I','2018-11-17 16:00:00'),(20,469,'espiritual','S','E','I','2018-11-17 16:00:00'),(18,448,'espiritual','F','E','I','2018-11-17 12:00:00'),(18,447,'formadora','F','F','I','2018-11-17 12:00:00'),(18,446,'tesorero','N','T','I','2018-11-17 12:00:00');
/*!40000 ALTER TABLE `asistentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (18,1,'presidenta','A','Por favor tener en cuenta que el Presupuesto 2019 debe incluir el presupuesto del encuentro 2019 en Cali, para que vaya toda la Fraternidad','2018-11-01 10:05:23'),(18,2,'tesorero','A','¿Luego no se realizará según lo que se recoja en las Actividades ?','2018-11-01 12:10:09'),(18,3,'tesorero','A','.. Así fue como lo hicimos para 2018...','2018-11-01 12:10:15'),(18,4,'tesorero','A','Por favor confirmar... gracias!','2018-11-02 12:12:16'),(18,5,'presidenta','A','Para 2019 intentaremos dejarlo por presupuesto, si hay variación en la cantidad de personas haríamos más actividades.','2018-11-02 13:15:00'),(18,6,'tesorero','A','Ok, gracias.','2108-11-03 14:10:11'),(13,7,'formadora','A','Favor revisar los asistentes','2018-11-17 15:38:15'),(14,8,'formadora','A','Oye pero no me aparecen todavía','2018-11-17 15:54:13'),(20,9,'formadora','A','Favor seguir revisando o reportar al programador.','2018-11-17 15:54:30'),(13,10,'formadora','A','bueno, todavía nada','2018-11-17 15:55:28'),(14,11,'formadora','A','Ahorita apareció uno','2018-11-17 15:55:40'),(20,12,'formadora','A','O sino, pues retirar el acta pues no debe aparecer eso así.Y mira que estoy tratando de adicionar más lineas.A ver como sale.','2018-11-17 15:56:14'),(13,13,'formadora','A','Ahora sí, ya salió,.Las líneas las reemplaza.pero de resto, todo bien.','2018-11-17 16:01:03'),(14,14,'formadora','A','Probando','2018-11-17 16:01:18'),(20,15,'formadora','A','Otro comentario mas, creo terminado 4:01pm Nov 17 de 2018','2018-11-17 16:01:43');
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `etiquetas`
--

LOCK TABLES `etiquetas` WRITE;
/*!40000 ALTER TABLE `etiquetas` DISABLE KEYS */;
INSERT INTO `etiquetas` VALUES ('demo','Encuentro',1,'A'),('demo','Fondos',2,'A'),('demo','Animación',3,'A'),('demo','Retiro',4,'A'),('demo','Capacitación',5,'A');
/*!40000 ALTER TABLE `etiquetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `etiquetasacta`
--

LOCK TABLES `etiquetasacta` WRITE;
/*!40000 ALTER TABLE `etiquetasacta` DISABLE KEYS */;
INSERT INTO `etiquetasacta` VALUES (10,'',1,'A'),(23,'',2,'A'),(12,'Retiro',3,'A'),(12,'Encuentro',4,'A'),(12,'Animación',5,'A'),(13,'Encuentro',192,'A'),(13,'Capacitación',191,'A'),(16,'Capacitación',11,'A'),(13,'Retiro',194,'A'),(13,'Fondos',193,'A'),(13,'Animación',190,'A'),(7,'Capacitación',128,'A'),(17,'Capacitación',142,'A'),(18,'Animación',164,'A'),(18,'Fondos',165,'A'),(20,'Animación',195,'A'),(20,'Fondos',196,'A'),(19,'Fondos',161,'A'),(22,'Encuentro',116,'A'),(22,'Fondos',117,'A'),(19,'Encuentro',160,'A'),(7,'Encuentro',129,'A'),(17,'Fondos',143,'A');
/*!40000 ALTER TABLE `etiquetasacta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `fraternidades`
--

LOCK TABLES `fraternidades` WRITE;
/*!40000 ALTER TABLE `fraternidades` DISABLE KEYS */;
INSERT INTO `fraternidades` VALUES ('demo',1,'Fraternidad Demostración','A','vacio.png','Calle la Sierra','Bogota','jumanja@gmail.com'),('otra',2,'Segunda Fraternidad','I','vacio.png','También Conocida','Barranquilla','jumanja@hotmail.com'),('adic',3,'Fraternidad Adicional','R','nuevo.png','','','');
/*!40000 ALTER TABLE `fraternidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `lugares`
--

LOCK TABLES `lugares` WRITE;
/*!40000 ALTER TABLE `lugares` DISABLE KEYS */;
INSERT INTO `lugares` VALUES ('demo','Seminario',1,'A'),('demo','Capilla',2,'A'),('otra','Sede OFS',3,'A'),('demo','Otro lugar',4,'I'),('demo','Salón Comunal',5,'R'),('demo','Lugar Adicional',6,'A'),('demo','Apto',7,'R');
/*!40000 ALTER TABLE `lugares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
INSERT INTO `notificaciones` VALUES (19,2,'P','G','s','presidenta','2018-11-15 09:22:36'),(19,3,'P','G','s','presiret','2018-11-15 09:22:36'),(19,4,'P','G','s','formadora','2018-11-15 09:22:36'),(19,5,'P','G','s','espiritual','2018-11-15 09:22:36'),(25,13,'P','M','s','tesorero','2018-11-17 12:05:13'),(25,12,'P','M','s','s','2018-11-17 12:05:13'),(20,54,'P','M','s','presidenta','2018-11-17 16:00:01'),(20,55,'P','M','s','presiret','2018-11-17 16:00:01'),(20,56,'P','M','s','secretaria','2018-11-17 16:00:01'),(20,57,'P','M','s','tesorero','2018-11-17 16:00:01'),(20,58,'P','M','s','espiritual','2018-11-17 16:00:01'),(18,43,'P','F','formadora','espiritual','2018-11-17 15:16:06'),(18,42,'P','F','formadora','formadora','2018-11-17 15:16:06'),(18,41,'P','F','formadora','secretaria','2018-11-17 15:16:06'),(18,40,'P','F','formadora','s','2018-11-17 15:16:06'),(18,39,'P','F','formadora','presiret','2018-11-17 15:16:06');
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES ('A','A',1,'Administrador','A'),('P','I',2,'Presidente','A'),('S','I',3,'Secretaria','A'),('T','I',4,'Tesorero','A'),('F','I',5,'Formador','A'),('E','I',6,'Espiritual','A'),('R','V',7,'Regional','A'),('N','V',8,'Nacional','A'),('V','V',9,'Visitante','I');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tareas`
--

LOCK TABLES `tareas` WRITE;
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
INSERT INTO `tareas` VALUES (18,46,'A','Cambiar apellido','s','2018-11-08 08:22:57','2018-11-08','2018-11-16'),(19,42,'A','Explicación de lo visto en el encuentro','formadora','2018-11-08 09:55:58','2018-11-28','2018-11-24'),(20,51,'A','Pedir autorización al Guardían','presidenta','2018-11-08 12:34:41','2018-11-28','2018-11-30'),(20,52,'A','Elaborar el Acta','secretaria','2018-11-08 12:34:25','2018-11-08','2018-11-08'),(19,41,'A','Contactarse con los nuevos Miembros de la Junta Regional','secretaria','2018-11-08 09:57:22','2018-11-19','2018-11-30'),(21,27,'A','Comunicar los planes anteriores','presiret','2018-11-08 13:21:02','2018-11-18','2018-11-20'),(22,28,'A','Otra','secretaria','2018-11-11 15:28:50','2018-11-29','2018-11-30'),(18,45,'A','Revisión de actas','secretaria','2018-11-08 08:36:58','2018-11-29','2018-11-10'),(23,40,'A','Revisión de material del acta correspondiente a su servicio','espiritual','2018-11-14 18:29:59','2018-11-14','2018-11-14');
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tipoactas`
--

LOCK TABLES `tipoactas` WRITE;
/*!40000 ALTER TABLE `tipoactas` DISABLE KEYS */;
INSERT INTO `tipoactas` VALUES ('demo','N','Normal',1,'A'),('demo','O','Otra',5,'I'),('demo','J','Junta',4,'A');
/*!40000 ALTER TABLE `tipoactas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('demo',1,'admin','Del Sistema','Administrador','$2y$10$a/j70S8aDh3cwNi2J4UmeeE7OcesoUTp0KXoh87B1MbX4DoGO0SZa','jumanja@gmail.com','A','$2y$10$8uxZTHfNrZL82gKup1iXOuSVDNxAmAZPj0MT4RRhruqjJG7OJ3v1e','2018-11-17 15:45:03','A'),('demo',2,'presidenta','Presidenta','Presidenta','$2y$10$a/j70S8aDh3cwNi2J4UmeeE7OcesoUTp0KXoh87B1MbX4DoGO0SZa','simple2@email.com','P','$2y$10$4NfZSJdO2G3HNYBvNDclw.pwyIO6Cai1NbbA2w/IJwcV.hWhZF.l2','2018-11-10 14:11:41','A'),('demo',13,'jumanja','Manjarres','Juan','$2y$10$a/j70S8aDh3cwNi2J4UmeeE7OcesoUTp0KXoh87B1MbX4DoGO0SZa','jumanja@gmail.com','A','','0000-00-00 00:00:00','R'),('demo',3,'secretaria','Apellidos Secretaria','Nombres Secretaria','$2y$10$9Jdu2a5VL2Xq3DqPatTKkOviMMutujM./bXWbB7mRKeVTA5g8QMmK','secre@demo.com','S','$2y$10$wOid/OBm8CAxJZZxm2KXae6peeoIpgGv5fdad7KaWHeHtMxSjwjZe','2018-11-17 15:42:24','A'),('demo',4,'tesorero','Apellidos Tesorero','Nombres Tesorero','$2y$10$VvLfuqV0GvloBd6o2ykQz.dLTNy9m1N6fypotB/D9zuGxcpeQYJu6','teso@demo.com','T','$2y$10$KfrJzeaf8LKCkW1MG4584uFdFQibUa.ttApo1esEINLQ70b.tfnNS','2018-11-17 14:23:50','A'),('demo',5,'formadora','Ardila2','Catalina','$2y$10$FR3XS3tjdSdOHFnSniYzd.au1p61O.swJLIyjd/BWgGYM2Gr6cHZe','forma@demo.com','F','$2y$10$Nfnbgevk/jRyDnf1gXuaVOxlTSzirKtjFa0CRBXnDQtKrjpk8GuSS','2018-11-17 17:01:34','A'),('demo',10,'espiritual','Espiritual','Asistente','$2y$10$LseMu92zjnKlwct/jpJta.bf5QMdH09Nn/l/H7eSzmlT.7nLg9tu6','jumanja@gmail.com','E','$2y$10$1freLnXmSi7Q4mNBck7w9u5lcrYrmcXZwzuBwdiBBeSSuHEg5VMD2','2018-11-17 15:41:31','A'),('demo',7,'regional','Apellidos Regional','Nombres Regional','$2y$10$SWfvWrRehNIZueb9vMhVDuMR/qGrNn2n0bfEQxxrd3M1fjbZaSs1u','region@demo.com','R','$2y$10$Xxa5II5OZFnd1Jdk6q/Cjen98yD8V6BAADZ/bY6XQJlAhwOTgRFrW','2018-11-11 16:53:38','A'),('demo',8,'nacional','Apellidos Nacional','Nombres Nacional','$2y$10$exmoO/3ALQinyqdVHHabbOoWFVSSfvgkhR6y30ick629KHC0g55Ma','nacion@demo.com','N','','2018-10-21 14:03:24','A'),('otra',12,'jmanjarres','Manjarres','Juan','$2y$10$Z.cSgZewe7DYW/TfPULSo.qOGwwlfMrwyZ56gX681Wjoxvn0WIWi2','jumanja@gmail.com','A','$2y$10$rhr45hzuttWeRdft47nq8.nlg8f5Caagti4ThlqtY7WpNdzw4.9zG','2018-11-11 16:59:07','A'),('demo',14,'presiret','Presidente Antiguo','Ya Retirado','$2y$10$cujBhn5ovYSpLFiI59gI5uTdLtb15KxcV16CkCFh.RF4kZGPwq/eS','','P','$2y$10$gdmBSYKUSZNTc1ycWFGRGOQ.0EN/auNCHYDSi6trRVx5Z.eQ56E66','2018-11-17 15:52:25','A'),('demo',15,'s','Apellidois','Nombres','$2y$10$0F9hnRYXW/XNX6i7nYOLRO819t.SJxqvKeTtC0KRLZd8jFtId2Hnu','jumanja@hotmail.com','S','$2y$10$fu9BuH0qCeF9gke8XrpZruv5gctZ/yQv1W/V/FT1gK1HeqHrsejcq','2018-11-17 17:02:52','A');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-17 16:04:35
