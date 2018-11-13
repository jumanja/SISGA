<?php
/*
 * Esto es un archivo de idioma para FormMail de www.tectite.com.
 * Poner simplemente este archivo en el mismo directorio en tu servidor que formmail.php
 * y FormMail utilizará automáticamente mensajes de este archivo.
 * El archivo se debe llamar "language.inc".
 *
 * Por lo tanto, para conseguir mensajes en español, debes subir "language_es-ar.inc"
 * y renombrarlo como "language.inc".
 *
 * Filename:        language_es-ar.inc
 * Language:        Spanish (Español Variante Argentino)
 * Translated by:   Héctor J. Martignoni (Meco)
 *                  You can contact Russell at www.tectite.com or by email
 *                  to translations AT tectite DOT com.
 *                  Puedes entrar en contacto con Hector en www.capilladelsenor.net o por email
 *                  a www.capilladelsenor.net/contactarse/nosotros/contactenos.html.
 * Version:         1.0 13-Mar-07
 *
 * Comments:
 *  This is a sample language file containing the builtin messages.
 *
 * Change History
 * ~~~~~~~~~~~~~~
 * Version 1.1: 04-May-05 Russell Robinson
 *      Added new messages up to version 7.00 of FormMail.
 *
 * Version 1.0: 15-Dec-04 Russell Robinson
 *      Created.
 *
 *
 * Instructions for Translators
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  Here are the steps:
 *      1. Fill in your details above including contact details,
 *         and version and date.  Below, place your language's title
 *         in the $sLangID variable.
 *      2. For each message, read the description above it and make note of
 *         the parameters require for each message.  Translate
 *         the message and use single quotes (').  If you need to wrap
 *         lines, use the dot operator to concatenate strings.  Use
 *         \n to indicate a newline.  Place parameters in the appropriate
 *         place for the target language.
 *         For example,
 *              This alert has been filtered through "$FILTER" for security
 *              purposes.
 *         might be this in German:
 *              Diese Alarmbereitschaft ist "$FILTER" für Sicherheits Zwecke
 *              durchgesicket worden.
 *
 *         Note that some messages include the $MNUM parameter.  They do this
 *         to locate the message number (which looks like this: [M42]) in a
 *         logical place when the message consists of multiple lines or is
 *         concatenated with other information from FormMail.
 *
 *         NOTE: if there are newlines (\n) at the end of a message, please
 *         ensure you keep them - this will be there for important formatting
 *         requirements.
 *      3. You can leave untranslated messages in English simply by leaving
 *         them out of the file (or commenting the lines by placing //
 *         at the beginning of each line).  The built-in English version is
 *         loaded by FormMail first, then the language.inc file
 *         overrides those messages.
 *      4. You can compare your translation with the builtin version with
 *         these steps:
 *              a. upload your draft file to your server in the same
 *                 directory as formmail.php
 *              b. open formmail in your browser like this:
 *                      http://www.yoursite.com/formmail.php?testlang=1
 *      5. Email to translations AT tectite DOT com for publishing.
 */

    //
    // the name of the language this file contains
    //
$sLangID = "Español-(Argentino)";

	// MSG_SCRIPT_VERSION is shown if the PHP version is too old to run
	// FormMail
	// Parameters:
	// 	$PHPREQ		is the minimum required PHP version
	//	$PHPVERS	is	the version the server currently has installed.
$aMessages[MSG_SCRIPT_VERSION] = 'este script requiere al menos PHP versión '.
								    '$PHPREQ.  Usted tiene la versión PHP $PHPVERS.';

	// MSG_END_VERS_CHK is sent at the end of an Alert message when
	// FormMail detects that there's a newer version available
	// Parameters: none
$aMessages[MSG_END_VERS_CHK] =	'***************************************************\n'.
								'Si eres feliz con tu versión actual y deseas\n'.
								'parar estos recordatorios, edita formmail.php y\n'.
								'cambia CHECK_FOR_NEW_VERSION a false.\n'.
								'***************************************************\n';

	// MSG_VERS_CHK is sent in an Alert message when
	// FormMail detects that there's a newer version available
	// Parameters:
	//	$TECTITE	the website to go to
	//	$FM_VERS	the current FormMail version
	//	$NEWVERS	the new FormMail version that's available
$aMessages[MSG_VERS_CHK] =	'una versión más nueva de FormMail está disponible en $TECTITE.\n'.
							'Estás utilizando actualmente la versión $FM_VERS.\n'.
							'La nueva versión disponible es $NEWVERS.\n';

	// MSG_CHK_FILE_ERROR is sent in an Alert message when
	// FormMail cannot create a file to record the time of version check.
	// Parameters:
	//	$FILE   the file name that could not be created
    //  $ERROR  the actual error message
$aMessages[MSG_CHK_FILE_ERROR] = 'Imposible de crear archivo de control "$FILE": $ERROR';

	// MSG_UNK_VALUE_SPEC is sent in an Alert message when
	// a form uses an unknown value specification in derive_fields.
	// Parameters:
	//	$SPEC	the unknown value specification
$aMessages[MSG_UNK_VALUE_SPEC] = 'derive_fields: valor especificado desconocido "$SPEC"';

	// MSG_INV_VALUE_SPEC is sent in an Alert message when
	// a form uses a value specification in derive_fields that's
	// formatted incorrectly (missing terminating '%')
	// Parameters:
	//	$SPEC	the invalid value specification
$aMessages[MSG_INV_VALUE_SPEC] = 'derive_fields: especificación del valor inválida '.
								    '"$SPEC" (posiblemente falta un "%")';

	// MSG_DERIVED_INVALID is sent in an Alert message when
	// a form's derive_fields setting has errors
	// Parameters: none
	// A list of errors is appended on separate lines
$aMessages[MSG_DERIVED_INVALID] = 'Algunas derive_fields especificaciones son incorrectas $MNUM:\n';

	// MSG_INT_FORM_ERROR is sent in an Alert message and displayed
	// to the form user
	// Parameters: none
$aMessages[MSG_INT_FORM_ERROR] = 'Error interno del formulario';

	// MSG_OPTIONS_INVALID is sent in an Alert message when
	// a form's options settings are invalid.  This applies to
	// mail_options, filter_options, crm_options, and autorespond
	// Parameters:
	//	$OPT	the name of the options field
	// A list of errors is appended on separate lines
$aMessages[MSG_OPTIONS_INVALID] = 'Algunas $OPT opciones son indefinidas $MNUM:\n';

	// MSG_PLSWAIT_REDIR is shown to the user for a redirect
	// with JavaScript
	// Parameters: none
$aMessages[MSG_PLSWAIT_REDIR] = 'Por favor espere mientras es redireccionado...';

	// MSG_IFNOT_REDIR is shown to the user for a redirect
	// with JavaScript
	// Parameters:
	//	$URL	the URL to redirect to
$aMessages[MSG_IFNOT_REDIR] = 'Si usted no es automáticamente redireccionado, '.
							    'por favor <a href="$URL">click aquí</a>.';

	// MSG_PEAR_OBJ is shown to the user if the PEAR Mail object
	// cannot be created
	// Parameters: none
$aMessages[MSG_PEAR_OBJ] = 'No se pudo crear el objeto PEAR Mail';

	// MSG_PEAR_ERROR is sent in an Alert message if the PEAR Mail processing
	// reports an error
	// Parameters:
	//	$MSG	the error message from PEAR
