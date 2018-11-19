/*
Clase: Frats
Responsable: Cristian Alonso
Descripción: Servir de especificación para la construcción
             de objetos de tipo Usuario de la Tabla Frats.

Uso: Sirve para mapear persistencia de datos contra la tabla Fraternidades,
     se incluye aquí el sql de creación de dicha tabla para referencia:
     -- -----------------------------------------------------
     -- Table `sisga`.`fraternidades`
     -- -----------------------------------------------------
     CREATE TABLE `fraternidades` (
       `frat` varchar(15) NOT NULL,
       `id` int(11) NOT NULL,
       `nombre` text NOT NULL,
       `estado` char(1) NOT NULL,
       `logo` varchar(45) NOT NULL,
       `direccion` varchar(45) NOT NULL,
       `ciudad` varchar(45) NOT NULL,
       `email` varchar(45) NOT NULL
     ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

*/
class Frats {

  /*
  Método: constructor
  Descripción: Recibe un objeto (usualmente el objeto es
               la respuesta que devuelve el llamado a un
               método de api) y pobla el objeto a crear
               con la clase Frats.
  */
  constructor(obj) {
    // Poblar la clase
    this._frat = obj.frat;
    this._id = obj.id;
    this._nombre = obj.nombre;
    this._logo = obj.logo;
    this._direccion = obj.direccion;
    this._ciudad = obj.ciudad;
    this._email = obj.email;

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

  get logo() {
    return this._logo;
  }

  set logo(logo) {
    this._logo = logo;
  }

  get direccion() {
    return this._direccion;
  }

  set direccion(direccion) {
    this._direccion = direccion;
  }

  get ciudad() {
    return this._ciudad;
  }

  set ciudad(ciudad) {
    this._ciudad = ciudad;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

}
