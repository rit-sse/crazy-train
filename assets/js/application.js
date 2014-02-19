// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap.min
//= require ace/ace
//= require ace/mode-markdown.js
//= require ace/mode-html.js
//= require ace/theme-textmate
//= require marked
//= require app
//= require events
//= require root
//= require admin/page_edit
//= require bootstrap-datetimepicker.min
//= require events-admin.js


String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

window.onload=function(){
	$('#new_header').carousel('next');
};