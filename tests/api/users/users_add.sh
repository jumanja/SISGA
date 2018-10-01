#users_api
echo "$myapi"

curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/users_add_A.json --data "frat=demo&usuario=admin&apellidos=Del Sistema&nombres=Administrador&password=webmaster&email=jumanja@gmail.com&servicio=A&estado=A" "$myapi"/users

curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/users_add_P.json --data "frat=demo&usuario=presidenta&apellidos=Apellidos Presidenta&nombres=Nombres Presidenta&password=presidenta&email=pres@demo.com&servicio=P&estado=A" "$myapi"/users

curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/users_add_S.json --data "frat=demo&usuario=secretaria&apellidos=Apellidos Secretaria&nombres=Nombres Secretaria&password=secretaria&email=secre@demo.com&servicio=S&estado=A" "$myapi"/users

curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/users_add_T.json --data "frat=demo&usuario=tesorero&apellidos=Apellidos Tesorero&nombres=Nombres Tesorero&password=tesorero&email=teso@demo.com&servicio=T&estado=A" "$myapi"/users

curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/users_add_F.json --data "frat=demo&usuario=formadora&apellidos=Apellidos Formadora&nombres=Nombres Formadora&password=formadora&email=forma@demo.com&servicio=F&estado=A" "$myapi"/users

curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/users_add_E.json --data "frat=demo&usuario=espiritual&apellidos=Apellidos Espiritual&nombres=Nombres Espiritual&password=espiritual&email=espiri@demo.com&servicio=E&estado=A" "$myapi"/users

curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/users_add_R.json --data "frat=demo&usuario=regional&apellidos=Apellidos Regional&nombres=Nombres Regional&password=regional&email=region@demo.com&servicio=R&estado=A" "$myapi"/users

curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/users_add_N.json --data "frat=demo&usuario=nacional&apellidos=Apellidos Nacional&nombres=Nombres Nacional&password=nacional&email=nacion@demo.com&servicio=N&estado=A" "$myapi"/users
