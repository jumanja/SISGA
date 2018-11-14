<p>
Para cualquier duda o sugerencia, y soporte, escriba a:
<SCRIPT TYPE="text/javascript">
<!-- 
// protected email script by Joe Maller
// JavaScripts available at http://www.joemaller.com
// this script is free to use and distribute
// but please credit me and/or link to my site
  emailE='imagenes.franciscanosconventuales.com'
  emailE=('info' + '@' + emailE)
  document.write('<A href="mailto:' + emailE + '">' + emailE + '</a>')
 //-->
</script>
<NOSCRIPT>
    <em>Email address protected by JavaScript.<BR>
    Please enable JavaScript to contact me.</em>
</NOSCRIPT>
</p>
<p></p>
    <!-- STEP 1: Put the full URL to formmail.php on your website in the 'action' value. -->
<form method="post" action="http://www.imagenes.franciscanosconventuales.com/fmail/fm.php" name="ContactForm" enctype="multipart/form-data">
    <input type="hidden" name="env_report" value="REMOTE_HOST,REMOTE_ADDR,HTTP_USER_AGENT,AUTH_TYPE,REMOTE_USER">
    <!-- STEP 2: Put your email address in the 'recipients' value.
                 Note that you also have to allow this email address in the
                 $TARGET_EMAIL setting within formmail.php!
    -->
    <input type="hidden" name="recipients" value="info@imagenes.franciscanosconventuales.com" />
    <!-- STEP 3: Specify required fields in the 'required' value -->
    <input type="hidden" name="required" value="email:Tu correo electronico,FirstName:Escribe tu nombre,LastName:Escribe tu apellido" />
    <!-- STEP 4: Put your subject line in the 'subject' value. -->
    <input type="hidden" name="subject" value="Sugerencia de Imagen enviada" />

                        <div class="row row-sm-offset">

                            <div class="col-xs-12 col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label" for="form1-p-name">Nombres<span class="form-asterisk">*</span></label>
                                            <input type="text" name="FirstName" class="form-control"/>
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label" for="form1-p-name">Apellidos<span class="form-asterisk">*</span></label>
                                            <input type="text" name="LastName" class="form-control"/>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-xs-12 col-md-6">
                                <div class="form-group">
                                    <label class="form-control-label" for="form1-p-email">Email<span class="form-asterisk">*</span></label>
                                    <input type="email" class="form-control" name="email" required="" data-form-field="Email" id="form1-p-email">
                                </div>
                            </div>                           

                        </div>

                        <div class="col-xs-12 col-md-6">
                            <div class="form-group">
                                <label class="form-control-label" for="form1-p-message">Mensaje (si la imagen a sugerir está online, por favor peque el enlace):</label>
                                <textarea class="form-control" name="mesg" rows="10" data-form-field="Message" id="form1-p-message"></textarea>
                            </div>
                        </div>
                        
    <input type="hidden" name="derive_fields"
    value="realname = FirstName + LastName" />

                        <div class="col-xs-12 col-md-6">
                            <div class="form-group">
                                <label class="form-control-label" for="form1-p-message">Seleccione la imagen a enviar. 
                                Archivo a subir (Máximo 2 MB. Solo jpg,jpeg,gif,png):</label>
                                <textarea class="form-control" name="mesg" rows="10" data-form-field="Message" id="form1-p-message"></textarea>
                                       <input type="hidden" name="conditions1" value=":@
    @TEST@img_file@Por favor suba un archivo:@:
    @TEST@img_file~/^.*\.(jpg|jpeg|gif|png|JPG|JPEG|GIF|PNG)$/i@Solo jpg,jpeg,png o gif y máximo 2 MB@:
    @TEST@img_file#<2097152@Maximo tamaño de la imagen 2 MB.@" />
        <input type="hidden" name="file_names"  value="img_file=FirstName.%'_'%.LastName.%'_'%.%date%.%2E%.%ext(img_file)%" />
 
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-6">
                                <p>Autoriza a imagenes.franciscanosconventuales.com para publicarla en nuestro sitio?</p>
            <p>Si <input type="radio" name="contact" disabled value="Y" checked />
            No <input type="radio" name="contact" disabled value="N" /></p>
                        </div>
                        <div class="col-xs-12 col-md-6">
        <td><p><b>Nota: </b>Haciendo click en Enviar usted acepta los términos y condiciones de éste servicio y declara que tiene todos los derechos sobre la imagen enviada.</p></td>
                        </div>
        <div><button type="submit" class="btn btn-primary">ENVIAR</button></div>
        <!--<input type="submit" value="Enviar" /></td>-->
</form>
<br>
<!--
    Please support the ongoing development of FormMail and our other
    freeware products by keeping the following text on your form
    (or placing it elsewhere on your website).  Thanks!
-->
<small>This form and its 
<a href="http://www.tectite.com/">form processor</a>
supplied by www.tectite.com.
</small>
