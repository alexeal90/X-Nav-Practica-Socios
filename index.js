$(document).ready(function(){
  $(function() {

    updateArray = [[], [], [], [], []];

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
        array[arrayIndex][user] = "<img class='col-md-2' src='" + val[i_datos] + "' height='30' width='30'></img>";
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

    function acordeon(array,num_usuarios){
      for (user = 0; user<num_usuarios; user++){
        $("<h3>",{"class":"autor_noticia" + user,
          html: array[1][user] + ". Mensaje de " + array[0][user] + ". " + array[2][user],
          }).appendTo("#nuevos");

        $("<div>",{"class":"noticia" + user,
          html: array[4][user] + "<ul><li>" + array[3][user] +"</li></ul>",
          }).appendTo("#nuevos");
      };
      $("#nuevos").accordion({heightStyle: "content"});
    };




/*CORRESPONDIENTE A MOSTRAR Y OCULTAR UPDATE.JSON*/
    var show = false;
    var cargado = false;

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

      if(cargado==false){
        $.getJSON("update.json")
        .done(function(data) {
          cargado = true;
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

          guardarDatos(updateArray, valores_up, num_usuarios);
          acordeon(updateArray, num_usuarios);
        })

        .fail(function(data){
          console.log("No se ha podido cargar el archivo JSON");
        });
      };
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
