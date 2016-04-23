$(document).ready(function(){
  $(function() {

    autor_val_up = [];
    avatar_val_up = [];
    titulo_val_up = [];
    contenido_val_up = [];
    fecha_val_up = [];

  	$("#tabs").tabs();
  	$("#config").menu();
    $(".accordion").accordion();

/*CORRESPONDIENTE A MOSTRAR Y OCULTAR UPDATE.JSON*/
    var show = false;

    $("#newMsgs").append("hay 3 mensajes nuevos");
    $("#newMsgs").click(function(){
      if(show == true){

        $("#nuevos").hide();
        show = false;
        $("#newMsgs").empty();
        $("#newMsgs").append("hay 3 mensajes nuevos");
      }else{
        $("#nuevos").show();
        show = true;
        $("#newMsgs").empty();
        $("#newMsgs").append("Ocultar");
      }

      $.getJSON("update.json")
      .done(function(data) {
        var i = 0;
        var valores_up = [];
        var num_usuarios = 0;
        $.each(data,function (key,value){
          num_usuarios++;
          $.each(value,function (key,value){
            $.each(value,function (key,value){
              valores_up[i] = value;
              i++;
            });
          });
        });

        //organizar_val_update(valores_up, num_usuarios);

        for (user = 0; user<num_usuarios; user++){
          $("<h3>",{"class":"autor_noticia" + user,
            html: titulo_val_up[user] + ". Mensaje de " + autor_val_up[user] + ". " + fecha_val_up[user],
            }).appendTo("#nuevos");

  		    $("<div>",{"class":"noticia" + user,
            html: avatar_val_up[user] + "<ul><li>" + contenido_val_up[user] +"</li></ul>",
            }).appendTo("#nuevos");
        }
        $( "#nuevos" ).accordion({heightStyle: "content"});
      })

      .fail(function(data){
        console.log("fallo");
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
