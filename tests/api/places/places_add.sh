#users_api
echo "$myapi"

# Genera los parámetros para cada llamado insertando primero el token obtenido en la sesión
cat ../login/logintoken.txt ../ampersand.txt ../places/places_add_demo_params.txt > ../places/places_add_demo_data.txt
cat ../login/logintoken.txt ../ampersand.txt ../places/places_add_demo_params2.txt > ../places/places_add_demo_data2.txt

# Intenta crear un lugar de reunión, todos se espera ok
curl -o ../../results/places_add_A.json --data @../places/places_add_demo_data.txt "$myapi"/places
curl -o ../../results/places_add_B.json --data @../places/places_add_demo_data2.txt "$myapi"/places
