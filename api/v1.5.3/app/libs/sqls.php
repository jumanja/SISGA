<?php
//Store all sqls with a code to be used in json, xml and xslt versions
function getSQL($name, $lang) {

    $lang = strtolower(substr($lang, 0, 2));

    $SQLs  = array(
            "token_check" => "SELECT tokenexpira FROM usuarios WHERE token = :token AND id = :id ",
            "users_tokenupdate" => "UPDATE usuarios set token = :token, tokenexpira = :tokenexpira WHERE id = :id ",
            "users_act" => "SELECT frat, id, usuario, apellidos, nombres, password, email, servicio FROM usuarios WHERE estado = 'A' ",
            "users_all" => "SELECT frat, id, usuario, apellidos, nombres, password, email, servicio, estado FROM usuarios",
            "users_count" => "SELECT count(1) as count FROM usuarios",
            "users_add" => "INSERT INTO usuarios (frat, id, usuario, apellidos, nombres, password, email, servicio, estado) " .
                           "VALUES (:frat, :id, :usuario, :apellidos, :nombres, :password, :email, :servicio, :estado)",
            "readings_day" => "SELECT * from lecturas WHERE " .
                              "codigo like ?  and " .
                              "(semana = ? or semana = '0') and " .
                              "(letra = ? or letra = '0') and " .
                              "(tipo = ? or tipo = '0' ) ",
            "" => "");
    //echo "sqls name : " . $name . " / " .  $SQLs[$name];
    return $SQLs[$name];
}
