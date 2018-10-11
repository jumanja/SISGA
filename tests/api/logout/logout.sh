#users_api
echo "$myapi"
curl -X PUT -o ../../results/logout.json --data @../login/logintoken.txt "$myapi"/logout
