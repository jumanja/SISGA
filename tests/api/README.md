# Pruebas Automatizadas para SISGA
Sistema de Gestión de Actas

# Preparaicón de Ambiente.
Para sistemas basados en unix, com Linux y MacOs, se debe exportar la variable myapi para definir si se quiere acceder a la api local o invocar una api en la web.
export myapi=http://jumanja.net/sisga/api/v1.5.3/index.php/
export myapi=http://localhost/jumanja.net/sisga/api/v1.5.3/index.php/

Luego  de exportar la variable dependiendo de la ruta que se quiera usar, podemos invocar pruebas espcíficas o una suite de pruebas.

En el momento contamos con set de pruebas para:
- login 
- users 
- suites (aquí se encuentran los grupos de pruebas) 

# login 

Contiene a:
- login
- login_check

# users 

Contiene a:
- users_add
- users_all
- users_count
- users_id
- users_token
- users_update

# suites

Contiene a :

- 00_login
- 01_users_populate

# Ejecución correcta

En cada carpeta se puede invocar o ejecutar el script correspondiente al conjunto de pruebas de la api que se quiere probar, por ejemplo para probar la adición de usuarios (ejemplo, en sistemas operativos basados en unix como linux y MacOs):
cd users
./users_add.sh


Se espera que en la salida por pantalla se observen mensajes como :
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   448  100   246  100   202   2807   2305 --:--:-- --:--:-- --:--:--  2827
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   464  100   246  100   218   2778   2462 --:--:-- --:--:-- --:--:--  2795
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed

Cada prueba intenta guardar en la carpeta api/results un archivo (usualmente en formato .json) por lo que se ha creado un script para poder visualizar estos archivos, invocar por ejemplo ./more_users_add.sh para ver en pantalla los resultados obtenidos en las pruebas. Con la tecla espacio se avanza al siguiente archivo de resultados o con la tecla q se sale de la visualización.

Sin embargo, algunas pruebas crean otros archivos o archivos con diferente convención, por ejemplo, pueden intentar crear algo como ..7api/results/login_check_A_error.json, y adentro se espera que el resultado sea un error, es decir, la prueba debe fallar para que sea correcta, por ejemplo, si ese prueba con un usuario que no existe, o está inactivo, no debería crear una sesión y retornar un error.

Para el caso del login, se espera que en la carpeta ../api/login/ se cree un archivo llamado logintoken.txt que contenga una cadena como:

id=4&token=$2y$10$9Jdu2a5VL2Xq3DqPatTKkOviMMutujM./bXWbB7mRKe

.. que será usado para pasar a la api el token de sesión usada y validar si la petición de la api es válida (que el token suministado corresponda al id del usuario suministrado, que esté activo ese usuario, y que el token no haya expirado).

Si en los archivos se encuentra por ejemplo:

Error: SQLSTATE[HY000] [2002] No such file or directory<br />
<b>Fatal error</b>:  Call to a member function prepare() on a non-object in <b>/Library/WebServer/Documents/jumanja.net/SISGA/api/v1.5.3/app/routes/api.php</b> on line <b>34</b><br />

Es porque la base de datos está detenida, es decir, debe estar ejecutándose la base de datos antes de ejecutar las pruebas. una vez arrancada la bae de datos, se puede volver a ejecutar las pruebas.

Si en los archivos resultados se encuentra por ejemplo:
[{"acceso":"Denegado.","motivo":"Token no existe o Ya ha expirado."}]

Es precisamente, porque el token no es válido, es decir, no existe ese token en la base de datos, o no existe ese id de usuario, o no corresponde el id con el token, si corresponden, el estado del usuario es Inactivo o Retirado, o el token ya expiró. La razón de no dar un mensaje expecífico es para evitar el riesgo de un atauq de fuerza bruta si un atacante consigue un id le sea difícil conseguir un token, o viceversa, no dar información específica simplemente decir que no es válido.

# Errores comunes

- curl: (3) <url> malformed

Indica que se está ejecutando pruebas sin haber exportardo la variable myapi (ver arriba en esta página las instrucciones)

- Error: SQLSTATE[HY000] [2002] No such file or directory<br />

Indica que la base de datos no está disponible, puede que necesite iniciarla y luego de iniciada, reintentar las pruebas.

- Error: SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'admin' for key 'usuario_UNIQUE' 

Indica que en este caso, se intentó crear un usuario que ya existía, para otros casos indica que el registro a crear violaría una llave única generando duplicaods, por lo que no es permitodo adicionar ese registro en particular con esa llav (usualmente el id)
