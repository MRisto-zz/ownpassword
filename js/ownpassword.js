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

$(document).ready(function() {
	if (top.location.pathname.endsWith("account")) {
		console.log("account");
		$('#accountEdit-username').val();
		$('#accountEdit-email').val();
		$('#accountEdit-password').val();
	}
});
