var moveTime = 5000;
var timer = 0;
var countTimer = true;
var itemCount = 0;
var current = 0;

$(document).ready(function() {
    itemCount = $("#innerSlider").children(".slideritem").length;
    var innerWidth = $(document).innerWidth();
    $("#innerSlider").css("width", innerWidth * itemCount);
    moveSlider(0);
    
    setInterval(function() {
        if(countTimer) {
            timer++;
            $("#page").text(timer);
        }
        
        if(timer > moveTime) {
            moveSlider(current + 1);
        }
    }, 1000);    
    
    $("#slider").mouseenter(function() {
        countTimer = false;
    });
    $("#slider").mouseleave(function() {
        countTimer = true;
    });
    
    $(".member").mouseenter(function() {
        $(".member").removeClass("leader");
        $(this).addClass("leader");
    });
    $(".member").mouseleave(function() {
        $(this).removeClass("leader");
    });
    
    $("#me").click(function(){
        $("#stylesheet").attr("href", "http://random-color-of-the-day.funsite.cz/stylesheet-variables.php?color=FFE000") ;
    });

    
    $(window).scroll(function() {
        var main = $("main");
        var nav = $("nav");
        if (main.offset().top < $(this).scrollTop())  {
            nav.addClass('fixed');
        }
        else {
            nav.removeClass('fixed');
        }
    });
    
    var bodyStyles = window.getComputedStyle(document.body);
    var color = bodyStyles.getPropertyValue('--randomColorOfTheDay');
    $("#RCD").text(color);
    $("#project-RCD").text(color);
});

function moveSlider(direction) {
    current = direction;
    if(current < 0)
        current = itemCount - 1;
    if(current >= itemCount)
        current = 0;
    
    timer = 0;

    $("#innerSlider").css("left", current * -100 + "%");
    
    var cur = $("#cpanel").children()[current + 1];
    var pos = $(cur).position();
    $(".selected").css("left", pos.left).css("top", pos.top);
}

function scrollToAnchor(selector){
    var aTag = $(selector);
    $('html,body').animate({
        scrollTop: aTag.offset().top - 80
    },'slow');
}