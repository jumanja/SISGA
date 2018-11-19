/*
Clase: Servs
Responsable: Sneider Durango
Descripción: Servir de especificación para la construcción
             de objetos de tipo Usuario de la Tabla Servicios.

Uso: Sirve para mapear persistencia de datos contra la tabla Servicios,
     se incluye aquí el sql de creación de dicha tabla para referencia:
     -- -----------------------------------------------------
     -- Table `sisga`.`servicios`
     -- -----------------------------------------------------
     CREATE TABLE `servicios` (
       `servicio` varchar(10) NOT NULL,
       `tiposerv` varchar(15) NOT NULL,
       `id` int(11) NOT NULL,
       `nombre` text NOT NULL,
       `estado` char(1) NOT NULL
     ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
*/
class Servs {

  /*
  Método: constructor
  Descripción: Recibe un objeto (usualmente el objeto es
               la respuesta que devuelve el llamado a un
               método de api) y pobla el objeto a crear
               con la clase Frats.
  */
  constructor(obj) {
    // Poblar la clase
    this._servicio = obj.servicio;
    this._tiposerv = obj.tiposerv;
    this._id = obj.id;
    this._nombre = obj.nombre;

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

  get servicio() {
    return this._servicio;
  }

  set servicio(servicio) {
    this._servicio = servicio;
  }

  get tiposerv() {
    return this._servicio;
  }

  set tiposerv(tiposerv) {
    this._tiposerv = tiposerv;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get estado() {
    return this._estado;
  }

  set estado(estado) {
    this._estado = estado;
  }

}
