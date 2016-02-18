<?php
//PasswordManager manages the folders and the Passwords
class PasswordManager {
	//db connection
	private $db;

	//constructor
	public function __construct($dbconn, $cipherSuite) {
		$this -> db = $dbconn;
		$this -> cipherSuite = $cipherSuite;
	}

	//get the userId from the userToken
	function getUserId($userToken) {
		$query = "SELECT id FROM users WHERE token_id='$userToken'";
		return $this -> db -> query($query) -> fetch_object() -> id;
	}

	//get the userTOken from the userId
	function getUserToken($userId) {
		$query = "SELECT token_id FROM users WHERE id='$userId'";
		return $this -> db -> query($query) -> fetch_object() -> token_id;
	}

	//get the folderId by the folderToken
	function getFolderId($folderToken) {
		$query = "SELECT id FROM folders WHERE token_id='$folderToken'";
		return $this -> db -> query($query) -> fetch_object() -> id;
	}

	//get the user salt from the userToken
	function getSalt($userToken) {
		$query = "SELECT salt FROM users WHERE token_id='$userToken'";
		return $this -> db -> query($query) -> fetch_object() -> salt;
	}

	//get all passwords
	function getPasswords($userToken, $folderToken) {
		$userId = $this -> getUserId($userToken);
		$folderId = $this -> getFolderId($folderToken);
		$myArray = array();
		$query = "SELECT id, title, username,token_id FROM passwords WHERE user_id ='$userId' AND folder_id ='$folderId'";
		$result = $this -> db -> query($query);
		if ($result -> num_rows === 0) {
			return '';
		} else {

			while ($row = $result -> fetch_assoc()) {
				array_push($myArray, $row);
			}
			return $myArray;
		}
	}

	//get the passwordData with the decrypted password
	function getPasswordData($userToken, $passwordToken) {
		$userId = $this -> getUserId($userToken);
		$salt = $this -> getSalt($userToken);
		$query = "SELECT token_id,password,title,username FROM passwords WHERE token_id='$passwordToken' AND user_id='$userId'";
		$result = $this -> db -> query($query) -> fetch_object();
		$resultpw = $result -> password;
		$result -> password = $this -> cipherSuite -> decrypt($resultpw, $salt);
		return $result;
	}

	//create a password
	function createPassword($userToken, $folderToken, $passTitle, $passUserName, $password) {
		$userId = $this -> getUserId($userToken);
		$salt = $this -> getSalt($userToken);
		$folderId = $this -> getFolderId($folderToken);
		$encryptedPassword = $this -> cipherSuite -> encrypt($password, $salt);
		$query = "INSERT INTO passwords (user_id,folder_id,title,username,password) VALUES ('$userId','$folderId','$passTitle','$passUserName','$encryptedPassword')";
		$this -> db -> query($query) or trigger_error($this -> db -> error . " " . $query);

		//add the token
		$id = $this -> db -> insert_id;
		$passwordToken = hash('sha512', APPSALT . $id . $salt);
		$query = "UPDATE passwords SET token_id='$passwordToken' WHERE id ='$id'";
		$this -> db -> query($query) or trigger_error($this -> db -> error . " " . $query);
	}

	//updates the password
	function updatePassword($userToken, $passwordToken, $title, $username, $password) {
		$userId = $this -> getUserId($userToken);
		$salt = $this -> getSalt($userToken);
		$encryptedPassword = $this -> cipherSuite -> encrypt($password, $salt);

		$query = "UPDATE passwords SET title='$title', username='$username',password='$encryptedPassword' WHERE token_id ='$passwordToken' AND user_id='$userId'";
		$this -> db -> query($query) or trigger_error($this -> db -> error . " " . $query);
	}

	//deletes a password
	function deletePassword($userToken, $passwordToken) {
		$userId = $this -> getUserId($userToken);
		$query = "DELETE FROM passwords WHERE token_id ='$passwordToken' AND user_id='$userId'";
		$this -> db -> query($query) or trigger_error($this -> db -> error . " " . $query);
	}

	//get all folders
	function getFolders($userToken) {
		$userId = $this -> getUserId($userToken);
		$myArray = array();
		$query = "SELECT token_id, name, weight FROM folders WHERE user_id='$userId' ORDER BY weight ASC";
		$result = $this -> db -> query($query);
		while ($row = $result -> fetch_object()) {
			array_push($myArray, $row);
		}
		return $myArray;
	}

	//get the defaultFolder -> at the moment the oldest
	function getDefaultFolder($userToken) {
		$userId = $this -> getUserId($userToken);
		$myArray = array();
		$query = "SELECT token_id, name, weight FROM folders WHERE user_id='$userId' ORDER BY id ASC LIMIT 1";
		$result = $this -> db -> query($query);
		return $result -> fetch_object();
	}

	//creates a folder
	function createFolder($userToken, $folderName) {
		$userId = $this -> getUserId($userToken);
		$query = "INSERT INTO folders (user_id,name) VALUES ('$userId','$folderName')";
		$this -> db -> query($query);

		//add the token
		$id = $this -> db -> insert_id;
		$salt = $this -> getSalt($userToken);
		$folderToken = hash('sha512', APPSALT . $id . $salt);
		$query = "UPDATE folders SET token_id= '$folderToken' WHERE id ='$id '";
		$this -> db -> query($query) or trigger_error($this -> db -> error . " " . $query);
		return $folderToken;
	}

	//updates a folder
	function updateFolder($userToken, $folderToken, $folderName) {
		$userId = $this -> getUserId($userToken);

		$query = "UPDATE folders SET name='$folderName' WHERE token_id ='$folderToken' AND user_id='$userId'";
		$this -> db -> query($query) or trigger_error($this -> db -> error . " " . $query);
	}

	//deletes a folder
	function deleteFolder($userToken, $folderToken) {
		$userId = $this -> getUserId($userToken);
		$query = "DELETE FROM folders WHERE token_id ='$folderToken' AND user_id='$userId'";
		$this -> db -> query($query) or trigger_error($this -> db -> error . " " . $query);
	}

}
