<?php

//requirements
require_once ('../../config/settings.php');
require_once ('../../core/dbconnect.php');
require_once ('../../core/classes/User.php');

$user = new User($db);

if (isset($_POST['action'])) {
	$action = $_POST['action'];
	// Ajax call check if the username is uniqe
	if ($action == 'isUsernameUnique') {
		$username = $db -> real_escape_string($_POST['username']);

		echo $user->isUsernameUnique($username) ? 'true' : 'false';
	}
	//Ajax call check if the email is Valid
	if ($action == 'isEmailUnique') {
		$email = $db -> real_escape_string($_POST['email']);
		echo $user->isEmailUnique($email) ? 'true' : 'false;';
	}

}
