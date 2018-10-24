#users_api
echo "$myapi"

# Intenta retornar todos los lugaes de la base de datos, se espera ok
curl -X GET -o ../../results/places_all.json --data @../login/logintoken.txt "$myapi"/places
