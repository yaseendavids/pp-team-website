$(document).ready(function(){

    // ******************** GET DATE ********************
    function getDate(){

        var date = new Date();
        var day = date.getDay();
        var theDate = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        var monthsOfYear = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec'];

        dayText = daysOfWeek[day - 1];
        dateText = monthsOfYear[month -1] + ", " + theDate + " " +  year;

        $(".today_day").text(dayText);
        $(".today_date").text(dateText);
    }

    getDate();
     
    // ******************** WEATHER API ********************
    var url = "https://api.apixu.com/v1/current.json?key=8585e574c307411ea26131730180612&q=South Africa/Cape Town&days=6";

    // GET the weather
    $.ajax({
        url: url,
        method: "GET",
        success: function(result){

            console.log(result);

            $(".weather_temp_text").text(result.current.temp_c + "°C");
            $(".weather_condition").text(result.current.condition.text);
            $(".wind_text").text(result.current.wind_kph + " km/h");
            $(".humidity_text").text(result.current.humidity);
            $(".cloud_text").text(result.current.cloud);
            $(".weather_icon").append("<img src=' "+ result.current.condition.icon +"' >");
        }
    })

    $(".notes_btn").on('click', function(){
        $(".modal_wrapper").fadeIn("slow");
        $("#modal_main").css("transform", "scale(1)");
    });
    $(".close_modal").on('click', function(){
        $(".modal_wrapper").fadeOut("slow");
        $("#modal_main").css("transform", "scale(0)");
    });


    // ******************** DELETE NOTE ********************
    $('.delete_note').on('click', function(e){

        // Confirmation message
        let confirmDelete = confirm("Are you sure you want to delete the note ?");

        if (confirmDelete == true){
            // target event
            let target = $(this);
            // Data attrib of button
            const id = target.attr('data-id');
            console.log(id);

            // Ajax function
            $.ajax({
                method: 'DELETE',
                url: '/delete-note/'+id,
                success: function(response){
                    window.location.href="/";
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
        else {
            $(".loading_wrapper").fadeOut("fast");
        }

      });

    if ($(".notes_text").hasClass("visible")){
        console.log("There are tasks")
    }
    else{
        $("#notes_length").text("You have no tasks. To add a task, click the Add Task button.")
    }

    // https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b04c0503ef41477cba37485ef01b7a7b

    // ******************** NEWS API ********************
    var newsURL = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b04c0503ef41477cba37485ef01b7a7b';

    $.ajax({
        url: newsURL,
        method: 'GET',
        success: function(news){
            var articles = news.articles;
            for (let n = 0; n < articles.length; n++){
                $(".news_content").append(
                    '<div class="news_box">' +
                        '<div class="news_image">' +
                            '<a href="' + articles[n].url +'" target="_blank"><img class="news_img" src=" '+ articles[n].urlToImage + ' " alt=""></a>' +
                        '</div>' +
                        '<div class="news_text">' +
                            '<a href="' + articles[n].url + '" target="_blank"><p class="article_title">' + articles[n].title + '</p></a>' +
                            '<p class="article_info">' +
                                '<i class="fas fa-user"></i><span class="article_author">' + articles[n].author + '</span>' +
                                '<i class="fas fa-calendar calendar_icon"></i><span class="article_date">' + articles[n].publishedAt + '</span>' +
                            '</p>' +
                        '</div>' +
                    '</div>'
                );
            }
        }
    })

})