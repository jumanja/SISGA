// jimte (c) jumanja.net - 2018 - version 1.7.0
class JimteMan {
/*Simulate events like click*/
eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
  getStateTitle(state) {
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].state === state) {
        return menuItems[i].item;
      }
    }
  }
  getIcon(state) {
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].state === state) {
        return menuItems[i].icon;
      }
    }
  }

 changeState(state) {
    //var appContentContext = { 'state': state, 'title': getStateTitle(state), 'icon': getIcon(state) };
    //appContent.innerHTML = MonitorApp.content(appContentContext);

    //next lines to load real mainContent
    //var statePage = document.querySelector('#' + state);

    console.log("changeState: " + state);
    //statePage.innerHTML = MonitorApp[state]();

    if (state == 'cerrarSesion') {
      this.tekken = "";
      this.userType = "";
      this.defaultOption = "";
      //window.location.reload(true);
      //window.location.reload(true);

      //location.replace(this.thisURL);
      $("body").hide();

      document.getElementById('myHomePage').click();
    } else {
      if (state != 'iniciarSesion') {
        //this.buildSideMenu();
        this.buildInnerPage(state);

      }
    }

    $('.menuLinks').removeClass('menuActive');
    $('#' + state + 'Link').addClass('menuActive');
    //$('.button-collapse').sideNav();

  }

