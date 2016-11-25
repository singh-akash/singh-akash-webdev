(function($) {
    //"use strict";

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        //offset: 60
        offset: 80
    });

    $('#topNav').affix({
        offset: {
            top: 200
        }
    });
    
    new WOW().init();
    
    $('a.page-scroll').bind('click', function(event) {
        var $ele = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($ele.attr('href')).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    $('#galleryModal').on('show.bs.modal', function (e) {
       $('#galleryImage').attr("src", $(e.relatedTarget).data("src"));
    });

    setTimeout(function(){
        document.getElementById("text-open").style.visibility = "hidden";
    }, 2000);

     setTimeout(function(){
        document.getElementById("video-background").style.visibility = "hidden";
        //document.getElementById("text-close").style.visibility = "visible";
        document.getElementById("text-open").innerHTML = '<h1 class="bold">Thank you!<br>Scroll Down to know more about me.<br>Have a good day!</h1>';
         document.getElementById("text-open").style.visibility = "visible";
     }, 212000);

})(jQuery);