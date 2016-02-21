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
	}
});
