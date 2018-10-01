CREATE SCHEMA `sisga` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `frats` (
  `frat` VARCHAR(15) NOT NULL ,
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
ALTER TABLE `sisga`.`frats`
ADD UNIQUE INDEX `frat_UNIQUE` (`frat` ASC);

/* usuarios */
ALTER TABLE `sisga`.`usuarios`
ADD UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC);

ALTER TABLE `sisga`.`usuarios`
ADD FOREIGN KEY fk_frats(frat)
REFERENCES frats(frat)
ON DELETE CASCADE
ON UPDATE CASCADE;
