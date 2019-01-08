$(document).ready(function(){

  var theDate = new Date();
  var theDay = theDate.getDate();
  var theMonth = theDate.getMonth() + 1;
  var theYear = theDate.getFullYear();

  console.log(theYear +"-" + theMonth + "-" + theDay)
  var calendarYearDate = theYear +"-" + theMonth + "-" + theDay

  // ***************** START MAIN CALENDER WITH DATA FROM DB *****************
  $.ajax({
    url: '/calendar-data',
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

              var dateID  = sources[i]._id;
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
            var newDate = {
              "title": event.title,
              "start": event.start.format(),
              "end": event.end.format(),
              "color": event.color
            };

            var id = event._id;
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

    $.ajax({
      url: '/calendar-date-update/' + id,
      method: "POST",
      contentType: "application/json",
      data: jsonDate,
      success: function(data){
        alert(data);
      },
      error: function(err){
        alert(err)
      }
    })

  }

  $(".modal_delete_btn").on('click', () =>{

    var id = $(".modal_delete_btn").attr("data-id");
    
    $.ajax({
      url: '/delete-calendar-date/' + id,
      method: "POST",
      success: function(result){
        console.log("Success");
        window.location.href = "/calendar";
      }
    })
  });

  $(".modal_edit_btn").on('click', () => {

    $(".close_modal").click();
    $(".modal_4_btn").click();

    var id = $('.modal_edit_btn').attr("data-id");
    
    $.ajax({
      url: '/get-calendar-date/' + id,
      method: "GET",
      success: function(result){

        console.log(result)

        var title = result.title;
        var fullname = title.split(" - ")[0];
        var reason = title.split(" - ")[1];
        var id = result._id;
        var startDate = result.start;
        var endDate = result.end;

        $("#edit_id").val(id);
        $("#edit_fullname").val(fullname);
        $("#edit_leave").val(reason);
        $("#edit_startdate").val(startDate);
        $("#edit_enddate").val(endDate);
        $("#edit_color").val(result.color);
        
      }
    })

  })

});