$aMessages[MSG_PEAR_ERROR] = 'PEAR Mail error: $MSG';

	// MSG_NO_FOPT_ADDR is sent in an Alert message SendMailFOption is
	// specified in the form and no email address has been provided
	// Parameters: none
$aMessages[MSG_NO_FOPT_ADDR] = 'Has especificado "SendMailFOption" en tu '.
							    'formulario, pero no hay dirección de email para usar';

	// MSG_MORE_INFO is sent in an Alert message on a line by itself, just
	// before extra information about the FormMail processing that may have
	// led to the alert message
	// Parameters: none
$aMessages[MSG_MORE_INFO] = 'Más información:';

	// MSG_INFO_STOPPED is sent in an Alert message to say that extra
	// alert information has been suppressed because of potential security
	// problems with showing it.
	// Parameters: none
$aMessages[MSG_INFO_STOPPED] = '(Extra alerta: información suprimida por '.
							    'razones de seguridad. $MNUM)';

	// MSG_FM_ALERT is sent as the subject line of an Alert message
	// Parameters: none
$aMessages[MSG_FM_ALERT] = 'Alerta de FormMail';

	// MSG_FM_ERROR is sent as the subject line of an Alert message
	// Parameters: none
$aMessages[MSG_FM_ERROR] = 'Error de escritura de FormMail';

	// MSG_FM_ERROR_LINE is sent in an Alert message on a
	// separate line to introduce the actual error message
	// Parameters: none
$aMessages[MSG_FM_ERROR_LINE] = 'El error siguiente ocurrió en FormMail $MNUM:';

	// MSG_USERDATA_STOPPED is sent in an Alert message to say that the
	// user's data has been suppressed because of potential security
	// problems with showing it.
	// Parameters: none
$aMessages[MSG_USERDATA_STOPPED] = '(Datos de usuario suprimidos por razones '.
								    'de seguridad. $MNUM)';

	// MSG_FILTERED is sent in an Alert message to show what filter
	// has been used on the message
	// Parameters:
	//	$FILTER		the name of the filter
$aMessages[MSG_FILTERED] = 'Este aviso ha sido filtrado con "$FILTER" '.
						    'por razones de seguridad.';

	// MSG_TEMPLATES is sent in an Alert message when a form tries
	// to use a template, but templates have not been configured in
	// formmail.php
	// Parameters: none
$aMessages[MSG_TEMPLATES] = 'Debes fijar: TEMPLATEDIR o TEMPLATEURL '.
							'in formmail.php antes de que especifiques '.
							'plantillas en tus formularios.';

	// MSG_OPEN_TEMPLATE is sent in an Alert message when FormMail cannot
	// open a template file
	// Parameters:
	//	$NAME	the name of the template file
	//	$ERROR	information about the error
$aMessages[MSG_OPEN_TEMPLATE] = 'No se puede abrir la plantilla "$NAME" ($MNUM): $ERROR';

	// MSG_ERROR_PROC is shown to the user as part of an error
	// page.  This message introduces the error.
	// Parameters: none
$aMessages[MSG_ERROR_PROC] = 'Ocurrió un error mientras se procesaba el '.
							    'formulario ($MNUM).\n\n';

	// MSG_ALERT_DONE is shown to the user as part of an error
	// page if an Alert message has been sent to the website owner.
	// Parameters: none
$aMessages[MSG_ALERT_DONE] = 'Nuestro personal ha sido avisado de este error ($MNUM).\n';

	// MSG_PLS_CONTACT is shown to the user as part of an error
	// page if an Alert message could *not* be sent to the website owner.
	// Parameters: none
$aMessages[MSG_PLS_CONTACT] = 'Si escribió correctamente las letras de la imagen,<br>Por favor contáctenos directamente porque este formulario '.
							    'no está funcionando.<br>Sino vuelva al formulario, recargue una nueva imagen y escriba las nuevas letras.<br>Por favor verifique la correcta escritura de las letras de seguridad,<br>antes de enviar el formulario. ($MNUM).\n';

	// MSG_APOLOGY is shown to the user as part of an error
	// page as an apology for a problem with the form.
	// Parameters: none
$aMessages[MSG_APOLOGY] = 'Le pedimos disculpas por algún inconveniente que '.
						    'este error le haya causado.';

	// MSG_ABOUT_FORMMAIL is shown to the user at the foot of pages
	// generated by FormMail (e.g. the default "Thanks" page and default
	// error page).
	// Parameters:
	//	$FM_VERS	the FormMail version number
	//	$TECTITE	www.tectite.com
$aMessages[MSG_ABOUT_FORMMAIL] = 'Su formulario ha sido procesado por '.
							  	    '($FM_VERS), disponible en: '.
								    '<a href="http://$TECTITE/">$TECTITE</a>.';

	// MSG_PREG_FAILED is sent in an Alert message if the TectiteCRM
	// system failed to return the expected result.
	// Parameters: none
$aMessages[MSG_PREG_FAILED] = 'preg_match_all error en FindCRMFields';

	// MSG_URL_INVALID is sent in an Alert message if the specified
	// URL for TectiteCRM is not valid according to the TARGET_URLS
	// configuration setting
	// Parameters:
	//	$URL		the invalid URL
$aMessages[MSG_URL_INVALID] = 'La URL "$URL" para acceder a Customer '.
							    'Relationship Management System no es correcta, '.
							    '(vea TARGET_URLS en formmail.php)';

	// MSG_URL_OPEN is sent in an Alert message if the specified
	// URL for TectiteCRM cannot be opened
	// Parameters:
	//	$URL	the invalid URL
	//	$ERROR	information about the error
$aMessages[MSG_URL_OPEN] = 'Error para abrir Customer Relationship '.
						    'Management System URL "$URL" ($MNUM): $ERROR';

	// MSG_CRM_FAILED is sent in an Alert message if the TectiteCRM
	// system doesn't return an OK message
	// Parameters:
	//	$URL	the invalid URL
	//	$MSG	more information
$aMessages[MSG_CRM_FAILED] = 'Reporte del error de Customer Relationship '.
							    'Management System (url="$URL") ($MNUM): $MSG';

	// MSG_CRM_FORM_ERROR is shown to the user if the information
	// passed to TectiteCRM was not accepted
	// Parameters: none
$aMessages[MSG_CRM_FORM_ERROR] = 'El envío de su formulario, no fue aceptado.';

	// MSG_AND is shown to the user; it shows two items separated
	// by "and"
	// Parameters:
	//	$ITEM1		the first item
	//	$ITEM2		the second item
$aMessages[MSG_AND] = '"$ITEM1" y "$ITEM2"';

	// MSG_OR is shown to the user; it shows two items separated
	// by "or"
	// Parameters:
	//	$ITEM1		the first item
	//	$ITEM2		the second item
$aMessages[MSG_OR] = '"$ITEM1" o "$ITEM2"';

	// MSG_NOT_BOTH is shown to the user; it shows two items that must
	// be specified together
	// Parameters:
	//	$ITEM1		the first item
	//	$ITEM2		the second item
$aMessages[MSG_NOT_BOTH] = 'no ambos "$ITEM1" y "$ITEM2"';

	// MSG_XOR is shown to the user; it shows two items that must
	// not be specified together
	// Parameters:
	//	$ITEM1		the first item
	//	$ITEM2		the second item
$aMessages[MSG_XOR] = '"$ITEM1" o "$ITEM2" (pero no ambos)';

	// MSG_IS_SAME_AS is shown to the user; it shows two items that must
	// not be the same value
	// Parameters:
	//	$ITEM1		the first item
	//	$ITEM2		the second item
