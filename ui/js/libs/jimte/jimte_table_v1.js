// jimte (c) jumanja.net - 2018 - version 1.7
class JimteTab {
  constructor() {
    this.table = "";
  }

  changeTable(obj) {
      console.log("changeTable " + obj.value);
      if(obj.value != ""){
        $("#tabla_loader").show();
        this.table = obj.value;
        this.tableIcon = obj[ obj.selectedIndex ].getAttribute("data-icono");
        this.load_table();
        this.load_table_forms(this.table);

      } else {   //No hay tabla seleccionada
        $("#tabla_loader").hide();

        $("#addTable").hide();
        $("#resetFilters").hide();
        $("#refreshTable").hide();
        $("#table_content").hide();

        $("#tableIcon")[0].innerHTML = "settings";
        $("#myTable")[0].innerHTML = "";
      }

  }

  check_grafica(ctx) {
      console.log("check_grafica ");

      this.load_grafica("graph_mesas", ctx);
  }


  load_table(){
    var self = $(this);

    var icono = this.tableIcon;

    console.log("load_table!");
    $.ajax({
      url: jimte.serverPath + 'index.php/' + this.table +
                              "?id=" + jimte.currentUser.id +
                              "&tiposerv=" + jimte.currentUser.tiposerv +
                              "&servicio=" + jimte.currentUser.servicio +
                              "&frat=" + jimte.currentUser.frat +
                              "&table=" + this.table +
                              "&token=" + jimte.token,
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      type: 'GET',
      success: function(data){
        console.log( "load_table - data: " + data );

        //&& data.length > 0
        if ((typeof data !== undefined ) &&
             (data.length == 0 || data[0].acceso == undefined)) {
          //window.location.href = 'main.html';
          var links = [];
          var cuantos = 0;
          var contenido = "";
          $("#myTable")[0].innerHTML = "";

          //var records = [];
          $.each( data, function( key, val ) {
            if(cuantos == 0) {
                contenido = '<tr class="header">';
                var columns = 0;
                //var fields = [];
                //console.log(val);
                $.each( val, function( key2, val2 ) {
                  //console.log(key2 + ' = "' + val2 + '"');
                  //fields.push(key2 + ' = "' + val2 + '"');
                  if(
                    key2.indexOf("password") == -1 &&
                    key2.indexOf("token") == -1  ){

                    contenido += '<th>' +
                    '<input type="text" class="search_fld" id="search_fld' + key2 + '" ' +
                    'onkeyup="jimte_table.searchTable(this.id, '+columns+')" placeholder="&#x1f50d; Buscar">' +
                    '<br>' +
                    '<span onclick="jimte_table.sortTable('+columns+')">&#x2195;</span>'+
                    '<span onclick="jimte_table.sortTable('+columns+')">' + key2 + '</span>' +
                    '</th>';

                    columns++;

                  }

                });
                contenido += "</tr>";
            }
            contenido += '<tr id="row_' + cuantos + '" onclick="jimte_table.overlayOn(\'C\', this)">';
            $.each( val, function( key2, val2 ) {
              if(
                key2.indexOf("password") == -1 &&
                key2.indexOf("token") == -1  ){

                  contenido += "<td>" + val2 + "</td>";
              }
            });
            contenido += "</tr>";

            cuantos++;
          //  records.push( "<meta " + fields.join(" ") + ">" );
          });

          $("#tabla_loader").hide();

          $("#addTable").show();
          $("#resetFilters").show();
          $("#refreshTable").show();
          $("#table_content").show();

          $("#tableIcon")[0].innerHTML = icono;

          $("#myTable")[0].innerHTML = contenido;

          //$("#tbody_reportadas").show();
        }else {
          //jimte.alertMe(php_response.acceso + " " + php_response.motivo, "Tabla");
          jimte.alertMe(l("%denied", data[0].acceso) + " " +
                        l("%userNotFound", data[0].motivo), l("%iniciarSesion", "Ingreso al Sistema"));

        }
      },
      error: function(xhr, status, error) {
          //alert(xhr.responseText + "\nCon el error:\n" + error);
          console.log(xhr.responseText + "\nCon el error:\n" + error);
      }
    })
  }

