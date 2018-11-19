/*
Clase: Tags
Responsable: Liana Rodríguez
Descripción: Servir de especificación para la construcción
             de objetos de tipo Usuario de la Tabla Etiquetas.

Uso: Sirve para mapear persistencia de datos contra la tabla Etiquetas,
     se incluye aquí el sql de creación de dicha tabla para referencia:
     -- -----------------------------------------------------
     -- Table `sisga`.`asistentes`
     -- -----------------------------------------------------

     CREATE TABLE `etiquetas` (
       `frat` varchar(15) NOT NULL,
       `etiqueta` varchar(45) NOT NULL,
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
    this._etiqueta = obj.etiqueta;

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

  get etiqueta() {
    return this._etiqueta;
  }

  set etiqueta(etiqueta) {
    this._etiqueta = etiqueta;
  }

  get estado() {
    return this._estado;
  }

  set estado(estado) {
    this._estado = estado;
  }

}
