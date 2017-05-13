$(function(){        

        $(document).on("scroll", function(){
            var desplazamientoActual = $(document).scrollTop();
            var controlArriba = $("#irarriba");
            console.log("Estoy en " , desplazamientoActual); 
            if(desplazamientoActual > 100 && controlArriba.css("display") == "none"){
                controlArriba.fadeIn(500);
            }
            if(desplazamientoActual < 100 && controlArriba.css("display") == "block"){
                controlArriba.fadeOut(500);
            }
        });

        $("#irarriba a").on("click", function(e){
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 1000); 
        });
});

$("#mm").click(function() {
    $('html, body').animate({
        scrollTop: $("#Main").offset().top
    }, 2000);
});
$("#tt").click(function() {
    $('html, body').animate({
        scrollTop: $("#TAO").offset().top
    }, 2000);
});
$("#oo").click(function() {
    $('html, body').animate({
        scrollTop: $("#Our").offset().top
    }, 2000);
});
$("#aa").click(function() {
    $('html, body').animate({
        scrollTop: $("#About").offset().top
    }, 2000);
});
$("#dd").click(function() {
    $('html, body').animate({
        scrollTop: $("#Download").offset().top
    }, 2000);
});