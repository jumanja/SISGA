/*
Clase: Assist
Responsable: Liana Rodríguez
Descripción: Servir de especificación para la construcción
             de objetos de tipo Usuario de la Tabla Asistentes.

Uso: Sirve para mapear persistencia de datos contra la tabla Asistentes,
     se incluye aquí el sql de creación de dicha tabla para referencia:
     -- -----------------------------------------------------
     -- Table `sisga`.`asistentes`
     -- -----------------------------------------------------
     CREATE TABLE `asistentes` (
       `idacta` int(11) NOT NULL,
       `id` int(11) NOT NULL,
       `asistente` varchar(25) NOT NULL,
       `estado` char(1) NOT NULL,
       `servicio` varchar(10) NOT NULL,
       `tiposerv` varchar(15) NOT NULL,
       `fecha` datetime NOT NULL
     ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

*/
class Assist {

  /*
  Método: constructor
  Descripción: Recibe un objeto (usualmente el objeto es
               la respuesta que devuelve el llamado a un
               método de api) y pobla el objeto a crear
               con la clase Frats.
  */
  constructor(obj) {
    // Poblar la clase
    this._idacta = obj.idacta;
    this._id = obj.id;
    this._asistente = obj.asistente;
    this._servicio = obj.servicio;
    this._tiposerv = obj.tiposerv;
    this._fecha = obj.fecha;

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

  get idacta() {
    return this._idacta;
  }

  set idacta(idacta) {
    this._idacta = idacta;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get asistente() {
    return this._asistente;
  }

  set asistente(asistente) {
    this._asistente = asistente;
  }

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

  get fecha() {
    return this._fecha;
  }

  set fecha(fecha) {
    this._fecha = fecha;
  }

  get estado() {
    return this._estado;
  }

  set estado(estado) {
    this._estado = estado;
  }

}
