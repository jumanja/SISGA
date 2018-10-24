CREATE SCHEMA `sisga` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `actas` (
  `frat` VARCHAR(15) NOT NULL ,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  `numero` int(11) NOT NULL,
  `fecha` DATE NOT NULL,
  `tipoacta` VARCHAR(10) NOT NULL,
  `tema` text NOT NULL,
  `lugar`VARCHAR(30) NOT NULL,
  `objetivos` text NOT NULL,
  `responsable` VARCHAR(25) NOT NULL,
  `conclusiones` text NOT NULL,
  `fechasig` DATE NOT NULL ,
  `lugarsig` VARCHAR(30) NOT NULL ,
  `email` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `asistentes` (
  `idacta` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `asistente` VARCHAR(25) NOT NULL,
  `estado` char(1) NOT NULL,
  `servicio` VARCHAR(10) NOT NULL,
  `tiposerv` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `comentarios` (
  `idacta` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `asistente` VARCHAR(25) NOT NULL,
  `estado` char(1) NOT NULL,
  `text` text NOT NULL,
  `fechahora` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `etiquetas` (
  `etiqueta` VARCHAR(45) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `etiquetasacta` (
  `idacta` int(11) NOT NULL,
  `etiqueta` VARCHAR(45) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `fraternidades` (
  `frat` VARCHAR(15) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `estado` char(1) NOT NULL,
  `logo` VARCHAR(45) NOT NULL ,
  `direccion` VARCHAR(45) NOT NULL ,
  `ciudad` VARCHAR(45) NOT NULL ,
  `email` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `lugares` (
  `lugar` VARCHAR(45) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `notificaciones` (
  `idacta` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  `estadoacta` char(1) NOT NULL,
  `origen` VARCHAR(15) NOT NULL,
  `destino` VARCHAR(15) NOT NULL,
  `fechahora` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `servicios` (
  `servicio`  VARCHAR(10) NOT NULL,
  `tiposerv` VARCHAR(15) NOT NULL ,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `tareas` (
  `idacta` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  `text` text NOT NULL,
  `usuario` VARCHAR(25) NOT NULL,
  `creada` DATETIME NOT NULL,
  `inicioplan` DATE NOT NULL,
  `finalplan` DATE NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `tipoactas` (
  `tipo` VARCHAR(11) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `frat` VARCHAR(15) NOT NULL ,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(25) NOT NULL,
  `apellidos` text NOT NULL,
  `nombres` text NOT NULL,
  `password` text NOT NULL,
  `email` VARCHAR(100) NOT NULL ,
  `servicio`  VARCHAR(10) NOT NULL,
  `token` VARCHAR(100) NOT NULL,
  `tokenexpira` DATETIME NOT NULL,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*
Indexes and Constraints
*/
/* fraternidades */
ALTER TABLE `sisga`.`fraternidades`
ADD UNIQUE INDEX `frat_UNIQUE` (`frat` ASC);

/* servicios */
ALTER TABLE `sisga`.`servicios`
ADD UNIQUE INDEX `servicios_UNIQUE` (`servicio` ASC);

/* usuarios */
ALTER TABLE `sisga`.`usuarios`
ADD UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC);

ALTER TABLE `sisga`.`usuarios`
ADD FOREIGN KEY fk_fraternidades(frat)
REFERENCES fraternidades(frat)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `sisga`.`usuarios`
ADD FOREIGN KEY fk_servicios(servicio)
REFERENCES servicios(servicio)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `sisga`.`actas`
ADD UNIQUE INDEX `numero_UNIQUE` (`frat` ASC, `numero` ASC);

ALTER TABLE `sisga`.`asistentes`
ADD UNIQUE INDEX `asistente_UNIQUE` (`idacta` ASC, `asistente` ASC);

ALTER TABLE `sisga`.`comentarios`
ADD UNIQUE INDEX `asistente_UNIQUE` (`idacta` ASC, `asistente` ASC);

ALTER TABLE `sisga`.`etiquetasacta`
ADD UNIQUE INDEX `etiqacta_UNIQUE` (`idacta` ASC, `etiqueta` ASC);

ALTER TABLE `sisga`.`fraternidades`
ADD UNIQUE INDEX `fraterni_UNIQUE` (`frat` ASC);

ALTER TABLE `sisga`.`lugares`
ADD UNIQUE INDEX `lugares_UNIQUE` (`lugar` ASC);

ALTER TABLE `sisga`.`notificaciones`
ADD UNIQUE INDEX `lugares_UNIQUE` (`idacta` ASC, `fechahora` ASC);

ALTER TABLE `sisga`.`tareas`
ADD UNIQUE INDEX `tareas_UNIQUE` (`idacta` ASC, `creada` ASC);

ALTER TABLE `sisga`.`tipoactas`
ADD UNIQUE INDEX `tipoactas_UNIQUE` (`tipo` ASC);

/*
Poblar servicios, se requiere después de cerar la Bd, o de no, no deja entar
*/
INSERT INTO `sisga`.`servicios` (`servicio`, `tiposerv`, `id`, `nombre`, `estado`) VALUES ('A', 'A', '1', 'Administrador', 'A');
