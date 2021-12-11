$(function() {
  
    var ticketPrice = 25;
    var covidRestrictions = false;

    // NB: You must run this in a LIVE HTTP Server due to CORS Policy in Browsers.
    $.getJSON( "flightData.json", function( data ) {
        console.log(data);
        if(data.rows>5){
            for (var i = 5; i < data.rows; i++){
                $("ul[data-row="+i+"]").parent().clone().appendTo("#plane ol").find("ul[data-row]").attr("data-row",(i+1)).find("li.header").html((i+1));
            }   
        }
        
        if(data.covidRestrictions){
            $("ul[data-row]").each(function(){
                $("ul[data-row="+$(this).data("row")+"] > li > button[data-seat=B]").removeClass("available").addClass("unavailable");
                $("ul[data-row="+$(this).data("row")+"] > li > button[data-seat=E]").removeClass("available").addClass("unavailable");
            });
        }

        $.each(data['unavailable'],function(i, value){
            $("ul[data-row="+value.substr(0,(value.length-1))+"] > li > button[data-seat="+value.substr(-1,1)+"]").removeClass("available").addClass("unavailable");
        });
    });
    
    
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

});
