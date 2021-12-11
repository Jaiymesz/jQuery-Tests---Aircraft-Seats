$(function() {
  
    $("#totalPassengers").on("change", function(){

        if($(this).val() < 0){

              $(this).val(0);
            alert("You must enter more than 0 passengers.");

        }else if($(this).val() > 9){

            $(this).val(9);
            alert("You can only book 9 passengers or less.");
            
        }

        $("button.seat.selected").removeClass("selected").addClass("available");

        $("#totalPrice").text($(this).val()*25);
        
    });

    
    $("button.seat").on("click", function(){

        if($("button.seat.selected").length == $("#totalPassengers").val())return;
        
        if($(this).hasClass("available"))$(this).removeClass("available").addClass("selected");
        else if($(this).hasClass("selected"))$(this).removeClass("selected").addClass("available");

    });

    // Unavailable Seats
    $("ul[data-row=1] > li > button[data-seat=D]").removeClass("available").addClass("unavailable");
    $("ul[data-row=3] > li > button[data-seat=F]").removeClass("available").addClass("unavailable");
    $("ul[data-row=4] > li > button[data-seat=B]").removeClass("available").addClass("unavailable");

});
