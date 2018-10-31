/*
Clase: User
Autor: Juan Manjarrés
Descripción: Servir de especificación para la construcción
             de objetos de tipo Usuario de la Tabla users.

Uso: Sirve para mapear persistencia de datos contra la tabla Usuarios,
     se incluye aquí el sql de creación de dicha tabla para referencia:
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
*/
class User {

  /*
  Método: constructor
  Descripción: Recibe un objeto (usualmente el objeto es
               la respuesta que devuelve el llamado a un
               método de api) y pobla el objeto a crear
               con la clase User.
  */
  constructor(obj) {
    // Poblar la clase
    this._frat = obj.frat;
    this._id = obj.id;
    this._usuario = obj.usuario;
    this._apellidos = obj.apellidos;
    this._nombres = obj.nombres;
    this._email = obj.email;
    this._servicio = obj.servicio;
    this._tiposerv = obj.tiposerv;

    //Si no se ha suministrado estado, será "A" (Activo)
    if(obj.estado == undefined){
      obj.estado = "A";
    }
    this._estado = obj.estado;

  }
  /*
  Métodos: getters y setters (get [prop], set [prop])
  Descripción: Los métodos get recuperan el valor de la propiedad,
               Los métodos set fijan o actualizan el valor de la propiedad.

  */

  get frat() {
    return this._frat;
  }

  set frat(frat) {
    this._frat = frat;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get usuario() {
    return this._usuario;
  }

  set usuario(usuario) {
    this._usuario = usuario;
  }

  get apellidos() {
    return this._apellidos;
  }

  set apellidos(apellidos) {
    this._apellidos = apellidos;
  }

  get nombres() {
    return this._nombres;
  }

  set nombres(nombres) {
    this._nombres = nombres;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get servicio() {
    return this._servicio;
  }

  set servicio(servicio) {
    this._servicio = servicio;
  }

  get tiposerv() {
    return this._tiposerv;
  }

  set tiposerv(tiposerv) {
    this._tiposerv = tiposerv;
  }

  get estado() {
    return this._estado;
  }

  set estado(estado) {
    this._estado = estado;
  }

}
