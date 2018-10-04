#login_api
echo "$myapi"

# Intenta hacer login con el admin, se espera login ok
curl -o ../../results/login.json --data "usuario=admin&password=webmaster" "$myapi"/login

# Intenta hacer login con la presidenta, se espera login error pues no es el usuario
curl -o ../../results/login_P_error1.json --data "usuario=presi&password=presidenta" "$myapi"/login

# Intenta hacer login con la presidenta, se espera login error pues no es el password
curl -o ../../results/login_P_error2.json --data "usuario=presidenta&password=secretaria" "$myapi"/login

# Intenta hacer login con el espiritual, se espera login error pues esta inactivo
curl -o ../../results/login_E_error.json --data "usuario=espiritual&password=espiritual" "$myapi"/login

# Intenta hacer login con la secretaria, se espera login ok
curl -o ../../results/login_S.json --data "usuario=secretaria&password=secretaria" "$myapi"/login

# Intenta hacer login con la secretaria y obtener el archivo logintoken.txt con formato id=9&token=xxxxxx
curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/api/login/logintoken.txt --data "usuario=secretaria&password=secretaria&format=text" "$myapi"/login
