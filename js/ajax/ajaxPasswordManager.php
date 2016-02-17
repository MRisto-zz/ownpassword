<?php
//db connection
require_once ('../../core/dbconnect.php');
require_once ('../../config/settings.php');
require ('../../core/classes/CipherSuite.php');
require ('../../core/classes/PasswordManager.php');
$cipherSuite = new CipherSuite();
$pwManager = new PasswordManager($mysqli, $cipherSuite);
if (isset($_POST['action'])) {
	$action = $_POST['action'];
	//Ajax call check if the user is valid
	$userToken = $mysqli -> real_escape_string($_POST['userToken']);
	if ($action == 'getPasswords') {
		$folderToken = $mysqli -> real_escape_string($_POST['folderToken']);
		echo json_encode($pwManager -> getPasswords($userToken, $folderToken));
	} else if ($action == 'getFolders') {
		echo json_encode($pwManager -> getFolders($userToken));
	} else if ($action == 'getPassword') {
		$passwordToken = $mysqli -> real_escape_string($_POST['passwordToken']);
		echo json_encode($pwManager -> getPassword($userToken, $passwordToken));
	} else if ($action == 'getPasswordData') {
		$passwordToken = $mysqli -> real_escape_string($_POST['passwordToken']);
		echo json_encode($pwManager -> getPasswordData($userToken, $passwordToken));
	} else if ($action == 'createPassword') {
		$folderToken = $mysqli -> real_escape_string($_POST['folderToken']);
		$title = $mysqli -> real_escape_string($_POST['title']);
		$username = $mysqli -> real_escape_string($_POST['username']);
		$password = $mysqli -> real_escape_string($_POST['password']);
		echo json_encode($pwManager -> createPassword($userToken, $folderToken, $title, $username, $password));
	}else if ($action == 'updatePassword') {
		$passwordToken = $mysqli -> real_escape_string($_POST['passwordToken']);
		$title = $mysqli -> real_escape_string($_POST['title']);
		$username = $mysqli -> real_escape_string($_POST['username']);
		$password = $mysqli -> real_escape_string($_POST['password']);
		echo json_encode($pwManager -> updatePassword($userToken, $passwordToken, $title, $username, $password));
	} else if ($action == 'deletePassword') {
		$passwordToken = $mysqli -> real_escape_string($_POST['passwordToken']);
		echo json_encode($pwManager -> deletePassword($userToken, $passwordToken));
	}else if ($action == 'createFolder') {
		$title = $mysqli -> real_escape_string($_POST['title']);
		echo json_encode($pwManager -> createFolder($userToken, $title));
	}else if ($action == 'updateFolder') {
		$folderToken = $mysqli -> real_escape_string($_POST['folderToken']);
		$title = $mysqli -> real_escape_string($_POST['title']);
		echo json_encode($pwManager -> updateFolder($userToken, $folderToken, $title));
	} else if ($action == 'deleteFolder') {
		$folderToken = $mysqli -> real_escape_string($_POST['folderToken']);
		echo json_encode($pwManager -> deleteFolder($userToken, $folderToken));
	}else if ($action == 'getDefaultFolder') {
		echo json_encode($pwManager -> getDefaultFolder($userToken));
	}
}
