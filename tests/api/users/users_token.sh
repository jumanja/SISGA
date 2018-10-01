#users_api
echo "$myapi"
curl -X PUT -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/users_token.json --data "token=rest&tokenexpira=2018-12-31 11:59:59&id=3" "$myapi"/users/token
