<?php
//Store all sqls with a code to be used in json, xml and xslt versions
function getSQL($name, $lang) {

    $lang = strtolower(substr($lang, 0, 2));
    if($lang == '' || $lang == 'es') {
        $SQLs  = array(
                "users_act" => "SELECT frat, id, usuario, apellidos, nombres, email, servicio FROM usuarios where estado = 'A' ",
                "users_all" => "SELECT frat, id, usuario, apellidos, nombres, password, email, servicio, estado FROM usuarios",
                "users_count" => "SELECT count(1) FROM usuarios",
                "books_count" => "SELECT count(1) FROM libros",
                "readings_day" => "SELECT * from lecturas where " .
                                  "codigo like ?  and " .
                                  "(semana = ? or semana = '0') and " .
                                  "(letra = ? or letra = '0') and " .
                                  "(tipo = ? or tipo = '0' ) ",
                "" => "");
    } else {
        $lang = '_' . $lang;
        $SQLs  = array(
          "users_act" => "SELECT frat, id, usuario, apellidos, nombres, email, servicio FROM usuarios where estado = 'A' ",
          "users_all" => "SELECT frat, id, usuario, apellidos, nombres, password, email, servicio, estado FROM usuarios",
          "users_count" => "SELECT count(1) FROM usuarios",
          "books_count" => "SELECT count(1) FROM libros",
          "readings_day" => "SELECT * from lecturas where " .
                            "codigo like ?  and " .
                            "(semana = ? or semana = '0') and " .
                            "(letra = ? or letra = '0') and " .
                            "(tipo = ? or tipo = '0' ) ",
          "" => "");
    }
    //echo "sqls name : " . $name . " / " .  $SQLs[$name];
    return $SQLs[$name];
}
