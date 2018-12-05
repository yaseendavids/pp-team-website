$(document).ready(function(){

    $(".alert").on('click', function(){
        $(this).fadeOut();
    });
    
    setTimeout(function(){
        $(".alert").fadeOut();
    },3000);

});