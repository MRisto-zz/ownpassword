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

/*******************
 **PasswordManager**
 ******************/

function PasswordManager() {
	var self = this;
	//passwordstrength options
	self.passwordstrengthoptions = {};
	self.passwordstrengthoptions.ui = {
		container : "#pwd-container",
		showVerdictsInsideProgressBar : true,
		viewports : {
			progress : ".pwstrength_viewport_progress"
		}
	};
	self.passwordstrengthoptions.common = {
		usernameField : '#passwordEdit-username'
	};

	self.passwordstrengthoptions.rules = {
		activated : {
			wordTwoCharacterClasses : true,
			wordRepetitions : true
		}
	};

	//Variables
	self.ajaxPasswordManagerUrl = scriptPath + "ajax/PasswordManager.php";
	self.passwordHideContent = "****";
	console.log(self.ajaxPasswordManagerUrl);
	self.userToken = $('#user-token').val();

	/*************************
	 *PasswordManager Folders*
	 ************************/

	//get the folders from the database if the argument selectedToken is given, then the folder with the token gets active
	self.getFolders = function(folderToken) {
		$('#createPassword').css('visibility', 'visible');
		$.ajax({
			method : "POST",
			url : self.ajaxPasswordManagerUrl,
			data : {
				action : "getFolders",
				userToken : self.userToken
			}
		}).done(function(jsonObj) {
			$("#folders").html("");
			$('#updateFolder').css('visibility', 'visible');
			var obj = JSON.parse(jsonObj);
			for (var i = 0; i < obj.length; i++) {
				//$("#folders").append('<li class="folder" onclick="getPasswords(\'' + obj[i].token_id + '\')">' + obj[i].name + '</li>');
				$('<li class="mouse-cursor-pointer">' + obj[i].name + '</li>').appendTo("#folders").addClass("folder").attr("data-folder-token-id", obj[i].token_id).click(function() {

					self.openFolder($(this));
				});
			}
			//if he gets a folderToken then he sets it as active and load the passwords from the folder
			if (folderToken) {
				$("[data-folder-token-id=" + folderToken + "]").addClass("active");
				self.showPasswordList(folderToken);
			}

		});
	};

	//clears the ModalFolderEdit values
	self.clearFolderEditValues = function() {
		$('#folderEdit-title').val("");
		$('#folderEdit-token').val("");
	};

	//creates a folder -> databaseinsert
	self.createFolder = function() {
		//Hide the delete button, because we want to create not delete
		$('.btn-folderEdit-delete').hide();
		//show the modal
		$('#folderEditModal').modal('show');
		//remove old click listeners
		$('.btn-folderEdit-save').unbind("click");
		//add new clicklisteners
		$('.btn-folderEdit-save').click(function() {
			$.ajax({
				method : "POST",
				url : self.ajaxPasswordManagerUrl,
				data : {
					action : "createFolder",
					userToken : self.userToken,
					title : $('#folderEdit-title').val()
				}
			}).done(function(jsonObj) {
				//update PasswordList after update
				console.log("ADDED Folder");
				//update the folder list and set the new folder as active
				var obj = JSON.parse(jsonObj);
				self.getFolders(obj);
				$('#folderEditModal').modal('hide');
			});

		});
	};

	//updates new folder settings to the db
	self.updateFolder = function() {
		//get the folder values
		$('#folderEdit-title').val($('.folder.active').html());
		$('#folderEdit-token').val($('.folder.active').attr("data-folder-token-id"));
		$('#folderEditModal').modal('show');
		//remove old clicklisteners
		$('.btn-folderEdit-save').unbind("click");
		$('.btn-folderEdit-delete').unbind("click");
		//add save click listener
		$('.btn-folderEdit-save').click(function() {
			$.ajax({
				method : "POST",
				url : self.ajaxPasswordManagerUrl,
				data : {
					action : "updateFolder",
					userToken : self.userToken,
					folderToken : $("#folderEdit-token").val(),
					title : $('#folderEdit-title').val()
				}
			}).done(function(jsonObj) {
				console.log("UPDATED Folder");
				//update PasswordList after update
				var tokenId = $("#folderEdit-token").val();
				self.getFolders(tokenId);
				$('#folderEditModal').modal('hide');
			});
		});
		//add delete click listener
		$('.btn-folderEdit-delete').click(function() {
			$.ajax({
				method : "POST",
				url : self.ajaxPasswordManagerUrl,
				data : {
					action : "deleteFolder",
					userToken : self.userToken,
					folderToken : $("#folderEdit-token").val()
				}
			}).done(function(jsonObj) {
				console.log("DELETED Folder");
				//get folder with default value
				self.getFoldersWithDefault();
				$('#folderEditModal').modal('hide');
			});
		});
	};

	//get the folder list with the default folder selected
	self.getFoldersWithDefault = function() {
		$.ajax({
			method : "POST",
			url : self.ajaxPasswordManagerUrl,
			data : {
				action : "getDefaultFolder",
				userToken : self.userToken
			}
		}).done(function(jsonObj) {
			//if there are folders
			if (jsonObj != 'null') {
				var obj = JSON.parse(jsonObj);
				self.getFolders(obj.token_id);
				//load passwords from the selected default folder
				self.showPasswordList(obj.token_id);
			} else {
				//no folders = reset passwords and passwords
				$("#folders").html("");
				$("#password-content").html("");
				$('#createPassword').css('visibility', 'hidden');
				$('#updateFolder').css('visibility', 'hidden');
			}

		});
	};
	/*
	 * shows the Password List from the Folder in the #password-content
	 */
	self.showPasswordList = function(folderToken) {
		$.ajax({
			method : "POST",
			url : self.ajaxPasswordManagerUrl,
			data : {
				action : "getPasswords",
				folderToken : folderToken,
				userToken : self.userToken
			}
		}).done(function(jsonObj) {
			$("#password-content").html("");
			if (jsonObj) {
				var obj = JSON.parse(jsonObj);

				for (var i = 0; i < obj.length; i++) {
					$("#password-content").append('<tr id="passwordParentInChange"><td>' + obj[i].title + '</a></td><td><a href="' + obj[i].website_url + '" target="_blank">' + obj[i].website_url + '</td><td>' + obj[i].username + '</td><td id="passwordInChange"><span class="password-content">' + self.passwordHideContent + '</span> <span class="glyphicon glyphicon-eye-open mouse-cursor-pointer" aria-hidden="true" data-toggle="tooltip" title="Show Password"></span></td><td id="passwordEditInChange" align="right"><span class="glyphicon glyphicon-pencil mouse-cursor-pointer" aria-hidden="true" data-toggle="tooltip" title="Edit Password"></span></td></tr>');
					$('#passwordInChange').addClass("password").click(function() {

						self.showPassword($(this));
					}).removeAttr('id');
					$('#passwordParentInChange').attr("data-password-token-id", obj[i].token_id).removeAttr('id');
					$('#passwordEditInChange').click(function() {

						self.updatePassword($(this));
					}).removeAttr('id');

					//init tooltip
					$(function() {
						$("[data-toggle='tooltip']").tooltip();
					});
				}
			}
		});
	};

	//open a folder and shows the passwords inside
	self.openFolder = function(folder) {
		//open the folder
		$(".folder").removeClass("active");
		folder.addClass("active");
		//shows passwords
		self.showPasswordList(folder.attr("data-folder-token-id"));
	};

	/***************************
	 *PasswordManager Passwords*
	 **************************/

	//show  the password
	self.showPassword = function(callingItem) {
		self.getPasswordData(callingItem, function(obj) {

			callingItem.find(".password-content").html(obj.password);

			//hide password after 5 sec
			setTimeout(function() {
				callingItem.find(".password-content").html(self.passwordHideContent);
			}, 5000);
		});
	};

	//get the passwordData
	self.getPasswordData = function(callingItem, calledFunction) {
		$.ajax({
			method : "POST",
			url : self.ajaxPasswordManagerUrl,
			data : {
				action : "getPasswordData",
				userToken : self.userToken,
				passwordToken : callingItem.parent().attr("data-password-token-id")
			}
		}).done(function(jsonObj) {
			var obj = JSON.parse(jsonObj);
			calledFunction(obj);
		});
	};

	//clear the passwordEdit values
	self.clearPasswordEditValues = function() {
		$('#passwordEdit-title').val("");
		$('#passwordEdit-website_url').val("");
		$('#passwordEdit-username').val("");
		$('#passwordEdit-password').val("");
		$('#passwordEdit-token').val("");
	};

	//update the password in the database
	self.updatePassword = function(callingItem) {
		//unbind the click events
		$('.btn-passwordEdit-save').unbind("click");
		$('.btn-passwordEdit-delete').unbind("click");

		self.getPasswordData(callingItem, function(obj) {
			$('#passwordEditModal').modal('show');
			$('#passwordEdit-title').val(obj.title);
			$('#passwordEdit-website_url').val(obj.website_url);
			$('#passwordEdit-username').val(obj.username);
			$('#passwordEdit-password').val(obj.password);
			$('#passwordEdit-token').val(callingItem.parent().attr("data-password-token-id"));

			//passwordStrength workaround
			//TODO: better workaround
			$('#passwordEdit-password').pwstrength(self.passwordstrengthoptions);
			$("#passwordEdit-password").pwstrength("destroy");
			$('#passwordEdit-password').pwstrength(self.passwordstrengthoptions);

			//when click on save
			$('.btn-passwordEdit-save').click(function() {
				$.ajax({
					method : "POST",
					url : self.ajaxPasswordManagerUrl,
					data : {
						action : "updatePassword",
						userToken : self.userToken,
						passwordToken : $('#passwordEdit-token').val(),
						title : $('#passwordEdit-title').val(),
						website_url : self.convertToUrl($('#passwordEdit-website_url').val()),
						username : $('#passwordEdit-username').val(),
						password : $('#passwordEdit-password').val()
					}
				}).done(function(jsonObj) {
					console.log("EDITED PASSWORD");
					//update PasswordList after update
					self.openFolder($('.folder.active'));
					$('#passwordEditModal').modal('hide');

				});

			});
			//when click on delete
			$('.btn-passwordEdit-delete').click(function() {
				$.ajax({
					method : "POST",
					url : self.ajaxPasswordManagerUrl,
					data : {
						action : "deletePassword",
						userToken : self.userToken,
						passwordToken : $('#passwordEdit-token').val()
					}
				}).done(function(jsonObj) {
					console.log("DELETED PASSWORD");
					//update PasswordList after delet
					self.openFolder($('.folder.active'));
					$('#passwordEditModal').modal('hide');

				});

			});

		});

	};

	self.createPassword = function() {
		$('.btn-passwordEdit-delete').hide();
		$('#passwordEditModal').modal('show');
		//remove old click listener
		$('.btn-passwordEdit-save').unbind("click");
		//passwordStrength workaround
		//TODO: better workaround
		$('#passwordEdit-password').pwstrength(self.passwordstrengthoptions);
		$("#passwordEdit-password").pwstrength("destroy");
		$('#passwordEdit-password').pwstrength(self.passwordstrengthoptions);
		//when click on save
		$('.btn-passwordEdit-save').click(function() {
			$.ajax({
				method : "POST",
				url : self.ajaxPasswordManagerUrl,
				data : {
					action : "createPassword",
					userToken : $("#user-token").val(),
					title : $('#passwordEdit-title').val(),
					website_url : self.convertToUrl($('#passwordEdit-website_url').val()),
					folderToken : $('.folder.active').attr("data-folder-token-id"),
					username : $('#passwordEdit-username').val(),
					password : $('#passwordEdit-password').val()
				}
			}).done(function(jsonObj) {
				//update PasswordList after update
				console.log("ADDED PASSWORDs");
				//updates passworddata
				self.openFolder($('.folder.active'));

				$('#passwordEditModal').modal('hide');
			});

		});

	};

	self.convertToUrl = function(string) {
		if (!/^https?:\/\//i.test(string)) {
			return string = 'http://' + string;
		} else {
			return string;
		}
	};
}

