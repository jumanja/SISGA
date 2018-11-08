<?php
//Store all sqls with a code to be used in json, xml and xslt versions
function getSQL($name, $app) {
    $lang = $app->request()->params('lang');
    $frat = $app->request()->params('frat');
    $lang = strtolower(substr($lang, 0, 2));

    $SQLs  = array(
            "asis_minretire" => "UPDATE asistentes SET estado = 'R' WHERE idacta = :idacta",
            "asis_mindelete" => "DELETE from asistentes WHERE idacta = :idacta ",
            "asis_minadd" => "INSERT into asistentes (idacta, asistente, estado, servicio, tiposerv) " .
                             "VALUES ( :idacta, :asistente, :estado, :servicio, :tiposerv) ",

             "frats_act"   => "SELECT frat, id, nombre, estado, logo, direccion, ciudad, email " .
                              "FROM fraternidades WHERE estado = 'A'",
             "frats_add"   => "INSERT INTO fraternidades (frat, id, nombre, estado, logo, direccion, ciudad, email) " .
                              "VALUES (:frat, :id, :nombre, :estado, :logo, :direccion, :ciudad, :email)",
             "frats_all"   => "SELECT frat, id, nombre, estado, logo, direccion, ciudad, email FROM fraternidades",
             "frats_sel"   => "SELECT nombre, frat FROM fraternidades where estado = 'A'",
             "frats_count" => "SELECT count(1) as count FROM fraternidades",

            "mins_add"    => "INSERT INTO actas (frat, id, estado, fecha, tipoacta, tema, lugar, objetivos, responsable, conclusiones, fechasig, lugarsig) " .
                             "VALUES (:frat, :id, :estado, :fecha, :tipoacta, :tema, :lugar, :objetivos, :responsable, :conclusiones, :fechasig, :lugarsig) ",
            "mins_exec"   => "SELECT estado, count(1) as cuenta FROM actas GROUP BY 1 ",
            "mins_nro"    => "SELECT a.frat, a.id, a.estado, a.fecha, a.tipoacta, a.tema, a.lugar, " .
                             "a.objetivos, a.responsable, a.conclusiones, a.fechasig, " .
                             "a.lugarsig, a.estado FROM actas a " .
                             "WHERE a.id = " . $app->request()->params('nroActa') .
                             "",
            "mins_prog"   => "SELECT fecha, id, tema, objetivos, conclusiones FROM actas WHERE estado = 'G' ",
            "mins_update" => "UPDATE actas set estado = :estado, fecha = :fecha, tipoacta = :tipoacta, tema = :tema, " .
                             "lugar = :lugar, objetivos = :objetivos, conclusiones = :conclusiones, fechasig = :fechasig, lugarsig = :lugarsig  " .
                             "WHERE id = :id",

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

            "tags_minretire" => "UPDATE etiquetasActa SET estado = 'R' WHERE idacta = :idacta",
            "tags_mindelete" => "DELETE from etiquetasActa WHERE idacta = :idacta ",
            "tags_minadd"    => "INSERT into etiquetasActa (idacta, etiqueta, estado) VALUES ( :idacta, :etiqueta, :estado) ",
            "tags_minid"     => "SELECT etiqueta FROM etiquetasActa WHERE idacta = :idacta ",

            "tasks_minretire" => "UPDATE tareas SET estado = 'R' WHERE idacta = :idacta",
            "tasks_mindelete" => "DELETE from tareas WHERE idacta = :idacta ",
            "tasks_minadd"    => "INSERT into tareas (idacta, estado, " .
                                 "text, usuario, creada, inicioplan, finalplan) " .
                                 "VALUES ( :idacta, :estado, " .
                                 ":text, :usuario, :creada, :inicioplan, :finalplan) ",
            "tasks_minid"     => "SELECT estado, usuario, text, creada, inicioplan, finalplan " .
                                 "FROM tareas WHERE idacta = :idacta ",

            "types_act"   => "SELECT frat, tipo, id, nombre, estado " .
                             "FROM tipoactas a WHERE estado = 'A' AND frat = '" . $frat . "'",
            "types_all"   => "SELECT frat, tipo, id, nombre, estado FROM tipoactas WHERE frat = '" . $frat . "'",
            "types_add"   => "INSERT INTO tipoactas (frat, tipo, id, nombre, estado) " .
                             "VALUES (:frat, :tipo, :id, :nombre, :estado)",
            "types_count" => "SELECT count(1) as count FROM tipoactas WHERE frat = '" . $frat . "'",

            "users_act"   => "SELECT a.frat, a.id, a.usuario, a.apellidos, a.nombres, a.password, a.email, a.servicio, b.tiposerv " .
                             "FROM usuarios a, servicios b WHERE a.estado = 'A' and a.servicio = b.servicio",
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
    //echo "144. sqls name : " . $name . " / " .  $SQLs[$name];
    return $SQLs[$name];
}
