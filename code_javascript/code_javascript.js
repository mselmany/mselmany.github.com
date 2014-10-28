$(document).ready(function () {






    $(window).on("load", function () {
        setTimeout(function () {
            $("body").addClass("_LOADED");
        }, 250);
    });

    $(window).on("load resize", function () {
        var $logoField = $(".logo-field");
        $logoField.css("height", $logoField.outerWidth() + "px");
    });


    $("#submit").on("click", function () {
        var $that = $(this);
        if( !$("body").hasClass("_CLEARED") ){
            $that.attr("value","Clearing...");
            setTimeout(function () {
                $that.attr("value","Cleared");
                setTimeout(function () {
                    $("body").addClass("_CLEARED");
                    $that.attr("value","Clear it");
                }, 500);
            }, 1000);
        }else {
            setTimeout(function () {
                $("body").removeClass("_CLEARED");
            }, 500);
        }
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


});
