<?php

class User {

	function isLoggedIn() {
		return isset($_SESSION['user_id']);
	}

}
