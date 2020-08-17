/*
Clase: Tasks
Responsable: Leonardo Zambrano
Descripción: Servir de especificación para la construcción
             de objetos de tipo Usuario de la Tabla Tareas.

Uso: Sirve para mapear persistencia de datos contra la tabla Tareas,
     se incluye aquí el sql de creación de dicha tabla para referencia:
     -- -----------------------------------------------------
     -- Table `sisga`.`tareas`
     -- -----------------------------------------------------
     CREATE TABLE `tareas` (
       `idacta` int(11) NOT NULL,
       `id` int(11) NOT NULL,
       `estado` char(1) NOT NULL,
       `text` text NOT NULL,
       `usuario` varchar(25) NOT NULL,
       `creada` datetime NOT NULL,
       `inicioplan` date NOT NULL,
       `finalplan` date NOT NULL
     ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

*/
class Assist {

  /*
  Método: constructor
  Descripción: Recibe un objeto (usualmente el objeto es
               la respuesta que devuelve el llamado a un
               método de api) y pobla el objeto a crear
               con la clase Assist.
  */
  constructor(obj) {
    // Poblar la clase
    this._idacta = obj.idacta;
    this._id = obj.id;
    this._text = obj.text;
    this._usuario = obj.usuario;
    this._creada = obj.creada;
    this._inicioplan = obj.inicioplan;
    this._finalplan = obj.finalplan;

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

  get usuario() {
    return this._usuario;
  }

  set usuario(usuario) {
    this._usuario = usuario;
  }

  get creada() {
    return this._creada;
  }

  set creada(creada) {
    this._creada = creada;
  }

  get inicioplan() {
    return this._inicioplan;
  }

  set inicioplan(fecha) {
    this._inicioplan = inicioplan;
  }

  get finalplan() {
    return this._finalplan;
  }

  set finalplan(finalplan) {
    this._finalplan = finalplan;
  }

  get estado() {
    return this._estado;
  }

  set estado(estado) {
    this._estado = estado;
  }

}
