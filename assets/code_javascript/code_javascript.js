$(document).ready(function () {

        var monthNames = [ "Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara" ]; 
        var dayNames= ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
        var newDate = new Date();
        newDate.setDate(newDate.getDate());
        $('.day').html(dayNames[newDate.getDay()]);
        $('.month-count').html(newDate.getDate());
        $('.month-name').html(monthNames[newDate.getMonth()]);
        $('.year').html(newDate.getFullYear());
        setInterval( function() {
            var minutes = new Date().getMinutes();
            $(".minute").html(( minutes < 10 ? "0" : "" ) + minutes);
        },1000);
        setInterval( function() {
            var hours = new Date().getHours();
            $(".hour").html(( hours < 10 ? "0" : "" ) + hours);
        }, 1000);   
    
    
    
    
    
    $(window).on("ready resize",function(){
        
        var $that = $(".field-main");
        var $top = Math.floor($(this).height()/2 - $that.outerHeight()/2);
        var $left = Math.floor($(this).width()/2 - $that.outerWidth()/2);
        
        $that.css({
            "top": $top,
            "left": $left
        });
        
        $(".status").text($left);
        
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});