/**
 *General
 */

//if the String ends with a substring
//from http://stackoverflow.com/questions/280634/endswith-in-javascript
if ( typeof String.prototype.endsWith != 'function') {
	String.prototype.endsWith = function(str) {
		return this.substring(this.length - str.length, this.length) === str;
	};
};

//document ready
$(document).ready(function() {
	if (top.location.pathname.endsWith("dashboard")) {
		console.log("Start PasswordManager");
		var pwManager = new PasswordManager();
		pwManager.getFoldersWithDefault();
		//getFoldersWithDefault();

		//add the createPassword clickListener
		$('#createPassword').click(function() {
			pwManager.createPassword();
		});
		//add the createFolder clickListener
		$('#createFolder').click(function() {
			pwManager.createFolder();
		});
		//add the updateFolder clickListener
		$('#updateFolder').click(function() {
			pwManager.updateFolder();
		});

		//resets passwordEditModal
		$('#passwordEditModal').on('hidden.bs.modal', function(e) {
			pwManager.clearPasswordEditValues();
			$('.btn-passwordEdit-delete').show();
		});

		//resets folderEditModal
		$('#folderEditModal').on('hidden.bs.modal', function(e) {
			pwManager.clearFolderEditValues();
			//and show the delete button
			$('.btn-folderEdit-delete').show();
		});

		$('#passwordEdit-password').on('show.bs.password', function(e) {
			// code here
			$("#passwordEdit-password").pwstrength("destroy");
			$("input.password-strength:password").removeAttr('id');
			$('input.password-strength:text').attr('id', 'passwordEdit-password');
			$('#passwordEdit-password').pwstrength(pwManager.passwordstrengthoptions);
		});
		$('#passwordEdit-password').on('hide.bs.password', function(e) {
			// code here
			$("#passwordEdit-password").pwstrength("destroy");
			$("input.password-strength:text").removeAttr('id');
			$('input.password-strength:password').attr('id', 'passwordEdit-password');
			$('#passwordEdit-password').pwstrength(pwManager.passwordstrengthoptions);
		});
		//init tooltip
		$(function() {
			$("[data-toggle='tooltip']").tooltip();
		});
	} else if (top.location.pathname.endsWith("account")) {
        $('.btn-passwordEdit-save').click(function() {
			$.ajax({
				method : "POST",
				url : scriptPath + "ajax/PasswordManager.php",
				data : {
					action : "changePassword",
					userToken : $("#user-token").val(),
					oldPassword : $('#oldPassword').val(),
                    newPassword1 : $('#newPassword1').val(),
                    newPassword2 : $('#newPassword2').val()
				}
			}).done(function(jsonObj) {
				console.log("CHANGED PASSWORD");
                console.log(jsonObj);
                var Object = JSON.parse(jsonObj);
			});

		});
    }
});
