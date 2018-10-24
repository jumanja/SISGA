<?php
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

define("SPECIALCONSTANT", true);
define("ACCESSERROR", "Error: Access Denied to the API / Acceso Denegado a la API");

require 'app/libs/connect.php';       //conetor via PDO con la base de datos
require 'app/libs/sqls.php';          //sentencias SQL que usa la api

require 'app/routes/api.php';         //métodos y funciones generales de la api
require 'app/routes/login_api.php';   //iniciar sesión
require 'app/routes/logout_api.php';  //cerrar sesión en la bd
require 'app/routes/users_api.php';   //usuarios

require 'app/routes/frats_api.php';   //fraternidades
require 'app/routes/places_api.php';  //lugares de reunión
require 'app/routes/tags_api.php';    //etiquetas
require 'app/routes/types_api.php';   //tiposacta

$app->config('debug', true);
$app->setName('sisga');
date_default_timezone_set('America/Lima');

$permArray = getPermissions();

$app->run();
