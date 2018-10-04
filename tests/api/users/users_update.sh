#users_api
echo "$myapi"
curl -X PUT -o ../results/users_update.html --data "id=2&email=nuevoemail@email.com&token=updated&tokenexpira=2018-12-31 11:59:59" "$myapi"/users
