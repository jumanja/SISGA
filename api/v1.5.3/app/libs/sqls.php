<?php
//Store all sqls with a code to be used in json, xml and xslt versions
function getSQL($name, $lang) {

    $lang = strtolower(substr($lang, 0, 2));

    $SQLs  = array(
            "token_check" => "SELECT tokenexpira FROM usuarios WHERE token = :token AND id = :id ",
            "users_tokenupdate" => "UPDATE usuarios set token = :token, tokenexpira = :tokenexpira WHERE id = :id ",
            "users_act" => "SELECT a.frat, a.id, a.usuario, a.apellidos, a.nombres, a.password, a.email, a.servicio, b.tiposerv " .
                           "FROM usuarios a, servicios b WHERE a.estado = 'A' and a.servicio = b.servicio",
            "users_all" => "SELECT frat, id, usuario, apellidos, nombres, password, email, servicio, estado FROM usuarios",
            "users_count" => "SELECT count(1) as count FROM usuarios",
            "users_add" => "INSERT INTO usuarios (frat, id, usuario, apellidos, nombres, password, email, servicio, estado) " .
                           "VALUES (:frat, :id, :usuario, :apellidos, :nombres, :password, :email, :servicio, :estado)",
            "servs_add" => "INSERT INTO servicios (servicio, tiposerv, id, nombre, estado) " .
                          "VALUES (:servicio, :tiposerv, :id, :nombre, :estado)",
            "" => "");
    //echo "sqls name : " . $name . " / " .  $SQLs[$name];
    return $SQLs[$name];
}