  popSelectTables(){
    //begin popSelectTables
    var self = $(this);

    this.aliasPop = this.popArraySelectTable[0][0];
    this.descrPop = this.popArraySelectTable[0][1];
    this.valuePop = this.popArraySelectTable[0][2];
    this.tablePop = this.popArraySelectTable[0][3];

    console.log("popSelectTables!");
    $.ajax({
      url: jimte.serverPath + 'index.php/' + this.tablePop +
                              "?id=" + jimte.currentUser.id +
                              "&selpop=1" +
                              "&tiposerv=" + jimte.currentUser.tiposerv +
                              "&servicio=" + jimte.currentUser.servicio +
                              "&frat=" + jimte.currentUser.frat +
                              "&table=" + this.table +
                              "&token=" + jimte.token,
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      type: 'GET',
      success: function(data){
        console.log( "popSelectTables - data: " + data );

        //&& data.length > 0
        if ((typeof data !== undefined ) &&
             (data.length == 0 || data[0].acceso == undefined)) {

          var currentAddValue  = $("#add_" + jimte_table.aliasPop).val();
          var currentEditValue = $("#edit_" + jimte_table.aliasPop).val();

          $("#add_" + jimte_table.aliasPop).children().remove();
          $("#edit_" + jimte_table.aliasPop).children().remove();

          //var records = [];
          $.each( data, function( key, val ) {
              $("#add_" + jimte_table.aliasPop)
                .append($("<option></option>")
                .attr("value",val[jimte_table.valuePop])
                .text(val[jimte_table.descrPop]));

              $("#edit_" + jimte_table.aliasPop)
              .append($("<option></option>")
              .attr("value",val[jimte_table.valuePop])
              .text(val[jimte_table.descrPop]));
          });

          jimte_table.popArraySelectTable.shift();
          if(jimte_table.popArraySelectTable.length > 0){
              jimte_table.popSelectTables();
          }
        }else {
          jimte.alertMe(l("%denied", data[0].acceso) + " " +
                        l("%userNotFound", data[0].motivo), l("%iniciarSesion", "Recuperar Tablas"));

        }
      },
      error: function(xhr, status, error) {
          //alert(xhr.responseText + "\nCon el error:\n" + error);
          console.log(xhr.responseText + "\nCon el error:\n" + error);
      }
    })
   //end popSelectTables
  }

  sendAdd(){
    var self = $(this);

    var form_data = new FormData();

  }

  working(id){
    $("#" + id).parent().find(".determinate").attr("class", "indeterminate");
  }

  notWorking(id){
    $("#" + id).parent().find(".indeterminate").attr("class", "determinate");
  }

