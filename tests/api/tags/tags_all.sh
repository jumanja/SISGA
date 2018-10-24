#users_api
echo "$myapi"

# Intenta retornar todos las etiquetas la base de datos, se espera ok
curl -X GET -o ../../results/tags_all.json --data @../login/logintoken.txt "$myapi"/tags
