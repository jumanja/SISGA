#users_api
echo "$myapi"

# Genera los parámetros para cada llamado insertando primero el token obtenido en la sesión
cat ../login/logintoken.txt ../ampersand.txt ../frats/frats_add_demo_params.txt > ../frats/frats_add_demo_data.txt
cat ../login/logintoken.txt ../ampersand.txt ../frats/frats_add_demo_params2.txt > ../frats/frats_add_demo_data2.txt

# Intenta crear una fraternidad, todos se espera ok
curl -o ../../results/frats_add_A.json --data @../frats/frats_add_demo_data.txt "$myapi"/frats
curl -o ../../results/frats_add_B.json --data @../frats/frats_add_demo_data2.txt "$myapi"/frats
