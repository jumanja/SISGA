$(document).ready(function() {
    $('.modal').modal();

    // Show sideNav
    //$('#hideSideMenu').sideNav('hide');
    // Hide sideNav
    //$('#showSideMenu').sideNav('show');

   $('select').material_select();

   $('.datepicker').pickadate({
       selectMonths: true, // Creates a dropdown to control month
       selectYears: 15, // Creates a dropdown of 15 years to control year,
       today: 'Hoy',
       clear: 'Limpiar',
       close: 'Ok',
       format: 'dd/mm/yyyy',
       closeOnSelect: false // Close upon selecting a date,
     });
     $('.button-collapse').sideNav({
       closeOnClick: true
     });

     $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });

 });


 //localizations
 if (location.hash) {
 	String.locale = location.hash.substr(1);
 }

// var localize = function (string, fallback) {
 var l = function (string, fallback) {
 	var localized = string.toLocaleString();
 	if (localized !== string) {
 		return localized;
 	} else {
 		return fallback;
 	}
 };

 var t = function (locale) {
   String.locale = locale;
    $('[translate="yes"]').each(function() {
        // `this` is the div
        //console.log(this.id);
        // )
        this.innerText = l("%" + this.id, this.innerText);

    });
   document.documentElement.lang = String.locale || document.documentElement.lang;
   console.log("translation to " + String.locale + " completed!")
 }
                 /*
 var info = document.getElementById("info").firstChild,
 title = document.getElementById("title").firstChild;

 info.nodeValue = l("%info", info.nodeValue);
 document.title = title.nodeValue = l("%title", title.nodeValue);
 document.documentElement.dir = l("%locale.dir", document.documentElement.dir);

 document.documentElement.lang = String.locale || document.documentElement.lang;

console.log("locali done");
*/

//Load jimte library
var jimte = new JimteMan();
var jimte_table = new JimteTab();

$(function(){

});