$aMessages[MSG_IS_SAME_AS] = '"$ITEM1" es igual que "$ITEM2"';

	// MSG_IS_NOT_SAME_AS is shown to the user; it shows two items that must
	// be the same value
	// Parameters:
	//	$ITEM1		the first item
	//	$ITEM2		the second item
$aMessages[MSG_IS_NOT_SAME_AS] = '"$ITEM1" no es igual que "$ITEM2"';

	// MSG_REQD_OPER is sent in an Alert message when an unknown
	// operator has been used in a "required" specification
	// Parameters:
	//	$OPER		the unknown operator
$aMessages[MSG_REQD_OPER] = 'El operador "$OPER" no es válido para "required"';

	// MSG_PAT_FAILED is sent in an Alert message when a "conditions" pattern
	// match has not matched anything (this isn't necessarily an error)
	// Parameters:
	//	$OPER		the "conditions" operator
	//	$PAT		the "conditions" pattern
	//	$VALUE		the value that was searched
$aMessages[MSG_PAT_FAILED] = 'Error de patrón operador "$OPER" : patrón '.
							    '"$PAT", valor buscado era "$VALUE".';

	// MSG_COND_OPER is sent in an Alert message when a "conditions"
	// operator is not value
	// Parameters:
	//	$OPER		the "conditions" operator
$aMessages[MSG_COND_OPER] = 'El operador "$OPER" no es válido para "conditions"';

	// MSG_INV_COND is sent in an Alert message when a "conditions"
	// field is not valid
	// Parameters:
	//	FLD		the field name
$aMessages[MSG_INV_COND] = 'Campo inválido para "conditions" "$FLD" - no es una secuencia (string) o vector (array).';

	// MSG_COND_CHARS is sent in an Alert message when a "conditions"
	// field is missing the mandatory first 2 characters (the separators)
	// Parameters:
	//	FLD		the field name
	//	COND	the conditions field value
$aMessages[MSG_COND_CHARS] = 'El campo conditions "$FLD" no es válido. '.
							    'Debes provver los dos caracteres '.
							    'separadores al comienzo. Tú tenías "$COND".';

	// MSG_COND_INVALID is sent in an Alert message when a "conditions"
	// field has the wrong format
	// Parameters:
	//	FLD		the field name
	//	COND	the conditions field value
	//	SEP		the internal separator character for the field.
$aMessages[MSG_COND_INVALID] = 'El campo conditions "$FLD" no es válido. '.
							    'Debe haber por lo menos 5 componentes '.
							    'separado por "$SEP". Tu valor era "$COND".';

	// MSG_COND_TEST_LONG is sent in an Alert message when a "conditions"
	// TEST value has too many components
	// Parameters:
	//	FLD		the field name
	//	COND	the conditions field value
	//	SEP		the list separator character for the field.
$aMessages[MSG_COND_TEST_LONG] = 'El campo "$FLD" tiene demasiados componentes para '.
								    'un comando: "TEST" "$COND".\nTe falta '.
								    'un "$SEP"?';

	// MSG_COND_IF_SHORT is sent in an Alert message when a "conditions"
	// IF value has too few components
	// Parameters:
	//	FLD		the field name
	//	COND	the conditions field value
	//	SEP		the internal separator character for the field.
$aMessages[MSG_COND_IF_SHORT] = 'El campo "$FLD" tiene muy pocos componentes para '.
								'un comando "IF": "$COND".\nDebe haber '.
								'por lo menos 6 componentes separados por "$SEP"';

	// MSG_COND_IF_LONG is sent in an Alert message when a "conditions"
	// IF value has too many components
	// Parameters:
	//	FLD		the field name
	//	COND	the conditions field value
	//	SEP		the list separator character for the field.
$aMessages[MSG_COND_IF_LONG] = 'El campo "$FLD" tiene demasiados componentes para '.
							   'un comando "IF": "$COND".\nTe falta '.
							    'un "$SEP"?';

	// MSG_COND_UNK is sent in an Alert message when a "conditions"
	// value has an unknown command
	// Parameters:
	//	FLD		the field name
	//	COND	the conditions field value
	//	CMD		the unknown command
$aMessages[MSG_COND_UNK] = 'El campo "$FLD" tiene una palabra de comando desconocida. '.
						    '"$CMD": "$COND".';

	// MSG_MISSING is sent in an Alert message when
	// a socket filter is incorrectly defined
	// Parameters:
	//	ITEM	the missing item
$aMessages[MSG_MISSING] = 'Falta: "$ITEM"';

	// MSG_NEED_ARRAY is sent in an Alert message when
	// a socket filter is incorrectly defined
	// Parameters:
	//	ITEM	the item that should be an array
$aMessages[MSG_NEED_ARRAY] = '"$ITEM" debe ser un vector (array)';

	// MSG_SUBM_FAILED is shown to the user when an internal error
	// as occurred and that error is not to be shown
	// Parameters: none
$aMessages[MSG_SUBM_FAILED] = 'El envío de tu formulario ha fallado debido a '.
							    'un error en nuestro servidor.';

	// MSG_FILTER_WRONG is sent in an Alert message when
	// a socket filter is incorrectly defined
	// Parameters:
	//	FILTER	the filter name
	//	ERRORS	a string containing a list of errors
$aMessages[MSG_FILTER_WRONG] = 'El “filtro "$FILTER" no se definió correctamente: '.
							    '$ERRORS';

	// MSG_FILTER_CONNECT is sent in an Alert message when FormMail
	// cannot connect to a socket filter
	// Parameters:
	//	FILTER	the filter name
	//	SITE	the site
	//	ERRNUM	socket error number
	//	ERRSTR	socket error message
$aMessages[MSG_FILTER_CONNECT] = 'No se puede conectar con el sitio "$SITE" '.
								 'por el filtro "$FILTER" ($ERRNUM): $ERRSTR';

	// MSG_FILTER_PARAM is sent in an Alert message when a socket
	// filter has an invalid parameter specification
	// Parameters:
	//	FILTER	the filter name
	//	NUM		parameter number
	//	NAME	parameter name
$aMessages[MSG_FILTER_PARAM] = 'El filtro "$FILTER" tiene un parámetro inválido '.
							    '#$NUM: no "$NAME"';

	// MSG_FILTER_OPEN_FILE is sent in an Alert message when a socket
	// filter cannot open the required file
	// Parameters:
	//	FILTER	the filter name
	//	FILE	the file that could not be opened
	//	ERROR	the error message
$aMessages[MSG_FILTER_OPEN_FILE] = 'El filtro "$FILTER" no puede abrir el archivo '.
								   '"$FILE": $ERROR';

	// MSG_FILTER_FILE_ERROR is sent in an Alert message when a socket
	// filter gets an error message during reading a file
	// Parameters:
	//	FILTER	the filter name
	//	FILE	the file that could not be opened
	//	ERROR	the error message
	//	NLINES	the number of lines that were read successfully
$aMessages[MSG_FILTER_FILE_ERROR] = 'Filtro "$FILTER": error leído en archivo '.
 								   	'"$FILE" después de líneas: $NLINES $ERROR';

	// MSG_FILTER_READ_ERROR is sent in an Alert message when a socket
	// filter gets an error during reading from the socket
	// Parameters:
	//	FILTER	the filter name
	//	ERROR	the error message
