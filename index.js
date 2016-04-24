$(document).ready(function(){
  $(function() {

    arrayJson = [[], [], [], [], []];

  	$("#tabs").tabs();
  	$("#config").menu();

/*CORRESPONDIENTE A GUARDAR LOS DATOS DE LOS .JSON EN ARRAY Y CREAR EL ACORDEON CON DICHOS DATOS*/
    function guardarDatos(array,val,num){
      var i_datos = 0;
      for (user = 0; user<num; user++){
        var arrayIndex = 0;
        array[arrayIndex][user] = val[i_datos];
        i_datos++;
        arrayIndex++;
        array[arrayIndex][user] = "<img class='col-md-2' src='" + val[i_datos] + "' height='50' width='50'></img>";
        i_datos++;
        arrayIndex++;
        array[arrayIndex][user] = val[i_datos];
        i_datos++;
        arrayIndex++;
        array[arrayIndex][user] = val[i_datos];
        i_datos++;
        arrayIndex++;
        array[arrayIndex][user] = val[i_datos];
        i_datos++;
        arrayIndex++;
      };
    };

    function acordeon(array,num_usuarios, idDiv){
      for (user = 0; user<num_usuarios; user++){
        $("<h3>",{"class":"autor" + user,
          html: array[1][user] + " De " + array[0][user] + ": " + array[2][user],
        }).appendTo(idDiv);

        $("<div>",{"class":"noticia" + user,
          html: array[3][user] + "<p align='right'>" + array[4][user] + "</p>" ,
        }).appendTo(idDiv);
      };
      $(idDiv).accordion({heightStyle: "content"});
    };

  /*TIMELINE.JSON*/
  $(function() {

    var num_usuarios = 0;

    $.getJSON("timeline.json")
      .done(function(data) {
        var i = 0;
        var valores_up = [];
        $.each(data,function (key,value){
          num_usuarios++;
          $.each(value,function (key,value){
            $.each(value,function (key,value){
              valores_up[i] = value;
              i++;
            });
          });
        });

        guardarDatos(arrayJson, valores_up, num_usuarios);
        acordeon(arrayJson, num_usuarios, "#timeline");
      })

      .fail(function(data){
        console.log("No se ha podido cargar el archivo timeline.JSON");
      });

  });

  /*MYLINE.JSON*/
  $(function() {

    var num_usuarios = 0;

    $.getJSON("myline.json")
      .done(function(data) {
        var i = 0;
        var valores_up = [];
        $.each(data,function (key,value){
          num_usuarios++;
          $.each(value,function (key,value){
            $.each(value,function (key,value){
              valores_up[i] = value;
              i++;
            });
          });
        });

        guardarDatos(arrayJson, valores_up, num_usuarios);
        acordeon(arrayJson, num_usuarios, "#myline");
      })

      .fail(function(data){
        console.log("No se ha podido cargar el archivo myline.JSON");
      });

  });


/*UPDATE.JSON*/

  $(function() {  /*CORRESPONDIENTE A MOSTRAR Y OCULTAR UPDATE.JSON*/
    var show = false;
    //var cargado = false;
    var num_usuarios = 0;

    /*se carga el json antes de nada para saber cuantos mensajes hay y poder ponerlo en el boton*/
    $.getJSON("update.json")
      .done(function(data) {
        //cargado = true;
        var i = 0;
        var valores_up = [];
        $.each(data,function (key,value){
          num_usuarios++;
          $.each(value,function (key,value){
            $.each(value,function (key,value){
              valores_up[i] = value;
              i++;
            });
          });
        });

        guardarDatos(arrayJson, valores_up, num_usuarios);
        acordeon(arrayJson, num_usuarios, "#update");
        $("#newMsgs").append("hay " + num_usuarios + " mensajes nuevos");
      })

      .fail(function(data){
        console.log("No se ha podido cargar el archivo update.JSON");
        $("#newMsgs").append("no hay mensajes nuevos");
      });


    $("#newMsgs").click(function(){
      if(show == true){

        $("#update").hide();
        show = false;
        $("#newMsgs").empty();
        $("#newMsgs").append("hay " + num_usuarios + " mensajes nuevos");
      }else{
        $("#update").show();
        show = true;
        $("#newMsgs").empty();
        $("#newMsgs").append("Ocultar mensajes nuevos");
      }
    });
  });

/*CORRESPONDIENTE A LA PARTE DE CONVERSACIONES*/
  	$( ".draggable" ).draggable({stack: "#droppable"});
  	$( "#draggable1" ).resizable({
      animate: true,
      autoHide: true,
      ghost: true,
      minWidth: 180,
      resize: function(){
        $(".texto1").css({
               position:'absolute',
               top: ($("#draggable1").height() - $(".texto1").outerHeight())
          });
      }
    });

    $( "#draggable2" ).resizable({
      animate: true,
      autoHide: true,
      ghost: true,
      minWidth: 180,
      resize: function(){
        $(".texto2").css({
               position:'absolute',
               top: ($("#draggable2").height() - $(".texto2").outerHeight())
          });
      }
    });

    $( "#draggable3" ).resizable({
      animate: true,
      autoHide: true,
      ghost: true,
      minWidth: 180,
      resize: function(){
        $(".texto3").css({
               position:'absolute',
               top: ($("#draggable3").height() - $(".texto3").outerHeight())
          });
      }
    });
    /*$( "#droppable" ).resizable({animate: true, autoHide: true, ghost: true});*/
  	$( "#droppable" ).droppable({
  		over: function( event, ui ) {
  				$( this )
  			.addClass( "ui-state-highlight" )
  			.find( "p" )
  			.html("BORRAR!");
  		},
  		out: function( event, ui ) {
  				$( this )
  			.removeClass( "ui-state-highlight" )
  			.find( "p" )
  			.html( "Papelera" );
  		}
  	});


/*FUNCION PARA QUE SALGA EL CUADRO DE DIALOGO AL PULSAR EL BOTON DE DESCONEXION*/
    $(function() {
      $("#textout").dialog({
        autoOpen: false,
        show: {
          effect: "bounce",
          duration: 1000
        },
      });
      $( "#logout" ).click(function() {
        $( "#textout" ).dialog( "open" );
      });
    });

  });
});
