$(document).ready(function() {
  
    $("#totalPassengers").change(function(){

        if($(this).val() < 0){
            $(this).val(0);
            alert("You must enter more than 0 passengers.");
        }
        else if($(this).val() > 9){
            $(this).val(9);
            alert("You can only book 9 passengers or less.");
        }

        $("#totalPrice").text($(this).val()*25);
        
    });

});