$aMessages[MSG_FILTER_READ_ERROR] = 'Error del filtro: "$FILTER" error leído: '.
 								   	'$ERROR';

	// MSG_FILTER_NOT_OK is sent in an Alert message when a socket
	// filter fails to return the agreed __OK__ indicator
	// Parameters:
	//	FILTER	the filter name
	//	DATA	the data returned from the filter
$aMessages[MSG_FILTER_NOT_OK] = 'Filtro "$FILTER" fallado (faltando '.
 								'línea de __OK__ ): $DATA';

	// MSG_FILTER_UNK is sent in an Alert message
	// when an unknown filter is specified by a form
	// Parameters:
	//	FILTER	the filter name
$aMessages[MSG_FILTER_UNK] = 'Filtro desconocido "$FILTER"';

	// MSG_FILTER_CHDIR is sent in an Alert message
	// when FormMail cannot change to the filter's directory
	// Parameters:
	//	FILTER	the filter name
	//	DIR		the directory name
	//	ERROR	an error message from the system
$aMessages[MSG_FILTER_CHDIR] = 'No se puede aplicar chdir a "$DIR" para que funcione el filtro '.
							    '"$FILTER": $ERROR';

	// MSG_FILTER_NOTFOUND is sent in an Alert message
	// when FormMail cannot execute the filter
	// Parameters:
	//	FILTER	the filter name
	//	CMD		the command line being executed
	//	ERROR	an error message from the system
$aMessages[MSG_FILTER_NOTFOUND] = 'No puede ejecutar el filtro "$FILTER" con '.
								    'el comando "$CMD": $ERROR';

	// MSG_FILTER_ERROR is sent in an Alert message
	// when a filter returns a non-zero status
	// Parameters:
	//	FILTER	the filter name
	//	ERROR	an error message from the system
	//	STATUS	the status return from the command
$aMessages[MSG_FILTER_ERROR] = 'Filtro "$FILTER" fallado (estado $STATUS): '.
							    '$ERROR';

	// MSG_FLD_NOTFOUND is sent as part of an Alert message
	// when a template refers to a non-existent form field
	// Parameters:
	//	FIELD	the field name
$aMessages[MSG_FLD_NOTFOUND] = '"$FIELD" no es un campo llenado en el formulario';

	// MSG_TEMPLATE_ERRORS is sent as part of an Alert message
	// when a template has generated some errors.  The message
	// should end with a new line and the actual errors are
	// output after it.
	// Parameters:
	//	NAME	the template name
$aMessages[MSG_TEMPLATE_ERRORS] = 'La plantilla "$NAME" causó los '.
								    'siguientes errores: ($MNUM):\n';

	// MSG_TEMPLATE_FAILED is sent in an Alert message
	// when processing a template has failed.
	// Parameters:
	//	NAME	the template name
$aMessages[MSG_TEMPLATE_FAILED] = 'Falla al procesar la plantilla "$NAME"';

	// MSG_MIME_PREAMBLE is sent in the preamble of MIME emails
	// Parameters: none
$aMessages[MSG_MIME_PREAMBLE] = '(tu lector del correo no debe mostrar esto '.
								'text.\seguramente necesitas hacer una '.
								'actualización a un software más moderno.)';

	// MSG_MIME_HTML is sent in the preamble of HTML emails
	// Parameters:
	//	NAME	the template name
$aMessages[MSG_MIME_HTML] = 'Este mensaje ha sido generado por FormMail '.
							'usando una plantilla de HTML \denominada "$NAME". El '.
							'texto crudo del formulario\nse ha '.
							'incluido abajo, pero tu lector del correo debe '.
							'exhibir la versión HTML\nsolamente (a menos que '.
							'no sea capaz de hacerlo).';

	// MSG_FILE_OPEN_ERROR is sent in an Alert message when FormMail
	// cannot open a file
	// Parameters:
	//	NAME	the file name
	//	TYPE	the type of file
	//	ERROR	the system error message
$aMessages[MSG_FILE_OPEN_ERROR] = 'No se pudo abrir el archivo $TYPE "$NAME": $ERROR';

	// MSG_ATTACH_DATA is sent in an Alert message when the file
	// attachment through 'data' has gone wrong.
	// Parameters: none
$aMessages[MSG_ATTACH_DATA] = 'Error interno: AttachFile requiere '.
							    '"tmp_name" o "data"';

	// MSG_PHP_HTML_TEMPLATES is sent in an Alert message when an
	// HTML template is used but the PHP version is too old.
	// Parameters:
	//	$PHPVERS	the current PHP version
$aMessages[MSG_PHP_HTML_TEMPLATES] = 'Opción de HTMLTemplate es solamente soportada '.
								    'with PHP version 4.0.5 or above.  Your '.
								    'server is running version $PHPVERS.';

	// MSG_PHP_FILE_UPLOADS is sent in an Alert message when
	// file upload is used but the PHP version is too old.
	// Parameters:
	//	$PHPVERS	the current PHP version
$aMessages[MSG_PHP_FILE_UPLOADS] = 'Por razones de seguridad, subida (upload) de archivos está solamente '.
							    'permitido con la versión 4.0.3 de PHP o superior. '.
							    'La versión actual de tu servidor es: $PHPVERS.';

	// MSG_FILE_UPLOAD is sent in an Alert message when
	// file upload is attempted but FormMail is not configured to allow
	// it
	// Parameters: none
$aMessages[MSG_FILE_UPLOAD] = 'Intento de subida (upload) del archivo ignorada.';

	// MSG_FILE_UPLOAD_ATTACK is sent in an Alert message when
	// possible file upload attack is detected
	// Parameters:
	//	NAME	file name
	//	TEMP	temporary file name
$aMessages[MSG_FILE_UPLOAD_ATTACK] = 'Posible ataque a la subida (upload) del archivo '.
									    'detectado: name="$NAME" temporal name='.
									    '"$TEMP"';

	// MSG_PHP_PLAIN_TEMPLATES is sent in an Alert message when a
	// Plain template is used but the PHP version is too old.
	// Parameters:
	//	$PHPVERS	the current PHP version
$aMessages[MSG_PHP_PLAIN_TEMPLATES] = 'Opción PlainTemplate es solamente soportada '.
								    'con la versión 4.0.5 de PHP o superior.  Tu '.
								    'servidor está usando la versión $PHPVERS.';

	// MSG_ATTACH_NAME is sent in an Alert message when a
	// the form uses the Attach feature without specifying a file name
	// Parameters: none
$aMessages[MSG_ATTACH_NAME] = 'filter_options: El adjunto debe contener un nombre '.
							    '(e.g. Adjunto=datos.txt)';

	// MSG_PHP_BCC is sent in an Alert message when a
	// the form uses the BCC feature and the PHP version may not support it
	// Parameters:
	//	$PHPVERS	the current PHP version
$aMessages[MSG_PHP_BCC] = 'Advertencia: probablemente BCC no es soportado en tu '.
						    'versión de PHP ($PHPVERS)';

	// MSG_CSVCOLUMNS is sent in an Alert message when a csvcolumns field
	// is not correct
	// Parameters:
	//	$VALUE	the csvcolumns field value
$aMessages[MSG_CSVCOLUMNS] = 'La configuración de "csvcolumns" no es '.
							    'válida: "$VALUE"';

	// MSG_CSVFILE is sent in an Alert message when a csvfile field
	// is not correct
	// Parameters:
	//	$VALUE	the csvfile field value
