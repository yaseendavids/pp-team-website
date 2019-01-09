$(document).ready(function(){

    $(".alert").on('click', function(){
        $(".alert").animate({marginLeft: "+600px", opacity: "0"})
        $(this).fadeOut();
    });
    
    setTimeout(function(){
        $(".alert").animate({marginLeft: "+600px", opacity: "0"})
        $(".alert").fadeOut();
    },3000);


    // ******************** PROFILE BUTTON ********************
    $(".profile_icon").on('click', function(){
        if ($(".profile_dropdown").css('display') == 'none'){
            $(".profile_dropdown").fadeIn("fast");
        }
        else{
            $(".profile_dropdown").fadeOut("fast");
        }
    });
    $(".container").on('click', function(){
        if ($(".profile_dropdown").css('opacity') == '1'){
            $(".profile_dropdown").fadeOut("fast");
        }
        else{
            return
        }
    });

    $(".disabled").on('click', function(){
        $(".loading_wrapper").fadeIn();
    })

});