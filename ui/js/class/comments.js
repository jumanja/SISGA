/*
Clase: Comments
Responsable: Sneider Durango
Descripción: Servir de especificación para la construcción
             de objetos de tipo Usuario de la Tabla Comentarios.

Uso: Sirve para mapear persistencia de datos contra la tabla Tareas,
     se incluye aquí el sql de creación de dicha tabla para referencia:
     -- -----------------------------------------------------
     -- Table `sisga`.`comentarios`
     -- -----------------------------------------------------
     CREATE TABLE `comentarios` (
       `idacta` int(11) NOT NULL,
       `id` int(11) NOT NULL,
       `asistente` varchar(25) NOT NULL,
       `estado` char(1) NOT NULL,
       `text` text NOT NULL,
       `fechahora` datetime NOT NULL
     ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

*/
class Comments {

  /*
  Método: constructor
  Descripción: Recibe un objeto (usualmente el objeto es
               la respuesta que devuelve el llamado a un
               método de api) y pobla el objeto a crear
               con la clase Comments.
  */
  constructor(obj) {
    // Poblar la clase
    this._idacta = obj.idacta;
    this._id = obj.id;
    this._asistente = obj.asistente;
    this._text = obj.text;
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

  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
  }

  get asistente() {
    return this._asistente;
  }

  set asistente(asistente) {
    this._asistente = asistente;
  }

  get fechahora() {
    return this._fechahora;
  }

  set fechahora(fechahora) {
    this._fechahora = fechahora;
  }

  get estado() {
    return this._estado;
  }

  set estado(estado) {
    this._estado = estado;
  }

}
