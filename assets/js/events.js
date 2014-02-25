function param(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function loadEvents() {
  var committee = param('committee');
  if('committee' === ''){
    committee = 0;
  }
  var text = $("#" + committee + " a").text();
  document.title = text + " Events - Society of Software Engineers";
  $.getJSON('https://sse.se.rit.edu/events.json', function(data){
    var source   = $("#event-template").html();
    var template = Handlebars.compile(source);
    var events = $('#events');
    for(var i = 0; i < data.length; i++){
      var obj = data[i];
      var html = template(obj);
      events.append(html);
    }
    filter(parseInt(committee));
  });
}

function loadUpcomingEvents() {
  $.getJSON('https://sse.se.rit.edu/events.json', function(data){
    var source   = $("#event-template").html();
    var template = Handlebars.compile(source);
    var events = $('#eventshighlight');
    var max = 5;
    if(data.length < max){
      max = data.length;
    }
    for(var i = 0; i < max; i++){
      var obj = data[i];
      var html = template(obj);
      events.append(html);
    }
  });
}

function loadEvent(id) {
  $.getJSON('https://sse.se.rit.edu/events/'+ id + '.json', function(data){
    var source   = $("#event-template").html();
    var template = Handlebars.compile(source);
    $('#event').append(template(data));
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

Handlebars.registerHelper("checkEmpty", function(string, alternate){
  if(string === ''){
    return alternate;
  }
  return string;
});

function filterAndUpdateState(committee){
  filter(committee);
  var text = $("#" + committee + " a").text();
  History.pushState({state:committee}, text + " Events - Society of Software Engineers", "?committee=" + committee);
}

function filter(committee){
  $('.active-entry').toggleClass('active-entry inactive-entry');
  if(committee === 0 || isNaN(committee) ){
    $('#0').toggleClass('active-entry inactive-entry');
    $('.event-preview-wrapper').each(function(index, element){
      element.style.display = 'block';
    });
  } else {
    $('#' + committee).toggleClass('active-entry inactive-entry');
    $('.event-preview-wrapper').each(function(index, element){
      if($(element).hasClass(committee)){
        element.style.display='block';
      }else{
        element.style.display='none';
      }
    });
  }
}

