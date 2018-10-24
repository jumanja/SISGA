class User {
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
    if(obj.estado == undefined){
      obj.estado = "A";
    }
    this._estado = obj.estado;

  }

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

  /*method1(...) {}
  method2(...) {}
  static staticMethod(..) {}
  */
}
