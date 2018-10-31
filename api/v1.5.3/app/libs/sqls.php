<?php
//Store all sqls with a code to be used in json, xml and xslt versions
function getSQL($name, $app) {
    $lang = $app->request()->params('lang');
    $frat = $app->request()->params('frat');
    $lang = strtolower(substr($lang, 0, 2));

    $SQLs  = array(
            "frats_act"   => "SELECT frat, id, nombre, estado, logo, direccion, ciudad, email " .
                             "FROM fraternidades WHERE estado = 'A'",
            "frats_add"   => "INSERT INTO fraternidades (frat, id, nombre, estado, logo, direccion, ciudad, email) " .
                             "VALUES (:frat, :id, :nombre, :estado, :logo, :direccion, :ciudad, :email)",
            "frats_all"   => "SELECT frat, id, nombre, estado, logo, direccion, ciudad, email FROM fraternidades",
            "frats_sel"   => "SELECT nombre, frat FROM fraternidades where estado = 'A'",
            "frats_count" => "SELECT count(1) as count FROM fraternidades",

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
            "users_int"   => "SELECT a.frat, a.id, a.usuario, a.apellidos, a.nombres, a.password, a.email, a.servicio, b.tiposerv " .
                             "FROM usuarios a, servicios b WHERE a.estado = 'A' and a.servicio = b.servicio and b.tiposerv = 'I'",
            "users_tokenupdate" => "UPDATE usuarios set token = :token, tokenexpira = :tokenexpira WHERE id = :id ",
            "" => "");
    //echo "sqls name : " . $name . " / " .  $SQLs[$name];
    return $SQLs[$name];
}
