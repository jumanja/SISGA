<?php
//Store all sqls with a code to be used in json, xml and xslt versions
function getSQL($name, $lang) {

    $lang = strtolower(substr($lang, 0, 2));

    $SQLs  = array(
            "frats_act"   => "SELECT a.frat, a.id, a.nombre, a.estado, a.logo, a.direccion, a.ciudad, a.email " .
                             "FROM fraternidades a WHERE a.estado = 'A' ",
            "frats_add"   => "INSERT INTO fraternidades (frat, id, nombre, estado, logo, direccion, ciudad, email) " .
                             "VALUES (:frat, :id, :nombre, :estado, :logo, :direccion, :ciudad, :email)",
            "frats_all"   => "SELECT frat, id, nombre, estado, logo, direccion, ciudad, email FROM fraternidades",
            "frats_count" => "SELECT count(1) as count FROM fraternidades",

            "places_act"  => "SELECT lugar, id, estado FROM lugares WHERE estado = 'A' ",
            "places_add"  => "INSERT INTO lugares (lugar, id, estado) " .
                             "VALUES (:lugar, :id, :estado)",
            "places_count"=> "SELECT count(1) as count FROM lugares",
            "places_all"  => "SELECT lugar, id, estado FROM lugares",

            "servs_add"   => "INSERT INTO servicios (servicio, tiposerv, id, nombre, estado) " .
                             "VALUES (:servicio, :tiposerv, :id, :nombre, :estado)",
            "servs_count" => "SELECT count(1) as count FROM servicios",

            "token_check" => "SELECT tokenexpira FROM usuarios WHERE token = :token AND id = :id ",

            "tags_act"  => "SELECT etiqueta, id, estado FROM etiquetas WHERE estado = 'A' ",
            "tags_add"  => "INSERT INTO etiquetas (etiqueta, id, estado) " .
                             "VALUES (:etiqueta, :id, :estado)",
            "tags_count"=> "SELECT count(1) as count FROM etiquetas",
            "tags_all"  => "SELECT etiqueta, id, estado FROM etiquetas",

            "types_act"   => "SELECT a.tipo, a.id, a.nombre, a.estado " .
                             "FROM tipoactas a WHERE a.estado = 'A' ",
            "types_all"   => "SELECT tipo, id, nombre, estado FROM tipoactas",
            "types_add"   => "INSERT INTO tipoactas (tipo, id, nombre, estado) " .
                             "VALUES (:tipo, :id, :nombre, :estado)",
            "types_count" => "SELECT count(1) as count FROM tipoactas",

            "users_act"   => "SELECT a.frat, a.id, a.usuario, a.apellidos, a.nombres, a.password, a.email, a.servicio, b.tiposerv " .
                             "FROM usuarios a, servicios b WHERE a.estado = 'A' and a.servicio = b.servicio",
            "users_all"   => "SELECT frat, id, usuario, apellidos, nombres, password, email, servicio, estado FROM usuarios",
            "users_add"   => "INSERT INTO usuarios (frat, id, usuario, apellidos, nombres, password, email, servicio, estado) " .
                             "VALUES (:frat, :id, :usuario, :apellidos, :nombres, :password, :email, :servicio, :estado)",
            "users_count" => "SELECT count(1) as count FROM usuarios",
            "users_tokenupdate" => "UPDATE usuarios set token = :token, tokenexpira = :tokenexpira WHERE id = :id ",
            "" => "");
    //echo "sqls name : " . $name . " / " .  $SQLs[$name];
    return $SQLs[$name];
}
