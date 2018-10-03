#login_api
echo "$myapi"
curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/login_check_A.json --data "id=1&token=updated" "$myapi"/login/check

curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/login_check_P.json --data "id=2&token=updated" "$myapi"/login/check

curl -o /Library/WebServer/Documents/jumanja.net/sisga/tests/results/login_check_S.json --data @logintoken.txt "$myapi"/login/check
