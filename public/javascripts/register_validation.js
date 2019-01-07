$(document).ready(function(){

    var userUrl = "https://api.mlab.com/api/1/databases/peach-users/collections/users?apiKey=s9Sjlqqdqj-rscZfP8zgevtIyfu3Wfq1";

    var usernameInput = $("input[name=username]");
    var emailInput = $("input[name=email]");
    var passInput = $("input[name=password]");
    var confirmInput = $("input[name=password2]");
    var errorText = $(".user_error");
    var submitBtn = $("button[type=submit]");
    var registerErrMsg = $("span").text();
    var numbers = ["1","2","3","4","5","6","7","8","9","0"];

    function lockButton(){
        $(submitBtn).prop('disabled', true);
        $(submitBtn).css('background', '#cecece');
    }
    function unlockButton(){
        $(submitBtn).prop('disabled', false);
        $(submitBtn).css('background', '#57b846');
    }

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
                    lockButton();
                    return;
                }
                else if ($(usernameInput).val() == null || $(usernameInput).val() == ""){
                    $(".fa-user").css("color", "black");
                }
                else{
                    $(".user_error").text("");
                    $(".fa-user").css("color", "green");
                    if ($(".user_error").text() == "" && $(".pass_error").text() == "" && $(".email_error").text() == ""){
                        unlockButton();
                    }
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
                    lockButton();
                    return;
                }
                else if ($(emailInput).val() == null || $(emailInput).val() == ""){
                    $(".fa-envelope").css("color", "black");
                }
                else{
                    $(".email_error").text("");
                    $(".fa-envelope").css("color", "green");
                    if ($(".user_error").text() == "" && $(".pass_error").text() == "" && $(".email_error").text() == ""){
                        unlockButton();
                    }
                }
            }
        })
    }

    $(passInput).on('keyup', () => {
        var password = $(passInput).val();

        // for (let i = 0; i < numbers.length; i ++){
            
        // }
        if (numbers.some(substring=>password.includes(substring))){
            $(".pass_valid").text("");
            $(".fa-lock").css("color", "green");
            if ($(".user_error").text() == "" && $(".pass_error").text() == "" && $(".email_error").text() == "" && $(".pass_valid").text() == ""){
                unlockButton();
            }
        }
        else if ($(passInput).val() == null || $(passInput).val() == ""){
            $(".fa-lock").css("color", "black");
        }
        else {
            $(".pass_valid").text("Passwords must contain a number");
            $(".fa-lock").css("color", "red");
            lockButton();
            return;
        }
    })

    $(confirmInput).on('keyup', () => {
        if ($(passInput).val() != $(confirmInput).val()){
            $(".pass_error").text("Passwords do not match");
            $(".fa-lock").css("color", "red");
            lockButton();
            return;
        }
        else if ($(passInput).val() == null || $(passInput).val() == ""){
            $(".fa-lock").css("color", "black");
        }
        else{
            $(".pass_error").text("");
            $(".fa-lock").css("color", "green");
            if ($(".user_error").text() == "" && $(".pass_error").text() == "" && $(".email_error").text() == ""){
                unlockButton();
            }
        }
    })
    
})