$(document).ready(function () {

$.easing.mselmanyBounce = function (x, t, b, c, d) {
	var ts = (t /= d) * t;
	var tc = ts * t;
	return b + c * (-8.1975 * tc * ts + 29.4425 * ts * ts + -36.69 * tc + 16.795 * ts + -0.35 * t);
}

var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
var dayNames= [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ];

var newDate = new Date();
newDate.setDate(newDate.getDate());
	
setInterval( function() {
	var hours = new Date().getHours();
	$(".hour").html(( hours < 10 ? "0" : "" ) + hours);
    var seconds = new Date().getSeconds();
	$(".second").html(( seconds < 10 ? "0" : "" ) + seconds);
    var minutes = new Date().getMinutes();
	$(".minute").html(( minutes < 10 ? "0" : "" ) + minutes);
    
    $(".month span,.month2 span").text(monthNames[newDate.getMonth()]);
    $(".date span,.date2 span").text(newDate.getDate());
    $(".day span,.day2 span").text(dayNames[newDate.getDay()]);
    $(".year span").html(newDate.getFullYear());
}, 1000);	

$(".outer").on({
    mousedown:function(){
        $(".dribbble").css("opacity","1");
    },
    mouseup:function(){
        $(".dribbble").css("opacity","0");
    }
});





});