#users_api
echo "$myapi"

# Genera los parámetros para cada llamado insertando primero el token obtenido en la sesión
cat ../login/logintoken.txt ../ampersand.txt ../tags/tags_add_demo_params.txt > ../tags/tags_add_demo_data.txt

# Intenta crear un lugar de reunión, todos se espera ok
curl -o ../../results/tags_add_A.json --data @../tags/tags_add_demo_data.txt "$myapi"/tags
