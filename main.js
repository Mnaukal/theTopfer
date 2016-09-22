var moveTime = 5;
var timer = 0;
var countTimer = true;
var itemCount = 0;
var current = 0;

$(document).ready(function() {
    itemCount = $("#innerSlider").children(".slideritem").length;
    var innerWidth = $(document).innerWidth();
    $("#innerSlider").css("width", innerWidth * itemCount);
    
    
    setInterval(function() {
        if(countTimer) {
            timer++;
            $("#page").text(timer);
        }
        
        if(timer > moveTime) {
            var last = current;
            current++;
            if(current >= itemCount)
                current = 0;
            
            timer = 0;
            
            $("#innerSlider").css("left", current * -100 + "%");
        }
    }, 1000);    
    
    $("#slider").mouseenter(function() {
        countTimer = false;
    });
    $("#slider").mouseleave(function() {
        countTimer = true;
    });
});