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
-- Table structure for table `actas`
--

DROP TABLE IF EXISTS `actas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actas` (
  `frat` varchar(15) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `tipoacta` varchar(10) NOT NULL,
  `tema` text NOT NULL,
  `lugar` varchar(30) NOT NULL,
  `objetivos` text NOT NULL,
  `responsable` varchar(25) NOT NULL,
  `conclusiones` text NOT NULL,
  `fechasig` datetime DEFAULT NULL,
  `lugarsig` varchar(30) NOT NULL,
  `desarrollo` text NOT NULL,
  `creacion` datetime NOT NULL,
  `progreso` datetime NOT NULL,
  `preliminar` datetime NOT NULL,
  `retiro` datetime NOT NULL,
  `aprobacion` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fx_lug_idx` (`lugar`),
  KEY `fx_tipacta_idx` (`tipoacta`),
  KEY `fx_lug2_idx` (`lugarsig`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actas`
--

LOCK TABLES `actas` WRITE;
/*!40000 ALTER TABLE `actas` DISABLE KEYS */;
/*!40000 ALTER TABLE `actas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asistentes`
--

DROP TABLE IF EXISTS `asistentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asistentes` (
  `idacta` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `asistente` varchar(25) NOT NULL,
  `estado` char(1) NOT NULL,
  `servicio` varchar(10) NOT NULL,
  `tiposerv` varchar(15) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `asistente_UNIQUE` (`idacta`,`asistente`),
  KEY `fx_serv_idx` (`servicio`),
  KEY `fx_asis_idx` (`asistente`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistentes`
--

LOCK TABLES `asistentes` WRITE;
/*!40000 ALTER TABLE `asistentes` DISABLE KEYS */;
/*!40000 ALTER TABLE `asistentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comentarios` (
  `idacta` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `asistente` varchar(25) NOT NULL,
  `estado` char(1) NOT NULL,
  `text` text NOT NULL,
  `fechahora` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `asistente_UNIQUE` (`idacta`,`asistente`,`fechahora`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etiquetas`
--

DROP TABLE IF EXISTS `etiquetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etiquetas` (
  `frat` varchar(15) NOT NULL,
  `etiqueta` varchar(45) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `etiq_UNIQUE` (`etiqueta`),
  KEY `fx_frat_idx` (`frat`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etiquetas`
--

LOCK TABLES `etiquetas` WRITE;
/*!40000 ALTER TABLE `etiquetas` DISABLE KEYS */;
INSERT INTO `etiquetas` VALUES ('si','Actas',1,'A');
/*!40000 ALTER TABLE `etiquetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etiquetasacta`
--

DROP TABLE IF EXISTS `etiquetasacta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etiquetasacta` (
  `idacta` int(11) NOT NULL,
  `etiqueta` varchar(45) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `etiqacta_UNIQUE` (`idacta`,`etiqueta`),
  KEY `fx_etiq_idx` (`etiqueta`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etiquetasacta`
--

LOCK TABLES `etiquetasacta` WRITE;
/*!40000 ALTER TABLE `etiquetasacta` DISABLE KEYS */;
/*!40000 ALTER TABLE `etiquetasacta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fraternidades`
--

DROP TABLE IF EXISTS `fraternidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fraternidades` (
  `frat` varchar(15) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `estado` char(1) NOT NULL,
  `logo` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `ciudad` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fraterni_UNIQUE` (`frat`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fraternidades`
--

LOCK TABLES `fraternidades` WRITE;
/*!40000 ALTER TABLE `fraternidades` DISABLE KEYS */;
INSERT INTO `fraternidades` VALUES ('si',1,'Fraternidad Laudato Si','A','logo_laudatosi_peq.png','San Antonio Norte','Bogotá','jumanja@gmail.com');
/*!40000 ALTER TABLE `fraternidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lugares`
--

DROP TABLE IF EXISTS `lugares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lugares` (
  `frat` varchar(15) NOT NULL,
  `lugar` varchar(45) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lugares_UNIQUE` (`lugar`),
  KEY `fk_frats_idx` (`frat`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lugares`
--

LOCK TABLES `lugares` WRITE;
/*!40000 ALTER TABLE `lugares` DISABLE KEYS */;
INSERT INTO `lugares` VALUES ('si','Seminario',1,'A');
/*!40000 ALTER TABLE `lugares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificaciones` (
  `idacta` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  `estadoacta` char(1) NOT NULL,
  `origen` varchar(15) NOT NULL,
  `destino` varchar(15) NOT NULL,
  `fechahora` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lugares_UNIQUE` (`idacta`,`fechahora`,`destino`),
  KEY `fx_origen_idx` (`origen`),
  KEY `fx_destino_idx` (`destino`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicios` (
  `servicio` varchar(10) NOT NULL,
  `tiposerv` varchar(15) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `servicios_UNIQUE` (`servicio`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES ('A','A',1,'Administración','A'),('P','I',2,'Presidencia','A'),('S','I',3,'Secretaría','A'),('T','I',4,'Tesorería','A'),('F','I',5,'Formación','A'),('E','I',6,'Espiritualidad','A'),('R','V',7,'Regional','A'),('N','V',8,'Nacional','A');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tareas`
--

DROP TABLE IF EXISTS `tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tareas` (
  `idacta` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  `text` text NOT NULL,
  `usuario` varchar(25) NOT NULL,
  `creada` datetime NOT NULL,
  `inicioplan` date NOT NULL,
  `finalplan` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fx_usuari_idx` (`usuario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tareas`
--

LOCK TABLES `tareas` WRITE;
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoactas`
--

DROP TABLE IF EXISTS `tipoactas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipoactas` (
  `frat` varchar(15) NOT NULL,
  `tipo` varchar(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipoactas_UNIQUE` (`tipo`),
  KEY `fk_frat_idx` (`frat`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoactas`
--

LOCK TABLES `tipoactas` WRITE;
/*!40000 ALTER TABLE `tipoactas` DISABLE KEYS */;
INSERT INTO `tipoactas` VALUES ('si','N','Normal',1,'A'),('si','J','De Junta',2,'A');
/*!40000 ALTER TABLE `tipoactas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `frat` varchar(15) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(25) NOT NULL,
  `apellidos` text NOT NULL,
  `nombres` text NOT NULL,
  `password` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `servicio` varchar(10) NOT NULL,
  `token` varchar(100) NOT NULL,
  `tokenexpira` datetime NOT NULL,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`),
  KEY `fk_frats` (`frat`),
  KEY `fk_serv_idx` (`servicio`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('si',1,'admin','Del Sistema','Administrador','$2y$10$kR0suOkr3Qx8bbqeLzDDyey54FcRyOgMm2p3d3PyLjCONLKWtWFju','jumanja@gmail.com','A','$2y$10$JNhcqtI.sQpBe5fX0ZVua.LkIiC3fe6It.9P3KGsuSd9JopeqjT/2','2018-11-18 15:50:01','A'),('si',2,'presi','Local','Presidencia','$2y$10$ut1P.Piw7pmkom8Zrs/zyegaA3HJfuX5xCvZl7JG0QlalDz4bMTEy','jumanja@gmail.com','P','$2y$10$mNP8SxdMMPhgiPbcasp/8.BgNvTZbXfT1/DUfYYCdqyp/wKYvd.Be','2018-11-18 16:03:35','A'),('si',3,'secre','Local','Secretaría','$2y$10$yknXWS61EsVcbQVwKuyX7OLOhtCs8DhKcVYf0yuebpYq6JaFPdyua','jumanja@gmail.com','S','$2y$10$bWAoHFKPG2TXcr6GeisKqOkG5k7dJN0wVWL0AidvAGnqX.uVdL2Xi','2018-11-18 16:03:44','A'),('si',4,'teso','Local','Tesorería','$2y$10$G.OdXgPz5mGlsbNb2BlFOe3zGhp1RLYYiKZQW4Ash.VGi5z81PEhW','jumanja@gmail.com','T','','0000-00-00 00:00:00','A'),('si',5,'forma','Local','Formación','$2y$10$x1rPMDGJ3T0/zbyh/t7Zlu0oFZnFygN4sjjYhJmPilwoGGncI0dcW','jumanja@gmail.com','F','','0000-00-00 00:00:00','A'),('si',6,'espi','Espiritual','Asistencia','$2y$10$d3nVx9KE7gQLA31fy15W2uyEe34HT2p1AFWXZXk82GxKkiDQI6Dwq','jumanja@gmail.com','E','','0000-00-00 00:00:00','A'),('si',7,'regio','Regional','Junta','$2y$10$OVImXXduJADtF54lUQUy.eRYEWuIA8Trm1C28GMf8cOrKFVIRzdyG','jumanja@gmail.com','R','','0000-00-00 00:00:00','A'),('si',8,'nacio','Nacional','Junta','$2y$10$KLOEeUDppRMZXsSpUsZho.oN3Bb/sWjxYcJxUt1FDyhHFBjatBTyG','jumanja@gmail.com','N','','0000-00-00 00:00:00','A');
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

-- Dump completed on 2018-11-18 15:04:48
