$(function() {
  
    $("#totalPassengers").on("change", function(){

        if($(this).val() < 0){

              $(this).val(0);
            alert("You must enter more than 0 passengers.");

        }else if($(this).val() > 9){

            $(this).val(9);
            alert("You can only book 9 passengers or less.");
            
        }

        $("#totalPrice").text($(this).val()*25);
        
    });

    
    $("button.seat").on("click", function(){

        if($(this).hasClass("available"))$(this).removeClass("available").addClass("selected");
        else if($(this).hasClass("selected"))$(this).removeClass("selected").addClass("available");

    });

});
