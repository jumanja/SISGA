#users_api
echo "$myapi"

# Intenta retornar todos las fraternidades de la base de datos, se espera ok
curl -X GET -o ../../results/frats_all.json --data @../login/logintoken.txt "$myapi"/frats
