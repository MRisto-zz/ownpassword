<?php
$alert = "";
$info = "";

//login
if (isset($_POST['login']) && isset($_POST['username']) && isset($_POST['password'])) {
	$logFormUsername = $db -> real_escape_string($_POST['username']);
	$logFormPassword = $db -> real_escape_string($_POST['password']);
	//trytologin with the given username and password
	$alert = $user->tryToLogin($logFormUsername,$logFormPassword);
}

//Registration
if (isset($_POST['register']) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['email'])) {
	$regFormUsername = $db -> real_escape_string($_POST['username']);
	$regFormPassword = $db -> real_escape_string($_POST['password']);
	$regFormEmail = $db -> real_escape_string($_POST['email']);
	//tryToRegister with the given username,password,email
	echo $user->tryToRegister($regFormUsername,$regFormEmail,$regFormPassword);
}
?>