/*
Clase: Notif
Responsable: Sneider Durango
Descripción: Servir de especificación para la construcción
             de objetos de tipo Usuario de la Tabla notificaciones.

Uso: Sirve para mapear persistencia de datos contra la tabla tiposacta,
     se incluye aquí el sql de creación de dicha tabla para referencia:
     -- -----------------------------------------------------
     -- Table `sisga`.`notificaciones`
     -- -----------------------------------------------------

     CREATE TABLE `notificaciones` (
       `idacta` int(11) NOT NULL,
       `id` int(11) NOT NULL,
       `estado` char(1) NOT NULL,
       `estadoacta` char(1) NOT NULL,
       `origen` varchar(15) NOT NULL,
       `destino` varchar(15) NOT NULL,
       `fechahora` datetime NOT NULL
     ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
     --

*/
class Tags {

  /*
  Método: constructor
  Descripción: Recibe un objeto (usualmente el objeto es
               la respuesta que devuelve el llamado a un
               método de api) y pobla el objeto a crear
               con la clase Tags.
  */
  constructor(obj) {
    // Poblar la clase
    this._idacta = obj.idacta;
    this._id = obj.id;
    this._estadoacta = obj.estadoacta;
    this._origen = obj.origen;
    this._destino = obj.destino;
    this._fechahora = obj.fechahora;

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

  get estado() {
    return this._estado;
  }

  set estado(estado) {
    this._estado = estado;
  }

  get estadoacta() {
    return this._estadoacta;
  }

  set estadoacta(estadoacta) {
    this._estadoacta = estadoacta;
  }

  get origen() {
    return this._origen;
  }

  set origen(origen) {
    this._origen = origen;
  }

  get destino() {
    return this._destino;
  }

  set destino(destino) {
    this._destino = destino;
  }

}
