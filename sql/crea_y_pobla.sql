CREATE SCHEMA `sisga` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `fraternidades` (
  `frat` VARCHAR(15) NOT NULL ,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `estado` char(1) NOT NULL,
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

/*
Poblar servicios, se requiere después de cerar la Bd, o de no, no deja entar
*/
INSERT INTO `sisga`.`servicios` (`servicio`, `tiposerv`, `id`, `nombre`, `estado`) VALUES ('A', 'A', '1', 'Administrador', 'A');
