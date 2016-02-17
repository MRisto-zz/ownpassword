<?php

include("js/ajax/ajaxAuthenticationManager.php");
$alert = "";
$info = "";
//LOGIN
if (isset($_POST['login']) && isset($_POST['username']) && isset($_POST['password'])) {
	$logFormUsername = $mysqli -> real_escape_string($_POST['username']);
	$logFormPassword = $mysqli -> real_escape_string($_POST['password']);
	if ($stmt = $mysqli -> prepare("SELECT id, username, password, salt, token_id FROM users WHERE username = ?")) {
		$stmt -> bind_param('s', $logFormUsername);
		$stmt -> execute();
		$stmt -> store_result();

		$stmt -> bind_result($user_id, $username, $db_password, $salt, $user_token);
		$stmt -> fetch();
		$password = hash('sha512', APPSALT . $logFormPassword . $salt);

		//password is right user can login now
		if ($db_password == $password) {
			$_SESSION['user_id'] = $user_id;
			$_SESSION['user_token'] = $user_token;
			//Redirect
			header('location:'.SCRIPT_ROOT.'site/dashboard');

		} else {
			//password is Wrong
			$alert = "Überprüfen sie nochmal ihre Daten!";
		}
	}
}

//REGISTRATION
if (isset($_POST['register']) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['email'])) {
	$regFormUsername = $mysqli -> real_escape_string($_POST['username']);
	$regFormPassword = $mysqli -> real_escape_string($_POST['password']);
	$regFormEmail = $mysqli -> real_escape_string($_POST['email']);
	if (checkUserNameValid($regFormUsername, $mysqli) && checkEmailValid($regFormEmail, $mysqli)) {
		//Saved in the database with the user
		$random_salt = hash('sha512', uniqid(openssl_random_pseudo_bytes(16), TRUE));
		//Generates the saved user password with APPSALT $ $random_salt
		$regFormPassword = hash('sha512', APPSALT . $regFormPassword . $random_salt);

		//Save the new user into the database
		if ($insert_stmt = $mysqli -> prepare("INSERT INTO users (username, email, password, salt) VALUES (?, ?, ?, ?)")) {
			$insert_stmt -> bind_param('ssss', $regFormUsername, $regFormEmail, $regFormPassword, $random_salt);
			if (!$insert_stmt -> execute()) {
				//Error
				echo "error";
			} else {
				//REDIRECT
				$id = $mysqli->insert_id;
				$token_id = hash('sha512', APPSALT . $id . $random_salt);
				$query = 'UPDATE users SET token_id="'.$token_id.'" WHERE id ="'.$id.'"';
				$mysqli->query($query) or trigger_error($mysqli -> error." ".$query);
				$info = "Sie können sich jetzt einloggen!";
			}
		}
	} else {
		$alert = "Überprüfen sie nochmal ihre Daten!";

	}
}
?>