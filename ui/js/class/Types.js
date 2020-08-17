/*
Clase: Types
Responsable: Leonardo Zambrano
Descripción: Servir de especificación para la construcción
             de objetos de tipo Usuario de la Tabla tiposacta.

Uso: Sirve para mapear persistencia de datos contra la tabla tiposacta,
     se incluye aquí el sql de creación de dicha tabla para referencia:
     -- -----------------------------------------------------
     -- Table `sisga`.`asistentes`
     -- -----------------------------------------------------

     CREATE TABLE `tipoactas` (
       `frat` varchar(15) NOT NULL,
       `tipo` varchar(11) NOT NULL,
       `nombre` varchar(45) NOT NULL,
       `id` int(11) NOT NULL,
       `estado` char(1) NOT NULL
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
    this._frat = obj.frat;
    this._id = obj.id;
    this._tipo = obj.tipo;
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

  get tipo() {
    return this._tipo;
  }

  set tipo(tipo) {
    this._tipo = tipo;
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
