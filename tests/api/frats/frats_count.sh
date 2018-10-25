#users_api
echo "$myapi"

# Intenta contar cuantas fraternidades hay en la bd, se espera cuenta ok
curl -X GET -o ../../results/frats_count.json --data @../login/logintoken.txt "$myapi"/frats/count
