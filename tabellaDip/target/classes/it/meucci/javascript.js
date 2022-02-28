
var data = [];
//creo un ID progressivo
var nextID = 10006;



$(document).ready(function (){

    //Chiamata GET Ajax
    $.get( "http://localhost:8080/employees", function( content ) {
      data = content["_embedded"]["employees"];
      displayEmployeeList();
    });

    //Aggiungo un Dipendente
    $('#aggiungi').on('click', function(element){
        element.preventDefault(); //prevenire il comportamento di default e poterlo gestire

        var form_action = $("#crea-dipendente").attr("action");
        var nome = $("#nome").val();
        var cognome = $("#cognome").val();
        var genere = $("#genere").val();
        display = "create";
        var payload = { firstName: nome, lastName: cognome, gender: genere };
        console.log(payload);

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
            alert( "Data Saved: " + msg );
          });
          

          nextID++;
          //Stampa il nuovo impiegato aggiunto
          displayEmployeeList();

          //Nascondi Modal
          $("#crea-dipendente").modal('hide');
          toastr.success('Item creato con Successo!', 'Success Alert', {timeout: 5000});
        }
        else{
          alert("Tutti i campi devono essere riempiti! Riprova...");
        }
    });

    //Elimina Dipendente
    $("body").on("click", ".elimina-dipendente", function(){
      var id = $(this).parent("td").data("id");

      for (let i = 0; i < data.length; i++){
        if(data[i].id == id){
          data.splice(i, 1);
        }
      }

      displayEmployeeList();
    });

    //Modifica Dipendente
    $("body").on("click", ".modifica-dipendente", function(){
      var id = $(this).parent("td").data("id");
      var gender = $(this).parent("td").prev("td").text();
      var firstName = $(this).parent("td").prev("td").prev("td").text();
      var lastName = $(this).parent("td").prev("td").prev("td").prev("td").text();

      $("$nomeMod").val(gender);
      $("$cognomeMod").val(gender);
      $("$genereMod").val(gender);
      
      $("#modify").on("click", function(e){
        e.preventDefault();

        var name = $("nomeMod").val();
        var surname = $("cognomeMod").val();
        var sesso = $("genereMod").val();

        if(firstName != '' && lastName != ''){
          for(let i = 0; i < data.length; i++){
            if(data[i].id == id){
              data[i].firstName = name;
              data[i].lastName = surname;
              data[i].gender = sesso;
              break;
            }
          }
          displayEmployeeList();
          $("#modifica-dipendente").modal("hide");
          toastr.success("Dipendente Modificato correttamente", "Success Alert", {timeout:5000});
        }
      })
    });


    //Stampa lista Dipendenti
    function displayEmployeeList(){
        //creo il body della tabella
        var rows = '';
        $.each(data, function(index, value){
            rows = rows + '<tr>';
            rows = rows + '<td>' + value.id + '</td>';
            rows = rows + '<td>' + value.firstName + '</td>';
            rows = rows + '<td>' + value.lastName + '</td>';
            rows = rows + '<td>' + value.gender + '</td>';
            rows = rows + '<td data-id="' + value.id + '">';
            rows = rows + '<button class="btn btn-warning btn-sm modifica-dipendente"> Modifica </button>  ';
            rows = rows + '<button class="btn btn-danger btn-sm elimina-dipendente"> Elimina </button>';
            rows = rows + '</td>';
            rows = rows + '</tr>';
        });
    
        //attraverso il metodo html di jQuery sostituisco il body creato (rows) all'attributo tbody della tabella
        $("#tbody").html(rows);
    }
});