//  changeState('actividadFisica');
//
  /* now constructor
  */
    constructor() {

        //for Login
        this.submitEvent();
        this.lastResponse = "";
        if (window.location.href.indexOf("localhost") > -1) {
          //this.tekken = "localhost";
          //this.userType = "A";
          //this.defaultOption = "cuadroMando";

          this.tekken = "";
          this.userType = "A";
          this.defaultOption = "";

        } else {
          this.tekken = "";
          this.userType = "T";
          this.defaultOption = "";

        }

        this.llave = "";
        this.apellidos = "";
        this.nombres = "";

        //this.mesastestigos = array();
        this.thisURL = "";

        this.currentArt = "";
        this.currentLang = "es";

        //now try to addValuesTranslate
        this.currentLang  = location.search.split('lang=')[1] ? location.search.split('lang=')[1] : this.currentLang ;

        this.currentMode = "";
        this.params = "";
        this.params = this.parseQueryString(window.location.search);
        if(this.params.art != "" && this.params.art != undefined){
          this.currentArt = this.params.art.substring(0,3);
        }
        //}

        this.carousel = [];
        this.carouselIndex = 1;
        this.carouselInterval = 0;

        this.includesPath = 'ui/includes/';
        this.articlesPath = 'ui/articles/';
        this.layoutPath = 'ui/layouts/';
        this.configPath = 'ui/config/';
        this.serverPath = 'api/v1.5.3/';
        this.imagesPath = 'ui/img/';
        this.imagesArticlePath = 'ui/articles/';
        this.header = 'header.json';
        this.sideMenu = 'sidemenu.json';
        this.navigation = 'navigation.json';
        this.imageCar = 'imageCar.json';
        this.imageNav = 'imageNav.json';
        this.footer = 'footer.html';
        this.central = 'article000.json';

        this.buildHeader();
        /*this.buildNavigation();
        this.buildImageCar();
        this.buildCentral();

        this.buildImageNav();
        */
        this.buildSideMenu(this.tekken);
        this.buildFooter();

        $("body").show();


    }
    submitEvent(){
      $('#loginForm').submit((event)=>{
        event.preventDefault();
        this.sendForm();
      })
    }
    sendForm(){
      var self = $(this);

      let form_data = new FormData();
      form_data.append('usuario', $('#usuario').val());
      form_data.append('password', $('#password').val());
      form_data.append('lang', this.currentLang);

      //console.log("sendForm!" + form_data);
      $.ajax({
        url: this.serverPath + 'index.php/login',
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        data: form_data,
        type: 'POST',
        success: function(php_response){
          //console.log("presp: " + php_response[0].acceso);

          if (php_response[0].acceso == undefined) {
            //window.location.href = 'main.html';
            jimte.tekken = php_response[0].id;
            jimte.userType = php_response[0].servicio;

            jimte.llave = php_response[0].usuario;
            jimte.apellidos = php_response[0].apellidos;
            jimte.nombres = php_response[0].nombres;

            jimte.defaultOption = "";
            jimte.buildSideMenu(php_response.tekken);
          }else {
            //alert(php_response.acceso + " " + php_response.motivo);
            jimte.alertMe(l("%denied", php_response[0].acceso) + " " +
                          l("%userNotFound", php_response[0].motivo), l("%iniciarSesion", "Ingreso al Sistema"));
          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            jimte.alertMe(xhr.responseText + "\nCon el error:\n" + error, "Ingreso al Sistema");
        }
      })
    }

    displayMode() {
      if(this.currentMode == "blocks"){
        $(".hide-mode-blocks").hide();
      }
      if(this.currentMode == "blocks"){
        $(".show-mode-blocks").show();
      }
      if(this.currentMode == "proto"){
        $(".hide-mode-proto").hide();
      }
      if(this.currentMode == "proto"){
        $(".show-mode-proto").show();
      }
    }

    buildHeader() {
        var self = $(this);
        //let url = this.configPath + this.currentLang + '_' + this.header;
        let url = this.configPath + this.header;
        console.log(url);

        //call header
        $.ajax({
          url: url,
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          context: this,
          type: 'GET',
          success: (data) =>{
            /*if (data.msg=="OK") {
              this.poblarCalendario(data.sections)
            }else {
              alert(data.msg)
              window.location.href = 'index.html';
            }*/
            var metas = [];
            $.each( data.metas, function( key, val ) {
              var attribs = [];
              //console.log(val);
              $.each( val, function( key2, val2 ) {
                //console.log(key2 + ' = "' + val2 + '"');
                attribs.push(key2 + ' = "' + val2 + '"');
              });
              metas.push( "<meta " + attribs.join(" ") + ">" );
            });
            //console.log(metas.join(""));

            var links = [];
            $.each( data.links, function( key, val ) {
              links.push( "<link rel='" + val.rel + "' " +
                          "href='" + val.href + "'>");
            });

            var scripts = [];
            $.each( data.scripts, function( key, val ) {
              scripts.push( "<script src='" + val.src + "'></script>" );
            });
            $("head")[0].innerHTML = metas.join("") +
                                    links.join("") +
                                    scripts.join("");

            document.title = data.title;
            $("#headerImg_all").attr("src", this.imagesPath + data.img_all);
            $("#headerImg_xs").attr("src", this.imagesPath + data.img_xs);
            $("html").attr("lang", data.defaultLang);
            $("#org")[0].innerHTML = data.org;
            $("#org_URL").attr("href", data.URL);
            $("#org_URL")[0].innerHTML = data.URL;
            this.thisURL = data.thisURL;
            this.currentLang = data.defaultLang;
            this.currentMode = data.defaultMode;
            this.displayMode();

            /*$( "<ul/>", {
              "class": "my-new-list",
              html: items.join( "" )
            }).appendTo( "body" );*/
            //now try to addValuesTranslate
            this.currentLang  = location.search.split('lang=')[1] ? location.search.split('lang=')[1] : this.currentLang ;
            t(this.currentLang, "div");


          },
          error: function(xhr, status, error) {
              //alert('buildHeader failed: ' + xhr.responseText + "\nWith error:\n" + error);
              console.log('buildHeader failed: ' + xhr.responseText + "\nWith error:\n" + error);
          },
          error2: function(){
            //alert("buildHeader: error with server communication");
            console.log("buildHeader: error with server communication");
          }
        })
    }

    buildSideMenu(tekken){
      var self = $(this);
      //let url = this.configPath + this.currentLang + '_' + this.sideMenu;
      let url = this.configPath + this.sideMenu;

      $('li a.menuLinks').parent().remove();
      $.ajax({
        url: url,
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        context: this,
        type: 'GET',
        success: (data) =>{
          var links = [];

          $.each( data, function( key, val ) {

            if(val.status == "A"){
              var activeLink = (val.state == "iniciarSesion" ? "menuActive" : "");
              jimte.isLogged = false;
              jimte.isLogged = ((jimte.tekken == undefined || jimte.tekken == null || jimte.tekken == "") ? false : true);

              //console.log(val.item  + " val.isLogged:" + val.isLogged + " jimte.isLogged " + jimte.isLogged);

              if( (val.isLogged == "Y" && jimte.isLogged) ||
                  (val.isLogged == "N" && !jimte.isLogged) ){

                    //console.log(key + " / "+ jimte.defaultOption);

                    //console.log(jimte.userType + " / " + val.type);
                    if(val.type.indexOf(jimte.userType) !== -1) {
                      if(jimte.defaultOption == "") {
                        jimte.defaultOption = key;
                      }

                      links.push( "<li><a href='#' class='menuLinks " + activeLink + "' " +
                                  'onclick="jimte.changeState(\'' + key + '\')" ' +
                                  'id="' + key + 'Link" >'  +
                                  '<i class="material-icons text-primary-color">' + val.icon + '</i>' +
                                  "<span translate='yes' id='"+key+"' class=''>" + val.item + "</span></a></li>");

                    }

              }


            }
          });

          $("#sideMenu").append(links.join(""));
          t(this.currentLang, "#sideMenu");

          if(jimte.apellidos != "" && jimte.nombres) {
            $("#userFirstName").text(jimte.nombres);
            $("#userLastName").text(jimte.apellidos);
            $("#userTekken").text(jimte.llave);
          } else {
            if(jimte.tekken == "localhost"){
              $("#userFirstName").text("Web");
              $("#userLastName").text("Master");
              $("#userTekken").text("webmaster");

            } else {
              $("#userFirstName").text(t(this.currentLang, "userFirstName"));
              $("#userLastName").text(t(this.currentLang, "userLastName"));
              $("#userTekken").text("");

            }
          }

          if(jimte.defaultOption != "") {
            jimte.changeState(jimte.defaultOption);
          }

        },
        error: function(xhr, status, error) {
            //alert('buildSideMenu failed: ' + xhr.responseText + "\nWith error:\n" + error);
            console.log('buildSideMenu failed: ' + xhr.responseText + "\nWith error:\n" + error);
        },
        error2: function(){
          //alert("buildSideMenu: error with server communication");
          console.log("buildSideMenu: error with server communication");
        }
      })
    }

    buildNavigation() {
      var self = $(this);
      //let url = this.configPath + this.currentLang + '_' + this.navigation;
      let url = this.configPath + this.navigation;
      //console.log(url);
      //call header
      $.ajax({
        url: url,
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        context: this,
        type: 'GET',
        success: (data) =>{
          var esteItem = "";
          var links = [];
          //console.log(this.imagesPath);
          var imagePath = this.imagesPath;
          $.each( data, function( key, val ) {
            //console.log("0x: " + key + " " + val.href);
            //console.log(val);

            if(val.status == "A"){
              var aType = "";
              var aCaret = "";
              if(val.content == undefined){
                aType = '';
                aCaret = '';
              } else {
                aType = "class='dropdown-toggle' data-toggle='dropdown' ";
                aCaret = "<span class='caret'>";
              }

                links.push("<li class='dropdown'>" +
                    "<a " + aType +
                    (val.target == undefined ? "" :
                      "target='"+ val.target + "' ") +
                     "href='"+
                    (val.href == undefined ? "#" :
                      val.href) + "'" +
                      ">" +
                     key +
                     aCaret +
                     "</a>");

                if(val.content == undefined){

                } else {
                  links.push("<ul class='dropdown-menu'>");
                  $.each( val.content, function( key2, val2 ) {

                    //val2.href = "index.php?art=" + key2;
                    if(val2.status == "A"){

                        val2.href = "?art=" + key2;

                        links.push("<li " +
                            (val2.content == undefined ? "" :
                            "class='dropdown-toggle' data-toggle='dropdown' ") +
                            ">" +
                            "<a " +
                            'onclick="javscript:jimte.buildCentral(\'' + key2 + '\');" ' +
                            (val2.target === undefined ? "" :
                              "target='"+ val2.target + "' ") +
                            ">" +
                             val2.name + "</a></li>");
/*
                             "href='"+
                            (val2.href == undefined ? "#" :
                              val2.href) + "'" +
*/
                    }

                  });
                  links.push("</ul>");

                }
                links.push("</li>");

            }
          });
          //console.log(links.join(""));
          $("#mainNavigation")[0].innerHTML = links.join("");

        },
        error: function(xhr, status, error) {
            //alert('buildNavigation failed: ' + xhr.responseText + "\nWith error:\n" + error);
            console.log('buildNavigation failed: ' + xhr.responseText + "\nWith error:\n" + error);
        },
        error2: function(){
          //alert("buildNavigation: error with server communication");
          console.log("buildNavigation: error with server communication");
        }
      })
    }

    buildImageCar() {
      var self = $(this);
      //let url = this.configPath + this.currentLang + '_' + this.imageCar;
      let url = this.configPath + this.imageCar;
      /*console.log(url);*/

      //call header
      $.ajax({
        url: url,
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        context: this,
        type: 'GET',
        success: (data) =>{
          var carousel = [];
          var carouselPath = data.carouselPath;
          //console.log(this.imagesPath);
          var imagePath = this.imagesPath;
          $.each( data.links, function( key, val ) {
            //console.log(key);
            //console.log(this.imagesPath);

            if(val.status == "A"){
              //"style='order:" + orderme + "' " +

              carousel.push("<a class='carousel-link' " +
                  (val.target == undefined ? "" :
                     "target='"+ val.target + "' ") +
                  (val.href == undefined ? "href='#'" :
                     "href='"+ val.href + "' ") + ">" +
                     "<img style='margin:auto' " +
                  (val.title == undefined ? "" :
                     "title='"+ val.title + "' ") +
                  (val.src == undefined ? "" :
                     "src='" + carouselPath + val.src ) + "' " +
                     "></a>");

            }
          });
          //console.log(links.join(""));
          $("#imageCar")[0].innerHTML = carousel[0];
          $("#carousel-prev").css("display", "inline");
          $("#carousel-next").css("display", "inline");
          this.carousel = carousel;
          if(this.currentArt !== undefined && this.currentArt !== "000"){
            $("#imageCarContainer").css("display","none");
            this.stopCarousel();
          } else {
            $("#imageCarContainer").css("display","block");
            //this.startCarousel();
          }
          console.log("imageCar:" + this.currentArt);

          //console.log(this.carousel) ;


          ;
        },
        error: function(xhr, status, error) {
            //alert('buildImageNav failed: ' + xhr.responseText + "\nWith error:\n" + error);
            console.log('buildImageNav failed: ' + xhr.responseText + "\nWith error:\n" + error);
        },
        error2: function(){
          //alert("buildImageNav: error with server communication");
          console.log("buildImageNav: error with server communication");
        }
      })
    }

    nextOnCarousel(){
      //console.log(this.carouselIndex + "/" +  this.carousel.length);
      if(this.carouselIndex + 1 > this.carousel.length){
        this.carouselIndex = 1;
      } else {
        this.carouselIndex += 1;
      }
      this.updateCarousel();
      //console.log(this.carouselIndex + "/" +  this.carousel.length);


    }

    prevOnCarousel(){
      //console.log(this.carouselIndex + "/" +  this.carousel.length);

      if(this.carouselIndex - 1 <= 0){
        this.carouselIndex = this.carousel.length;
      } else {
        this.carouselIndex -= 1;
      }

      this.updateCarousel();
      //console.log(this.carouselIndex + "/" +  this.carousel.length);
    }

    updateCarousel(){
        var self = $(this);
        $("#imageCar").animate({ 'opacity':0.5 }, 'slow');
          $("#imageCar")[0].innerHTML = this.carousel[this.carouselIndex - 1];
          $("#imageCar").animate({'opacity':1}, 'slow');

          console.log("updating imageCar..." + $("#imageCarContainer")[0]);

      if(this.currentArt !== undefined && this.currentArt !== "000"){
        $("#imageCarContainer").css("display","none");
        this.stopCarousel();
      } else {
        $("#imageCarContainer").css("display","block");
        //this.startCarousel();
      }
    }

    stopCarousel(){
      clearInterval(this.carouselInterval );
    }
    startCarousel(){
      //this.carouselInterval = setInterval(function(){ this.nextOnCarousel(); }, 7000);
    }

    buildImageNav() {
      var self = $(this);
      //let url = this.configPath + this.currentLang + '_' + this.imageNav;
      let url = this.configPath + this.imageNav;
      /*console.log(url);*/

      //call header
      $.ajax({
        url: url,
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        context: this,
        type: 'GET',
        success: (data) =>{
          var links = [];
          //console.log(this.imagesPath);
          var imagePath = this.imagesPath;
          $.each( data.links, function( key, val ) {
            //console.log(key);
            //console.log(this.imagesPath);

            if(val.status == "A"){
                links.push("<a " +
                     "target='"+ val.target + "' " +
                     "href='"+ val.href + "'>" +
                     "<img " +
                     "title='"+ val.title + "' " +
                     "src='" + imagePath + val.src + "'></a>");

            }
          });
          //console.log(links.join(""));
          $("#imageNav")[0].innerHTML = links.join("");

        },
        error: function(xhr, status, error) {
            //alert('buildImageNav failed: ' + xhr.responseText + "\nWith error:\n" + error);
            console.log('buildImageNav failed: ' + xhr.responseText + "\nWith error:\n" + error);
        },
        error2: function(){
          //alert("buildImageNav: error with server communication");
          console.log("buildImageNav: error with server communication");
        }
      })
    }

    buildFooter() {
        var self = $(this);
        //let url = this.includesPath + this.currentLang + '_' + this.footer;
        let url = this.includesPath + this.footer;
        /*console.log(url);*/

        //call header
        $.ajax({
          url: url,
          dataType: "html",
          cache: false,
          processData: false,
          contentType: false,
          context: this,
          type: 'GET',
          success: (data) =>{
            $("footer")[0].innerHTML = data;
            t(this.currentLang, "footer");

          },
          error: function(xhr, status, error) {
              //alert('buildFooter failed: ' + xhr.responseText + "\nWith error:\n" + error);
              console.log('buildFooter failed: ' + xhr.responseText + "\nWith error:\n" + error);
          },
          error2: function(){
            //alert("buildFooter: error with server communication");
            console.log("buildFooter: error with server communication");
          }
        })
    }

    buildInnerPage(key) {
        $(".mainContent").hide();
        $("#" + key).show();

        //key == reportarMesa
        if(key == "reportarMesa" || key == "abrirCertif"){
          $("#progresoMesa").show();

          $("#repomesa_loader").show();

          this.check_mesas();
        }
        if(key == "tablas") {

          this.check_tablas();
        }
        if(key == "cuadroMando") {
          //$("footer")[0].style.marginTop = '600px';
          //backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(75, 192, 192, 0.2)' ],
          //borderColor: ['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],

          //var ctx = document.getElementById('myChart').getContext('2d');
          //jimte_table.check_grafica(ctx);

        }
    }

    check_mesas(){
      //if(this.tekken == "localhost"){
      //  return;
      //}
      var self = $(this);

      let form_data = new FormData();
      form_data.append('llave', this.llave);
      form_data.append('tekken', this.tekken);
      form_data.append('tipollave', this.userType);

      console.log("check_mesas!");
      $.ajax({
        url: this.serverPath + '/mesas_testigos.php',
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
            var mesasTotal = 0;
            var mesasRepo = 0;
            var mesasPorc = 0;
            $("#mesa_a_reportar").empty();

            jimte.mesastestigos = JSON.parse(php_response.mesastestigos);
            $.each( jimte.mesastestigos, function( key, val ) {

              if(val.repo == "S"){
                mesasRepo ++;
              } else {
                //Las no reportadas irán en el select
                var option = $('<option></option>').attr("value",
                  val.llave + "," +
                  val.dd + "," +
                  val.mm + "," +
                  val.zz + "," +
                  val.pp + "," +
                  val.nro
                ).text(
                  val.municipio + ", " +
                  val.puesto + " Mesa: " + val.nro);
                $("#mesa_a_reportar").append(option);
/*
                aReportar.push(
                            "<option value='" +
                              val.llave + "," +
                              val.dd + "," +
                              val.mm + "," +
                              val.zz + "," +
                              val.puesto + "," +
                              val.llave + "," +
                              val.nro + ">" +
                              val.puesto + " Mesa: " + val.nro +
                            "</option>");
                            */
              }
              mesasTotal++;
              links.push(
                          "<tr>" +
                          "<td>" + val.departamento + "</td>" +
                          "<td>" + val.municipio + "</td>" +
                          "<td>" + val.puesto + "</td>" +
                          "<td>" + val.nro + "</td>" +
                          "<td>" + val.repo + "</td>" +
                          "<td>" + val.fecrepo + "</td>" +
                          "</tr>");
            });
            $("#tbody_reportadas")[0].innerHTML = links.join("");
            $(".mesas_en_total")[0].innerHTML = mesasTotal;
            $(".mesas_reportadas")[0].innerHTML = mesasRepo;

            mesasPorc = (mesasRepo / mesasTotal ) * 100;
            mesasPorc = mesasPorc.toFixed(2);
            $(".mesas_progreso")[0].innerHTML = mesasPorc;
            $(".mesas_bar").css("width", mesasPorc + "%");
            $("#queryCertif").attr("href", "server/certif/?nro=" + jimte.llave);

            if(mesasPorc == 100){
              $("#reportarMesa").hide();
            }
            $('#mesa_a_reportar').material_select();
            //$("#tbody_reportadas").show();
          }else {
            jimte.alertMe(php_response.acceso + " " + php_response.motivo, "Mesas Testigos");
          }
          $("#repomesa_loader").hide();

        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    check_tablas(){
    //  if(this.tekken == "localhost"){
    //    return;
    //  }
      var self = $(this);

      let form_data = new FormData();
      form_data.append('llave', this.llave);
      form_data.append('tekken', this.tekken);

      console.log("check_tablas!");
      $.ajax({
        url: this.serverPath + '/tablas.php',
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
            $("#tabla").empty();
            var option = $('<option></option>').attr("value",
              ""
            ).text("Seleccione Tabla");
            $("#tabla").append(option);

            jimte.tablas = JSON.parse(php_response.tablas);
            $.each( jimte.tablas, function( key, val ) {

              //Las no activas no van en el select
              var option = $('<option></option>').attr("value",
                val.nombre
              ).text(val.descripcion );
              $("#tabla").append(option);

            });
            $('#tabla').material_select();
            //$("#tbody_reportadas").show();
          }else {
            jimte.alertMe(php_response.acceso + " " + php_response.motivo, "Mesas Testigos");
          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    buildInnerPage2(key) {
        var self = $(this);
        let url = this.includesPath + key + ".html";
        $.ajax({
          url: url,
          dataType: "html",
          cache: false,
          processData: false,
          contentType: false,
          context: this,
          type: 'GET',
          success: (data) =>{
            $("main")[0].innerHTML = data;

          },
          error: function(xhr, status, error) {
              //alert('buildInnerPage failed: ' + xhr.responseText + "\nWith error:\n" + error);
              console.log('buildInnerPage failed: ' + xhr.responseText + "\nWith error:\n" + error);
          },
          error2: function(){
            //alert("buildInnerPage: error with server communication");
            console.log("buildInnerPage: error with server communication");
          }
        })
    }

    buildButtons(prev, art, next, botonera) {
        let brs = false;
        let buttons = "";

        if(prev || next ){
            buttons = "<div class='row'>" +
                      "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' " +
                      "style='text-align:center'>";

            if(prev != 14 && prev != -1 && prev != '0-1' && prev != ""){
                  //buttons += "<a href='?art=" + prev + "'>Anterior</a>";
                  buttons += "<a onclick='javscript:jimte.buildCentral(" + prev + ");'>Anterior</a>";
                  brs = true;
            }
            buttons += "</div>";

            //buttons += "<a class='reload' onclick='javscript:jimte.buildCentral(" + ((art*1)+1) + ");'>Recargar</a>";
          //  buttons += "<a class='reload' onclick='javscript:jimte.buildCentral(" + next + ");'>Recargar</a>";

            buttons += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' " +
                       "style='text-align:center' >";
            if(next !=15 && next != 0){
                  //buttons += "<a href='?art=" + next + "'>Siguiente</a>";
                  buttons += "<a onclick='javscript:jimte.buildCentral(" + next + ");'>Siguiente</a>";
                  brs = true;
            }
            buttons += "</div>";
            buttons +="</div>";
            if(brs) {
                buttons += "<br>";
            }
        }
/*
        let botoneraHtml = "<div class='row'>" +
                  "      <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12' style='background-color:#333;'>" +
                  "        <a target='orden' href='?art=001' class='btn-lg'>Nosotros</a>" +
                  "        <a target='orden' href='?art=007' class='btn-lg'>Presencia</a>" +
                  "        <a target='orden' href='?art=15&next=16' class='btn-lg'>Proceso</a>" +
                  "        <a target='orden' href='?art=gallery' class='btn-lg'>Galería</a>" +
                  "        <a target='orden' href='?art=news' class='btn-lg'>Noticias</a>" +
                  "       <a target='orden' href='?art=contacto' class='btn-lg'>Contacto</a>" +
                  "     </div>" +
                  " </div>";

        if(botonera){
          buttons += botoneraHtml;
        } else {
          buttons = botoneraHtml + buttons;
        }*/
      return buttons;
    }

    buildCentral(paramArt) {

        //$("#centralSpot")[0].innerHTML = "<img id='loader' class='image-responsive' style='display:none' src='images/loading_article.png'>";
        //$("#loader").animate({ 'opacity':0.5 }, 'slow');
          //$("#imageCar")[0].innerHTML = this.carousel[this.carouselIndex - 1];
          //$("#loader").animate({'opacity':0}, 'slow');
          location.href="#topNavigation";

        var self = $(this);
        //let url = this.articlesPath + this.currentLang + '_' + this.central;
        let url = this.articlesPath + this.central;
        var buttonsTop = "";
        var buttonsBottom = "";
        var prev = "";
        var next = "";
        console.log("buildCentral paramArt:" + paramArt);
        if(paramArt != undefined){
          this.params.art = ("000" + "" + paramArt).substr(("000" + "" + paramArt).length -3);
          this.currentArt = this.params.art.substring(0,3);
        }
        console.log("buildCentral this.params.art:" + this.params.art);

        if(this.params.art != undefined){
            let nomart = "article" + this.params.art.substring(0,3) + ".json";
            url = this.articlesPath + nomart;

            prev = (this.currentArt * 1 ) - 1;
            //console.log("buttons:" + prev + " / " + this.currentArt + " / " + next);

          	prev = ("000" + "" + prev).substr(("000" + "" + prev).length -3);
            //console.log("buttons:" + prev + " / " + this.currentArt + " / " + next);

          	//$prev = ($art == 14 ? '' : $prev);
          	next = (this.currentArt * 1 ) + 1;
          	next = (""+next).substring('000' + next, -3);

            console.log("buttons:" + prev + " / " + this.currentArt + " / " + next);
            console.log("url:"+url);
          //console.log(params);
        } else {
            prev = "0-1";
            this.currentArt = "000";
            next = "001";

            console.log("buttons:" + prev + " / " + this.currentArt + " / " + next);

        }
        buttonsTop = this.buildButtons(prev, this.currentArt, next, false);
        buttonsBottom = this.buildButtons(prev, this.currentArt, next, true);

        //console.log(url);

        //ajax call
        $.ajax({
          url: url,
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          context: this,
          type: 'GET',
          success: (data) =>{
            //$("#centralSpot")[0].innerHTML = data;
              var url2 = this.layoutPath + data.layout;
              $.ajax({
                url: url2,
                dataType: "html",
                cache: false,
                processData: false,
                contentType: false,
                context: this,
                type: 'GET',
                success: (data2) =>{
                  //art_permalink
                  data2 = data2.replace(/art_permalink/g,
                          window.location.href );
                  //Si trae video
                  if(data.video != undefined ){
                    data2 = data2.replace(/art_src_video/g,
                            data.video );
                  }
                  if(data.video == "" ){
                    data2 = data2.replace(/art_src_video/g,
                            data.video );
                  }

                  var qimgArtPath = this.imagesArticlePath;
                  var qcurArt = this.currentArt;

                  //procesaImages
                  data2 = data2.replace(/SARTWEB/g,
                          this.imagesArticlePath + "SARTWEB_" + this.currentArt);

                  data2 = data2.replace(/<!--expand:art_deta1-->/g,
                          "<div class='row' id='art_deta1'></div>");

                  data2 = data2.replace(/<!--expand:art_deta2-->/g,
                          "<div class='row' id='art_deta2'></div>");

                  data2 = data2.replace(/<!--expand:art_deta3-->/g,
                          "<div class='row' id='art_deta3'></div>");

                  data2 = data2.replace(/<!--expand:art_deta4-->/g,
                          "<div class='row' id='art_deta4'></div>");

                  data2 = data2.replace(/<!--expand:art_deta5-->/g,
                          "<div class='row' id='art_deta5'></div>");

                  data2 = data2.replace(/<!--expand:art_deta6-->/g,
                          "<div class='row' id='art_deta6'></div>");

                  data2 = data2.replace(/<!--expand:art_deta7-->/g,
                          "<div class='row' id='art_deta7'></div>");

                  //
                  $("#centralSpot")[0].innerHTML = buttonsTop +
                                                   data2 +
                                                   buttonsBottom;

                  $.each( data, function( key, val ) {
                      //console.log(key + " / " + val);

                      if($("#art_" + key)[0] != undefined){

                        if(key == "video"){
                          if(val != ""){
                            val = "<iframe src='" + val + "' frameborder='0' " +
                                  "allowfullscreen></iframe>";

                          } else {
                            $("#art_" + key).css("display","none");
                          }
                        }

                        $("#art_" + key)[0].innerHTML = val;
                      }

                      //layoutFrats, extraDetails
                      if(data.layout == 'layoutFrats.php'){
                        if(key.substring(0, 4) == 'deta'){
                          if($("#extraDetails")[0] != undefined){

                            if(key.substring(6, 10) == 'imgs'){

                            } else {
                              $("#extraDetails" )[0].innerHTML += val;
                            }

                            let imagenes = "";
                            imagenes +=
                              "<img onerror='this.style.display=\"none\";' src='" +
                              qimgArtPath + "SARTWEB_" + qcurArt + "_" + key + "_1.jpg'/ style='float:left;' ><br>" +
                              "<img onerror='this.style.display=\"none\";' src='" +
                              qimgArtPath + "SARTWEB_" + qcurArt + "_" + key + "_2.jpg'/ style='float:left;' ><br>" +
                              "<img onerror='this.style.display=\"none\";' src='" +
                              qimgArtPath + "SARTWEB_" + qcurArt + "_" + key + "_3.jpg'/ style='float:left;' ><br>" +
                              "<img onerror='this.style.display=\"none\";' src='" +
                              qimgArtPath+ "SARTWEB_" + qcurArt+ "_" + key + "_4.jpg'/ style='float:left;' ><br>" +
                              "<img onerror='this.style.display=\"none\";' src='" +
                              qimgArtPath + "SARTWEB_" + qcurArt+ "_" + key + "_5.jpg'/ style='float:left;' ><br>";

                              $("#extraDetails" )[0].innerHTML += imagenes;
                          }
                        }
                      }

                  });
                },
                error: function(xhr, status, error) {
                    //alert('buildCentralInside failed: ' + xhr.responseText + "\nWith error:\n" + error);
                    console.log('buildCentralInside failed: ' + xhr.responseText + "\nWith error:\n" + error);
                },
                error2: function(){
                  //alert("buildCentralInside: error with server communication");
                  console.log("buildCentralInside: error with server communication");
                }
              })
            //$("#centralSpot")[0].innerHTML = data;

            /*$( "<ul/>", {
              "class": "my-new-list",
              html: items.join( "" )
            }).appendTo( "body" );*/


          },
          error: function(xhr, status, error) {
          //alert('buildCentral failed: ' + "\nWith error:\n" + error+ xhr.responseText );
          console.log('buildCentral failed: ' + "\nWith error:\n" + error+ xhr.responseText );
          //window.location.href = ".";
          },
          error2: function(){
          //alert("buildCentral: error with server communication");
          console.log("buildCentral: error with server communication");
          //window.location.href = ".";

          }
        })
    }

    parseQueryString( queryString ) {
        var params = {}, queries, temp, i, l;
        queryString = queryString.substring(1); //removing the ? character
        // Split into key/value pairs
        queries = queryString.split("&");
        // Convert the array of strings into an object
        for ( i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];

            //fix for currentArt 000 format
            if(temp[0] == 'art'){
                temp[1] = "000" + temp[1];
                temp[1] = temp[1].substr(temp[1].length - 3);

                params[temp[0]] = temp[1];;
                //console.log(temp[0] + " / " + params[temp[0]]);
            }
        }
        return params;
    };

    alertMe(message, title) {
        if (typeof title === 'undefined'){
          title = "Atención:";
        }
        $('#standardAlert .modal-content h4').html(title);
        $('#standardAlert .modal-content p').html(message);
        $('#standardAlert').modal('open');
    }

    changeCorp(obj) {
      console.log("changeCorp " + obj.value);
      $(".mesaForm").hide();

      $("#planilla_loader").show();
      //load planilla
      //$("#repomesa").show();

      this.loadPlanilla(obj.value);
    }

    explodeCandi(candi, mode, prefix) {
      var candiAR = candi.split("-");
      candiAR[0] = candiAR[0] * 1;
      candiAR[1] = candiAR[1] * 1;
      var candiTHs = new Array(candiAR[1] - candiAR[0] + 1);
      var exploded = "";
      for(var ime = 0;ime < candiTHs.length; ime++) {
          candiTHs[ime] = candiAR[0] + ime;
          if(mode == "th"){
            exploded = "" + candiTHs[ime];

            candiTHs[ime] = "<th>" +
                          exploded +
                          "</th>";
          }
          if(mode == "td"){
            exploded = ("000" + "" + candiTHs[ime]).substr(("000" + "" + candiTHs[ime]).length -3);

            candiTHs[ime] = "<td>" +
                            '<input class="center-align validate" type="number" ' +
                            'min="0" max="600" step="1" id="' + prefix + '_' + exploded + '" ' +
                            'name="' + prefix + '_' + exploded + '">' +
                            "</td>";
          }
      }
      //console.log(candiTHs);
      return candiTHs.join("");
    }

    loadPlanilla(planilla) {
        var self = $(this);
        let url = this.configPath + planilla + ".json";
        /*console.log(url);*/

        //call header
        $.ajax({
          url: url,
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          context: this,
          type: 'GET',
          success: (data) =>{
            /*if (data.msg=="OK") {
              this.poblarCalendario(data.sections)
            }else {
              alert(data.msg)
              window.location.href = 'index.html';
            }*/
            var myPlan = [];
            myPlan.push("<div class='col s12'>");

            $.each( data, function( key, val ) {

              var attribs = "";
              var candi = "";
              var candi1 = "";
              var candi2 = "";
              var candi3 = "";
              var candi4 = "";
              var candiTh = "";
              var candiTh1 = "";
              var candiTh2 = "";
              var candiTh3 = "";
              var candiTh4 = "";
              if(val.attribs != undefined){
                $.each( val.attribs, function( key1, val1 ) {
                  if(!key1.startsWith("candi")){
                    attribs += ' ' + key1 + '= "' + val1 + '" ';
                  } else {
                    if(key1 == 'candi'){
                      candi = val1;
                      candiTh = jimte.explodeCandi(val1, "th", "");
                    }
                    if(key1 == 'candi1'){
                      candi1 = val1;
                      candiTh1 = jimte.explodeCandi(val1, "th", "");
                    }
                    if(key1 == 'candi2'){
                      candi2 = val1;
                      candiTh2 = jimte.explodeCandi(val1, "th", "");
                    }
                    if(key1 == 'candi3'){
                      candi3 = val1;
                      candiTh3 = jimte.explodeCandi(val1, "th", "");
                    }
                    if(key1 == 'candi4'){
                      candi4 = val1;
                      candiTh4 = jimte.explodeCandi(val1, "th", "");
                    }
                  }
                });
              }
              myPlan.push("<table id='" + key + "' " + attribs + ">");

              var head = "";
              if(val.head != undefined){
                $.each( val.head, function( key1, val1 ) {
                  if(val1.th != undefined){
                    if(val1.colspan != undefined){
                      head += '<th colspan="' + val1.colspan + '">' +
                              val1.th +
                              '</th>';
                    } else {
                      head += '<th class="center-align">' + val1.th + '</th>';
                    }
                  }
                  if(val1.th_candi != undefined){
                    head += candiTh;
                  }
                  if(val1.td != undefined){
                    head += '<td>' + val1.td + '</td>';
                  }
                  if(val1.td_tr != undefined){
                    head += '<td>' +
                    '<input class="center-align validate" type="number" ' +
                    'min="0" max="600" step="1" id="' + val1.td_tr + '" ' +
                    'name="' + val1.td_tr + '"></td></tr>';
                  }
                  if(val1.tr_th != undefined){
                    if(val1.colspan != undefined){
                      head += '<tr><th colspan="' + val1.colspan + '">' +
                              val1.tr_th +
                              '</th></tr>';

                    } else {
                      head += '<tr><th>' + val1.th + '</th></tr>';
                    }
                  }
                });
                if(head.startsWith("<tr>")){
                  myPlan.push(head);
                } else {
                  myPlan.push("<tr>" + head + "</tr>");
                }
              }

              var body = "";
              if(val.body != undefined){
                $.each( val.body, function( key1, val1 ) {
                  if(val1.nom != undefined){
                    var rowspan = "";
                    if(val1.rowspan != undefined){
                      rowspan = 'rowspan="' + val1.rowspan + '" ' ;
                    }
                    body += '<tr><td ' + rowspan + '>' + val1.nom + '</td>' +
                            '<td ' + rowspan + '>' +
                            '<input class="center-align validate" type="number" ' +
                            'min="0" max="600" step="1" id="' + key1 + '_000" ' +
                            'name="' + key1 + '_000"></td>';
                    if(rowspan != ""){
                      body += "<td>";
                      if(candi1 != ""){
                          body += '<table><tr>' + candiTh1 + '</tr><tr>' +
                                  jimte.explodeCandi(candi1, "td", key1) +
                                  '</tr></table>'
                      }
                      if(candi2 != ""){
                          body += '<table><tr>' + candiTh1 + '</tr><tr>' +
                                  jimte.explodeCandi(candi2, "td", key1) +
                                  '</tr></table>'
                      }
                      if(candi3 != ""){
                          body += '<table><tr>' + candiTh1 + '</tr><tr>' +
                                  jimte.explodeCandi(candi3, "td", key1) +
                                  '</tr></table>'
                      }
                      body = "</td></tr>";
                    } else {
                      if(candi != ""){
                         body += jimte.explodeCandi(candi, "td", key1) + "</tr>";
                      }
                    }

                  }
                });
                if(body.startsWith("<tr>")){
                  myPlan.push(body);
                } else {
                  myPlan.push("<tr>" + body + "</tr>");
                }

              }

              //console.log(key + ' = "' + val + '"');
              /*$.each( val, function( key2, val2 ) {
                //console.log(key2 + ' = "' + val2 + '"');
                var head = [];
                $.each( val2, function( key3, val3 ) {
                  //console.log(key3 + ' = "' + val3 + '"');
                    $.each( val3, function( key4, val4 ) {
                      //console.log(key4 + ' = "' + val4 + '"');
                    });

                });

                //attribs.push(key2 + ' = "' + val2 + '"');
              });*/
              //metas.push( "<meta " + attribs.join(" ") + ">" );

              myPlan.push("</table>");

            });
            myPlan.push("</div>");

            //console.log(metas.join(""));
            $("#repomesa_content")[0].innerHTML = myPlan.join("") ;

            $("#repomesa").show();
            $("#planilla_loader").hide();
            $("#repomesa_content").show();


/*
            var links = [];
            $.each( data.links, function( key, val ) {
              links.push( "<link rel='" + val.rel + "' " +
                          "href='" + val.href + "'>");
            });

            var scripts = [];
            $.each( data.scripts, function( key, val ) {
              scripts.push( "<script src='" + val.src + "'></script>" );
            });
            $("head")[0].innerHTML = metas.join("") +
                                    links.join("") +
                                    scripts.join("");

            document.title = data.title;
            $("#headerImg_all").attr("src", this.imagesPath + data.img_all);
            $("#headerImg_xs").attr("src", this.imagesPath + data.img_xs);
            $("html").attr("lang", data.defaultLang);
            $("#org")[0].innerHTML = data.org;
            $("#org_URL").attr("href", data.URL);
            $("#org_URL")[0].innerHTML = data.URL;
            this.thisURL = data.thisURL;
            this.currentLang = data.defaultLang;
            this.currentMode = data.defaultMode;
            this.displayMode();
*/
            /*$( "<ul/>", {
              "class": "my-new-list",
              html: items.join( "" )
            }).appendTo( "body" );*/


          },
          error: function(xhr, status, error) {
              //alert('buildHeader failed: ' + xhr.responseText + "\nWith error:\n" + error);
              console.log('buildHeader failed: ' + xhr.responseText + "\nWith error:\n" + error);
          },
          error2: function(){
            //alert("buildHeader: error with server communication");
            console.log("buildHeader: error with server communication");
          }
        })
    }

    validaCamara() {
      /*
        if (typeof title === 'undefined'){
          title = "Atención:";
        }
        if (typeof message === 'undefined'){
          message = "!";
        }*/
        var title = "Validación Reporte de Mesa";
        var message = "";
        var reportar = true;
        if($("#TOTA_SUF").val() +
           $("#TOTA_BLA").val() +
           $("#TOTA_NMA").val() +
           $("#TOTA_VAL").val() +
           $("#TOTA_NUL").val()  == ""){

          if($("#observaciones").val() == "") {
             message += "\nSi no hubo votación en esta mesa, por favor ingrese observaciones.";
          }
        }
        if($("#mesa_a_reportar").val() == null){
          message += "\nPor favor seleccione el Número de Mesa a Reportar";
          reportar = false;
        }
        if($("#corporacion").val() == null){
          message += "\nPor favor seleccione la Corporación.";
          reportar = false;
        }
        if (reportar){
            $("#hidCorpo").val($("#corporacion").val());
            $("#hidMesa").val($("#mesa_a_reportar").val());
            $("#hidLlave").val(this.llave);
            $("#hidTekken").val(this.tekken);

            $('#repomesa').submit();
        } else {
           $('#standardAlert .modal-content h4').html(title);
           $('#standardAlert .modal-content p').html(message);
           $('#standardAlert').modal('open');

        }

    }

    validaSenado() {
    }

    changeLanguage(obj) {
        // this.currentLang = obj.value;
         // t(this.currentLang, "body");
         window.location.href = "./?lang=" + obj.value;
         //alert(status);
       //if(status=="1")
      //   $("#icon_class, #background_class").hide();// hide multiple sections
    }


}
