$(document).ready(function() {
  
    $("#totalPassengers").change(function(){

        if($(this).val()<0)$(this).val(0);
        else if($(this).val()>9)$(this).val(9);
        
        $("#totalPrice").text($(this).val()*25);
        
    });

});