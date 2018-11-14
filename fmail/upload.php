<img src="../ui/img/barra_sisga.png">
<?php
$target_dir = "../uploads/";
$temp = explode(".", basename($_FILES["fileToUpload"]["name"])) ;
$newfilename = $_POST["cmc_user"] . '.' . strtolower(end($temp));

$target_file = $target_dir . $newfilename;
//$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
//$target_file = $target_dir . $_POST["cmc_user"];
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "Ok, el Archivo adjunto es una imagen - " . $check["mime"] . ". ";
        $uploadOk = 1;
    } else {
        echo "Lo Siento, pero el Adjunto NO es una imagen. ";
        $uploadOk = 0;
    }
}
// Check if file already exists
/*if (file_exists($target_file)) {
    echo "Lo Siento, el archivo de Firma Ya Existe, No se sobreescribe por Seguridad. ";
    $uploadOk = 0;
}*/
// Check file size
if ($_FILES["fileToUpload"]["size"] > 200000) {
    echo "Lo Siento, el tamaño del Archivo excede el límite de 2MB. ";
    $uploadOk = 0;
}
// Allow certain file formats
//if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
//&& $imageFileType != "gif" ) {
  if($imageFileType != "png" ) {

    echo "Lo Siento, solo .PNG es permitido y su archivo es " . $imageFileType  .". ";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Su archivo No pudo ser cargado al Servidor. ";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        //echo "<p>El archivo ". basename( $_FILES["fileToUpload"]["name"]) . " ha sido cargado exitosamente.</p>";
        echo "<p>El archivo ". $newfilename . " ha sido cargado exitosamente.</p>";
        //echo "<img src='../uploads/" . $_POST["cmc_user"] . "'>El archivo ". basename( $_FILES["fileToUpload"]["name"]). " ha sido cargado exitosamente.</p>";
        //echo "<img src='../uploads/" . basename( $_FILES["fileToUpload"]["name"]) . "'>";
        echo "<img src='../uploads/" . $newfilename . "?nocache=" . time() . "'>";
    } else {
        echo "Ha sucedido un error subiendo ese archivo. ";
    }
}
echo "<p>Por seguridad, le pedimos que reingrese al aplicativo con su usuario y clave.</p>";
echo "<a href='javascript:window.history.back();'>Regresar</a>";
?>
