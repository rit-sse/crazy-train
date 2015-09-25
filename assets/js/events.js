function param(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function loadUpcomingEvents() {
  $.getJSON('/api/v1/events?perPage=5', function(res){
    var template = Handlebars.templates.upcoming;
    var events = $('#eventshighlight');
    var max = 5;
    if(res.data.length < max){
      max = res.data.length;
    }
    for(var i = 0; i < max; i++){
      var obj = res.data[i];
      var html = template(obj);
      events.append(html);
    }
  });
}

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
  History.pushState({state:committee}, text + " Events - Society of Software Engineers", "?filter=" + text);
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

