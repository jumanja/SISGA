CREATE DATABASE  IF NOT EXISTS `sisga` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sisga`;
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
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=MyISAM AUTO_INCREMENT=470 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=MyISAM AUTO_INCREMENT=197 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-17 16:05:15
