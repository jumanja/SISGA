#login_api
echo "$myapi"
curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/login.json --data "usuario=admin&password=webmaster" "$myapi"/login

curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/login_S.json --data "usuario=secretaria&password=secretaria" "$myapi"/login
