<?php
//Store all sqls with a code to be used in json, xml and xslt versions
function getSQL($name, $app) {
    $lang = $app->request()->params('lang');
    $frat = $app->request()->params('frat');
    $user = $app->request()->params('usuario');
    $lang = strtolower(substr($lang, 0, 2));

    $SQLs  = array(
            "asis_minretire" => "UPDATE asistentes SET estado = 'R' WHERE idacta = :idacta",
            "asis_mindelete" => "DELETE from asistentes WHERE idacta = :idacta ",
            "asis_minadd"    => "INSERT into asistentes (idacta, asistente, estado, servicio, tiposerv, fecha) " .
                                "VALUES ( :idacta, :asistente, :estado, :servicio, :tiposerv, :fecha) ",

            "badge_elaborarActas"    => "SELECT count(1) as badge FROM actas WHERE estado = 'G' ",
            "badge_actasPorRevisar"  => "SELECT count(1) as badge FROM actas WHERE estado = 'M' ",
            "badge_actasPorAprobar"  => "SELECT count(1) as badge FROM actas a " .
                                        "LEFT JOIN asistentes b on b.idacta = a.id " .
                                        "WHERE a.estado = 'M' " .
                                        "AND b.asistente = '" . $user . "' " .
                                        "AND (b.estado <> 'F' and b.estado <> 'N') " ,

             "comments_minretire" => "UPDATE comentarios SET estado = 'R' WHERE idacta = :idacta",
             "comments_mindelete" => "DELETE from comentarios WHERE idacta = :idacta ",
             "comments_minadd"    => "INSERT into comentarios (idacta, asistente, estado, text, fechahora) " .
                                     "VALUES ( :idacta, :asistente, :estado, :text, :fechahora) ",
             "comments_minid"     => "SELECT idacta, asistente, estado, text, fechahora FROM comentarios WHERE idacta = :idacta order by id",

             "frats_act"   => "SELECT frat, id, nombre, estado, logo, direccion, ciudad, email " .
                              "FROM fraternidades WHERE estado = 'A'",
             "frats_add"   => "INSERT INTO fraternidades (frat, id, nombre, estado, logo, direccion, ciudad, email) " .
                              "VALUES (:frat, :id, :nombre, :estado, :logo, :direccion, :ciudad, :email)",
             "frats_all"   => "SELECT frat, id, nombre, estado, logo, direccion, ciudad, email FROM fraternidades",
             "frats_sel"   => "SELECT nombre, frat FROM fraternidades where estado = 'A'",
             "frats_count" => "SELECT count(1) as count FROM fraternidades",

            "mins_all"    => "SELECT id, fecha, tema, objetivos, desarrollo, conclusiones, estado, " .
                             "creacion, progreso, preliminar, retiro, aprobacion FROM actas WHERE frat = '" . $frat . "'",
            "mins_add"    => "INSERT INTO actas (frat, id, estado, fecha, tipoacta, tema, lugar, objetivos, " .
                             "desarrollo, responsable, conclusiones, fechasig, lugarsig, creacion, progreso, preliminar, retiro, aprobacion) " .
                             "VALUES (:frat, :id, :estado, :fecha, :tipoacta, :tema, :lugar, :objetivos, " .
                             ":desarrollo, :responsable, :conclusiones, :fechasig, :lugarsig, :creacion, :progreso, :preliminar, :retiro, :aprobacion ) ",
            "mins_exec"   => "SELECT estado, count(1) as cuenta, AVG(DATEDIFF(aprobacion, creacion)) as dias FROM actas GROUP BY 1 ",
            "mins_nro"    => "SELECT a.frat, a.id, a.estado, a.fecha, a.tipoacta, a.tema, a.lugar, " .
                             "a.objetivos, a.desarrollo, a.responsable, a.conclusiones, a.fechasig, " .
                             "a.lugarsig, a.estado, a.creacion, a.progreso, a.preliminar, a.retiro, " .
                             "a.aprobacion FROM actas a " .
                             "WHERE a.id = " . $app->request()->params('nroActa') .
                             "",
            "mins_count"  => "SELECT count(1) as count FROM actas WHERE frat = '" . $frat . "'",
            "mins_prog"   => "SELECT fecha, id, tema, objetivos, conclusiones, " .
                             "creacion, progreso " .
                             "FROM actas WHERE estado = 'G' ",

  "mins_buscarActas"    => "SELECT a.id, a.fecha, a.tema, a.objetivos, a.conclusiones, GROUP_CONCAT(b.etiqueta SEPARATOR ', ') as etiquetas, a.estado, " .
                           "a.creacion, a.progreso, a.preliminar, a.retiro, a.aprobacion " .
                           " FROM actas a " .
                           " LEFT JOIN etiquetasacta b on b.idacta = a.id " .
                           " WHERE a.frat = :frat " .
                            "AND (:estado = 'ZZZ' OR a.estado = :estado) AND a.fecha >= :fecini AND a.fecha <= :fecfin " .
                            "AND a.id >= :nroini AND a.id <= :nrofin AND (:tipoacta = 'ZZZ' OR a.tipoacta = :tipoacta) " .
                            "AND (:lugar = 'ZZZ' OR a.lugar = :lugar) AND (:temaacta = 'ZZZ' OR INSTR(a.tema, :temaacta) > 0)" .
                            "GROUP BY a.id ",

  "mins_informeActas"    => "SELECT a.id, a.fecha, a.tema, a.objetivos, a.conclusiones, GROUP_CONCAT(b.etiqueta SEPARATOR ', ') as etiquetas, a.estado, " .
                            "a.creacion, a.aprobacion,  DATEDIFF(a.aprobacion, a.creacion) as dias " .
                           " FROM actas a " .
                           " LEFT JOIN etiquetasacta b on b.idacta = a.id " .
                           " WHERE a.frat = :frat " .
                            "AND (:estado = 'ZZZ' OR a.estado = :estado) AND a.fecha >= :fecini AND a.fecha <= :fecfin " .
                            "AND a.id >= :nroini AND a.id <= :nrofin AND (:tipoacta = 'ZZZ' OR a.tipoacta = :tipoacta) " .
                            "AND (:lugar = 'ZZZ' OR a.lugar = :lugar) AND (:temaacta = 'ZZZ' OR INSTR(a.tema, :temaacta) > 0)" .
                            "GROUP BY a.id ",

  "mins_actasPorRevisar"    => "SELECT a.id, a.fecha, a.tema, a.objetivos, a.conclusiones, GROUP_CONCAT(b.etiqueta SEPARATOR ', ') as etiquetas, a.estado, " .
                               "a.creacion, a.progreso, a.preliminar, a.retiro, a.aprobacion ".
                               " FROM actas a " .
                               " LEFT JOIN etiquetasacta b on b.idacta = a.id " .
                               " WHERE a.frat = :frat " .
                                "AND (:estado = 'ZZZ' OR a.estado = :estado) AND a.fecha >= :fecini AND a.fecha <= :fecfin " .
                                "AND a.id >= :nroini AND a.id <= :nrofin AND (:tipoacta = 'ZZZ' OR a.tipoacta = :tipoacta) " .
                                "AND (:lugar = 'ZZZ' OR a.lugar = :lugar) AND (:temaacta = 'ZZZ' OR INSTR(a.tema, :temaacta) > 0) " .
                                "GROUP BY a.id ",

  "mins_actasPorAprobar"    => "SELECT a.id, a.fecha, a.tema, a.objetivos, a.conclusiones, GROUP_CONCAT(b.etiqueta SEPARATOR ', ') as etiquetas, a.estado, " .
                               "a.creacion, a.progreso, a.preliminar, a.retiro, a.aprobacion " .
                               " FROM actas a " .
                               " LEFT JOIN etiquetasacta b on b.idacta = a.id " .
                               " LEFT JOIN asistentes c on c.idacta = a.id " .
                               " WHERE a.frat = :frat " .
                                "AND a.estado = 'M' AND (c.estado <> 'F' AND c.estado <> 'N') " .
                                "AND a.fecha >= :fecini AND a.fecha <= :fecfin " .
                                "AND a.id >= :nroini AND a.id <= :nrofin AND (:tipoacta = 'ZZZ' OR a.tipoacta = :tipoacta) " .
                                "AND (:lugar = 'ZZZ' OR a.lugar = :lugar) AND (:temaacta = 'ZZZ' OR INSTR(a.tema, :temaacta) > 0)" .
                                "AND c.asistente = '" . $user . "' " .
                                "GROUP BY a.id ",

            "mins_ret"    => "UPDATE actas set estado = :estado, retiro = :retiro " .
                             "WHERE id = :id",
            "mins_aprob"  => "UPDATE actas set estado = :estado, aprobacion = :aprobacion " .
                             "WHERE id = :id",
            "mins_prelim" => "UPDATE actas set estado = :estado, preliminar = :preliminar " .
                            "WHERE id = :id",
            "mins_progre" => "UPDATE actas set estado = :estado, progreso = :progreso " .
                            "WHERE id = :id",

            "mins_update" => "UPDATE actas set estado = :estado, fecha = :fecha, tipoacta = :tipoacta, tema = :tema, " .
                             "lugar = :lugar, objetivos = :objetivos, desarrollo = :desarrollo, conclusiones = :conclusiones, " .
                             "fechasig = :fechasig, lugarsig = :lugarsig, " .
                             "creacion = :creacion, progreso = :progreso, " .
                             "preliminar = :preliminar, retiro = :retiro, " .
                             "aprobacion  = :aprobacion " .
                             "WHERE id = :id",
           "notif_minretire" => "UPDATE notificaciones SET estado = 'R' WHERE idacta = :idacta",
           "notif_mindelete" => "DELETE from notificaciones WHERE idacta = :idacta ",
           "notif_minadd"    => "INSERT into notificaciones (idacta, estado, estadoacta, origen, destino, fechahora) " .
                               "VALUES ( :idacta, :estado, :estadoacta, :origen, :destino, :fechahora) ",
           "notif_minquery" => "SELECT c.idacta, c.estadoacta, c.fechahora, " .
                               "a.nombres as nomorigen, a.apellidos as apeorigen, a.email as emailorigen, " .
                               "b.nombres as nomdestino, b.apellidos as apedestino,  b.email as emaildestino " .
                               "FROM usuarios a, usuarios b, notificaciones c " .
                               "WHERE a.usuario = c.origen " .
                               "AND b.usuario = c.destino " .
                               "AND c.idacta = :idacta",

            "places_act"  => "SELECT frat, lugar, id, estado FROM lugares WHERE estado = 'A' AND frat = '" . $frat . "'",
            "places_add"  => "INSERT INTO lugares (frat, lugar, id, estado) " .
                             "VALUES (:frat, :lugar, :id, :estado)",
            "places_count"=> "SELECT count(1) as count FROM lugares WHERE frat = '" . $frat . "'",
            "places_all"  => "SELECT frat, lugar, id, estado FROM lugares WHERE frat = '" . $frat . "'",

            "servs_add"   => "INSERT INTO servicios (servicio, tiposerv, id, nombre, estado) " .
                             "VALUES (:servicio, :tiposerv, :id, :nombre, :estado)",
            "servs_count" => "SELECT count(1) as count FROM servicios",
            "servs_act"   => "SELECT servicio, tiposerv, id, nombre, estado FROM servicios WHERE estado = 'A'",
            "servs_sel"   => "SELECT nombre, servicio FROM servicios WHERE estado = 'A'",
            "servs_all"   => "SELECT servicio, tiposerv, id, nombre, estado FROM servicios",

            "token_check" => "SELECT tokenexpira FROM usuarios WHERE token = :token AND id = :id ",

            "tags_act"  => "SELECT frat, etiqueta, id, estado FROM etiquetas WHERE estado = 'A' AND frat = '" . $frat . "'",
            "tags_add"  => "INSERT INTO etiquetas (frat, etiqueta, id, estado) " .
                             "VALUES (:frat, :etiqueta, :id, :estado)",
            "tags_count"=> "SELECT count(1) as count FROM etiquetas WHERE frat = '" . $frat . "'",
            "tags_all"  => "SELECT frat, etiqueta, id, estado FROM etiquetas WHERE frat = '" . $frat . "'",

            "tags_minretire" => "UPDATE etiquetasacta SET estado = 'R' WHERE idacta = :idacta",
            "tags_mindelete" => "DELETE from etiquetasacta WHERE idacta = :idacta ",
            "tags_minadd"    => "INSERT into etiquetasacta (idacta, etiqueta, estado) VALUES ( :idacta, :etiqueta, :estado) ",
            "tags_minid"     => "SELECT etiqueta FROM etiquetasacta WHERE idacta = :idacta ",

            "tasks_minretire" => "UPDATE tareas SET estado = 'R' WHERE idacta = :idacta",
            "tasks_mindelete" => "DELETE from tareas WHERE idacta = :idacta ",
            "tasks_minadd"    => "INSERT into tareas (idacta, estado, " .
                                 "text, usuario, creada, inicioplan, finalplan) " .
                                 "VALUES ( :idacta, :estado, " .
                                 ":text, :usuario, :creada, :inicioplan, :finalplan) ",
            "tasks_minid"     => "SELECT a.estado, a.usuario, a.text, a.creada, a.inicioplan, " .
                                 "a.finalplan, b.nombres, b.apellidos " .
                                 "FROM tareas a, usuarios b " .
                                 "WHERE b.usuario = a.usuario AND idacta = :idacta ",

            "types_act"   => "SELECT frat, tipo, id, nombre, estado " .
                             "FROM tipoactas a WHERE estado = 'A' AND frat = '" . $frat . "'",
            "types_all"   => "SELECT frat, tipo, id, nombre, estado FROM tipoactas WHERE frat = '" . $frat . "'",
            "types_add"   => "INSERT INTO tipoactas (frat, tipo, id, nombre, estado) " .
                             "VALUES (:frat, :tipo, :id, :nombre, :estado)",
            "types_count" => "SELECT count(1) as count FROM tipoactas WHERE frat = '" . $frat . "'",

            "users_act"   => "SELECT a.frat, a.id, a.usuario, a.apellidos, a.nombres, a.password, a.email, a.servicio, b.tiposerv, " .
                             "c.nombre as nombrefrat, c.estado as estadofrat, c.logo as logofrat, c.direccion as dirfrat, " .
                             "c.ciudad as ciudadfrat, c.email as emailfrat " .
                             "FROM usuarios a, servicios b, fraternidades c WHERE a.estado = 'A' and a.servicio = b.servicio " .
                             "and c.frat = a.frat ",
            "users_all"   => "SELECT frat, id, usuario, apellidos, nombres, password, email, servicio, estado FROM usuarios WHERE frat = '" . $frat . "'",
            "users_add"   => "INSERT INTO usuarios (frat, id, usuario, apellidos, nombres, password, email, servicio, estado) " .
                             "VALUES (:frat, :id, :usuario, :apellidos, :nombres, :password, :email, :servicio, :estado)",
            "users_count" => "SELECT count(1) as count FROM usuarios WHERE frat = '" . $frat . "'",
            "users_asi"   => "SELECT a.frat, a.id, a.usuario, a.apellidos, a.nombres, a.email, a.estado, a.servicio, " .
                             "b.tiposerv, b.nombre as nombreser, b.id as idserv, 0 as idacta, 'A' as asisestado " .
                             "FROM usuarios a, servicios b WHERE a.servicio = b.servicio and b.tiposerv = 'I' " .
                             "and a.frat = '" . $frat . "'",
                             "ORDER BY idserv, apellidos, nombres",

            "users_int"  => "SELECT a.frat, a.id, a.usuario, a.apellidos, a.nombres, a.email, a.estado, a.servicio, " .
                             "b.tiposerv, b.nombre as nombreser, b.id as idserv, c.idacta as idacta, c.estado as asisestado " .
                             "FROM usuarios a, servicios b, asistentes c WHERE a.servicio = b.servicio and b.tiposerv = 'I' " .
                             "and a.frat = '" . $frat . "' " .
                             "and c.asistente = a.usuario and c.idacta = :idacta " .
                             "ORDER BY idserv, apellidos, nombres",

            "users_tokenupdate" => "UPDATE usuarios set token = :token, tokenexpira = :tokenexpira WHERE id = :id ",
            "" => "");
    //echo "\n144. sqls name : " . $name . " / " .  $SQLs[$name];
    return $SQLs[$name];
}
