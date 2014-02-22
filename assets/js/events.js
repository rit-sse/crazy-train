function loadEvents() {
  $.getJSON('https://sse.se.rit.edu/events.json', function(data){
    var source   = $("#event-template").html();
    var template = Handlebars.compile(source);
    var events = $('#events');
    for(var i = 0; i < data.length; i++){
      var obj = data[i];
      var html = template(obj);
      events.append(html);
    }
  });
}

var DateFormats = {
   date: 'dddd M/DD',
   time: 'h:mm a'
};

Handlebars.registerHelper("formatDateRange", function(startTime, endTime) {
  var date = 'dddd M/DD';
  var time = 'h:mm a';
  var dateString = moment(startTime).format(date + ', ' + time);
  if(moment(startTime).format(date) !== moment(endTime).format(date)){
    dateString += ' - ' + moment(endTime).format(date + ', ' + time);
  } else {
    dateString += ' - ' + moment(endTime).format(time);
  }
  return dateString;
});

