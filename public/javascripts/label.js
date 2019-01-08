$(document).ready(function(){

    $(".label_main").hover(function(){

        var labelNo = $(this).data("label");

        if ($(".the_label").hasClass(labelNo)){
            var left = $(this).offset().left + 30;
            var top = $(this).offset().top - 5;
            $("."+labelNo).fadeIn();
            $(".the_label").css("left", left);
            $(".the_label").css("top", top);
        }

    }, function(){
        $(".the_label").fadeOut();
    })

})