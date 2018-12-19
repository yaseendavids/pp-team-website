$(document).ready(function(){

    $(".modal_btn").on('click', function(){

        modalNo = $(this).data("modal");

        if ($(".modal_wrapper").hasClass(modalNo)){
            modalClass = "." + modalNo
            $(modalClass).fadeIn("fast");
        }
    })

    $(".close_modal").on('click', function(){
        $(modalClass).fadeOut("fast");
    })

})