$aMessages[MSG_CSVFILE] = 'La configuración de "csvfile" no es válida: "$VALUE"';

	// MSG_TARG_EMAIL_PAT_START is sent in an Alert message when a
	// $TARGET_EMAIL pattern is insecure because of a missing '^'
	// at the beginning
	// Parameters:
	//	$PAT	the pattern
$aMessages[MSG_TARG_EMAIL_PAT_START] = 'Advertencia: En tu patrón TARGET_EMAIL '.
									    '"$PAT" está faltando un ^ '.
									    ' al principio.';

	// MSG_TARG_EMAIL_PAT_END is sent in an Alert message when a
	// $TARGET_EMAIL pattern is insecure because of a missing '$'
	// at the end
	// Parameters:
	//	$PAT	the pattern
$aMessages[MSG_TARG_EMAIL_PAT_END] = 'Advertencia: En tu patrón TARGET_EMAIL '.
									    '"$PAT" está faltando un $ al final.';

	// MSG_CONFIG_WARN is sent in an Alert message when the FormMail
	// configuration may have some problems.  The messages are
	// passed on separate lines, so the line terminations below
	// are important.
	// Parameters:
	//	$MESGS	lines of messages
$aMessages[MSG_CONFIG_WARN] = 'los siguientes problemas potenciales fueron encontrados '.
							    'en tu configuración:\n$MESGS\n\n'.
							    'Éstos no son necesariamente errores, pero tú '.
							    'debes repasar la documentación\n'.
							    'interna de formmail.php. Si tú estás seguro '.
							    'que la configuración es correcta\n'.
							    'puedes inhabilitar los mensajes antedichos '.
							    'cambiando los ajustes de CONFIG_CHECK.';

	// MSG_PHP_AUTORESP is sent in an Alert message when the PHP version
	// does not support autoresponding
	// Parameters:
	//	$PHPVERS	current PHP version
$aMessages[MSG_PHP_AUTORESP] = 'Autorespond es soportado solamente con PHP '.
							    'versión 4.0.5 o superior.  Tu servidor está '.
							    'usando la versión $PHPVERS.';

	// MSG_ALERT is the test alert message (formmail.php?testalert=1)
	// Parameters:
	//	$LANG				the language ID
	//	$PHPVERS			PHP version
	//	$FM_VERS			FormMail version
	//	$SERVER				server type
	//	$DOCUMENT_ROOT		PHP's DOCUMENT_ROOT value
	//	$SCRIPT_FILENAME	PHP's SCRIPT_FILENAME value
	//	$PATH_TRANSLATED	PHP's PATH_TRANSLATED value
	//	$REAL_DOCUMENT_ROOT	the REAL_DOCUMENT_ROOT value
$aMessages[MSG_ALERT] =	'Este es un mensaje de prueba de alerta $MNUM\n'.
						'El idioma cargado es $LANG\n'.
						'La versión de PHP es $PHPVERS\n'.
						'La versión de FormMail es $FM_VERS\n'.
						'Tipo de servidor: $SERVER\n'.
						'\n'.
						'DOCUMENT_ROOT: $DOCUMENT_ROOT\n'.
						'SCRIPT_FILENAME: $SCRIPT_FILENAME\n'.
						'PATH_TRANSLATED: $PATH_TRANSLATED\n'.
						'REAL_DOCUMENT_ROOT: $REAL_DOCUMENT_ROOT';

	// MSG_NO_DEF_ALERT is displayed if you use the testalert feature
	// and no DEF_ALERT setting has been provided.
	// Parameters: none
$aMessages[MSG_NO_DEF_ALERT] = 'ningún valor de DEF_ALERT se ha configurado.';

	// MSG_TEST_SENT is displayed if when use the testalert feature
	// Parameters: none
$aMessages[MSG_TEST_SENT] = 'Mensaje de prueba enviado.  Comprobar tu email.';

	// MSG_TEST_FAILED is displayed if when use the testalert feature
	// and the mail sending fails.
	// Parameters: none
$aMessages[MSG_TEST_FAILED] = 'FALLO en el anvío de mensaje de alerta.  Comprueba tu '.
							    'registro de errores del servidor.';

	// MSG_NO_DATA_PAGE is the page that's displayed if the user
	// just opens the URL to FormMail directly.
	// Parameters: none
$aMessages[MSG_NO_DATA_PAGE] =	'Esta es la URL de envío del formulario.\n'.
								'Esto no funcionará correctamente de este modo '.
								'pues no tiene datos para encontrar.\n'.
								'No utilices este enlace para navegar, busca la '.
								'URL; que te da acceso a este formulario.';

	// MSG_REQD_ERROR is displayed to the user as a default error
	// message when they haven't supplied some required fields
	// Parameters: none
$aMessages[MSG_REQD_ERROR] = '<h3><b>El formulario requiere algunos valores que tú, '.
							    'parece que has omitido.</b></h3>.';

	// MSG_COND_ERROR is displayed to the user as a default error
	// message when some form conditions have failed
	// Parameters: none
$aMessages[MSG_COND_ERROR] = 'Algunas informaciones que proporcionaste no son correctas.';

	// MSG_CRM_FAILURE is displayed to the user when submission
	// to the CRM has failed.
	// Parameters: none
$aMessages[MSG_CRM_FAILURE] = 'El envío del formulario no tuvo éxito debido a '.
							    'una falla de CRM.';

	// MSG_FOPTION_WARN is sent in an Alert message when the form
	// uses the superseded SendMailFOption feature
	// Parameters:
	//	$LINE	line number for SENDMAIL_F_OPTION
$aMessages[MSG_FOPTION_WARN] = 'Advertencia: Has utilizado SendMailFOption en '.
							    '"mail_options" en tu formulario. Esto ha sido '.
							    'reemplazado con una configuración '.
							    'interna de formmail.php.  Por favor actualiza tu '.
							    'configuración de formmail.php (busca '.
							    'SENDMAIL_F_OPTION en la línea $LINE) configura '.
							    'esta como "true", entonces quita SendMailFOption '.
							    'de tus formularios.';

	// MSG_NO_ACTIONS is sent in an Alert message when there is no
	// action to perform or email address to send to
	// Parameters: none
$aMessages[MSG_NO_ACTIONS] = 'El formulario tiene un error interno - ninguna acción '.
							    'o recipientes fueron especificados.';

	// MSG_NO_RECIP is sent in an Alert message when there are no
	// valid recipients to send to
	// Parameters: none
$aMessages[MSG_NO_RECIP] = 'El formulario tiene un error interno - ningún '.
						    'recipiente válido se especificó.';

	// MSG_INV_EMAIL is sent in an Alert message when there are errors
	// in the email addresses specified in the form
	// Parameters:
	//	$ERRORS		list of errors
$aMessages[MSG_INV_EMAIL] = 'Direcciones de email inválidas fueron especificados '.
							'en el formulario $MNUM:\n$ERRORS';

    // MSG_FAILED_SEND is sent in an Alert message when the mail sending fails.
	// Parameters: none
$aMessages[MSG_FAILED_SEND] = 'No se pudo enviar el email';

    // MSG_ARESP_EMAIL is sent in an Alert message when
	// no email address has been specified for an autoreponse
	// Parameters: none
$aMessages[MSG_ARESP_EMAIL] = 'No se encontró completado el campo "email". Autorespond '.
							    'requiere las direcciones de email del usuario.';

    // MSG_ARESP_SUBJ is the default subject for the auto response email
	// Parameters: none
