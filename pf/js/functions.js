function animate_super_circle()
{
    $("#service_1 .super-circle2").addClass("hovered1");
    $("#service_1 .super-circle1").addClass("hovered2");
    setTimeout(function () {
        $("#service_1 .super-circle2").removeClass("hovered1");
        $("#service_1 .super-circle1").removeClass("hovered2");    
        $("#service_2 .super-circle2").addClass("hovered1");
        $("#service_2 .super-circle1").addClass("hovered2");    
        setTimeout(function () {
            $("#service_2 .super-circle2").removeClass("hovered1");
            $("#service_2 .super-circle1").removeClass("hovered2");   
            $("#service_3 .super-circle3").addClass("hovered1");
            $("#service_3 .super-circle4").addClass("hovered2");        
            setTimeout(function () {
                $("#service_3 .super-circle3").removeClass("hovered1");
                $("#service_3 .super-circle4").removeClass("hovered2");   
                $("#service_4 .super-circle3").addClass("hovered1");
                $("#service_4 .super-circle4").addClass("hovered2");        
                setTimeout(function () {
                    $("#service_4 .super-circle3").removeClass("hovered1");
                    $("#service_4 .super-circle4").removeClass("hovered2");   
                    setTimeout(animate_super_circle, 1000);
                }, 2000);
            }, 2000);             
        }, 2000);        
    }, 2000);         
}

var x = 1;

function animate_small_super_circle()
{
	
	$(".super-circle-small .super-circle-small1").removeClass("small-hovered1");
	$(".super-circle-small .super-circle-small2").removeClass("small-hovered2");
	$(".super-circle-small .hoverimg").removeClass("hoverimg");  
	$(".super-circle-small").removeClass("txtcont");
	
	$("#smallimg"+ x +" .super-circle-small1").addClass("small-hovered1");
	$("#smallimg"+ x +" .super-circle-small2").addClass("small-hovered2");
	$("#smallimg"+ x +" .images"+ x).addClass("hoverimg");
	$("#smallimg"+ x).addClass("txtcont");
	
	if(x<10) x++;
	else x=1;
}

$(document).ready(function() {

	animate_small_super_circle();
	var intervalo = setInterval(animate_small_super_circle, 2000);
  
	$(document).on('mouseover','.super-circle-small',function(){
		clearInterval(intervalo);
		$(".super-circle-small .super-circle-small1").removeClass("small-hovered1");
		$(".super-circle-small .super-circle-small2").removeClass("small-hovered2");
		$(".super-circle-small .hoverimg").removeClass("hoverimg");  
		$(".super-circle-small").removeClass("txtcont");
	});
	
	$(document).on('mouseout','.super-circle-small',function(){
		x = x>1 ? x-1 : 1;
		animate_small_super_circle();
		intervalo = setInterval(animate_small_super_circle, 2000);
	});
  
});
