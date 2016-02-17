"use strict";
//TODO: Better path, solution?
var ajaxPasswordManager = "http://localhost/ownpassword/js/ajax/ajaxPasswordManager.php";
var ajaxAuthenticationManager = "http://localhost/ownpassword/js/ajax/ajaxAuthenticationManager.php";
//REGISTRATION
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

$(document).ready(function() {
	$('.form-register-show').click(function() {
		$(".register-container").show();
		$(".login-container").hide();
	});
});
$(document).ready(function() {
	$('.form-login-show').click(function() {
		$(".login-container").show();
		$(".register-container").hide();

	});
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

//DASHBOARD

var passwordHideContent = "****";

//get all passworts in the folder
function getPasswords(folder) {
	$(".folder").removeClass("active");
	folder.addClass("active");
	showPasswordList(folder.attr("token-id"));
}

function showPasswordList(folderToken) {
	$.ajax({
		method : "POST",
		url : ajaxPasswordManager,
		data : {
			action : "getPasswords",
			folderToken : folderToken,
			userToken : $("#user-token").val()
		}
	}).done(function(jsonObj) {
		$("#password-content").html("");
		var obj = JSON.parse(jsonObj);
		for (var i = 0; i < obj.length; i++) {
			$("#password-content").append('<tr id="passwordParentInChange"><td>' + obj[i].title + '</td><td>' + obj[i].username + '</td><td id="passwordInChange"><span class="password-content">' + passwordHideContent + '</span> <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></td><td id="passwordEditInChange"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></td></tr>');
			$('#passwordInChange').addClass("password").click(function() {

				showPassword($(this));
			}).removeAttr('id');
			$('#passwordParentInChange').attr("password-token-id", obj[i].token_id).removeAttr('id');
			$('#passwordEditInChange').click(function() {

				updatePassword($(this));
			}).removeAttr('id');
		}
	});
}

//show the decrypted password
function showPassword(callingItem) {
	getPasswordData(callingItem, function(obj) {

		callingItem.find(".password-content").html(obj.password);

		//hide password after 5 sec
		setTimeout(function() {
			callingItem.find(".password-content").html(passwordHideContent);
		}, 5000);
	});
}

//get Passwordata
function getPasswordData(callingItem, calledFunction) {
	$.ajax({
		method : "POST",
		url : ajaxPasswordManager,
		data : {
			action : "getPasswordData",
			userToken : $("#user-token").val(),
			passwordToken : callingItem.parent().attr("password-token-id")
		}
	}).done(function(jsonObj) {
		var obj = JSON.parse(jsonObj);
		calledFunction(obj);
	});
}

//updates the passworddata
function updatePassword(callingItem) {
	$('.btn-passwordEdit-delete').show();
	$('.btn-passwordEdit-save').unbind("click");
	$('.btn-passwordEdit-delete').unbind("click");
	getPasswordData(callingItem, function(obj) {
		$('#passwordEditModal').modal('show');
		$('#passwordEdit-title').val(obj.title);
		$('#passwordEdit-username').val(obj.username);
		$('#passwordEdit-password').val(obj.password);
		$('#passwordEdit-token').val(callingItem.parent().attr("password-token-id"));

		//WHEN CLICK ON SAVE
		$('.btn-passwordEdit-save').click(function() {
			$.ajax({
				method : "POST",
				url : ajaxPasswordManager,
				data : {
					action : "updatePassword",
					userToken : $("#user-token").val(),
					passwordToken : $('#passwordEdit-token').val(),
					title : $('#passwordEdit-title').val(),
					username : $('#passwordEdit-username').val(),
					password : $('#passwordEdit-password').val()
				}
			}).done(function(jsonObj) {
				console.log("EDITED PASSWORD");
				//update PasswordList after update
				getPasswords($('.folder.active'));
				$('#passwordEditModal').modal('hide');
			});

		});
		//WHEN CLICK ON DELETE
		$('.btn-passwordEdit-delete').click(function() {
			$.ajax({
				method : "POST",
				url : ajaxPasswordManager,
				data : {
					action : "deletePassword",
					userToken : $("#user-token").val(),
					passwordToken : $('#passwordEdit-token').val()
				}
			}).done(function(jsonObj) {
				console.log("DELETED PASSWORD");
				//update PasswordList after update
				getPasswords($('.folder.active'));
				$('#passwordEditModal').modal('hide');
			});

		});

	});

}

//create a password
function createPassword() {
	$('.btn-passwordEdit-delete').hide();
	$('#passwordEditModal').modal('show');
	$('#passwordEdit-title').val("");
	$('#passwordEdit-username').val("");
	$('#passwordEdit-password').val("");
	$('#passwordEdit-token').val("");
	//REMOVE OLD CLICK LISTENER
	$('.btn-passwordEdit-save').unbind("click");
	//WHEN CLICK ON SAVE
	$('.btn-passwordEdit-save').click(function() {
		$.ajax({
			method : "POST",
			url : ajaxPasswordManager,
			data : {
				action : "createPassword",
				userToken : $("#user-token").val(),
				title : $('#passwordEdit-title').val(),
				folderToken : $('.folder.active').attr("token-id"),
				username : $('#passwordEdit-username').val(),
				password : $('#passwordEdit-password').val()
			}
		}).done(function(jsonObj) {
			//update PasswordList after update
			console.log("ADDED PASSWORDs");
			getPasswords($('.folder.active'));
			$('#passwordEditModal').modal('hide');
		});

	});

}

//get all Folders
function getFolders(selectedToken) {
	$.ajax({
		method : "POST",
		url : ajaxPasswordManager,
		data : {
			action : "getFolders",
			userToken : $("#user-token").val()
		}
	}).done(function(jsonObj) {
		$("#folders").html("");
		var obj = JSON.parse(jsonObj);
		for (var i = 0; i < obj.length; i++) {
			//$("#folders").append('<li class="folder" onclick="getPasswords(\'' + obj[i].token_id + '\')">' + obj[i].name + '</li>');
			$('<li>' + obj[i].name + '</li>').appendTo("#folders").addClass("folder").attr("token-id", obj[i].token_id).click(function() {

				getPasswords($(this));
			});
		}
		if (selectedToken) {
			$("[token-id=" + selectedToken + "]").addClass("active");
		}

	});
}

//create a Folder
function createFolder() {

	$('.btn-folderEdit-delete').hide();
	$('#folderEditModal').modal('show');
	$('#folderEdit-title').val("");
	$('#folderEdit-token').val("");
	//REMOVE OLD CLICK LISTENER
	$('.btn-folderEdit-save').unbind("click");
	//WHEN CLICK ON SAVE
	$('.btn-folderEdit-save').click(function() {
		$.ajax({
			method : "POST",
			url : ajaxPasswordManager,
			data : {
				action : "createFolder",
				userToken : $("#user-token").val(),
				title : $('#folderEdit-title').val()
			}
		}).done(function(jsonObj) {
			//update PasswordList after update
			console.log("ADDED Folder");
			console.log(jsonObj);
			getFolders(jsonObj);
			$('#folderEditModal').modal('hide');
		});

	});
}

//Updates the Folder Structure
function updateFolder() {
	$('.btn-folderEdit-delete').show();
	$('#folderEditModal').modal('show');
	$('#folderEdit-title').val($('.folder.active').html());
	$('#folderEdit-token').val($('.folder.active').attr("token-id"));
	//REMOVE OLD CLICK LISTENER
	$('.btn-folderEdit-save').unbind("click");
	$('.btn-folderEdit-delete').unbind("click");
	//WHEN CLICK ON SAVE
	$('.btn-folderEdit-save').click(function() {
		$.ajax({
			method : "POST",
			url : ajaxPasswordManager,
			data : {
				action : "updateFolder",
				userToken : $("#user-token").val(),
				folderToken : $("#folderEdit-token").val(),
				title : $('#folderEdit-title').val()
			}
		}).done(function(jsonObj) {
			console.log(jsonObj);
			//update PasswordList after update
			console.log("UPDATED Folder");

			var tokenId = $("#folderEdit-token").val();
			getFolders(tokenId);

			$('#folderEditModal').modal('hide');
		});
	});
	$('.btn-folderEdit-delete').click(function() {
		$.ajax({
			method : "POST",
			url : ajaxPasswordManager,
			data : {
				action : "deleteFolder",
				userToken : $("#user-token").val(),
				folderToken : $("#folderEdit-token").val()
			}
		}).done(function(jsonObj) {
			//update PasswordList after update
			console.log("DELETED Folder");
			getFoldersWithDefault();
			$("li[token-id=" + $("#folderEdit-token").val() + "]").addClass("active");
			$('#folderEditModal').modal('hide');
		});
	});
}

//sets the gighest folder active
function getFoldersWithDefault() {
	$.ajax({
		method : "POST",
		url : ajaxPasswordManager,
		data : {
			action : "getDefaultFolder",
			userToken : $("#user-token").val()
		}
	}).done(function(jsonObj) {
		//update PasswordList after update
		if (jsonObj != 'null') {
			var obj = JSON.parse(jsonObj);
			getFolders(obj.token_id);

			//LOAD PASSWORDS FROM THE FOLDER
			showPasswordList(obj.token_id);
		}

	});
}


$(document).ready(function() {
	//TODO: better path
	if (top.location.pathname === '/ownpassword/site/dashboard') {
		getFoldersWithDefault();
	}

});
