<?php
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

define("SPECIALCONSTANT", true);
define("ACCESSERROR", "Error: Access Denied to the API / Acceso Denegado a la API");

require 'app/libs/connect.php';
require 'app/libs/sqls.php';

require 'app/routes/api.php';
require 'app/routes/login_api.php';
require 'app/routes/logout_api.php';
require 'app/routes/users_api.php';
require 'app/routes/servs_api.php';

$app->config('debug', true);
$app->setName('sisga');
date_default_timezone_set('America/Lima');

$permArray = getPermissions();

/*$aBitOfInfo = function (\Slim\Route $route) {
    echo " Current route is " . $route->getName() . " and ";
};

echo "Hoy";

$app->get('/echo', function () use($app) {
		echo "echo !: Current PHP version: " . phpversion();
});
$app->get('/hello/:name', function ($name) use($app){
    echo "Hello, $name";
});
$app->get('/',  $aBitOfInfo, function () use($app) {
		echo " desde root, echo !: Current PHP version: " . phpversion() . " desde " .  $app->getName();;
});
*/
/*
// API group
$app->group('/acta', function () use ($app) {

    // Library group
    $app->group('/library', function () use ($app) {

        // Get book with ID
        $app->get('/books/:id', function ($id) {
            echo "get books id";
        });

        // Update book with ID
        $app->put('/books/:id', function ($id) {
          echo "put books id";

        });

        // Delete book with ID
        $app->delete('/books/:id', function ($id) {
          echo "delete books id";

        });

    });

});
*/
/*
$app->get('/', function() use ($app, $obj) {
    try {
        $obj->thisMightThrowException();
        $app->redirect('/success');
    } catch(\Exception $e) {
        $app->flash('error', $e->getMessage());
        $app->redirect('/error');
    }
});*/
$app->run();
