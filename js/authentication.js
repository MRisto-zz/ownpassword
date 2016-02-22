"use strict";
var scripts = document.getElementsByTagName('script');
var path = scripts[scripts.length-1].src.split('?')[0];
var scriptPath = path.split('/').slice(0, -1).join('/') + '/';

var authenticationManager = scriptPath + "ajax/AuthenticationManager.php";

/*****************
 * Authentication
 ****************/

/*REGISTRATION AND LOGIN*/

$('.message a').click(function() {
	$('form').animate({
		height : "toggle",
		opacity : "toggle"
	}, "slow");
	$('.messages').html('');
});

function changeGlyphyconState(reference, state) {

	reference.removeClass("glyphicon glyphicon-remove glyphicon-ok form-bad form-good");
	if (state) {
		reference.addClass("glyphicon glyphicon-ok form-good");
	} else {
		reference.addClass("glyphicon glyphicon-remove form-bad");
	}
}

function alertMsg(reference, msg) {
	$(reference).html("");
	$('<div class="alert alert-danger">').appendTo(reference).html(msg);
}

//from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return !re.test(email);
}

//from  http://www.the-art-of-web.com/javascript/validate-password/
function validatePassword(str) {
	var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
	return !re.test(str);
}

//variables containing all variables
var usernameBool = false;
var passwordBool = false;
var emailBool = false;


//username check
$("#reg-username").on('input', function() {
	var userNameValue = $('#reg-username').val();
	$.ajax({
		method : "POST",
		url : authenticationManager,
		data : {
			action : "isUsernameUnique",
			username : userNameValue
		}
	}).done(function(jsonObj) {
		//need better output
		var obj = JSON.parse(jsonObj);
		console.log(obj);
		changeGlyphyconState($('.reg-username-feedback'), false);
		usernameBool = false;
		if (userNameValue.length <= 3) {
			alertMsg($('.reg-username-feedback-content'), "Username ist zu kurz");
		} else if (obj == false) {
			alertMsg($('.reg-username-feedback-content'), "Username ist vergeben");
		} else {
			usernameBool = true;
			changeGlyphyconState($('.reg-username-feedback'), true);
			$('.reg-username-feedback-content').html("");
		}

	});

});

//password check
$("#reg-password").on('input', function() {
	changeGlyphyconState($('.reg-password-feedback'), false);
	console.log(validateEmail($('#reg-password').val()));
	passwordBool = false;
	if (validatePassword($('#reg-password').val())) {
		alertMsg($('.reg-password-feedback-content'), "Passwort muss mindestens 8 Stellen haben, min. 1 Groß-, 1 Kleinbuchstabe und 1 Zahl.");
	} else {
		passwordBool = true;
		changeGlyphyconState($('.reg-password-feedback'), true);
		$('.reg-password-feedback-content').html("");
	}

});

//email check
$("#reg-email").on('input', function() {
	$.ajax({
		method : "POST",
		url : authenticationManager,
		data : {
			action : "isEmailUnique",
			email : $('#reg-email').val()
		}
	}).done(function(jsonObj) {
		//need better output
		var obj = JSON.parse(jsonObj);
		console.log(obj);
		changeGlyphyconState($('.reg-email-feedback'), false);
		console.log(validateEmail($('#reg-email').val()));
		emailBool = false;
		if (validateEmail($('#reg-email').val())) {
			alertMsg($('.reg-email-feedback-content'), "Email ist nicht valide");
		} else if (obj == false) {
			alertMsg($('.reg-email-feedback-content'), "Email ist vergeben");
		} else {
			emailBool = true;
			changeGlyphyconState($('.reg-email-feedback'), true);
			$('.reg-email-feedback-content').html("");
		}

	});

});

//check if all is send

$('.register-form').submit(function(){
	console.log("dumb");
	if(usernameBool && passwordBool && emailBool){
		//nothing just send the damn form
		
	}else{
		//dont send the form 
		 event.preventDefault();
		 //write text
		 alertMsg($('.reg-submit-feedback-content'), "Bitte fülle alle Felder richtig aus!");
	}
	
});
