// jimte (c) jumanja.net - 2018 - version 1.7
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

    //console.log("changeState: " + state);
    //statePage.innerHTML = MonitorApp[state]();
    this.currentState = state;
    if (state == 'cerrarSesion') {
      this.token = "";
      this.userType = "";
      this.defaultOption = "iniciarSesion";
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
    jimte.currentIcon = $('#' + state + 'Link').find("i")[0].innerText;
    jimte.currentTitle = $('#' + state + 'Link').find("span")[0].innerText;
    //$('.button-collapse').sideNav();

  }

  badgeUpdates(){
    $("span.badge").each( function() {
        jimte.getBadges($(this)[0].id);
    });
  }
//  changeState('actividadFisica');
//
  /* now constructor
  */
    constructor() {

        //for Login
        this.submitEvent();
        this.currentUser = "";
        this.lastResponse = "";
        if (window.location.href.indexOf("localhost") > -1) {
          //this.token = "localhost";
          //this.userType = "A";
          //this.defaultOption = "cuadroMando";

          this.token = "";
          this.userType = "A";
          this.defaultOption = "";

        } else {
          this.token = "";
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
        this.tables = 'tables.json';
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
        this.buildSideMenu(this.token);
        this.buildFooter();

        $("body").show();


    }
/*
NOT WORKING on SAFARI for MAC
    submitEvent(){
      $('#loginForm').submit((event)=>{
        event.preventDefault();
        this.sendForm();
      })
    }
    */
    submitEvent(){
      var self = $(this);
      $('#loginForm').on('submit', function(event){
        event.preventDefault();
        jimte.sendForm();
      });
    }

    sendForm(){
      var self = $(this);
      $("#loginWorking").show();
      /*
      NOT WORKING ON SAFARI for mac
      let form_data = new FormData();
      */
      var form_data = new FormData();
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
          $("#loginWorking").hide();

          if (php_response[0].acceso == undefined) {
            //window.location.href = 'main.html';
            jimte.currentUser = new User(php_response[0]);
            jimte.token = php_response[0].token;
            jimte.userType = php_response[0].servicio;
            jimte.apellidos = php_response[0].apellidos;
            jimte.nombres = php_response[0].nombres;
            jimte.llave = php_response[0].usuario;
            jimte.defaultOption = "";
            $("#languageSelect").hide();

            jimte.buildSideMenu(php_response.token);

            //Configurar "mi" cuenta
            $("#cmc_firstName").val(jimte.currentUser.nombres);
            $("#cmc_lastName").val(jimte.currentUser.apellidos);
            $("#cmc_email").val(jimte.currentUser.email);
            $("#cmc_user").val(jimte.currentUser.usuario);
            $("#cmc_img").prop("src", "uploads/" + jimte.currentUser.usuario + ".png");

            M.toast(
                      {html:'Bienvenido(a) <br>' + jimte.nombres +'!',
                      displayLenght: 3000,
                      classes: 'rounded'}
                    );

          }else {
            //alert(php_response.acceso + " " + php_response.motivo);
            jimte.alertMe(l("%denied", php_response[0].acceso) + " " +
                          l("%userNotFound", php_response[0].motivo), l("%iniciarSesion", "Ingreso al Sistema"));
          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            /*
            Error: SQLSTATE[HY000] [2002] No such file or directory
Fatal error: Call to a member function prepare() on a non-object in /Library/WebServer/Documents/jumanja.net/SISGA/api/v1.5.3/app/routes/api.php on line 25
Con el error: SyntaxError: Unexpected token E in JSON at position 0
*/
            $("#loginWorking").hide();

            if(xhr.responseText.startsWith("Error: SQLSTATE[HY000]")){
              jimte.alertMe("Al parecer No hay conexión con la base de datos, Por favor Reintente más tarde. \nSi el problema persiste por favor repórtelo al Administrador.", "Ingreso al Sistema");

            } else {
              jimte.alertMe(xhr.responseText + "\nCon el error:\n" + error, "Ingreso al Sistema");

            }
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
        /*
        NOT WORKING ON SAFARI
        let url = this.configPath + this.header;
        */
        var url = this.configPath + this.header;
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
          success: function(data) {
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

    buildSideMenu(Token){
      var self = $(this);
      //let url = this.configPath + this.currentLang + '_' + this.sideMenu;
      var url = this.configPath + this.sideMenu;

      $('li a.menuLinks').parent().remove();
      $.ajax({
        url: url,
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        context: this,
        type: 'GET',
        success: function(data) {
          var links = [];

          $.each( data, function( key, val ) {

            if(val.status == "A"){
              var activeLink = (val.state == "iniciarSesion" ? "menuActive" : "");
              jimte.isLogged = false;
              jimte.isLogged = ((jimte.token == undefined || jimte.token == null || jimte.token == "") ? false : true);

              //console.log(val.item  + " val.isLogged:" + val.isLogged + " jimte.isLogged " + jimte.isLogged);

              if( (val.isLogged == "Y" && jimte.isLogged) ||
                  (val.isLogged == "N" && !jimte.isLogged) ){

                    //console.log(key + " / "+ jimte.defaultOption);

                    //console.log(jimte.userType + " / " + val.type);
                    if(val.type.indexOf(jimte.userType) !== -1) {
                      if(jimte.defaultOption == "") {
                        jimte.defaultOption = key;
                      }

                      var badge = "";
                      if(val.badge != undefined){
                        badge = "<span id='badge_"+key+"' data-badge-caption='' class='hide "+ val.badge + "'></span>";
                      }
                      links.push( "<li><a href='#' class='menuLinks " + activeLink + "' " +
                                  'onclick="jimte.changeState(\'' + key + '\')" ' +
                                  'id="' + key + 'Link" >'  +
                                  '<i class="material-icons text-primary-color">' + val.icon + '</i>' +
                                  "<span translate='yes' id='sp_"+key+"' class=''>" + val.item + "</span>" +
                                  badge + "</a></li>");

                    }

              }


            }
          });

          $("#sideMenu").append(links.join(""));
          t(this.currentLang, "#sideMenu");

          if(jimte.apellidos != "" && jimte.nombres) {
            $("#userFirstName").text(jimte.nombres);
            $("#userLastName").text(jimte.apellidos);
            $("#userToken").text(jimte.llave);
          } else {
            if(jimte.token == "localhost"){
              $("#userFirstName").text("Web");
              $("#userLastName").text("Master");
              $("#userToken").text("webmaster");

            } else {
              $("#userFirstName").text(t(this.currentLang, "userFirstName"));
              $("#userLastName").text(t(this.currentLang, "userLastName"));
              $("#userToken").text("");

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
      var url = this.configPath + this.navigation;
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
        success: function(data) {
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
      var url = this.configPath + this.imageCar;
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
        success: function(data) {
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
          //console.log("imageCar:" + this.currentArt);

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

          //console.log("updating imageCar..." + $("#imageCarContainer")[0]);

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
      var url = this.configPath + this.imageNav;
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
        success: function(data) {
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
        var url = this.includesPath + this.footer;
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
          success: function(data){
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
        //Actualice los badges
        jimte.badgeUpdates();


        $(".mainContent").hide();
        //$("main").addClass("oculto");
        //$("#" + key).removeClass("oculto");
        $("#" + key).show();

        //key == reportarMesa
        if(key == "elaborarActas" ){
          $("#progresoActas").show();

          $("#loader").show();
          this.check_actas();
        }
        if(key == "configurarTablas") {

          this.check_tables();
        }

        if(key == "buscarActas" ||
           key == "actasPorAprobar" ||
           key == "actasPorRevisar" ||
           key == "informeActas") {

          $("#buscarActas").show();
          if(key == "informeActas") {
            this.getEstadosActa();
          }
          this.getTiposActa();
          this.getLugares();
          this.getEtiquetas();

          this.resetEstado(key);

          jimte_table.load_query(key, "actas", "buscarActa_table");
        }
        if(key == "cuadroMando") {
          //$("footer")[0].style.marginTop = '600px';
          //backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(75, 192, 192, 0.2)' ],
          //borderColor: ['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],

          //var ctx = document.getElementById('myChart').getContext('2d');
          //jimte_table.check_grafica(ctx);

        }
    }

    resetEstado(key){

      //$("#qry_estado").val();
      $("#qry_nroini").val("0");
      $("#qry_nrofin").val("999999");
      $("#qry_tipoacta").val("ZZZ");
      $("#qry_temaacta").val("");
      $("#qry_lugar").val("ZZZ");

      $("#qry_tipoacta").formSelect();
      $("#qry_lugar").formSelect();

      if(key == "buscarActas"){
        $("#qry_estado").prop('disabled', false);
        $("#qry_estado").val("ZZZ");
      }
      if(key == "actasPorAprobar"){
        $("#qry_estado").val("M");
        $("#qry_estado").prop('disabled', 'disabled');
      }
      if(key == "actasPorRevisar"){
        $("#qry_estado").prop('disabled', 'disabled');
        $("#qry_estado").val("M");
      }
      if(key == "informeActas") {
        $("#qry_estado").prop('disabled', 'disabled');
        $("#qry_estado").val("F");
      }

      $("#qry_estado").formSelect();
    }

    getEstadosActa(){
      $.ajax({
        url: this.serverPath + 'index.php/mins/count' +
              "?id=" + jimte.currentUser.id +
              "&tiposerv=" + jimte.currentUser.tiposerv +
              "&servicio=" + jimte.currentUser.servicio +
              "&frat=" + jimte.currentUser.frat +
              "&table=" + this.table +
              "&token=" + jimte.token +
              "&sqlCode=" + "mins_exec" ,

        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data){
          if ((typeof data !== undefined ) &&
               (data.length == 0 || data[0].acceso == undefined)) {

                 var actasEjecu = 0;
                 var actasTotal = 0;
                 $.each( data, function( key, val ) {

                   actasTotal += parseInt(val.cuenta);

                   //Aprobadas
                   if(val.estado == "F"){
                     actasEjecu += parseInt(val.cuenta);
                     $('#actas_aprobadas')[0].innerHTML = val.cuenta;
                     $('#prom_aprobacion')[0].innerHTML = (val.dias * 1).toFixed(0);;
                   }

                   //Preliminares
                   if(val.estado == "M"){
                     $('#actas_preliminares')[0].innerHTML = val.cuenta;
                   }

                   //En Progreso
                   if(val.estado == "G"){
                     $('#actas_progreso')[0].innerHTML = val.cuenta;
                   }

                   //Retiradas
                   if(val.estado == "R"){
                      actasEjecu += parseInt(val.cuenta);
                      $('#actas_retiradas')[0].innerHTML = val.cuenta;
                   }

                 });
                 /*console.log("aprob: " + actasAprob);
                 console.log("total: " + actasTotal);*/
                 var actasPorc = ( actasEjecu / actasTotal ) * 100;
                 actasPorc = actasPorc.toFixed(0);
                 $(".actas_ejec")[0].innerHTML = actasPorc;
                 $(".actas_bar").css("width", actasPorc + "%");

          }else {
            jimte.alertMe(l("%denied", data[0].acceso) + " " +
                          l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    cleanActa(){
      $("#lugar_reunion").val("");
      $("#tipo_de_acta").val("");
      $("#fecacta").val("");
      $("#horacta").val("");
      $("#lugar_reunion").val("");
      $("#fecproxima").val("");
      $("#horproxima").val("");
      $("#lugar_proxima").val("");
      $("#estado").val("G");

      $('.chips-autocomplete').chips({
         data: [],
         autocompleteOptions: {
             data: jimte.currentTags
         },
         placeholder: 'Ingrese Etiquetas',
         secondaryPlaceholder: '+Etiqueta',
         limit: 10,
         minLength: 1
       });

      $("#temaacta").val("");
      $("#objetivos").val("");
      $("#desarrollo").val("");
      $("#conclusiones").val("");
      $("#table_Tasks tbody")[0].innerHTML = "";
      $("#divComments")[0].innerHTML = "";


      $("#lugar_reunion").formSelect();
      $("#tipo_de_acta").formSelect();
      $("#fecacta").formSelect();
      $("#horacta").formSelect();
      $("#lugar_reunion").formSelect();
      $("#fecproxima").formSelect();
      $("#horproxima").formSelect();
      $("#lugar_proxima").formSelect();
    }

    getActaId(nroActa){
      //console.log("getActaId: " + nroActa);
      $("#q_idacta").text(nroActa);
      $("#q_nroActa").text(nroActa);
      $.ajax({
        url: this.serverPath + 'index.php/mins' +
              "?id=" + jimte.currentUser.id +
              "&tiposerv=" + jimte.currentUser.tiposerv +
              "&servicio=" + jimte.currentUser.servicio +
              "&frat=" + jimte.currentUser.frat +
              "&table=" + this.table +
              "&token=" + jimte.token +
              "&sqlCode=" + "mins_nro" +
              "&nroActa=" + nroActa,

        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data){
          if ((typeof data !== undefined ) &&
               (data.length == 0 || data[0].acceso == undefined)) {

                 jimte.currentActaNro  = nroActa;
                 jimte.currentActaMain = data;
                 //ciclo
                 $.each( data, function( key, val ) {
                   //console.log(val.tema);
                   $("#tipo_de_acta").val(val.tipoacta);
                   $("#acta_a_elaborar").val(val.id);
                   $("#temaacta").val(val.tema);
                   $("#lugar_reunion").val(val.lugar);
                   $("#objetivos").val(val.objetivos);
                   $("#desarrollo").val(val.desarrollo);
                   $("#conclusiones").val(val.conclusiones);
                   $("#estado").val(val.estado);

                   $("#creacion").val(val.creacion);
                   $("#progreso").val(val.progreso);
                   $("#preliminar").val(val.preliminar);
                   $("#retiro").val(val.retiro);
                   $("#aprobacion").val(val.aprobacion);

                   var resArray = val.fecha.split(" ");
                   $("#fecacta").val(resArray[0]);
                   $("#horacta").val(resArray[1]);

                   resArray = val.fechasig.split(" ");
                   $("#fecproxima").val(resArray[0]);
                   $("#horproxima").val(resArray[1]);

                   $("#lugar_proxima").val(val.lugarsig);

                   //overlayQ, la forma de solo lectura
                   $("#q_idacta").html(nroActa);
                   $("#q_fechora").html(val.fecha);
                   $("#q_temaacta").html(val.tema);
                   $("#q_fechorasig").html(val.fechasig);

                   $("#q_objetivos").html("<b>Objetivos:</b>&nbsp;" +
                                          val.objetivos);
                   $("#q_desarrollo").html("<b>Desarrollo:</b>&nbsp;" +
                                          val.desarrollo);
                   $("#q_conclusiones").html("<b>Conclusiones:</b>&nbsp;" +
                                          val.conclusiones);

                 });
                 $("#lugar_reunion").formSelect();
                 $("#tipo_de_acta").formSelect();
                 $("#acta_a_elaborar").formSelect();
                 $("#fecacta").formSelect();
                 $("#horacta").formSelect();
                 $("#lugar_reunion").formSelect();
                 $("#fecproxima").formSelect();
                 $("#horproxima").formSelect();
                 $("#lugar_proxima").formSelect();

                 var miEstado = $("#estado").val();
                 $("#q_tipoestado").html(
                                    $("#tipo_de_acta").find('option:selected').text() + "<br>" +
                                    "<span class='" +
                                    ( miEstado == "G" ? "yellow lighten-3'>EN PROGRESO" :
                                    ( miEstado == "M" ? "orange lighten-3'>PRELIMINAR" :
                                    ( miEstado == "R" ? "red lighten-3'>RETIRADA" : "teal lighten-3'>APROBADA")) + "</span>")
                                  );
                 $("#q_lugaracta").html($("#lugar_reunion").find('option:selected').text());
                 $("#q_lugarsig").html($("#lugar_proxima").find('option:selected').text());

                //Progresamos
                jimte.currentInfoProgress += 20;
                jimte.barMove();



          }else {
            jimte.alertMe(l("%denied", data[0].acceso) + " " +
                          l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    getTagsMinId(nroActa){
      //console.log("getTagsMinId:" + nroActa);
      $.ajax({
        url: this.serverPath + 'index.php/mins/items' +
              "?id=" + jimte.currentUser.id +
              "&tiposerv=" + jimte.currentUser.tiposerv +
              "&servicio=" + jimte.currentUser.servicio +
              "&frat=" + jimte.currentUser.frat +
              "&table=" + this.table +
              "&token=" + jimte.token +
              "&sqlCode=" + "tags_minid" +
              "&nroActa=" + nroActa,

        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data){
          if ((typeof data !== undefined ) &&
               (data.length == 0 || data[0].acceso == undefined)) {

                 jimte.currentActaTags = data;

                 $('.chips-autocomplete').chips({
                    data: [],
                    autocompleteOptions: {
                        data: jimte.currentTags
                    },
                    placeholder: 'Ingrese Etiquetas',
                    secondaryPlaceholder: '+Etiqueta',
                    limit: 10,
                    minLength: 1
                  });

                 var instance = M.Chips.getInstance ( $('#etiquetasActa') );

                 $("#q_etiqacta").empty();

                 //var actaTags = [];
                 $.each( data, function( key, val ) {
                    //actaTags.push({"tags": val.etiqueta});

                    //console.log(key + "/" + val.etiqueta);
                    /*$('#etiquetasActa').append("<div class='chip' tabindex='0'>" +
                                        val.etiqueta +
                                        "<i class='material-icons'>close</i>" +
                                        "</div>");*/
                    //instance.addChip({"tags": val.etiqueta});
                    instance.addChip({
                      tag: val.etiqueta
                    });

                    $("#q_etiqacta").append( val.etiqueta + " ");

                 });

                 //$('.chips-autocomplete')[0].chips({
                 /*$('#etiquetasActa').chips({
                    chipsData: actaTags,
                    data: actaTags,
                    autocompleteOptions: {
                        data: jimte.currentTags
                    },
                    placeholder: 'Ingrese Etiquetas',
                    secondaryPlaceholder: '+Etiqueta',
                    limit: 10,
                    minLength: 1
                  });*/

                  //Progresamos
                  jimte.currentInfoProgress += 20;
                  jimte.barMove();
          }else {
            jimte.alertMe(l("%denied", data[0].acceso) + " " +
                          l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    getTasksMinId(nroActa){
      //console.log("getTasksMinId:" + nroActa);

      $.ajax({
        url: this.serverPath + 'index.php/mins/items' +
              "?id=" + jimte.currentUser.id +
              "&tiposerv=" + jimte.currentUser.tiposerv +
              "&servicio=" + jimte.currentUser.servicio +
              "&frat=" + jimte.currentUser.frat +
              "&table=" + this.table +
              "&token=" + jimte.token +
              "&sqlCode=" + "tasks_minid" +
              "&nroActa=" + nroActa,

        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data){
          if ((typeof data !== undefined ) &&
               (data.length == 0 || data[0].acceso == undefined)) {

                 jimte.currentActaTasks = data;

                 //cleanActa para Tasks
                 $("#q_tasks").empty();

                 $("#table_Tasks tbody")[0].innerHTML = "";

                 $.each( data, function( key, val ) {
                   var lineaTarea1 =
                   "<tr>" +
                    '<td><a onclick="$(this).closest(\'tr\').remove();">' +
                    '<i class="material-icons tiny"' +
                    '>close</i></a>' + "</td><td>" +
                    val.usuario + "</td><td><textarea>" +
                    val.text + "</textarea></td><td>" +
                    val.creada + "</td><td>" +
                    "Planeada" + "</td><td>" +
                    val.inicioplan + "</td><td>" +
                    val.finalplan + "</td>" +
                    "</tr>";

                   $("#table_Tasks").find("tbody")
                                    .append(lineaTarea1);

                   var lineaTarea2 ="<tr>" +
                                     '<td>' +
                                     val.usuario + "</td><td><textarea readonly>" +
                                     val.text + "</textarea></td><td>" +
                                     val.inicioplan + "</td><td>" +
                                     val.finalplan + "</td>" +
                                     "</tr>";

                    $("#q_tasks").append(lineaTarea2);
                 });

                 //Progresamos
                 jimte.currentInfoProgress += 20;
                 jimte.barMove();
          }else {
            jimte.alertMe(l("%denied", data[0].acceso) + " " +
                          l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    getCommentsId(nroActa){
      //console.log("getCommentsId:" + nroActa);

      $.ajax({
        url: this.serverPath + 'index.php/mins/items' +
              "?id=" + jimte.currentUser.id +
              "&tiposerv=" + jimte.currentUser.tiposerv +
              "&servicio=" + jimte.currentUser.servicio +
              "&frat=" + jimte.currentUser.frat +
              "&table=" + this.table +
              "&token=" + jimte.token +
              "&sqlCode=" + "comments_minid" +
              "&nroActa=" + nroActa,

        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data){
          if ((typeof data !== undefined ) &&
               (data.length == 0 || data[0].acceso == undefined)) {

                 jimte.currentActaComments = data;

                 //cleanActa para Tasks
                 $("#divComments")[0].innerHTML = "";
                 $("#q_comments").empty();

                 var primero = "x";
                 var anterior = "";
                 var push = "";
                 var lado = "";
                 $.each( data, function( key, val ) {

                   if(anterior != val.asistente && primero != anterior) {
                      lado = "izquierda";
                      push = "";
                   } else {
                      push = "push-s10";
                      lado = "derecha";
                   }
                   if(anterior == "") {
                     primero = val.asistente;
                   }

                   $("#divComments").append(
                                    '<div class="row teal zeroBottom">' +
                                    '  <div class="col s2 ' + push + '"><br>' +
                                    '    <span class="chip">' + val.asistente + '</span>' +
                                    '  </div>' +
                                    '  <div class="col s8 vigneta '+ lado +' orange lighten-4">' +
                                    val.text +
                                    '      <h6 class="grey-text lighten-3">' + val.fechahora + '</h6>' +
                                    '  </div>' +
                                    '</div>');

                    $("#q_comments").append(
                          "<div class='col s6'><b>" + val.asistente +
                          "</b><span>(" + val.fechahora + ")</span><textarea readonly>" + val.text + "</textarea></div>"
                     );

                   anterior = val.asistente;

                 });
                 //Si está Revisando, y es Integrante pero NO es Secretario,
                 //puede comentar, el acta volverá a estado EN PROGRESO
                 if(
                   jimte.currentModoActa == "REV" &&
                   jimte.currentUser.tiposerv == "I" &&
                   jimte.currentUser.servicio != "S" ){

                    $("#q_comments").append(
                          "<div class='col s6'>" +
                          "<span data-badge-caption='Comentar:' class='teal'></span>" +
                          "<b>" + jimte.currentUser.usuario +
                          "</b><textarea id='q_newcomment' " +
                          "placeholder='Escriba aquí algún comentario que dese agregar'></textarea></div>"
                     );

                 }


                 //Progresamos
                 jimte.currentInfoProgress += 20;
                 jimte.barMove();
          } else {
            jimte.alertMe(l("%denied", data[0].acceso) + " " +
                          l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    getActasProgreso(){
      $.ajax({
        url: this.serverPath + 'index.php/mins' +
              "?id=" + jimte.currentUser.id +
              "&tiposerv=" + jimte.currentUser.tiposerv +
              "&servicio=" + jimte.currentUser.servicio +
              "&frat=" + jimte.currentUser.frat +
              "&table=" + this.table +
              "&token=" + jimte.token +
              "&sqlCode=" + "mins_prog" ,

        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data){
          if ((typeof data !== undefined ) &&
               (data.length == 0 || data[0].acceso == undefined)) {

                 $('#acta_a_elaborar').children('option:not(:first)').remove();

                 var option = $('<option></option>').attr("value",
                   "add"
                 ).text(
                   "Agregar Acta Nueva"
                 );
                 $("#acta_a_elaborar").append(option);

                 //Limpiar la Tabla
                 $('#tbody_enprogreso')[0].innerHTML  = "";

                 //ciclo
                 $.each( data, function( key, val ) {

                     //$('#tbody_enprogreso')[0].innerHTML += "<tr><td>Ver</td>" +
                     $('#tbody_enprogreso')[0].innerHTML += "<tr>" +
                        '<td>' + val.id + '</td>' +
                        '<td>' + val.fecha + '</td>' +
                        '<td>' + val.objetivos + '</td>' +
                        '<td>' + val.conclusiones + '</td>' +
                        '</tr>';

                    var option = $('<option></option>').attr("value",
                      val.id
                    ).text(
                      "Nro: " + val.id + " " +
                      "Fec: " + val.fecha
                    );
                    $("#acta_a_elaborar").append(option);

                 });
                 $('#acta_a_elaborar').formSelect();

          }else {
            jimte.alertMe(l("%denied", data[0].acceso) + " " +
                          l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    getTiposActa(){
      $.ajax({
        url: this.serverPath + 'index.php/types' +
              "?id=" + jimte.currentUser.id +
              "&tiposerv=" + jimte.currentUser.tiposerv +
              "&servicio=" + jimte.currentUser.servicio +
              "&frat=" + jimte.currentUser.frat +
              "&table=" + this.table +
              "&token=" + jimte.token +
              "&sqlCode=" + "types_act" ,

        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data){
          if ((typeof data !== undefined ) &&
               (data.length == 0 || data[0].acceso == undefined)) {
                 $('#tipo_de_acta')[0].innerHTML = '<option value="" ' +
                          'disabled selected>Seleccione Tipo Acta</option>';
                 $('#qry_tipoacta')[0].innerHTML = '<option value="ZZZ" ' +
                         ' selected>Todos</option>';
                 $.each( data, function( key, val ) {

                   //console.log(key + "/" + val.tipo + "/" + val.nombre);
                   $('#tipo_de_acta').append($('<option>', {
                        value: val.tipo,
                        text: val.nombre
                    }));
                    $('#qry_tipoacta').append($('<option>', {
                         value: val.tipo,
                         text: val.nombre
                     }));
                 });
                 $('#tipo_de_acta').formSelect();
                 $('#qry_tipoacta').formSelect();

          }else {
            jimte.alertMe(l("%denied", data[0].acceso) + " " +
                          l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    getLugares(){
      $.ajax({
        url: this.serverPath + 'index.php/places' +
              "?id=" + jimte.currentUser.id +
              "&tiposerv=" + jimte.currentUser.tiposerv +
              "&servicio=" + jimte.currentUser.servicio +
              "&frat=" + jimte.currentUser.frat +
              "&table=" + this.table +
              "&token=" + jimte.token +
              "&sqlCode=" + "places_act" ,

        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data){
          if ((typeof data !== undefined ) &&
               (data.length == 0 || data[0].acceso == undefined)) {

                 $('#lugar_reunion')[0].innerHTML = '<option value="" disabled selected>Seleccione Lugar</option>';
                 $('#lugar_proxima')[0].innerHTML = '<option value="" disabled selected>Seleccione Lugar</option>';
                 $('#qry_lugar')[0].innerHTML = '<option value="ZZZ" selected>Todos</option>';

                 $.each( data, function( key, val ) {

                   //console.log(key + "/" + val.id + "/" + val.lugar);
                   $('#lugar_reunion').append($('<option>', {
                        value: val.id,
                        text: val.lugar
                    }));
                    $('#lugar_proxima').append($('<option>', {
                         value: val.id,
                         text: val.lugar
                     }));
                     $('#qry_lugar').append($('<option>', {
                          value: val.id,
                          text: val.lugar
                      }));
                 });
                 $('#lugar_reunion').formSelect();
                 $('#lugar_proxima').formSelect();
                 $('#qry_lugar').formSelect();

          }else {
            jimte.alertMe(l("%denied", data[0].acceso) + " " +
                          l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    getAsistentes(idacta){
      //var idacta = $("#acta_a_elaborar").val();
      var paramAdic = (idacta == "add"? "asi": "int&idacta=" + idacta);
      //console.log(idacta + "/" + paramAdic);
      $.ajax({
        url: this.serverPath + 'index.php/users' +
              "?id=" + jimte.currentUser.id +
              "&tiposerv=" + jimte.currentUser.tiposerv +
              "&servicio=" + jimte.currentUser.servicio +
              "&frat=" + jimte.currentUser.frat +
              "&table=" + this.table +
              "&token=" + jimte.token +
              "&sqlCode=" + 'users_' + paramAdic,
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data){
          if ((typeof data !== undefined ) &&
               (data.length == 0 || data[0].acceso == undefined)) {

                 jimte.currentActaAsis = data;

                 $("#imgFirmas")[0].innerHTML = "";
                 $("#Asistentes")[0].innerHTML = "";
                 $("#responsadd")[0].innerHTML = '<option value="" disabled selected>Seleccione Responsable</option>';

                 $("#q_asis").empty();
                 $("#q_asis").append('<input type="hidden" id="q_aprobador" value="N">');
                 $("#q_asis").append('<div class="col s12">' +
                                     '<img class="hide-on-small-only show-on-med-and-up" title="Significado Asistencia" src="ui/img/convencion_medium.png">' +
                                     '<img class="hide-on-med-and-up show-on-small" title="Significado Asistencia" src="ui/img/convencion_small.png">' +
                                     '</div>');

                 var cuentaAprob = 0;
                 var myAttend = [];
                 $.each( data, function( key, val ) {

                  //console.log(val.idacta + ":" + idacta +
                  //             val.usuario + ":" + val.asisestado);

                   if( (idacta == "add" || val.idacta == idacta) ) {
                     myAttend.push(
                     '<div class="col s12 m6">' +
                     '  <label>' +
                     '    <input title="' + val.usuario + ':' + val.tiposerv + ':' +
                                            val.servicio + '" id="asi_' + val.id + '" type="checkbox" ' +
                                            (val.asisestado == 'S' ? ' checked="checked" ' : '') +
                                            (val.asisestado == 'F' ? '  checked="checked" class="filled-in" ' : '') +
                                            '/>' +
                     '    <span title="(' + val.nombreser + '/' + val.asisestado +')">' +
                     val.nombres + ' ' + val.apellidos + '</span>' +
                     '  </label>' +
                     '</div>');

                     //De una vez poblar Responsables
                     $('#responsadd').append($('<option>', {
                          value: val.usuario,
                          text: val.apellidos + " " + val.nombres
                      }));

                      //De una vez poblar Responsables
                      $('#imgFirmas').append($('<img>', {
                           id: "sign_" + val.usuario,
                           src: "uploads/" + val.usuario + ".png"
                       }));

                      //Si es asistente o ya firmó, sino asistió mejor
                      //no mostrarlo pues causa confusión
                      if(val.asisestado == "S" || val.asisestado == "F"){
                        $('#q_asis').append(
                          '<div class="col s6">' +
                          '   <input readonly title="' + val.usuario + ':' + val.tiposerv + ':' +
                                                 val.servicio + '" id="qasis_' + val.id + '" type="checkbox" ' +
                                                 (val.asisestado == 'S' ? ' checked="checked" ' : '') +
                                                 (val.asisestado == 'F' ? '  checked="checked" class="filled-in" ' : '') +
                                                 '/>' +
                          '    <span title="(' + val.nombreser + '/' + val.asisestado +')">' +
                          val.nombres + ' ' + val.apellidos + '</span>' +
                          '</div>'

                        );
                      }

                      //llevar la cuenta de los aprobadores faltantes
                      //console.log( val.usuario + " / " + val.asisestado);
                      cuentaAprob += (val.asisestado == 'S' ? 1 : 0);


                   }


                 });

                 //Si es el único aprobador que falta
                 if( cuentaAprob == 1 ){
                   $("#q_aprobador").val("S");
                 }

                 $("#Asistentes")[0].innerHTML = myAttend.join("");
                 $('#responsadd').formSelect();

                 //Progresamos
                 jimte.currentInfoProgress += 20;
                 jimte.barMove();
          }else {
            jimte.alertMe(l("%denied", data[0].acceso) + " " +
                          l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    getEtiquetas(){
      $.ajax({
        url: this.serverPath + 'index.php/tags' +
              "?id=" + jimte.currentUser.id +
              "&tiposerv=" + jimte.currentUser.tiposerv +
              "&servicio=" + jimte.currentUser.servicio +
              "&frat=" + jimte.currentUser.frat +
              "&table=" + this.table +
              "&token=" + jimte.token +
              "&sqlCode=" + 'tags_act',
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data){
          if ((typeof data !== undefined ) &&
               (data.length == 0 || data[0].acceso == undefined)) {

                 jimte.currentTags ={};
                 var myTagsData = {};
                 $.each( data, function( key, val ) {
                    myTagsData[val.etiqueta] = null;
                    //console.log(key + "/" + myTagsData[val.etiqueta]);
                 });
                 jimte.currentTags = myTagsData;
                 $('.chips-autocomplete').chips({
                    data: [],
                    autocompleteOptions: {
                        data: myTagsData
                    },
                    placeholder: 'Ingrese Etiquetas',
                    secondaryPlaceholder: '+Etiqueta',
                    limit: 10,
                    minLength: 1
                  });

          }else {
            jimte.alertMe(l("%denied", data[0].acceso) + " " +
                          l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

    check_actas(){
      //if(this.Token == "localhost"){
      //  return;
      //}
      this.getEstadosActa();
      this.getActasProgreso();
      this.getTiposActa();
      this.getLugares();
      this.getEtiquetas();

      //Mejor traer asistentes si ya se sabe que va a adicionar o
      //a modificar, y poblar los responsables también
      //this.getAsistentes();
      $("#loader").hide();
      return;
    }

    qdivs(ndx){
      $('.collection-item').removeClass('hide');
      $('.collection-item').removeClass('active');
      //console.log("obj:" + obj.id);
      $('#col-link-' + ndx).addClass('active');
      $('.acta-cnt').hide();
      $('#acta-' + ndx).show();
    }
    check_tables() {
        var self = $(this);
        var url = this.configPath + this.tables;
        //console.log("check_tables:" + url);
        //$('#configurarTablas').show();
        //$('#configurar').removeClass("oculto");

        //call header
        $.ajax({
          url: url,
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          context: this,
          type: 'GET',
          success: function(data) {

            //var tablas = [];
            $("#tabla").empty();
            var option = $('<option></option>').attr("value",
              ""
            ).text("Seleccione Tabla");
            $("#tabla").append(option);

            var tablas = [];
            $.each( data.tablas, function( key, val ) {
              /*var attribs = [];
              console.log(val);
              $.each( val, function( key2, val2 ) {
                console.log(key2 + ' = "' + val2 + '"');
                //attribs.push(key2 + ' = "' + val2 + '"');
              });
              /*tablas.push( "<meta " + attribs.join(" ") + ">" );
              */

              /*console.log(key + "/" + val.tiposerv.inc  + "/" + jimte.currentUser.tiposerv);
              console.log(key + "/" + val.servicio.inc  + "/" + jimte.currentUser.servicio);*/
              if( val.estado == "A"){
                //Las no activas no van en el select
                //y hay que verificar si está autorizado ese usuario por tipo servicio y
                // servicio a que le aparezca la tabla.
                var authorizaTabla = false;
                if( val.tiposerv.inc  == "*" && val.tiposerv.exc.indexOf(jimte.currentUser.tiposerv) == -1 ) {
                  if( val.servicio.inc == "*" && val.servicio.exc.indexOf(jimte.currentUser.servicio) == -1 ) {
                    authorizaTabla = true;
                  }
                }

                if(	!authorizaTabla ) {
                  if( val.tiposerv.inc.indexOf(jimte.currentUser.tiposerv) > -1  ) {
                    if( val.servicio.inc.indexOf(jimte.currentUser.servicio) > -1 ||
                        (val.servicio.inc == "*" && val.servicio.exc.indexOf(jimte.currentUser.servicio) == -1) ) {
                      authorizaTabla = true;
                    }
                  }
                }

                if(authorizaTabla){
                  var option = $('<option></option>').attr("value",
                    val.api
                  ).text(val.descripcion ).attr("data-icono",
                                      val.icon);
                  $("#tabla").append(option);

                }
              }

            });

            $('#tabla').formSelect();
          },
          error: function(xhr, status, error) {
              //alert('buildHeader failed: ' + xhr.responseText + "\nWith error:\n" + error);
              console.log('check_tablas failed: ' + xhr.responseText + "\nWith error:\n" + error);
          },
          error2: function(){
            //alert("buildHeader: error with server communication");
            console.log("check_tablas: error with server communication");
          }
        })
    }

// - //
    buildInnerPage2(key) {
        var self = $(this);
        var url = this.includesPath + key + ".html";
        $.ajax({
          url: url,
          dataType: "html",
          cache: false,
          processData: false,
          contentType: false,
          context: this,
          type: 'GET',
          success: function(data) {
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
        var brs = false;
        var buttons = "";

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
        var url = this.articlesPath + this.central;
        var buttonsTop = "";
        var buttonsBottom = "";
        var prev = "";
        var next = "";
        //console.log("buildCentral paramArt:" + paramArt);
        if(paramArt != undefined){
          this.params.art = ("000" + "" + paramArt).substr(("000" + "" + paramArt).length -3);
          this.currentArt = this.params.art.substring(0,3);
        }
        //console.log("buildCentral this.params.art:" + this.params.art);

        if(this.params.art != undefined){
            var nomart = "article" + this.params.art.substring(0,3) + ".json";
            url = this.articlesPath + nomart;

            prev = (this.currentArt * 1 ) - 1;
            //console.log("buttons:" + prev + " / " + this.currentArt + " / " + next);

          	prev = ("000" + "" + prev).substr(("000" + "" + prev).length -3);
            //console.log("buttons:" + prev + " / " + this.currentArt + " / " + next);

          	//$prev = ($art == 14 ? '' : $prev);
          	next = (this.currentArt * 1 ) + 1;
          	next = (""+next).substring('000' + next, -3);

            //console.log("buttons:" + prev + " / " + this.currentArt + " / " + next);
            //console.log("url:"+url);
          //console.log(params);
        } else {
            prev = "0-1";
            this.currentArt = "000";
            next = "001";

            //console.log("buttons:" + prev + " / " + this.currentArt + " / " + next);

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
          success: function(data) {
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
                success: function(data2) {
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

                            var imagenes = "";
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

    changeTipoActa(obj) {
      //console.log("changeActa " + obj.value);

      //$("#creaacta").hide();

      //$("#loader").show();

      //load planilla
      //$("#repomesa").show();

      //Aqui buscar las actas según el tipo elegido
      //this.loadActa(obj.value);
    }

    //checkActaPDF(idRow){
    getActaContent(idRow, mode){

      var bgColorAproba = "#4db6ac"; //teal lighten-3
      var bgColorPrelim = "#ffcc80"; //orange lighten-3
      var bgColorRetiro = "#ef9a9a"; //red lighten-3
      var bgColorProgre = "#fff59d"; //yellow lighten-3

      //console.log("PDF del acta: " + idRow + " Modo:" + mode);
      this.currentPDFId = idRow;
      this.currentInfoProgress = 0;
      this.currentModoActa = mode;
      this.barMove();

      this.currentInfoProgress = 80;
      if(idRow != "add"){
        this.currentInfoProgress = 0;
        this.getActaId(idRow);
        this.getTagsMinId(idRow);
        this.getTasksMinId(idRow);
        this.getCommentsId(idRow);
      }
      this.getAsistentes(idRow);

      /*var instance = M.Modal.getInstance( $('#modGeneraPDF') );
      instance.openModal();*/
      //$('#modGeneraPDF').modal('open');
      if(mode == 'REV'){
        //Preparar el modal para REvisar (consultar) el acta
        $("#cargaOk").attr("onclick","jimte_table.cambiaEstadoActa('G');").text("REVISAR");
        $('#cargaOk').css("color", "#000");
        $('#cargaOk').css("background-color", bgColorProgre);

      }
      if(mode == 'FIR'){
        //Preparar el modal para Firmar (Aprobar el acta)
        $('#cargaOk').attr("onclick","jimte_table.cambiaEstadoActa('F');").text("APROBAR");
        $('#cargaOk').css("color", "#fff");
        $('#cargaOk').css("background-color", bgColorAproba);
        /*.click(function() {
          jimte.apruebaActa();
        });*/
      }
      if(mode == 'PDF'){
        //Preparar el modal para Generar el PDF (solo las Aprobadas)
        $('#cargaOk').attr("onclick","jimte.generaPDF()").text("EN PDF");
        $('#cargaOk').css("color", "#fff");
        $('#cargaOk').css("background-color", bgColorAproba);

        /*.click(function() {
          jimte.generaPDF();
        });*/
      }
      /*
      $('#modCargaActa').modal('open');
      */
      jimte_table.overlayOn('Q');
    }

    barMove(){
      if(this.currentInfoProgress > 100){
        this.currentInfoProgress = 100;
      }
      this.barElement = document.getElementById("myBar");
      this.barElement.style.width = this.currentInfoProgress + '%';
      this.barElement.innerHTML = (this.currentInfoProgress * 1) + '%';

      if(this.currentInfoProgress == 100){
        $("#cargaOk").removeClass("disabled");
      } else {
        $("#cargaOk").addClass("disabled");
      }

    }

    changeActa(obj) {
      //console.log("changeActa " + obj.value);
      //this.getAsistentes(obj.value);

      this.currentInfoProgress = 80;
      if(obj.value == "add"){
        //Limpiar el acta pues se está adicionando
        this.cleanActa();
      } else {
        //this.getEtiquetas();
        this.currentInfoProgress = 0;
        this.getActaId(obj.value);
        this.getTagsMinId(obj.value);
        this.getTasksMinId(obj.value);
        this.getCommentsId(obj.value);
      }
      this.getAsistentes(obj.value);


      $("#creaacta").show();

      //$("#loader").show();
      //load planilla
      //$("#repomesa").show();

      //Aqui buscar las actas según el tipo elegido
      //this.loadActa(obj.value);
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

    loadActa(planilla) {
        var self = $(this);
        var url = this.configPath + planilla + ".json";
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
          success: function(data) {
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
            $("#creaacta_content")[0].innerHTML = myPlan.join("") ;

            $("#creaacta").show();
            $("#loader").hide();
            $("#creaacta_content").show();


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

    validaActa(tipo) {
        var title = "No se pudo Guardar el Acta, falta:";
        var message = "";
        var guardar = true;

        var tipo_de_acta = $("#tipo_de_acta").val();
        var acta_a_elaborar = $("#acta_a_elaborar").val();
        var temaacta = $("#temaacta").val();
        var lugar_reunion = $("#lugar_reunion").val();
        var fecacta = $("#fecacta").val();
        var horacta = $("#horacta").val();
        var objetivos = $("#objetivos").val();
        var desarrollo = $("#desarrollo").val();
        var conclusiones = $("#conclusiones").val();

        //var Asistentes (validar checkboxes) = $("#conclusiones").val();
        if( tipo_de_acta == null || tipo_de_acta == ""){
          message += "- El tipo de acta.<br>";
          guardar = false;
        }
        if( acta_a_elaborar == null || acta_a_elaborar == ""){
          message += "- El número de acta o elegir que sea Nueva.<br>";
          guardar = false;
        }
        if( temaacta == null || temaacta == ""){
          message += "- El Tema principal del acta.<br>";
          guardar = false;
        }
        if( lugar_reunion == null || lugar_reunion == ""){
          message += "- El Lugar de la Reunión relacionada con el acta.<br>";
          guardar = false;
        }
        if( fecacta == null || fecacta == ""){
          message += "- La Fecha del acta.<br>";
          guardar = false;
        }
        if( horacta == null || horacta == ""){
          message += "- La Hora del acta.<br>";
          guardar = false;
        }
        if (guardar){
          jimte_table.sendActa(tipo, acta_a_elaborar);
        } else {
           $('#standardAlert .modal-content h4').html(title);
           $('#standardAlert .modal-content p').html(message);
           $('#standardAlert').modal('open');

        }

    }

    sendMails() {

          var form_data = new FormData();
          form_data.append("id", jimte.currentUser.id );
          form_data.append("tiposerv", jimte.currentUser.tiposerv );
          form_data.append("servicio", jimte.currentUser.servicio );
          form_data.append("frat", jimte.currentUser.frat );
          form_data.append("table", this.table );
          form_data.append("token", jimte.token );

          form_data.append("nroActa", jimte.currentActaNro );

          $.ajax({
            url: jimte.serverPath + 'index.php/mails',
            dataType: "json",
            cache: false,
            processData: false,
            contentType: false,
            data: form_data,
            type: 'POST',
            success: function(data){
              //console.log( "sendAdd success - data: " + data );

              //&& data.length > 0
              if ((typeof data !== undefined ) &&
                   (data.length == 0 || data[0].acceso == undefined)) {
                     M.toast(
                               {html: data[0].sent + '/' + data[0].rows + ' correo(s) enviado(s)!',
                               displayLenght: 5000,
                               classes: 'rounded'}
                             );
              } else {
                jimte.alertMe(l("%denied", data[0].acceso) + " " +
                              l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

              }

            },
            error: function(xhr, status, error) {
                //alert(xhr.responseText + "\nCon el error:\n" + error);
                if(xhr.responseText.startsWith("Error: SQLSTATE[HY000]")){
                  jimte.alertMe("Al parecer No hay conexión con la base de datos, Por favor Reintente más tarde. \nSi el problema persiste por favor repórtelo al Administrador.", "Adicionando Registro");
                }
                if(xhr.responseText.startsWith("Error: SQLSTATE[23000]")){
                  jimte.alertMe("Ya existe un registro con esa llave en la base de datos, Por favor verifique.", "Adicionando Registro");
                }
                jimte_table.notWorking("addTable");
                console.log(xhr.responseText + "\nCon el error:\n" + error);
            }
          })

    }

    sendMailOld() {

          var form_data = new FormData();
          form_data.append("id", jimte.currentUser.id );
          form_data.append("tiposerv", jimte.currentUser.tiposerv );
          form_data.append("servicio", jimte.currentUser.servicio );
          form_data.append("frat", jimte.currentUser.frat );
          form_data.append("table", this.table );
          form_data.append("token", jimte.token );

          form_data.append("mail_to", $("#mail_to").val() );
          form_data.append("mail_sb", $("#mail_sb").val() );
          form_data.append("mail_tx", $("#mail_tx").val() );

          $.ajax({
            url: jimte.serverPath + 'index.php/mails',
            dataType: "json",
            cache: false,
            processData: false,
            contentType: false,
            data: form_data,
            type: 'POST',
            success: function(data){
              //console.log( "sendAdd success - data: " + data );

              //&& data.length > 0
              if ((typeof data !== undefined ) &&
                   (data.length == 0 || data[0].acceso == undefined)) {
                     M.toast(
                               {html:'Se Envió email!',
                               displayLenght: 3000,
                               classes: 'rounded'}
                             );
              } else {
                jimte.alertMe(l("%denied", data[0].acceso) + " " +
                              l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

              }

            },
            error: function(xhr, status, error) {
                //alert(xhr.responseText + "\nCon el error:\n" + error);
                if(xhr.responseText.startsWith("Error: SQLSTATE[HY000]")){
                  jimte.alertMe("Al parecer No hay conexión con la base de datos, Por favor Reintente más tarde. \nSi el problema persiste por favor repórtelo al Administrador.", "Adicionando Registro");
                }
                if(xhr.responseText.startsWith("Error: SQLSTATE[23000]")){
                  jimte.alertMe("Ya existe un registro con esa llave en la base de datos, Por favor verifique.", "Adicionando Registro");
                }
                jimte_table.notWorking("addTable");
                console.log(xhr.responseText + "\nCon el error:\n" + error);
            }
          })

    }

    changeLanguage(obj) {
        // this.currentLang = obj.value;
         // t(this.currentLang, "body");
         window.location.href = "./?lang=" + obj.value;
         //alert(status);
       //if(status=="1")
      //   $("#icon_class, #background_class").hide();// hide multiple sections
    }

    getBase64FromImageUrl(url) {
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width =this.width;
            canvas.height =this.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            //alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
        };
        img.src = url;
    }

    generaPDF(){
      // Landscape export, 2×4 inches
      var pdf = new jsPDF({
        format: 'letter'
      })

      //PDF header
      //jimte.imgData
      //$('#logoFrat')
      pdf.addImage(document.getElementById("logoFrat"), 'PNG', 12, 12, 18, 22);
      pdf.rect(10, 10, 200, 50);

      pdf.setFont("helvetica");
      pdf.setFontType("bold");
      pdf.setFontSize(16);
      pdf.text(33, 25, jimte.currentUser.nombrefrat );

      pdf.setFontSize(14);
      pdf.text(33, 33, jimte.currentUser.dirfrat );
      pdf.text(33, 41, jimte.currentUser.ciudadfrat );
      pdf.text(33, 49, jimte.currentUser.emailfrat );
      pdf.setFontSize(16);

      var arrayFechaHora = jimte.currentActaMain[0].fecha.split(' ');
      pdf.text(140, 17, 'ACTA # ' + jimte.currentActaNro );
      pdf.text(140, 25, 'Tipo'  );
      pdf.text(140, 33, 'Fecha' );
      pdf.text(140, 41, 'Hora' );
      pdf.text(140, 49, 'Lugar'  );
      pdf.text(140, 57, 'Estado' );

      var descestado = "";
      if(jimte.currentActaMain[0].estado == 'G'){
        descestado = "EN PROGRESO";
      }
      if(jimte.currentActaMain[0].estado == 'M'){
        descestado = "PRELIMINAR";
      }
      if(jimte.currentActaMain[0].estado == 'R'){
        descestado = "RETIRADA";
      }
      if(jimte.currentActaMain[0].estado == 'F'){
        descestado = "APROBADA";
      }
      pdf.setFontType("normal");
      pdf.text(163, 25, (jimte.currentActaMain[0].tipoacta == "N" ? "NORMAL" : "DE JUNTA") );
      pdf.text(163, 33, arrayFechaHora[0] );
      pdf.text(163, 41, arrayFechaHora[1] );
      pdf.text(163, 49, $("#lugar_reunion").find('option:selected').text() );
      pdf.text(163, 57, descestado);

      /*var asistePDF = "";
      $.each( jimte.currentActaAsis, function( key, val ) {
        if(val.asisestado == "S" || val.asisestado == "F"){
          asistePDF += "[" + val.asisestado + "] " +
                       val.nombres + " " + val.apellidos +". " +
                       "-" + val.nombreser + "- [sign_"+ val.usuario + "]\r\n";
        }
      });*/

      //var tareasPDF = "Responsable       Compromiso / Tarea e Inicio Estimado\r\n";
      var tareasPDF = "";
      $.each( jimte.currentActaTasks, function( key, val ) {
        //tareasPDF +=  val.usuario + ": " + val.text + " / Ini: " + val.inicioplan + "\r\n";
        tareasPDF +=  val.text + " R/ " + val.nombres + " Inicia: " + val.inicioplan + "\r\n";
      });

      var xx = 15;
      var yy = 70;

      jimte.popArrayPDFacta = new Array();

      // Cola de contenido a imprimir
      // Agrega al final del array
      jimte.popArrayPDFacta.push("* TEMA PRINCIPAL");
      jimte.popArrayPDFacta.push(
            pdf.splitTextToSize(jimte.currentActaMain[0].tema + "\r\n" , 190)
      );

      jimte.popArrayPDFacta.push("* OBJETIVOS");
      jimte.popArrayPDFacta.push(
            pdf.splitTextToSize(jimte.currentActaMain[0].objetivos + "\r\n" , 190)
      );

      jimte.popArrayPDFacta.push("* ASISTENTES / FIRMAS");
      jimte.popArrayPDFacta.push(
            "<asistentes>"
      );

      jimte.popArrayPDFacta.push("* DESARROLLO");
      jimte.popArrayPDFacta.push(
            pdf.splitTextToSize(jimte.currentActaMain[0].desarrollo  + "\r\n" , 190)
      );

      jimte.popArrayPDFacta.push("* COMPROMISOS Y TAREAS");
      jimte.popArrayPDFacta.push(
            pdf.splitTextToSize(tareasPDF , 190)
      );

      jimte.popArrayPDFacta.push("* CONCLUSIONES");
      jimte.popArrayPDFacta.push(
            pdf.splitTextToSize(jimte.currentActaMain[0].conclusiones + "\r\n" , 190)
      );

      jimte.popArrayPDFacta.push("* SIGUIENTE REUNIÓN");
      jimte.popArrayPDFacta.push(
            pdf.splitTextToSize(jimte.currentActaMain[0].fechasig + " " +
            $("#lugar_proxima").find('option:selected').text()  + "\r\n", 190)
      );

      jimte.popArrayPDFacta.push(
            pdf.splitTextToSize("Se aprueba y firma la presente acta: " +
                jimte.currentActaMain[0].aprobacion + "\r\n\r\n\r\n", 190)
      );

      jimte.popArrayPDFacta.push(
            "<firmas>"
      );

      /*  jimte_table.popArrayPDFacta.push(
              jimte.currentActaMain[0].fechasig + " " +
              $("#lugar_proxima").find('option:selected').text() ) ;
      */

      // Borra del inicio del array
      /*
      jimte.popArraySelectTable.shift();
      if(jimte.popArraySelectTable.length > 0){
          jimte.popSelectTables();
      }
      */
/*
      var text = pdf.splitTextToSize( "- TEMA PRINCIPAL:\r\n" +
                                      jimte.currentActaMain[0].tema + "\r\n\r\n" +
                                      "- OBJETIVOS:\r\n" +
                                      jimte.currentActaMain[0].objetivos  + "\r\n\r\n" +
                                      "- ASISTENTES:\r\n" +
                                      asistePDF + "\r\n" +
                                      "- DESARROLLO:\r\n" +
                                      jimte.currentActaMain[0].desarrollo  + "\r\n\r\n" +
                                      "- COMPROMISOS Y TAREAS:\r\n" +
                                      tareasPDF + "\r\n" +
                                      "- CONCLUSIONES:\r\n" +
                                      jimte.currentActaMain[0].conclusiones  + "\r\n\r\n" +
                                      "- SIGUIENTE REUNIÓN:\r\n" +
                                      jimte.currentActaMain[0].fechasig + " " +
                                      $("#lugar_proxima").find('option:selected').text() + "\r\n\r\n"
                                      , 190);
      pdf.text(15, 70, text);
*/
      var pageHeight = pdf.internal.pageSize.getHeight();
      console.log("pageHeight: " + pageHeight);
      var currentPage = 1;
      while(jimte.popArrayPDFacta.length > 0){
        if(yy >= (pageHeight - 20) ) {
          pdf.addPage("letter");
          currentPage++;
          pdf.setPage(currentPage);
          console.log("currentPage: " + currentPage);

          yy = 20;
        }

        //Si es título, aáda ret
        //console.log(jimte.popArrayPDFacta[0]);

        if( typeof jimte.popArrayPDFacta[0] === "string") {
            if( jimte.popArrayPDFacta[0].startsWith("* ")){
              //jimte.popArrayPDFacta[0].startsWith("* ")
              pdf.rect(10, yy-6, 200, 8);
              jimte.popArrayPDFacta[0] = "  " + jimte.popArrayPDFacta[0].substr(2);
            }
        }

        if(
          jimte.popArrayPDFacta[0] == "<asistentes>" ||
          jimte.popArrayPDFacta[0] == "<firmas>"
          ){

          var cuentaFirmas = 0;
          var currentFontSize = 16;
          pdf.setFontSize(12);
          $.each( jimte.currentActaAsis, function( key, val ) {
            if(val.asisestado == "S" || val.asisestado == "F"){
              if(jimte.popArrayPDFacta[0] == "<firmas>"){
                cuentaFirmas++;
                var tipo=(cuentaFirmas%2)?"Impar":"Par";

                if(tipo == "Impar"){
                  pdf.line(xx, yy + 2, xx + 82, yy + 2);
                  pdf.text(xx, yy + 8,
                          val.nombres + " " + val.apellidos );
                  pdf.text(xx, yy + 14, val.nombreser );


                  if(val.asisestado == "F"){
                    try{
                      pdf.addImage(document.getElementById("sign_" + val.usuario), 'PNG', xx, yy - 12, 46, 18 );
                    } catch( err ) {
                      //pdf.line( xx + 100, yy + 2, xx + 182, yy + 2);

                    }
                  }

                } else {
                  pdf.line( xx + 100, yy + 2 - 8, xx + 182, yy + 2 - 8);
                  pdf.text(xx + 100, yy + 8 - 8,
                          val.nombres + " " + val.apellidos );
                  pdf.text(xx + 100, yy + 12 - 6, val.nombreser );

                  if(val.asisestado == "F"){
                    try{
                      pdf.addImage(document.getElementById("sign_" + val.usuario), 'PNG', xx + 100, yy - 20, 46, 18 );
                    } catch( err ) {
                      //pdf.line( xx + 100, yy + 2, xx + 182, yy + 2);

                    }
                  }

                  yy += 16;

                }

              } else {
                pdf.text(xx, yy, "[" + val.asisestado + "] " +
                        val.nombres + " " + val.apellidos +". " +
                        "-" + val.nombreser + "- ");

                if(val.asisestado == "F"){
                  try{
                    pdf.addImage(document.getElementById("sign_" + val.usuario), 'PNG', xx + 120, yy - 6, 23, 9 );
                  } catch( err ) {
                    pdf.line( xx + 100, yy + 2, xx + 182, yy + 2);

                  }
                } else {
                  pdf.line( xx + 100, yy + 2, xx + 182, yy  + 2);
                }

              }

              yy += 8;

              if(yy >= (pageHeight - 20) ) {
                pdf.addPage("letter");
                currentPage++;
                pdf.setPage(currentPage);
                console.log("currentPage: " + currentPage);

                yy = 20;
              }

            }
          });
          yy += 8;
          pdf.setFontSize(currentFontSize);
        } else {
          var splitted = pdf.splitTextToSize(jimte.popArrayPDFacta[0], 190);
          pdf.text(xx, yy, splitted );
          //va de 8 en 8
          yy += ( 8 * splitted.length );
        }

        jimte.popArrayPDFacta.shift();
      }

      //Aprobación del acta y Firmas:

      //Save + download PDF
      pdf.save('sisga-acta-' + jimte.currentActaNro + '.pdf')


    }

    runQueryActas(){
      //console.log("runQueryActas!");
      $("#qry_progress").find(".determinate").attr("class", "indeterminate");
      jimte_table.load_query(this.currentState, "actas", "buscarActa_table");
    }

    getBadges(objId){
      if(jimte.currentUser.id == undefined){
          return false;
      }

      $.ajax({
        url: this.serverPath + 'index.php/mins/count' +
              "?id=" + jimte.currentUser.id +
              "&usuario=" + jimte.currentUser.usuario +
              "&tiposerv=" + jimte.currentUser.tiposerv +
              "&servicio=" + jimte.currentUser.servicio +
              "&frat=" + jimte.currentUser.frat +
              "&table=" + this.table +
              "&token=" + jimte.token +
              "&sqlCode=" + objId,
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data){
          if ((typeof data !== undefined ) &&
               (data.length == 0 || data[0].acceso == undefined)) {
                 //console.log("updating badge:" + objId);
                 if(data[0].badge == undefined ||
                    data[0].badge == 0 ||
                    data[0].badge == "0"){
                   //do nothing
                   $("#" + objId).addClass("hide");
                 } else {
                   $("#" + objId)[0].innerHTML = data[0].badge;
                   $("#" + objId).removeClass("hide");
                 }

          }else {
            jimte.alertMe(l("%denied", data[0].acceso) + " " +
                          l("%userNotFound", data[0].motivo), l("%iniciarSesion", "No se pudo Actualizar"));

          }
        },
        error: function(xhr, status, error) {
            //alert(xhr.responseText + "\nCon el error:\n" + error);
            console.log(xhr.responseText + "\nCon el error:\n" + error);
        }
      })
    }

}
