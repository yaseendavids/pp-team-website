$(document).ready(function(){

    var userUrl = "https://api.mlab.com/api/1/databases/peach-users/collections/users?apiKey=s9Sjlqqdqj-rscZfP8zgevtIyfu3Wfq1";

    var usernameInput = $("input[name=username]");
    var emailInput = $("input[name=email]");
    var passInput = $("input[name=password]");
    var confirmInput = $("input[name=password2]");
    var errorText = $(".user_error");
    var submitBtn = $("button[type=submit]");

    $.ajax({
        url: userUrl,
        method: "GET",
        success: function(users){

            usernames = [];
            emails = [];

            for (let i = 0; i < users.length; i++){
                usernames.push(users[i].username);
                emails.push(users[i].email);
                checkUsernames(usernames);
                checkEmail(emails);
            }
        }
    })

    function checkUsernames(usernames){
        $(usernameInput).on('keyup', () =>{
            for (let i2 = 0; i2 < usernames.length; i2++){
                if ($(usernameInput).val() == usernames[i2]){
                    $(".user_error").text("Username already in use");
                    $(".fa-user").css("color", "red");
                    $(submitBtn).prop('disabled', true);
                    $(submitBtn).css('background', '#cecece');
                    return;
                }
                else if ($(usernameInput).val() == null || $(usernameInput).val() == ""){
                    $(".fa-user").css("color", "black");
                }
                else{
                    $(".user_error").text("");
                    $(".fa-user").css("color", "green");
                    $(submitBtn).prop('disabled', false);
                    $(submitBtn).css('background', '#57b846');
                }
            }
        })
    }

    function checkEmail(emails){
        $(emailInput).on('keyup', () =>{
            for (let i3 = 0; i3 < emails.length; i3++){
                if ($(emailInput).val() == emails[i3]){
                    $(".email_error").text("Email already in use");
                    $(".fa-envelope").css("color", "red");
                    $(submitBtn).prop('disabled', true);
                    $(submitBtn).css('background', '#cecece');
                    return;
                }
                else if ($(emailInput).val() == null || $(emailInput).val() == ""){
                    $(".fa-envelope").css("color", "black");
                }
                else{
                    $(".email_error").text("");
                    $(".fa-envelope").css("color", "green");
                    $(submitBtn).prop('disabled', false);
                    $(submitBtn).css('background', '#57b846');
                }
            }
        })
    }

    $(confirmInput).on('keyup', () => {
        if ($(passInput).val() != $(confirmInput).val()){
            $(".pass_error").text("Passwords do not match");
            $(".fa-lock").css("color", "red");
            $(submitBtn).prop('disabled', true);
            $(submitBtn).css('background', '#cecece');
            return;
        }
        else if ($(passInput).val() == null || $(passInput).val() == ""){
            $(".fa-lock").css("color", "black");
        }
        else{
            $(".pass_error").text("");
            $(".fa-lock").css("color", "green");
            $(submitBtn).prop('disabled', false);
            $(submitBtn).css('background', '#57b846');
        }
    })
    
})