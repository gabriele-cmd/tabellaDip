var data = [
    {
      "id": 10001,
      "birthDate": "1953-09-01",
      "firstName": "Andrea",
      "lastName": "Gorghi",
      "gender": "M",
      "hireDate": "1986-06-25",
    },
    {
      "id": 10002,
      "birthDate": "1964-06-01",
      "firstName": "Erika",
      "lastName": "Pedretti",
      "gender": "F",
      "hireDate": "1985-11-20",
    },
    {
      "id": 10003,
      "birthDate": "1959-12-02",
      "firstName": "Luciano",
      "lastName": "Lucio",
      "gender": "M",
      "hireDate": "1986-08-27",
    },
    {
      "id": 10004,
      "birthDate": "1954-04-30",
      "firstName": "Claudio",
      "lastName": "Canetta",
      "gender": "M",
      "hireDate": "1986-11-30",
  
    },
    {
      "id": 10005,
      "birthDate": "1955-01-20",
      "firstName": "Antonio",
      "lastName": "Cocco",
      "gender": "M",
      "hireDate": "1989-09-11",
  
    }
  ];
//creo un ID progressivo
var nextID = 10006;



$(document).ready(function (){

    displayEmployeeList();

    //Aggiungo un Dipendente
    $('#crea-dipendente').on('submit', function(element){
        element.preventDefault(); //prevenire il comportamento di default e poterlo gestire

        var form_action = $("#crea-dipendente").attr("action");
        var nome = $("#nome").val();
        var cognome = $("#cognome").val();
        var genere = $("#genere").val();
        display = "create";

        if(nome != "" && cognome != ""){
          data.push({id: nextID, firstName: nome, lastName: cognome, gender: genere});
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