  sendUpdate(){
    //begin sendUpdate
    var self = $(this);

    this.working("editTable");

    //Crear un arreglo con campos y valores para poblar form_data
    var arrayFields = new Array();
    //$("#editTable").find( "*[id^='edit_']" ).css( "background-color", "blue" );
    $("#editTable").find( "*[id^='edit_']" ).each( function() {
        //myText += $(this).attr("id").substring(5) + "|" + $(this).val();
        arrayFields.push($(this).attr("id"));
    });

    var form_data = new FormData();
    form_data.append("id", jimte.currentUser.id );
    form_data.append("tiposerv", jimte.currentUser.tiposerv );
    form_data.append("servicio", jimte.currentUser.servicio );
    form_data.append("frat", jimte.currentUser.frat );
    form_data.append("table", this.table );
    form_data.append("token", jimte.token );

    var inc;
    for (inc = 0; inc < arrayFields.length; inc++) {
        form_data.append(arrayFields[inc], $("#" + arrayFields[inc]).val() );
    }

    console.log("sendUpdate!" + form_data);
    // Display the key/value pairs
    for (var pair of form_data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    $.ajax({
      url: jimte.serverPath + 'index.php/' + this.table,
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      data: form_data,
      type: 'PUT',
      success: function(data){
        console.log( "sendUpdate success - data: " + data );

        //&& data.length > 0
        if ((typeof data !== undefined ) &&
             (data.length == 0 || data[0].acceso == undefined)) {
               jimte.alertMe(l("%denied", data[0].acceso) + " " +
                             l("%userNotFound", data[0].motivo), l("%iniciarSesion", "Se retornaron Datos!"));

        }else {
          jimte.alertMe(l("%denied", data[0].acceso) + " " +
                        l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

        }

        this.notWorking("editTable");
      },
      error: function(xhr, status, error) {
          //alert(xhr.responseText + "\nCon el error:\n" + error);
          jimte_table.notWorking("editTable");

          console.log(xhr.responseText + "\nCon el error:\n" + error);
      }
    })
   //end sendUpdate

  }

  load_grafica(vista, ctx){
//    if(jimte.tekken == "localhost"){
//      return;
//    }
    var self = $(this);

    var form_data = new FormData();
    form_data.append('llave', jimte.llave);
    form_data.append('tekken', jimte.tekken);
    form_data.append('tabla', vista);

    console.log("load_grafica!");
    $.ajax({
      url: jimte.serverPath + '/tabla_select.php',
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      data: form_data,
      type: 'POST',
      success: function(php_response){
        if (php_response.acceso == "concedido") {
          //window.location.href = 'main.html';
          var links = [];
          var cuantos = 0;
          var contenido = "";

          //T, U, A, N, S ->
          var t_total = 0;
          var t_noasig = 0;
          var t_siasig = 0;
          var t_norepo = 0;
          var t_sirepo = 0;

          jimte.select = JSON.parse(php_response.select);
          $.each( jimte.select, function( key, val ) {
            //Si cuantos == 0 s primer registro, ahí tomar fieldnames
            if(val.tipo == "T") {
              t_total = Number(val.cuenta);
            }
            if(val.tipo == "U") {
              t_noasig = Number(val.cuenta);
            }
            if(val.tipo == "A") {
              t_siasig = Number(val.cuenta);
            }
            if(val.tipo == "N") {
              t_norepo = Number(val.cuenta);
            }
            if(val.tipo == "S") {
              t_sirepo = 0 + val.cuenta;
            }

          });

          //Actualizar Grafica;
          console.log("motivo: " + php_response.motivo);
          console.log("tot load_grafica:" + t_total +" / "+ t_noasig+" / "+ t_siasig+" / "+ t_norepo+" / "+ t_sirepo);
          var myChart = new Chart(ctx, {
            type: 'bar',
            responsive: true,
            maintainAspectRatio: false,
            data: {
              labels: ['Mesas', 'No Gestionadas'],
              datasets: [
                {
                label: 'Total Mesas',
                data: [t_total, 0],
                backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)'],
                borderWidth: 1
              },
                  {
                  label: 'Asignación',
                  data: [t_siasig, t_noasig],
                  backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)'  ],
                  borderColor: ['rgba(75, 192, 192, 1)', 'rgba(249, 92, 91, 1)'],
                  borderWidth: 1
                },
                {
                  label: 'Reporte',
                  data: [t_sirepo, t_norepo],
                  backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(255, 159, 64, 0.2)' ],
                  borderColor: ['rgba(255, 159, 64, 1)', 'rgba(249, 92, 91, 1)'],
                  borderWidth: 1
                }
              ]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });


          console.log("fin load_grafica");

        }else {
          jimte.alertMe(php_response.acceso + " " + php_response.motivo, "Tabla");
        }
      },
      error: function(xhr, status, error) {
          //alert(xhr.responseText + "\nCon el error:\n" + error);
          console.log(xhr.responseText + "\nCon el error:\n" + error);
      }
    })
  }

  searchTable(myInput, fieldN) {
    var input, filter, table, tr, td, i;
    input = document.getElementById(myInput);
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[fieldN];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          //if(tr[i].style.display == "none"){
            //already hidden, don't show
          //} else {
            tr[i].style.display = "";
          //}
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  refreshTable(){
    this.load_table($("#tabla")[0].value);
  }

  resetFilters() {
    //console.log("resetFilters!");
    var table, tr, td, i, filters;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }

    filters = document.getElementsByClassName("search_fld");
    for (i = 0; i < filters.length; i++) {
        filters[i].value = "";
    }

  }
  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  overlayOn(overlay, obj) {
      console.log("overlayOn! " + overlay );

      document.getElementById("overlay" + overlay).style.display = "block";

      var ul = document.getElementById("overlay" + overlay).getElementsByTagName("ul")[0];
      if(obj !== undefined){
        var tds = obj.getElementsByTagName("td");
        var headersTable = obj.parentNode.parentNode.getElementsByClassName("header");
        var ths = obj.parentNode.parentNode.getElementsByTagName("th");
        var contentTable = "";
        var i;
        for (i = 0; i < tds.length; i++) {
          if (tds[i]) {
            var field = ths[i].getElementsByTagName("span")[1].innerHTML;
              /*contentTable += "<li>" +
                              "<label class='right-inline'>" + field + "</label>" +
                              "<input class='input-control browser-default black-text' type='text' " +
                              "id='edit_" + field + "' " +
                              "name='edit_" + field + "' " +
                              "value='" + tds[i].innerHTML + "'>" +
                              "</li>"; */
              var elem = document.getElementById("edit_" + field);
              if(elem != null) {
                document.getElementById("edit_" + field).value = tds[i].innerHTML;
              }

          }
        }

      }
      //not needed anymore, los controles ya existirán en editTable, solo se
      //actualizarán los valores cada vez que se haga click.
      //ul.innerHTML = contentTable;

  }

  overlayOff(overlay) {
      document.getElementById("overlay" + overlay).style.display = "none";
  }


  confPwd(conf, pwd) {
    if(document.getElementById(conf).value != null &&
      document.getElementById(pwd).value != null) {
      if(document.getElementById(conf).value != document.getElementById(pwd).value) {
        jimte.alertMe("Las contraseñas no coinciden, verifique antes de Guardar", "Confirmar Contraseña");
      }
    }

  }

  load_table_forms(tabla){
        var self = $(this);
        var url = jimte.configPath + "fields.json";
        jimte_table.popArraySelectTable = new Array();
        console.log("load_table_forms: " + tabla + " / " + url);

        $.ajax({
          url: url,
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          context: this,
          type: 'GET',
          success: function(data) {

            var overlays = document.getElementsByClassName("overlay");
            var i;
            for (i = 0; i < overlays.length; i++) {
              var uls = overlays[i].getElementsByTagName("ul");
              uls[0].innerHTML = "";
            }

            var contentAdd = [];
            var contentEdit = [];

            $.each( data, function( key, val ) {

//                 val.type.indexOf(jimte.userType) !== -1) {
              //Si está habilitaod A - Adicionar, B - Buscar, C - Cambiar
              if(key == tabla &&
                 val.status == "A") {

                   $.each( val.fields, function( key1, val1 ) {

                        var controls = val1.edctr.split(";");
                        var alias = (val1.alias == undefined ? val1.code : val1.alias);
                        var requiredCtrl = (val1.required ? " required='' aria-required='' " : "");
                        var inputCtrl = "";
/*
color, date, datetime-local, email, month, number, range, search, tel, time, url, week
*/
                        if(
                            val1.vwact.indexOf("A") !== -1 ||
                            val1.vwact.indexOf("C") !== -1 ||
                            val1.vwact.indexOf("B") !== -1
                          ){
                            if(controls[0] == "text" ||
                               controls[0] == "password" ||
                               controls[0] == "number" ||
                               controls[0] == "email") {

                                 inputCtrl = "<input readonly class='input-control browser-default black-text' type='" +
                                             controls[0] + "' " +
                                             "id='add_" + alias + "' " +
                                             "name='add_" + alias + "' " +
                                             requiredCtrl +
                                             "value='" + val1.eddef + "'>";

                                if(controls[0] == "password"){
                                  inputCtrl += "<label class='right-inline'>Confirmar</label>" +
                                              "<input readonly class='input-control browser-default black-text' type='" +
                                              controls[0] + "' " +
                                              "id='add_confpwd_" + alias + "' " +
                                              "name='add_confpwd_" + alias + "' " +
                                              requiredCtrl +
                                              "value='' onchange=\"jimte_table.confPwd('add_confpwd_" + alias + "', 'add_"+ alias+"');\">";
                                }

                            }
                            if(controls[0] == "select"){
                              var options = controls[1].split(",");
                              var optionsCTRL ="";
                              var i;
                              for(i = 0; i< options.length; i++){
                                var optionItem = options[i].split("-");
                                optionsCTRL += "<option value='" + optionItem[0] + "'>" +
                                               optionItem[1] +
                                               "</option>"
                              }

                              inputCtrl = "<select disabled class='browser-default' " +
                                          requiredCtrl +
                                          "id='add_" + alias + "' " +
                                          "name='add_" + alias + "' >" +
                                          optionsCTRL +
                                          "</select>";

                            }

                            if(controls[0] == "selectTable"){
                              var options = controls[1].split(",");
                              // Cola de procesos
                              jimte_table.popArraySelectTable.push([alias, options[1], options[2], options[0]]);

                              inputCtrl = "<select disabled class='browser-default' " +
                                          requiredCtrl +
                                          "id='add_" + alias + "' " +
                                          "name='add_" + alias + "' >" +
                                          optionsCTRL +
                                          "</select>";

                            }

                            //Si está permitido Adición
                            if(
                              val1.vwact.indexOf("A") !== -1 ||
                              val1.edact.indexOf("A") !== -1
                              ){
                                var addCtrl = inputCtrl;
                                if(val1.edact.indexOf("A") !== -1){
                                  addCtrl = addCtrl.replace(/readonly/g, "");
                                  addCtrl = addCtrl.replace(/disabled/g, "");
                                }
                                contentAdd.push( "<li title='"+ val1.help + "' >" +
                                                  "<label class='right-inline'>" +
                                                  "<i class='material-icons tiny'>" + val1.icon + "</i>&nbsp;" +
                                                  val1.desc + "</label>" +
                                                  addCtrl +
                                                  "</li>");
                            }
                            //Si está permitido Cambio
                            if( val1.vwact.indexOf("C") !== -1 ||
                                val1.edact.indexOf("C") !== -1 ){
                                var editCtrl = inputCtrl;
                                editCtrl = inputCtrl.replace(/add_/g, "edit_");
                                if(
                                  val1.edact.indexOf("C") !== -1
                                ){
                                  editCtrl = editCtrl.replace(/readonly/g, "");
                                  editCtrl = editCtrl.replace(/disabled/g, "");
                                }

                                contentEdit.push( "<li title='"+ val1.help + "'>" +
                                                  "<label class='right-inline'>" +
                                                  "<i class='material-icons tiny'>" + val1.icon + "</i>&nbsp;" +
                                                  val1.desc + "</label>" +
                                                  editCtrl.replace(/add_/g, "edit_") +
                                                  "</li>");

                            }

                          }


                  });

              }
            });

            overlays[0].getElementsByTagName("ul")[0].innerHTML = contentAdd.join("");
            overlays[1].getElementsByTagName("ul")[0].innerHTML = contentEdit.join("");

            //$('select').material_select();
            if(jimte_table.popArraySelectTable != undefined &&
               jimte_table.popArraySelectTable.length > 0){
                jimte_table.popSelectTables();
            }


          },
          error: function(xhr, status, error) {
              //alert('buildSideMenu failed: ' + xhr.responseText + "\nWith error:\n" + error);
              console.log('load_table_forms failed: ' + xhr.responseText + "\nWith error:\n" + error);
          },
          error2: function(){
            //alert("buildSideMenu: error with server communication");
            console.log("load_table_forms: error with server communication");
          }
        })
      }


}
