$(document).ready( function() {

    var tableRow;
    //  ******************************* DELETE *******************************
    // onclick dlt_user_btn , gets ID and sends it to modal
    $(".dlt_user_btn").on("click", function(){
        var userID = $(this).attr("data-id");
        $(".confirm_dlt_user").attr("data-id", userID);
        tableRow = $(this).closest(".table_row")
    })

    // AJAX function to delete user
    $(".confirm_dlt_user").on('click', function() {

        var userID = $(this).attr("data-id");

        if ($(".table_row").attr("data-id") == userID){
            $(tableRow).remove();
            $(".close_modal").click();
        }

        $.ajax({
            url: '/delete-user/' + userID,
            method: "DELETE",
            success: function(data) {
                console.log("User deleted");
            },
            error: function(err){
                console.log(err)
            }
        })
    });


    //  ******************************* RESET *******************************
    // onclick new_password_btn , gets ID and sends it to modal
    $(".new_password_btn").on('click', function(){
        var userID = $(this).attr("data-id");
        $(".confirm_reset_btn").attr("data-id", userID);
    })

    // AJAX function to reset password
    $(".confirm_reset_btn").on('click', function() {

        var userID = $(this).attr("data-id");
        $(".close_modal").click();

        $.ajax({
            url: '/reset-user/' + userID,
            method: "POST",
            success: function(data) {
                console.log("User deleted");
            },
            error: function(err){
                console.log(err)
            }
        })
    });

})