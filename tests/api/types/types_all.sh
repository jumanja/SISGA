#users_api
echo "$myapi"

# Intenta retornar todos los tipos de acta de la base de datos, se espera ok
curl -X GET -o ../../results/types_all.json --data @../login/logintoken.txt "$myapi"/types
