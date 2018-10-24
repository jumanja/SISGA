#users_api
echo "$myapi"

# Genera los parámetros para cada llamado insertando primero el token obtenido en la sesión
cat ../login/logintoken.txt ../ampersand.txt ../types/types_add_demo_params.txt > ../types/types_add_demo_data.txt

# Intenta crear una fraternidad, todos se espera ok
curl -o ../../results/types_add_A.json --data @../types/types_add_demo_data.txt "$myapi"/types
