<?php

//creates user and loging management with this
class User {
	//the $db
	private $db;

	//constructor
	public function __construct($dbconn) {
		$this -> db = $dbconn;
	}

	//checks if the user is loggedIn
	function isLoggedIn() {
		return isset($_SESSION['user_token']);
	}

	//trys to Login, if not sucessfull return error
	function tryToLogin($logFormUsername, $logFormPassword) {
		//if there is a row with the given username
		if ($stmt = $this -> db -> prepare("SELECT id, username, password, salt, token_id FROM users WHERE username = ?")) {
			$stmt -> bind_param('s', $logFormUsername);
			$stmt -> execute();
			$stmt -> store_result();

			$stmt -> bind_result($user_id, $username, $db_password, $salt, $user_token);
			$stmt -> fetch();
			//hash the password
			$password = hash('sha512', APPSALT . $logFormPassword . $salt);
			//password is right user can login now
			if ($db_password == $password) {
				$_SESSION['user_token'] = $user_token;
				//Redirect to the dashboard
				header('location:' . SCRIPT_ROOT . 'site/dashboard');

			} else {
				//password is Wrong
				return $alert = "Überprüfen sie nochmal ihre Daten!";
			}

		}
	}

	//trys to register the user if sucessfull returns info, if not returns alert
	function tryToRegister($regFormUsername, $regFormEmail, $regFormPassword) {

		if (isUsernameUnique($regFormUsername) && isEmailUnique($regFormEmail)) {
			//Saved in the database with the user
			$random_salt = hash('sha512', uniqid(openssl_random_pseudo_bytes(16), TRUE));
			//Generates the saved user password with APPSALT $ $random_salt
			$regFormPassword = hash('sha512', APPSALT . $regFormPassword . $random_salt);

			//Save the new user into the database
			if ($insert_stmt = $this -> db -> prepare("INSERT INTO users (username, email, password, salt) VALUES (?, ?, ?, ?)")) {
				$insert_stmt -> bind_param('ssss', $regFormUsername, $regFormEmail, $regFormPassword, $random_salt);
				if (!$insert_stmt -> execute()) {
					//Error
					echo "error";
				} else {
					//REDIRECT
					$id = $this -> db -> insert_id;
					$token_id = hash('sha512', APPSALT . $id . $random_salt);
					$query = 'UPDATE users SET token_id="' . $token_id . '" WHERE id ="' . $id . '"';
					$this -> db -> query($query) or trigger_error($this -> db -> error . " " . $query);
					$info = "Sie können sich jetzt einloggen!";
				}
			}
		} else {
			$alert = "Überprüfen sie nochmal ihre Daten!";

		}
	}

	//checks if the user with the given username exists
	function isUsernameUnique($data) {
		return $this->checkUserExist('username', $data);
	}

	//checks if the user with the given email exists
	function isEmailUnique($data) {
		return $this->checkUserExist('email', $data);
	}

	//checks if a user with the given type data combination exists
	function checkUserExist($type, $data) {
		if ($stmt = $this->db -> prepare("SELECT * FROM users WHERE ($type = ?)")) {
			$stmt -> bind_param('s', $data);
			if (!$stmt -> execute()) {
				//Error
				echo "error";
			}

		}
		$stmt -> store_result();
		if ($stmt -> num_rows == 0)
			//no user found with that email
			return false;
		else
			//found a user with that email
			return true;

	}

}
