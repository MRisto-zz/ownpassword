"use strict";
var scripts = document.getElementsByTagName('script');
var path = scripts[scripts.length-1].src.split('?')[0];
// remove any ?query
var scriptPath = path.split('/').slice(0, -1).join('/') + '/';

var ajaxAuthenticationManager = scriptPath + "ajax/AuthenticationManager.php";

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

var userNameLength = false;
var userNameUnique = false;
var userNameCheck = false;
var emailUniqe = false;
var emailCheck = false;
var passLength = false;
var passCheck = false;
var passEqual = false;

function changeGlyphyconState(reference, state) {
	reference.removeClass("glyphicon glyphicon-remove glyphicon-ok form-bad form-good");
	if (state) {
		reference.addClass("glyphicon glyphicon-ok form-good");
	} else {
		reference.addClass("glyphicon glyphicon-remove form-bad");
	}
}

function checkIfAllValid() {

	if (userNameLength && userNameCheck && userNameUnique && emailCheck && emailUniqe && passLength && passCheck && passEqual) {
		$('#register-button').prop('disabled', false);
	} else {
		$('#register-button').prop('disabled', true);
	}
}

/** INPUT REGISTRATION FIELDS CHECK */

$("#reg-username").on('input', function() {

	var username = $('#reg-username').val();
	var regUsername = $('.reg-username');

	$.ajax({
		method : "POST",
		url : ajaxAuthenticationManager,
		data : {
			action : "checkUserValid",
			username : username
		}
	}).done(function(jsonObj) {
		//need better output
		console.log(jsonObj);
		var obj = JSON.parse(jsonObj);

		userNameCheck = obj.regex;
		if (!userNameCheck) {
			var warnCheck = "Username darf keine Sonderzeichen enthalten! <br><br>";
		}

		userNameLength = obj.length;
		if (!userNameLength) {
			var warnLength = "Username muss min. 4 Zeichen lang sein! <br><br>";
		}

		userNameUnique = obj.unique;
		if (!userNameUnique) {
			var warnUniqe = "Username ist bereits vorhanden! <br><br>";
		}

		checkIfAllValid();

		if (userNameCheck && userNameLength && userNameUnique) {
			changeGlyphyconState(regUsername, true);
			$(".reg-username").popover('destroy');
		} else {
			changeGlyphyconState(regUsername, false);
			$('[rel="popover2"]').popover('destroy');
			$('[rel="popover3"]').popover('destroy');
			$('[rel="popover4"]').popover('destroy');
			initPopover();
			$('[rel="popover1"]').popover('show');
			$('.popover-title').html(' Username Warnung');

			if (!warnCheck) {
				warnCheck = " ";
			}
			if (!warnLength) {
				warnLength = " ";
			}
			if (!warnUniqe) {
				warnUniqe = " ";
			}

			$('.popover-content').html(warnCheck + warnLength + warnUniqe);
		}

	}).fail(function() {
		console.log("fail");

	}).always(function() {

	});
});

$("#reg-password").on('input', function() {
	var password = $('#reg-password').val();
	var lengthValid = $('.reg-password');

	$.ajax({
		method : "POST",
		url : ajaxAuthenticationManager,
		data : {
			action : "checkPasswordValid",
			password : password
		}
	}).done(function(jsonObj) {
		//need better output
		var obj = JSON.parse(jsonObj);

		passLength = obj.length;
		if (!passLength) {
			var warnLength = "Das Passwort muss mindestens 4 Zeichen lang sein! <br><br>";
		}

		passCheck = obj.regex;
		if (!passCheck) {
			var warnCheck = "Das Passwort enthält nicht zulässige Zeichen! <br><br>";
		}

		passLength = obj.length;
		if (!passLength) {
			var warnLength = "Das Passwort muss mindestens 4 Zeichen lang sein! <br><br>";
		}

		passCheck = obj.regex;
		if (!passCheck) {
			var warnCheck = "Das Passwort enthält nicht zulässige Zeichen! <br><br>";
		}
		checkIfAllValid();

		if (passLength && passCheck) {
			changeGlyphyconState(lengthValid, true);
			$(".reg-password").popover('destroy');
		} else {
			changeGlyphyconState(lengthValid, false);
			$('[rel="popover1"]').popover('destroy');
			$('[rel="popover3"]').popover('destroy');
			$('[rel="popover4"]').popover('destroy');
			initPopover();
			$('[rel="popover2"]').popover('show');
			$('.popover-title').html("Passwort Warnung");

			if (!warnCheck) {
				warnCheck = " ";
			}
			if (!warnLength) {
				warnLength = " ";
			}
			$('.popover-content').html(warnLength + warnCheck);
		}
	}).fail(function() {
		console.log("fail");

	}).always(function() {

	});
});

$("#reg-password-repeat").on('input', function() {

	var passFirst = $("#reg-password").val();
	var passSecond = $("#reg-password-repeat").val();
	var passEqualObj = $(".reg-password-repeat");

	passEqual = (passFirst === passSecond);
	if (!passEqual) {
		var warnEqual = "Die Passwörter stimmen nicht überein! <br><br>";
	}

	checkIfAllValid();

	if (passEqual) {
		changeGlyphyconState(passEqualObj, true);
		$(".reg-password-repeat").popover('destroy');
	} else {
		changeGlyphyconState(passEqualObj, false);
		$('[rel="popover1"]').popover('destroy');
		$('[rel="popover2"]').popover('destroy');
		$('[rel="popover4"]').popover('destroy');
		initPopover();
		$('[rel="popover3"]').popover('show');
		$('.popover-title').html("Passwort Warnung");

		if (!warnEqual) {
			warnEqual = " ";
		}

		$('.popover-content').html(warnEqual);
	}
});

$("#reg-email").on('input', function() {

	var email = $('#reg-email').val();
	var emailValid = $('.reg-email');

	$.ajax({
		method : "POST",

		url : ajaxAuthenticationManager,
		data : {
			action : "checkEmailValid",
			email : email
		}
	}).done(function(jsonObj) {
		//need better output
		var obj = JSON.parse(jsonObj);

		emailUniqe = obj.unique;
		if (!emailUniqe) {
			var warnUniqe = "Diese Email ist bereits registriert! <br><br>";
		}

		emailCheck = obj.regex;
		if (!emailCheck) {
			var warnCheck = "Dies ist keine valide Email Adresse! <br><br>";
		}

		emailUniqe = obj.unique;
		if (!emailUniqe) {
			var warnUniqe = "Diese Email ist bereits registriert! <br><br>";
		}

		emailCheck = obj.regex;
		if (!emailCheck) {
			var warnCheck = "Dies ist keine valide Email Adresse! <br><br>";
		}

		checkIfAllValid();

		if (obj.unique && obj.regex) {
			changeGlyphyconState(emailValid, true);
			$(".reg-email").popover('destroy');
		} else {
			changeGlyphyconState(emailValid, false);
			$('[rel="popover1"]').popover('destroy');
			$('[rel="popover2"]').popover('destroy');
			$('[rel="popover3"]').popover('destroy');
			initPopover();
			$('[rel="popover4"]').popover('show');
			$('.popover-title').html("Email Warnung");

			if (!warnUniqe) {
				warnUniqe = " ";
			}
			if (!warnCheck) {
				warnCheck = " ";
			}

			$('.popover-content').html(warnUniqe + warnCheck);
		}

	}).fail(function() {
		console.log("fail");
	}).always(function() {

	});
});

