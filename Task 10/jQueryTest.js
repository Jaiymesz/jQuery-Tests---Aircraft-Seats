$(function() {
  
    var ticketPrice = 25;
    var covidRestrictions = true;

    // Add 2 additional rows of seats
    $("ul[data-row=5]").parent().clone().appendTo("#plane ol").find("ul[data-row]").attr("data-row",6).find("li.header").html("6");
    $("ul[data-row=6]").parent().clone().appendTo("#plane ol").find("ul[data-row]").attr("data-row",7).find("li.header").html("7");

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
        
        if($("button.seat.selected").length < $("#totalPassengers").val()){
            if(!randomSeats())return;
        }

        if($("#totalPassengers").val()==0)alert("You must enter at least one passenger to checkout.");
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
        if( $("button.seat.selected").length==0){
            $("#seatList ul").html("<li>No Seats Selected</li>");
        }else{
            $("#seatList ul").html("");
            $("button.seat.selected").each(function(i){   
                let extraTxt = '';
                if($(this).closest("ul[data-row]").data("row")==1)extraTxt = ' ** Extra Leg Room ???15 **';  
                $("#seatList ul").append("<li>Passenger "+(i+1)+": Seat "+$(this).closest("ul[data-row]").data("row")+$(this).data("seat")+extraTxt+"</li>"); 
            });
        
        }
    }

    function recalculateCart(){
        $("#totalPrice").text($("#totalPassengers").val()*ticketPrice);
        $("button.seat.selected").each(function(i, val){
            if($(this).closest("ul[data-row]").data("row")==1)$("#totalPrice").text(parseInt($("#totalPrice").text())+15);
        });
    }

    function randomSeats(){
        let seatsToAllocate = $("#totalPassengers").val() - $("button.seat.selected").length;
        let allocatedSeats =  new Array();
        let remainingSeats = $("button.available").length;

        if(remainingSeats<seatsToAllocate){
            alert("Sorry, there are insuffucient seats available for this booking.");
            return false;
        }else{
            for (var i = 0; i < seatsToAllocate; i++){
                let seat = $("button.available:eq("+(remainingSeats-1)+")").data("seat");
                let row = $("button.available:eq("+(remainingSeats-1)+")").closest("ul[data-row]").data("row");
                allocatedSeats.push(row + seat);                
                $("ul[data-row="+row+"] > li > button[data-seat="+seat+"]").removeClass("available").addClass("selected");
                remainingSeats--;
            }

            updateSeats();
            alert("We have automatically allocated the following seats: "+allocatedSeats.join(", "));
            return true;
        }
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
