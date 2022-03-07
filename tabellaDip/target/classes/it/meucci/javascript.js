var serverData;
var selfUrl;
//creo un ID progressivo
var nextID = 10006;



$(document).ready(function (){

  leggiServer("http://localhost:8080/employees");

    //Aggiungo un Dipendente
    $('#aggiungi').on('click', function(element){
        element.preventDefault(); //prevenire il comportamento di default e poterlo gestire

        var form_action = $("#crea-dipendente").attr("action");
        var nome = $("#nome").val();
        var cognome = $("#cognome").val();
        var genere = $("#genere").val();
        display = "create";
        var payload = { firstName: nome, lastName: cognome, gender: genere };

        if(nome != "" && cognome != ""){
          //Chiamata POST Ajax
          
          $.ajax({
            method: "POST",
            url: "http://localhost:8080/employees",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(payload)
          })
          .done(function( msg ) {
            alert( 'Item creato con Successo!', 'Success Alert', {timeout: 5000});
          });
          

          nextID++;
          $("#crea-dipendente").modal('hide');
          //toastr.success('Item creato con Successo!', 'Success Alert', {timeout: 5000});
        }
        else{
          alert("Tutti i campi devono essere riempiti! Riprova...");
        }
    });

    //Elimina Dipendente
    $("body").on("click", ".elimina-dipendente", function(){
      var id = $(this).parent("td").data("id");

      $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/employees/" + id,
        success: function (data) {
          leggiServer(selfUrl);
        }
      });
    });

    //Modifica Dipendente
    $("body").on("click", ".modifica-dipendente", function(){
      var form_action = $("#crea-dipendente").attr("action");
      var id = $(this).parent("td").data("id");
      var genere = $(this).parent("td").prev("td").text();
      var nome = $(this).parent("td").prev("td").prev("td").text();
      var cognome = $(this).parent("td").prev("td").prev("td").prev("td").text();

      $("$nomeMod").val(nome);
      $("$cognomeMod").val(cognome);
      $("$genereMod").val(genere);
      
      $("#modify").on("click", function(e){
        e.preventDefault();

        var name = $("#nomeMod").val();
        var surname = $("#cognomeMod").val();
        var sesso = $("#genereMod").val();

        var payload = { firstName: name, lastName: surname, gender: sesso };
        //ATTENZIONE UTILIZZARE CHIAMATE GET AJAX PER LE VARIABILI
        $.ajax({
          type: 'PUT',
          url: "http://localhost:8080/employees/" + id,
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(payload),
          success: function(data) {
            leggiServer(selfUrl);
          }
        });
        $("#modifica-dipendente").modal("hide");
      });
    });

    function linkA(){
      leggiServer(serverData[ "_links"]["next"]["href"]);
    };
    
    function linkF(){
      leggiServer(serverData[ "_links"]["first"]["href"]);
    };

    function linkL(){
      leggiServer(serverData[ "_links"]["last"]["href"]);
    };
    
    function linkI(){
      leggiServer(serverData[ "_links"]["prev"]["href"]);
    };

    function linkS(){
      leggiServer(serverData[ "_links"]["self"]["href"]);
    };


    function leggiServer(url){
      selfUrl = url;
      //Chiamata GET Ajax
      $.get( url, function( msg ) {
        serverData = msg;
        displayEmployeeList();
      });
  
  }
    //Stampa lista Dipendenti
    function displayEmployeeList(){
        //creo il body della tabella
        var rows = '';
        $.each(serverData["_embedded"]["employees"], function(index, value){
            rows = rows + '<tr>';
            rows = rows + '<td>' + value.id + '</td>';
            rows = rows + '<td>' + value.firstName + '</td>';
            rows = rows + '<td>' + value.lastName + '</td>';
            rows = rows + '<td>' + value.gender + '</td>';
            rows = rows + '<td data-id="' + value.id + '">';
            rows = rows + '<button class="btn btn-warning btn-sm modifica-dipendente" data-bs-toggle="modal" data-bs-target="#modifica-dipendente"> Modifica </button>  ';
            rows = rows + '<button class="btn btn-danger btn-sm elimina-dipendente"> Elimina </button>';
            rows = rows + '</td>';
            rows = rows + '</tr>';
        });
    
        //attraverso il metodo html di jQuery sostituisco il body creato (rows) all'attributo tbody della tabella
        $("#tbody").html(rows);
    }
});


