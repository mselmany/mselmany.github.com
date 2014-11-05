$(document).ready(function () {    
    
/*
*
*** Sticky sound - fixed on screen...
*
*/   

var offsetElement;
    
$(window).on("click resize scroll",function(e){
    
    var offset = $("body").attr("data-playingoffset");
    
	if( $(window).scrollTop() >= offset ) { //eğer çalan müzik yukarda kalıyorsa
		$(".oneSound.oneSound_ON").children(".forFixedPosition")
            .addClass("_FIXED")
            .css("width",($(".mainField").outerWidth())+"px");
	}else if( ($(window).scrollTop()+$(window).height()-77) <= offset ) { //eger çalan müzik aşağıda kalıyorsa
		$(".oneSound.oneSound_ON").children(".forFixedPosition")
            .addClass("_FIXED2")
            .css("width",($(".mainField").outerWidth())+"px");
	}else{ // eğer çalan müzik ekranda zaten görünüyorsa
		$(".oneSound.oneSound_ON").children(".forFixedPosition")
            .removeClass("_FIXED _FIXED2")
            .css("width","100%");
	}
    
});
    
/*
*
*** .oneSound click functions...
*
*/
    
$("ul.soundField").on("click","li.oneSound",function(){
    var that = $(this);
    offsetElement = $(this);
    $(that).addClass("oneSound_ON").siblings("li.oneSound").removeClass("oneSound_ON");
    $(that).siblings("li.oneSound").children(".forFixedPosition")
        .removeClass("_FIXED _FIXED2")
        .css("width","100%");
    var offset = $(that).offset();
    $("body").attr("data-playingoffset",offset.top);
});   

/*
*
*** slideshowField and button fonctions
*
*/     
	
$(".slideshow.slideshow_ON").css("display","block");
	
$(".headerField .slider").bind("click",function(){
	    
    var that=$(this);
    
    if( $(that).hasClass("prev") && !$(".slideshow:first-of-type").hasClass("slideshow_ON") ){
        $(".slideshow.slideshow_ON").removeClass("slideshow_ON").fadeOut(1000).prev(".slideshow").addClass("slideshow_ON").fadeIn(1000);        
    }else if( $(that).hasClass("next") && !$(".slideshow:last-of-type").hasClass("slideshow_ON") ){
        $(".slideshow.slideshow_ON").removeClass("slideshow_ON").fadeOut(1000).next(".slideshow").addClass("slideshow_ON").fadeIn(1000);
    }
    
    if( $(".slideshow:first-of-type").hasClass("slideshow_ON") ){
        $(".headerField .slider.prev").addClass("button_OFF");
    }else if( $(".slideshow:last-of-type").hasClass("slideshow_ON") ){
        $(".headerField .slider.next").addClass("button_OFF");
    }else{
        $(".headerField .slider").removeClass("button_OFF");
    }
    
});
	               
//$(".status").text();
    
});