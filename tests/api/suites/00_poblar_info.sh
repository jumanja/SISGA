########################
#login_api
#######################

# Hacer Login de usuarios
echo "login with admin"
../login/login_admin.sh

# Verificar Login de los usuarios
#../login/login_check.sh

# Intentar crear varios usuarios
echo "users"
../users/users_count.sh
../users/users_add.sh
../users/users_add_jumanja.sh
../users/users_all.sh
../users/users_count.sh

# Intentar crear fraternidad demo
echo "frats"
../frats/frats_count.sh
../frats/frats_add.sh
../frats/frats_all.sh
../frats/frats_count.sh

# Intentar crear servicios
echo "servs"
../servs/servs_count.sh
../servs/servs_add.sh
../servs/servs_all.sh
../servs/servs_count.sh

# Intentar crear lugares
echo "places"
../places/places_count.sh
../places/places_add.sh
../places/places_all.sh
../places/places_count.sh

# Intentar crear tipos acta
echo "types"
../types/types_count.sh
../types/types_add.sh
../types/types_all.sh
../types/types_count.sh

# Hacer Login con Secretaria para etiquetas
echo "login with secre"
../login/login_secre.sh

# Intentar crear etiquetas
echo "tags"
../tags/tags_count.sh
../tags/tags_add.sh
../tags/tags_all.sh
../tags/tags_count.sh

