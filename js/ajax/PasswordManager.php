<?php
//db connection
require_once ('../../config/settings.php');
require_once ('../../core/dbconnect.php');
require ('../../core/classes/CipherSuite.php');
require ('../../core/classes/PasswordManager.php');
$cipherSuite = new CipherSuite();
$pwManager = new PasswordManager($db, $cipherSuite);
if (isset($_POST['action'])) {
	$action = $_POST['action'];
	//save the userToken
	$userToken = $db -> real_escape_string($_POST['userToken']);
	
	//checks different acctions
	if ($action == 'getPasswords') {
		$folderToken = $db -> real_escape_string($_POST['folderToken']);
		echo json_encode($pwManager -> getPasswords($userToken, $folderToken));
	} else if ($action == 'getFolders') {
		echo json_encode($pwManager -> getFolders($userToken));
	} else if ($action == 'getPassword') {
		$passwordToken = $db -> real_escape_string($_POST['passwordToken']);
		echo json_encode($pwManager -> getPassword($userToken, $passwordToken));
	} else if ($action == 'getPasswordData') {
		$passwordToken = $db -> real_escape_string($_POST['passwordToken']);
		echo json_encode($pwManager -> getPasswordData($userToken, $passwordToken));
	} else if ($action == 'createPassword') {
		$folderToken = $db -> real_escape_string($_POST['folderToken']);
		$title = $db -> real_escape_string($_POST['title']);
		$username = $db -> real_escape_string($_POST['username']);
		$password = $db -> real_escape_string($_POST['password']);
		echo json_encode($pwManager -> createPassword($userToken, $folderToken, $title, $username, $password));
	}else if ($action == 'updatePassword') {
		$passwordToken = $db -> real_escape_string($_POST['passwordToken']);
		$title = $db -> real_escape_string($_POST['title']);
		$username = $db -> real_escape_string($_POST['username']);
		$password = $db -> real_escape_string($_POST['password']);
		echo json_encode($pwManager -> updatePassword($userToken, $passwordToken, $title, $username, $password));
	} else if ($action == 'deletePassword') {
		$passwordToken = $db -> real_escape_string($_POST['passwordToken']);
		echo json_encode($pwManager -> deletePassword($userToken, $passwordToken));
	}else if ($action == 'createFolder') {
		$title = $db -> real_escape_string($_POST['title']);
		echo json_encode($pwManager -> createFolder($userToken, $title));
	}else if ($action == 'updateFolder') {
		$folderToken = $db -> real_escape_string($_POST['folderToken']);
		$title = $db -> real_escape_string($_POST['title']);
		echo json_encode($pwManager -> updateFolder($userToken, $folderToken, $title));
	} else if ($action == 'deleteFolder') {
		$folderToken = $db -> real_escape_string($_POST['folderToken']);
		echo json_encode($pwManager -> deleteFolder($userToken, $folderToken));
	}else if ($action == 'getDefaultFolder') {
		echo json_encode($pwManager -> getDefaultFolder($userToken));
	}
}
