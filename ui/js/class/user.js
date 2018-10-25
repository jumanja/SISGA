/*
Clase: User

Descripción: Servir de especificación para la construcción
             de objetos de tipo Usuario de la Tabla users.
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
