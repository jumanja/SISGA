#users_api
echo "$myapi"

# Intenta contar cuantos tiposacta hay en la bd, se espera cuenta ok
curl -X GET -o ../../results/tags_count.json --data @../login/logintoken.txt "$myapi"/tags/count
