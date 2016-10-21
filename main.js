var moveTime = 4;
var timer = 0;
var countTimer = true;
var itemCount = 0;
var current = 0;

$(document).ready(function() {
    setInterval(function() {
        if(countTimer) {
            timer++;
            $("#page").text(timer);
        }

        if(timer > moveTime) {
            moveSlider(current + 1);
        }
    }, 1000);    

    $(".sliderbox").mouseenter(function() {
        countTimer = false;
    });
    $(".sliderbox").mouseleave(function() {
        countTimer = true;
    });

    $(".member").mouseenter(function() {
        $(".member").removeClass("leader");
        $(this).addClass("leader");
    });
    $(".member").mouseleave(function() {
        $(this).removeClass("leader");
    });

    $("#enableRandom").change(function(){
        if($(this).is(":checked"))
            $("#stylesheet").attr("href", "http://randomcoloreveryday.com/stylesheet-variables");        
        else
            $("#stylesheet").attr("href", "fallback.min.css");
        
        /*setTimeout(function() {
            start(true);
        }, 2000);*/
    });

    $(window).resize(function () {
        waitForFinalEvent(function(){
            start();
        }, 500, "some unique string");
    });


    $(window).scroll(function() {
        var main = $("main");
        var nav = $("nav");
        if (main.offset().top <= $(this).scrollTop()) {
            nav.addClass('fixed');
        }
        else {
            nav.removeClass('fixed');
        }
        
        var sections = $("section");
        var menuItems = $("#menu > li");
        $(menuItems).removeClass("currentPage");
        
        //$("#debugbox").html($(sections[0]).offset().top + "<br>" + $(sections[0]).height() + "<br>" + $(this).scrollTop());
        
        for (i = sections.length - 1; i >= 0; i--) {
            if($(sections[i]).offset().top - 80 - $(sections[i]).height() / 2 <= $(this).scrollTop()) {
                $(menuItems[i]).addClass("currentPage");
                break;
            }
        }
    });
    
    $("form").submit(function(){
        //$("input[type=submit]").slideToggle(1000);
        $("input[type=submit]").css("top", "60px");
    });
    
    start();   
});

function start(showWarning) {
    itemCount = $("#innerSlider").children(".slideritem").length;
    var innerWidth = $(document).innerWidth();
    $("#innerSlider").css("width", innerWidth * itemCount);
    moveSlider(0);
    
    var bodyStyles = window.getComputedStyle(document.body);
    var color = bodyStyles.getPropertyValue('--randomColorEveryDay');
    if(color == "") {
        if($("#enableRandom").is(":checked")) {
            if(showWarning != null)
                alert("Error\nThis is probably not supported in our browser");
            $("#enableRandom").prop('checked', false).trigger("change");
        }
        
        color = "#COLOR";
        $("#RCD").text(color);
        $("#project-RCD").text(color);
    }
    else {
        $("#RCD").text(color);
        $("#project-RCD").text(color);
    }
}

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

var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout (timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();