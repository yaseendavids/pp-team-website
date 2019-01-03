$(document).ready(function(){

  var dataURL = 'https://api.mlab.com/api/1/databases/peach-users/collections/calendars?apiKey=s9Sjlqqdqj-rscZfP8zgevtIyfu3Wfq1';

  var theDate = new Date();
  var theDay = theDate.getDate();
  var theMonth = theDate.getMonth() + 1;
  var theYear = theDate.getFullYear();

  console.log(theYear +"-" + theMonth + "-" + theDay)
  var calendarYearDate = theYear +"-" + theMonth + "-" + theDay

  // ***************** START MAIN CALENDER WITH DATA FROM DB *****************
  $.ajax({
    url: dataURL,
    method: "GET",
    dataType: 'json',
    success: function(result){
      
      // *************** CALENDAR ***************
      $('#calendar').fullCalendar({
        defaultDate: calendarYearDate,
        editable: true,
        eventLimit: true,
        events: result,
        selectable: true,
        businessHours: {
          dow: [ 1, 2, 3, 4, 5 ],
          start: '9:00',
          end: '18:00',
        },
        // *************** EVENT SELECT ***************
        eventSelect: function(){
          alert()
        },
        // *************** EVENT CLICK ***************
        eventClick: function(calEvent, jsEvent, view) {

          var sources = calEvent.source.rawEventDefs;

          for (let i = 0; i < sources.length; i++){
            if (sources[i].title == calEvent.title){

              var dateID  = sources[i]._id.$oid;
              $(".modal_3_btn").click();

              $(".modal_delete_btn").attr("data-id", dateID);
              $(".modal_edit_btn").attr("data-id", dateID);

            }
          }
          // change the border color just for fun
          $(this).css('border-color', 'red');

        },
        // *************** EVENT DROP ***************
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

  $(".modal_delete_btn").on('click', () =>{

    var eventID = $(".modal_delete_btn").attr("data-id");

    var eventURL = 'https://api.mlab.com/api/1/databases/peach-users/collections/calendars/'+ eventID +'/?apiKey=s9Sjlqqdqj-rscZfP8zgevtIyfu3Wfq1';
    
    $.ajax({
      url: eventURL,
      method: "DELETE",
      async: true,
		  timeout: 300000,
      // dataType: 'json',
      success: function(result){
        console.log("Calendar event deleted");
        window.location.href = "/calendar"
      }
    })
  });

  $(".modal_edit_btn").on('click', () => {

    $(".close_modal").click();
    $(".modal_4_btn").click();

    var eventID = $('.modal_edit_btn').attr("data-id");
    console.log(eventID)

    var eventURL = 'https://api.mlab.com/api/1/databases/peach-users/collections/calendars/'+ eventID +'/?apiKey=s9Sjlqqdqj-rscZfP8zgevtIyfu3Wfq1';
    
    $.ajax({
      url: eventURL,
      method: "GET",
      // dataType: 'json',
      success: function(result){
        console.log("Calendar event editing");

        console.log(result)

        var title = result.title;
        var fullname = title.split(" - ")[0];
        var reason = title.split(" - ")[1];
        var id = result._id.$oid;

        $("#edit_id").val(id);
        $("#edit_fullname").val(fullname);
        $("#edit_leave").val(reason);
        $("#edit_startdate").val(result.start);
        $("#edit_enddate").val(result.end);
        $("#edit_color").val(result.color);
        
      }
    })

  })

});