CREATE SCHEMA IF NOT EXISTS `sisga` DEFAULT CHARACTER SET utf8 ;
USE `sisga` ;

-- -----------------------------------------------------
-- Table `sisga`.`fraternidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`fraternidades` (
  `frat` VARCHAR(15) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` TEXT NOT NULL,
  `estado` CHAR(1) NOT NULL,
  `logo` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `fraterni_UNIQUE` (`frat` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sisga`.`lugares`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`lugares` (
  `frat` VARCHAR(15) NOT NULL,
  `lugar` VARCHAR(45) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `estado` CHAR(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `lugares_UNIQUE` (`lugar` ASC),
  INDEX `fk_frats_idx` (`frat` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sisga`.`tipoactas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`tipoactas` (
  `frat` VARCHAR(15) NOT NULL,
  `tipo` VARCHAR(11) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `estado` CHAR(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `tipoactas_UNIQUE` (`tipo` ASC),
  INDEX `fk_frat_idx` (`frat` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sisga`.`actas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`actas` (
  `frat` VARCHAR(15) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `estado` CHAR(1) NOT NULL,
  `numero` INT(11) NOT NULL,
  `fecha` DATE NOT NULL,
  `tipoacta` VARCHAR(10) NOT NULL,
  `tema` TEXT NOT NULL,
  `lugar` VARCHAR(30) NOT NULL,
  `objetivos` TEXT NOT NULL,
  `responsable` VARCHAR(25) NOT NULL,
  `conclusiones` TEXT NOT NULL,
  `fechasig` DATE NOT NULL,
  `lugarsig` VARCHAR(30) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `numero_UNIQUE` (`frat` ASC, `numero` ASC),
  INDEX `fx_lug_idx` (`lugar` ASC),
  INDEX `fx_tipacta_idx` (`tipoacta` ASC),
  INDEX `fx_lug2_idx` (`lugarsig` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sisga`.`servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`servicios` (
  `servicio` VARCHAR(10) NOT NULL,
  `tiposerv` VARCHAR(15) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` TEXT NOT NULL,
  `estado` CHAR(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `servicios_UNIQUE` (`servicio` ASC))
ENGINE = MyISAM
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sisga`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`usuarios` (
  `frat` VARCHAR(15) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(25) NOT NULL,
  `apellidos` TEXT NOT NULL,
  `nombres` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `servicio` VARCHAR(10) NOT NULL,
  `token` VARCHAR(100) NOT NULL,
  `tokenexpira` DATETIME NOT NULL,
  `estado` CHAR(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC),
  INDEX `fk_frats` (`frat` ASC),
  INDEX `fk_serv_idx` (`servicio` ASC))
ENGINE = MyISAM
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sisga`.`asistentes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`asistentes` (
  `idacta` INT(11) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `asistente` VARCHAR(25) NOT NULL,
  `estado` CHAR(1) NOT NULL,
  `servicio` VARCHAR(10) NOT NULL,
  `tiposerv` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `asistente_UNIQUE` (`idacta` ASC, `asistente` ASC),
  INDEX `fx_serv_idx` (`servicio` ASC),
  INDEX `fx_asis_idx` (`asistente` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sisga`.`comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`comentarios` (
  `idacta` INT(11) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `asistente` VARCHAR(25) NOT NULL,
  `estado` CHAR(1) NOT NULL,
  `text` TEXT NOT NULL,
  `fechahora` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `asistente_UNIQUE` (`idacta` ASC, `asistente` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sisga`.`etiquetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`etiquetas` (
  `frat` VARCHAR(15) NOT NULL,
  `etiqueta` VARCHAR(45) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `estado` CHAR(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `etiq_UNIQUE` (`etiqueta` ASC),
  INDEX `fx_frat_idx` (`frat` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sisga`.`etiquetasacta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`etiquetasacta` (
  `idacta` INT(11) NOT NULL,
  `etiqueta` VARCHAR(45) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `estado` CHAR(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `etiqacta_UNIQUE` (`idacta` ASC, `etiqueta` ASC),
  INDEX `fx_etiq_idx` (`etiqueta` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sisga`.`notificaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`notificaciones` (
  `idacta` INT(11) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `estado` CHAR(1) NOT NULL,
  `estadoacta` CHAR(1) NOT NULL,
  `origen` VARCHAR(15) NOT NULL,
  `destino` VARCHAR(15) NOT NULL,
  `fechahora` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `lugares_UNIQUE` (`idacta` ASC, `fechahora` ASC),
  INDEX `fx_origen_idx` (`origen` ASC),
  INDEX `fx_destino_idx` (`destino` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sisga`.`tareas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sisga`.`tareas` (
  `idacta` INT(11) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `estado` CHAR(1) NOT NULL,
  `text` TEXT NOT NULL,
  `usuario` VARCHAR(25) NOT NULL,
  `creada` DATETIME NOT NULL,
  `inicioplan` DATE NOT NULL,
  `finalplan` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `tareas_UNIQUE` (`idacta` ASC, `creada` ASC),
  INDEX `fx_usuari_idx` (`usuario` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;

/*
Poblar servicios, se requiere después de limpiar o crear la Bd, o de no, no deja entar
*/
INSERT INTO `sisga`.`servicios` (`servicio`, `tiposerv`, `id`, `nombre`, `estado`) VALUES ('A', 'A', '1', 'Administrador', 'A');

/*
Poblar usuarios, se requiere un usuario administrador para poder poblarla por scripts
*/
INSERT INTO `sisga`.`usuarios` (`frat`, `id`, `usuario`, `apellidos`, `nombres`, `password`, `email`, `servicio`, `token`, `tokenexpira`, `estado`) VALUES
('demo', 1, 'admin', 'Del Sistema', 'Administrador', '$2y$10$kR0suOkr3Qx8bbqeLzDDyey54FcRyOgMm2p3d3PyLjCONLKWtWFju', 'jumanja@gmail.com', 'A', '$2y$10$yZGPGWIz2nV5SxzxHYJi4OjAuUWRoPtKORQ1xxDl2LusKu2IYAGyG', '2018-10-25 15:33:27', 'A');