$aMessages[MSG_ARESP_SUBJ] = 'Tu formulario enviado';

    // MSG_LOG_NO_VERIMG is written to the auto respond log file
	// if no VerifyImgString session variable was found
	// Parameters: none
$aMessages[MSG_LOG_NO_VERIMG] = 'Ningún VerifyImgString en la sesión';

    // MSG_ARESP_NO_AUTH is shown to the user
	// if no VerifyImgString session variable was found
	// Parameters: none
$aMessages[MSG_ARESP_NO_AUTH] = 'No se pudo obtener autorización para enviar tu email';

    // MSG_LOG_NO_MATCH is written to the auto respond log file
	// if the user's entry did not match the image verification
	// Parameters: none
$aMessages[MSG_LOG_NO_MATCH] = 'El usuario no combinó la imagen';

    // MSG_ARESP_NO_MATCH is shown to the user
	// if the user's entry did not match the image verification
	// Parameters: none
$aMessages[MSG_ARESP_NO_MATCH] = '<h3><b>Las letras que escribió, no concuerdan con la imagen</b></h3><br>vuelva al formulario, recargue una nueva imagen y escriba las nuevas letras.<br>Por favor verifique la correcta escritura de las letras de seguridad,<br>antes de enviar el formulario';

    // MSG_LOG_FAILED is written to the auto respond log file
	// if the autoresponding failed
	// Parameters: none
$aMessages[MSG_LOG_FAILED] = 'Fallado';

    // MSG_ARESP_FAILED is sent in an Alert message
	// if the autoresponding failed
	// Parameters: none
$aMessages[MSG_ARESP_FAILED] = 'Autoresponder fallado';

    // MSG_LOG_OK is written to the auto respond log file
	// if the autoresponding succeeded
	// Parameters: none
$aMessages[MSG_LOG_OK] = 'OK';

	// MSG_THANKS_PAGE is the default page that's displayed if the
	// submission is successful
	// Parameters: none
$aMessages[MSG_THANKS_PAGE] = 'Gracias por comunicarse! '.
							    'recibimos correctamente su información '.
							    'le responderemos a la brevedad.....';

	// MSG_LOAD_MODULE is sent in an alert message if a module
    // could not be loaded.
	// Parameters:
    //  $FILE    the file name
    //  $ERROR   the error message
$aMessages[MSG_LOAD_MODULE] = 'No se pudo cargar el módulo del archivo \'$FILE\': $ERROR';

	// MSG_LOAD_FMCOMPUTE is sent in an alert message if the form
    // specifies at least one "fmcompute" field and the FMCompute
    // module cannot be loaded.
	// Parameters:
    //  $FILE    the file name
    //  $ERROR   the error message
$aMessages[MSG_LOAD_FMCOMPUTE] = 'No se pudo cargar el módulo del archivo FMCompute '.
                                    '\'$FILE\': $ERROR';

	// MSG_REGISTER_MODULE is sent in an alert message if a module
    // could not register with FMCompute
	// Parameters:
    //  $NAME    the name of the module
    //  $ERROR   the error message
$aMessages[MSG_REGISTER_MODULE] = 'No se pudo registrar el módulo $NAME con '.
                                    'FMCompute: $ERROR';


	// MSG_COMP_PARSE is sent in an alert message if a parse error
    // occurs in an fmcompute field
	// Parameters:
    //  $CODE    the code with an error
    //  $ERRORS  the error messages
$aMessages[MSG_COMP_PARSE] = 'Estos análisis de errores ocurrieron en el  '.
                                'código siguiente:\n$ERRORS\n$CODE';

	// MSG_COMP_REG_DATA is sent in an alert message if FormMail cannot
    // register a data field with the FMCompute module
	// Parameters:
    //  $NAME    the field name
    //  $ERROR  the error message
$aMessages[MSG_COMP_REG_DATA] = 'Error al registrar los datos del campo \'$NAME\': '.
                                '$ERROR';

	// MSG_COMP_ALERT is sent in an alert message if the FMCompute
    // module has generated some alert messages.
	// Parameters:
    //  $ALERTS  the alerts
$aMessages[MSG_COMP_ALERT] = 'Los siguientes mensajes de alerta fueron reportados '.
                            'desde el módulo FMCompute: $ALERTS';

	// MSG_COMP_DEBUG is sent in an alert message if the FMCompute
    // module has generated some debug messages.
	// Parameters:
    //  $DEBUG  the alerts
$aMessages[MSG_COMP_DEBUG] = 'Los siguientes mensajes de eliminación de errores fueron '.
                            'reportados desde el módulo FMCompute: $DEBUG';

	// MSG_COMP_EXEC is sent in an alert message if the FMCompute
    // module has generated some error messages during execution
	// Parameters:
    //  $ERRORS  the errors
$aMessages[MSG_COMP_EXEC] = 'Los mensajes de error siguientes fueron reportados '.
                            'desde el módulo FMCompute: $ERRORS';

	// MSG_REG_FMCOMPUTE is sent in an Alert message when FormMail
    // cannot register an external function with FMCompute.
	// Parameters:
	//	FUNC    the function that could not be registered
    //  ERROR   the error message
$aMessages[MSG_REG_FMCOMPUTE] = 'No se pudo registrar la función "$FUNC" con '.
                                'FMCompute: $ERROR';


	// MSG_USER_ERRORS is shown as part of a user error when an FMCompute
    // has called the "UserError" function one or more times.
	// Parameters:
	//	NONE
$aMessages[MSG_USER_ERRORS] = 'Uno o más errores ocurrieron en el envío de su formulario';


	// MSG_CALL_PARAM_COUNT is sent in an alert when a call to a FormMail
    // function from FMCompute has the wrong number of parameters
	// Parameters:
	//	FUNC    the function name
    //  COUNT   the actual number of parameters passed
$aMessages[MSG_CALL_PARAM_COUNT] = 'FMCompute llamó la función de FormMail '.
                                   '\'$FUNC\' con número incorrecto de '.
                                   'parámetros: $COUNT';

	// MSG_CALL_UNK_FUNC is sent in an alert when FMCompute calls an
    // unknown FormMail function
	// Parameters:
	//	FUNC    the function name
$aMessages[MSG_CALL_UNK_FUNC] = 'FMCompute llamó una función desconocida de FormMail '.
                                   '\'$FUNC\'';

	// MSG_NEXT_PLUS_GOOD is sent in an alert message if the form is
    // ambiguous and specifies both "next_form" and "good_url" or
    // "good_template"
	// Parameters:
    //  $WHICH  the "good_" field that was specified
$aMessages[MSG_NEXT_PLUS_GOOD] = 'El formulario ha especificado ambos "next_form" '.
                                'y "$WHICH" campos - la acción a '.
                                'realizarse es ambigua';

	// MSG_MULTIFORM is sent in an Alert message when a form tries
	// to use a multi-form template, but templates have not been configured in
	// formmail.php
	// Parameters: none
$aMessages[MSG_MULTIFORM] = 'Debes configurar MULTIFORMDIR o MULTIFORMURL '.
							'en formmail.php antes de que puedas utilizar '.
							'formularios de páginas múltiples.';

	// MSG_MULTIFORM_FAILED is sent in an Alert message
	// when processing a multi-page form template has failed.
	// Parameters:
	//	NAME	the template name
$aMessages[MSG_MULTIFORM_FAILED] = 'No se pudo procesar la plantilla de páginas múltiples del formulario "$NAME"';

	// MSG_NEED_THIS_FORM is sent in an Alert message
	// when a multi-page form does not specify the "this_form" field.
	// Parameters:
	//	none
