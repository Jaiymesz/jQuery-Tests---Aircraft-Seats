$(function() {
  
    var ticketPrice = 25;
    var covidRestrictions = true;

    $("#totalPassengers").on("change", function(){
        if($(this).val() < 0){
            $(this).val(0);
            alert("You must enter more than 0 passengers.");
        }else if($(this).val() > 9){
            $(this).val(9);
            alert("You can only book 9 passengers or less.");            
        }
        $("button.seat.selected").removeClass("selected").addClass("available");
        recalculateCart();        
    });

    
    $("button.seat").on("click", function(){
        if($(this).hasClass("available")){
            if($("button.seat.selected").length < $("#totalPassengers").val()){
                $(this).removeClass("available").addClass("selected");
            }
        }else if($(this).hasClass("selected")){
            $(this).removeClass("selected").addClass("available");        
        }
        updateSeats();
        recalculateCart();
    });

    $("#checkout").on("click",function(){
        if($("#totalPassengers").val()==0)alert("You must enter at least one passenger to checkout.");
        else if($("button.seat.selected").length < $("#totalPassengers").val())alert("You must book a seat for each passenger to checkout.");
        else if(!$("#termsAndConditions").is(":checked"))alert("You must agree to the Terms and Conditions to checkout.");
        else{
            $("button.seat.selected").removeClass("selected").addClass("unavailable");
            $("#totalPassengers").val(0);
            $("#termsAndConditions").prop("checked",false);
            updateSeats();
            recalculateCart();
            alert("Your booking was successful, thank you.");
        }
    });

    function updateSeats(){
        var passengerI = 1;
        if( $("button.seat.selected").length==0){
            $("#seatList ul").html("<li>No Seats Selected</li>");
        }else{
            $("#seatList ul").html("");
            $("button.seat.selected").each(function(i, val){   
                let extraTxt = '';
                if($(this).closest("ul[data-row]").data("row")==1)extraTxt = ' ** Extra Leg Room €15 **';  
                $("#seatList ul").append("<li>Passenger "+passengerI+": Seat "+$(this).closest("ul[data-row]").data("row")+$(this).data("seat")+extraTxt+"</li>"); 
                passengerI++;        
            });
        
        }
    }

    function recalculateCart(){
        $("#totalPrice").text($("#totalPassengers").val()*ticketPrice);
        $("button.seat.selected").each(function(i, val){
            if($(this).closest("ul[data-row]").data("row")==1)$("#totalPrice").text(parseInt($("#totalPrice").text())+15);
        });
    }

    // Unavailable Seats
    $("ul[data-row=1] > li > button[data-seat=D]").removeClass("available").addClass("unavailable");
    $("ul[data-row=3] > li > button[data-seat=F]").removeClass("available").addClass("unavailable");
    $("ul[data-row=4] > li > button[data-seat=B]").removeClass("available").addClass("unavailable");

    if(covidRestrictions){
        $("ul[data-row]").each(function(){
            $("ul[data-row="+$(this).data("row")+"] > li > button[data-seat=B]").removeClass("available").addClass("unavailable");
            $("ul[data-row="+$(this).data("row")+"] > li > button[data-seat=E]").removeClass("available").addClass("unavailable");
        });
    }

});
