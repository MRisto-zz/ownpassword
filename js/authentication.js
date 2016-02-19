"use strict";
var scripts = document.getElementsByTagName('script');
var path = scripts[scripts.length-1].src.split('?')[0];
var scriptPath = path.split('/').slice(0, -1).join('/') + '/';

var authenticationManager = scriptPath + "ajax/AuthenticationManager.php";

/*****************
 * Authentication
 ****************/

/* Initialize the Popover */
function initPopover() {
	$('[data-toggle="popover"]').popover({
		trigger : 'none',
		container : 'body'
	});
}

/*REGISTRATION AND LOGIN*/

$('.message a').click(function() {
	$('form').animate({
		height : "toggle",
		opacity : "toggle"
	}, "slow");
	$('.messages').html('');
});

function changeGlyphyconState(reference, state) {
	console.log("called");
	reference.removeClass("glyphicon glyphicon-remove glyphicon-ok form-bad form-good");
	if (state) {
		reference.addClass("glyphicon glyphicon-ok form-good");
	} else {
		reference.addClass("glyphicon glyphicon-remove form-bad");
	}
}

//username check
$("#reg-username").on('input', function() {
	$.ajax({
		method : "POST",
		url : authenticationManager,
		data : {
			action : "isUsernameUnique",
			username : $('#reg-username').val()
		}
	}).done(function(jsonObj) {
		//need better output
		console.log(jsonObj);
			
			changeGlyphyconState($('.reg-username'), jsonObj);
		
	});

}).focusout(function() {
	console.log("focusout");
}).focusin(function() {
	console.log("focusin");
}); 