$aMessages[MSG_NEED_THIS_FORM] = 'Los formularios de páginas múltiples requieren el campo de "this_form"';

	// MSG_NO_PHP_SELF is sent in an Alert message
	// when FormMail requires the "PHP_SELF" server variable and PHP is not
    // providing it.
	// Parameters:
	//	none
$aMessages[MSG_NO_PHP_SELF] = 'PHP en el servidor no está proporcionando "PHP_SELF"';

	// MSG_RETURN_URL_INVALID is sent in an Alert message
	// when "this_form" is not a valid return URL.  This occurs for
    // multi-page forms.
	// Parameters:
	//	URL     the invalid URL
$aMessages[MSG_RETURN_URL_INVALID] = 'La URL de retono "$URL" no es válida';

	// MSG_GO_BACK is sent in an Alert message
	// when "multi_go_back" has been submitted but this isn't part of a
    // multi-page form.
	// Parameters:
	//	none
$aMessages[MSG_GO_BACK] = 'No se puede “ir atrás” si no es una secuencia de páginas múltiples '.
                          'del formulario o en la primera página de la '.
                          'secuencia del formulario';

	// MSG_OPEN_URL is sent in an Alert message when a URL cannot
    // be opened.
	// Parameters:
	//	URL     the invalid URL
    //  ERROR   error message
$aMessages[MSG_OPEN_URL] = 'No se puede abrir la URL "$URL": $ERROR';

	// MSG_CANNOT_RETURN is sent in an Alert message when an invalid return
    // request is made in a multi-page form sequence.
	// Parameters:
	//	TO          the requested page index
    //  TOPINDEX    the top page index
