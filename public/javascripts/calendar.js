$(document).ready(function(){

  var dataURL = 'https://api.mlab.com/api/1/databases/peach-users/collections/calendars?apiKey=s9Sjlqqdqj-rscZfP8zgevtIyfu3Wfq1';

  var theDate = new Date();
  var theDay = theDate.getDate();
  var theMonth = theDate.getMonth() + 1;
  var theYear = theDate.getFullYear();

  console.log(theYear +"-" + theMonth + "-" + theDay)

  // ***************** START MAIN CALENDER WITH DATA FROM DB *****************
  $.ajax({
    url: dataURL,
    method: "GET",
    dataType: 'json',
    success: function(result){
      
      $('#calendar').fullCalendar({
        defaultDate: '2018-12-11',
        editable: true,
        eventLimit: true,
        events: result,
        selectable: true,
        businessHours: {
          dow: [ 1, 2, 3, 4, 5 ],
          start: '9:00',
          end: '18:00',
        },
        // select: function(resource){
        //   console.log(resource);
        // },
        eventSelect: function(){
          alert()
        },
        eventDrop: function(event, delta, revertFunc){
          // alert(event.title + " was dropped on " + event.start.format() + " " + event.end.format());
          var confirmMove = confirm("Are you sure you want to move " + event.title + " to "+ event.start.format() + " - " + event.end.format());

          if (confirmMove == true){
            console.log("CLICKED")
            var newDate = {
              "title": event.title,
              "start": event.start.format(),
              "end": event.end.format(),
              "color": event.color
            };

            var id = event.title;
            var jsonDate = JSON.stringify(newDate, id);
            updateDate(jsonDate, id);
          }
          else{
            revertFunc();
          }
        }
        
      });

      // $('.calendar_days').fullCalendar({
      //   defaultView: 'listWeek',
      //   events: result,
      //  });

    }
  })

  // ***************** UPDATE CALENDER DATE FOR SPECIFIC USER *****************
  function updateDate(jsonDate, id){

    var dateURL = 'https://api.mlab.com/api/1/databases/peach-users/collections/calendars?apiKey=s9Sjlqqdqj-rscZfP8zgevtIyfu3Wfq1&q={"title":"' + id + '"}';

    console.log(jsonDate);
    $.ajax({
      url: dateURL,
      method: "PUT",
      contentType: "application/json",
      data: jsonDate,
      success: function(data){
        alert("Success");
      }
    })

  }

});