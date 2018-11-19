/*
Clase: Minutes
Responsable: Juan Manjarrés
Descripción: Servir de especificación para la construcción
             de objetos de tipo Usuario de la Tabla Actas.

Uso: Sirve para mapear persistencia de datos contra la tabla actas,
     se incluye aquí el sql de creación de dicha tabla para referencia:
     -- -----------------------------------------------------
     -- Table `sisga`.`actas`
     -- -----------------------------------------------------
       CREATE TABLE `actas` (
         `frat` varchar(15) NOT NULL,
         `id` int(11) NOT NULL,
         `estado` char(1) NOT NULL,
         `fecha` datetime DEFAULT NULL,
         `tipoacta` varchar(10) NOT NULL,
         `tema` text NOT NULL,
         `lugar` varchar(30) NOT NULL,
         `objetivos` text NOT NULL,
         `responsable` varchar(25) NOT NULL,
         `conclusiones` text NOT NULL,
         `fechasig` datetime DEFAULT NULL,
         `lugarsig` varchar(30) NOT NULL,
         `desarrollo` text NOT NULL,
         `creacion` datetime NOT NULL,
         `progreso` datetime NOT NULL,
         `preliminar` datetime NOT NULL,
         `retiro` datetime NOT NULL,
         `aprobacion` datetime NOT NULL
       ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
       */
class Minutes {

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
    this._fecha = obj.fecha;
    this._tipoacta = obj.tipoacta;
    this._tema = obj.tema;
    this._lugar = obj.lugar;
    this._objetivos = obj.objetivos;
    this._desarrollo = obj.desarrollo;
    this._conclusiones = obj.conclusiones;
    this._responsable = obj.responsable;
    this._fechasig = obj.fechasig;
    this._lugarsig = obj.lugarsig;
    this._creacion = obj.creacion;
    this._progreso = obj.progreso;
    this._preliminar = obj.preliminar;
    this._retiro = obj.retiro;
    this._aprobacion = obj.aprobacion;

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

  get estado() {
    return this._estado;
  }

  set estado(estado) {
    this._estado = estado;
  }

  get fecha() {
    return this._fecha;
  }

  set fecha(fecha) {
    this._fecha = fecha;
  }

  get tipoacta() {
    return this._tipoacta;
  }

  set tipoacta(tipoacta) {
    this._tipoacta = tipoacta;
  }

  get tema() {
    return this._tema;
  }

  set tema(tema) {
    this._tema = tema;
  }

  get lugar() {
    return this._lugar;
  }

  set lugar(lugar) {
    this._lugar = lugar;
  }

  get objetivos() {
    return this._objetivos;
  }

  set objetivos(objetivos) {
    this._lugar = lugar;
  }

  get desarrollo() {
    return this._desarrollo;
  }

  set desarrollo(desarrollo) {
    this._desarrollo = desarrollo;
  }

  get conclusiones() {
    return this._conclusiones;
  }

  set conclusiones(conclusiones) {
    this._conclusiones = conclusiones;
  }

  get responsable() {
    return this._responsable;
  }

  set responsable(responsable) {
    this._responsable = responsable;
  }

  get fechasig() {
    return this._fechasig;
  }

  set fechasig(fechasig) {
    this._fechasig = fechasig;
  }

  get horasig() {
    return this._horasig;
  }

  set horasig(horasig) {
    this._horasig = horasig;
  }

  get creacion() {
    return this._creacion;
  }

  set creacion(creacion) {
    this._creacion = creacion;
  }

  get progreso() {
    return this._progreso;
  }

  set progreso(progreso) {
    this._progreso = progreso;
  }

  get preliminar() {
    return this._preliminar;
  }

  set preliminar(preliminar) {
    this._preliminar = preliminar;
  }

  get retiro() {
    return this._retiro;
  }

  set retiro(retiro) {
    this._retiro = retiro;
  }

  get aprobacion() {
    return this._aprobacion;
  }

  set aprobacion(aprobacion) {
    this._aprobacion = aprobacion;
  }

}