$aMessages[MSG_CANNOT_RETURN] = 'No puede volver a la página $TO.  El índice superior '.
                                'de páginas es $TOPINDEX';
                                







		// MSG_SAVE_FILE is sent in an alert when saving a file to
        // the server has failed
		// Parameters:
		//	FILE    the source file name (usually a temporary file name)
        //  DEST    the destination file name
        //  ERR     the error message
	$aMessages[MSG_SAVE_FILE] = 'No se pudo guardar el archivo \'$FILE\' to \'$DEST\': $ERR';
	
		// MSG_CHMOD is sent in an alert when changing the protection
        // mode of a file to has failed
		// Parameters:
		//	FILE    the file name
        //  MODE    the mode
        //  ERR     the error message
	$aMessages[MSG_CHMOD] = 'No pudo cambiar el modo de la protección fichero \'$FILE\' '.
                            'a $MODE: $ERR';
                            
    	// MSG_VERIFY_MISSING is shown to the user image verification string
        // was not found
		// Parameters: none
	$aMessages[MSG_VERIFY_MISSING] = 'Secuencia de verificación de la imagen perdida. Esto'.
                                     ' probablemente sea una avería en el servidor.';
                                     
    	// MSG_VERIFY_MATCH is shown to the user
		// if the user's entry did not match the image verification for the
        // imgverify option
		// Parameters: none
	$aMessages[MSG_VERIFY_MATCH] = '<h3><b>Las letras que escribió, no concuerdan con la imagen</b></h3><br>vuelva al formulario, recargue una nueva imagen y escriba las nuevas letras.<br>Por favor verifique la correcta escritura de las letras de seguridad,<br>antes de enviar el formulario.';
	
		// MSG_FILE_NAMES_INVALID is sent in an Alert message when
		// a form's file_names setting has errors
		// Parameters: none
		// A list of errors is appended on separate lines
	$aMessages[MSG_FILE_NAMES_INVALID] = 'Algunas file_names especificaciones son incorrectas $MNUM:\n';
	
		// MSG_FILE_NAMES_NOT_FILE is sent in an Alert message when
		// a form's file_names setting refers to a file field that doesn't
        // exist
		// Parameters:
        //      NAME    the name of the file field that doesn't exist
	$aMessages[MSG_FILE_NAMES_NOT_FILE] = 'Tu especificación de file_names tiene '.
                                          'un error. \'$NAME\' no es el nombre '.
                                          'de un archivo a subir (upload)\n';
                                          
		// MSG_TEMPL_ALERT is sent in an alert message if Advanced Template
        // Processing has generated some alert messages.
		// Parameters:
        //  $ALERTS  the alerts
	$aMessages[MSG_TEMPL_ALERT] = 'Los mensajes de alerta siguientes fueron reportados '.
                                'por el Procesador Avanzado de la Plantilla: $ALERTS';
                                
		// MSG_TEMPL_PROC is sent in an alert message if Advanced Template Processing
        // has generated some error messages during processing
		// Parameters:
        //  $ERRORS  the errors
	$aMessages[MSG_TEMPL_PROC] = 'Los mensajes de error siguientes fueron reportados '.
                                'por el Procesador Avanzado de la Plantilla: $ERRORS';
                                
		// MSG_SAVE_FILE_EXISTS is sent as part of an alert when saving a file to
        // the repository ($FILE_REPOSITORY) has failed because the file
        // already exists and FILE_OVERWRITE is set to false.
		// Parameters:
		//	FILE    the destination file name
	$aMessages[MSG_SAVE_FILE_EXISTS] = 'No se puede guardar el archivo al depósito mientras '.
                                        'que esté sobreescribir \'$FILE\' y tú has '.
                                        'fijado FILE_OVERWRITE a false.';
                                        
		// MSG_ATTACK_DETECTED is sent in an Alert message when an attack on
        // the server has been detected
		// Parameters:
		//	ATTACK      name or description of the attack
        //  INFO        more information about the attack
	$aMessages[MSG_ATTACK_DETECTED] = 'Ataque al servidor detectado "$ATTACK". '.
                                      'Tu servidor es tan seguro que FormMail es '.
                                      'invulnerable a este ataque.  Puedes '.
                                      'inhabilitar estos mensajes fijando '.
                                      'ALERT_ON_ATTACK_DETECTION a false '.
                                      'en la sección de configuración de FormMail.'.
                                      '\nMás información:\n$INFO';
                                      
		// MSG_ATTACK_PAGE is the contents of the browser page displayed to the
        // user when an attack is detected
		// Parameters:
		//	none
	$aMessages[MSG_ATTACK_PAGE] = 'Se ha rechazado tu sumisión del formulario '.
                                  'porque parece ser un abuso a nuestro servidor.';
                                  
		// MSG_ATTACK_MIME_INFO is the contents of the INFO parameter
        // to the MSG_ATTACK_DETECTED message for the MIME attack
		// Parameters:
		//	FLD     name of the field
        //  CONTENT the invalid content found in the field
	$aMessages[MSG_ATTACK_MIME_INFO] = 'El campo "$FLD" tiene contenido inválido. '.
                                       'Contiene "$CONTENT"';
                                       
		// MSG_ATTACK_DUP_INFO is the contents of the INFO parameter
        // to the MSG_ATTACK_DETECTED message for the Duplicate Data attack
		// Parameters:
		//	FLD1     name of the first field
		//	FLD2     name of the second field
	$aMessages[MSG_ATTACK_DUP_INFO] = 'Los campos "$FLD1" y "$FLD2" tienen '.
                                      'datos duplicados';
                                      
		// MSG_ATTACK_SPEC_INFO is the contents of the INFO parameter
        // to the MSG_ATTACK_DETECTED message for the Special Field attack
		// Parameters:
		//	FLD     name of the special field
	$aMessages[MSG_ATTACK_SPEC_INFO] = 'El campo especial "$FLD" contiene una dirección de email';
	
		// MSG_NEED_SCRATCH_PAD is an alert message when processing requires
        // SCRATCH_PAD configuration for file upload processing.  This occurs
        // when you upload files in pages of a multi page form sequence.
		// Parameters:
		//	none
	$aMessages[MSG_NEED_SCRATCH_PAD] = 'Necesitas fijar SCRATCH_PAD en la '.
                                        'sección configuración para procesar '.
                                        'archivos subidos (uploaded).';
                                        
		// MSG_MULTI_UPLOAD is an alert message when processing of uploaded
        // fails during a multi-page form sequence
		// Parameters:
		//	none
	$aMessages[MSG_MULTI_UPLOAD] = 'Falla en el proceso de subida (upload) durante '.
                                    'el proceso de páginas múltiples del formulario.';
                                    
		// MSG_OPEN_SCRATCH_PAD is an alert message when the SCRATCH_PAD
        // directory cannot be opened for cleanup.
		// Parameters:
		//	DIR     name of the directory
        //  ERR     more error information
	$aMessages[MSG_OPEN_SCRATCH_PAD] = 'No puede abrir el directorio SCRATCH_PAD '.
                                        '"$DIR".  Falla en la apertura: $ERR';
                                        
		// MSG_NO_NEXT_NUM_FILE is an alert message when a form tries to
        // use the %nextnum% derivation feature but you haven't
        // setup FormMail's configuration correctly.
		// Parameters:
        //  none
	$aMessages[MSG_NO_NEXT_NUM_FILE] = 'No puedes utilizar la característica %nextnum%: '.
                                        'no has configurado NEXT_NUM_FILE';
                                        
		// MSG_NEXT_NUM_FILE is an alert message when a form tries to
        // use the %nextnum% derivation feature but the next number file cannot
        // be processed.
		// Parameters:
        //  FILE    name of the file
        //  ACT     action
        //  ERR     more error information
	$aMessages[MSG_NEXT_NUM_FILE] = 'No se puede $ACT el próximo número de archivo '.
                                            '\'$FILE\': $ERR';
                                            
		// MSG_URL_PARSE is an error message when a URL to be opened
        // cannot be parsed
		// Parameters:
		//	none
	$aMessages[MSG_URL_PARSE] = 'Falla - No se pudo resolver la URL';
	
		// MSG_URL_SCHEME is an error message when a URL to be opened
        // has an unsupported "scheme" value
		// Parameters:
		//	SCHEME     the scheme that was seen
	$aMessages[MSG_URL_SCHEME] = 'Esquema de URL no soportado "$SCHEME"';
	
		// MSG_SOCKET is an error message when opening a socket for a URL
        // fails
		// Parameters:
		//	ERRNO     the error code
        //  ERRSTR    the error string
        //  PHPERR    the value of $php_errormsg
	$aMessages[MSG_SOCKET] = 'Error de zócalo $ERRNO: $ERRSTR: $PHPERR';
	
		// MSG_GETURL_OPEN is an error message when the web server reports
        // a failure on opening a URL
		// Parameters:
		//	STATUS     the HTTP status value (number + string)
	$aMessages[MSG_GETURL_OPEN] = 'Falla en apertura de URL: $STATUS';
	
		// MSG_FILE_UPLOAD_ERR_UNK is displayed when an unknown error code
        // is provided by PHP for a file upload
		// Parameters:
		//	ERRNO   the error code
    $aMessages[MSG_FILE_UPLOAD_ERR_UNK] = 'Código de error desconocido de subida (upload) del archivo $ERRNO';
    
		// MSG_FILE_UPLOAD_ERRn are the error messages corresponding to the
        // PHP file upload error code n.
		// Parameters:
		//	none    
    $aMessages[MSG_FILE_UPLOAD_ERR1] = 'El archivo subido (uploaded) upload_max_filesize excede la directiva en php.ini.';
    $aMessages[MSG_FILE_UPLOAD_ERR2] = 'El archivo subido (uploaded) MAX_FILE_SIZE excede la directiva especificada en el formulario de HTML.';
    $aMessages[MSG_FILE_UPLOAD_ERR3] = 'El archivo fue solamente parcialmente subido (uploaded).';
    $aMessages[MSG_FILE_UPLOAD_ERR4] = 'Ningún archivo fue subido (uploaded).';
    
    	// MSG_FILE_UPLOAD_SIZE is displayed when an uploaded file exceeds
        // the configured maximum size
		// Parameters:
		//	NAME   the uploaded file's name
        //  SIZE   the size of the uploaded file
        //  MAX    the maximum size that was exceeded
    $aMessages[MSG_FILE_UPLOAD_SIZE] = 'El archivo subido "$NAME" es demasiado grande ('.
                                        '$SIZE bytes). El tamaño máximo '.
                                        'permitido es de $MAX kilobytes.';
                                        
		// MSG_DER_FUNC_ERROR is sent in an Alert message when
		// a form uses a derive_fields function that's
		// formatted incorrectly
		// Parameters:
		//	$SPEC	the invalid value specification
        //  $MSG    a message describing the error or providing an example
	$aMessages[MSG_DER_FUNC_ERROR] = 'derive_fields: especificación inválida de la función: '.
									 '"$SPEC": $MSG';
									 
    	// MSG_DER_FUNC_SIZE_FMT describes the right syntax for the "size" function
		// Parameters:
		//	none
    $aMessages[MSG_DER_FUNC_SIZE_FMT] = 'La función "size" requiere este formato: '.
                                    'tamaño(file_field)';
                                    
    	// MSG_DER_FUNC_IF_FMT describes the right syntax for the "if" function
		// Parameters:
		//	none
    $aMessages[MSG_DER_FUNC_IF_FMT] = 'La función "if" requiere este formato: '.
                                    'if(field;spec;spec)';
                                    
    	// MSG_DER_FUNC_NEXTNUM_FMT describes the right syntax for the "nextnum" function
		// Parameters:
		//	none
    $aMessages[MSG_DER_FUNC_NEXTNUM_FMT] = 'la función "nextnum" requiere este formato: '.
                                    'nextnum(pad) o nextnum(pad;base).  pad y base '.
                                    'deben ser números. base debe ser 2 a 36 inclusive';
                                    
    	// MSG_DER_FUNC_EXT_FMT describes the right syntax for the "ext" function
		// Parameters:
		//	none
    $aMessages[MSG_DER_FUNC_EXT_FMT] = 'La función "ext" requiere este formato: '.
                                    'ext(file_field)';
                                    
    	// MSG_DER_FUNC1_FMT describes the right syntax for a function
        // requiring one parameter
		// Parameters:
		//	FUNC    name of the function
    $aMessages[MSG_DER_FUNC1_FMT] = 'La función "$FUNC" requiere este formato: '.
                                    '$FUNC(fieldname)';  
                                    
		// MSG_TEMPL_DEBUG is sent in an alert message if Advanced Template
        // Processing has generated some debug messages.
		// Parameters:
        //  $DEBUG  the alerts
	$aMessages[MSG_TEMPL_DEBUG] = 'Los siguientes mensajes de errores eliminados fueron reportados '.
                                'por el Procesador Avanzado de la Plantilla: $DEBUG';                                                                                                                                                                                  									                                             
    
        				                                                                                                                                                                                                        	                                                                                                                                                                                                                                                                                                       		                                                                 	
                                
?>