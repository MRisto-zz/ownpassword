<?php

if($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {

//db connection 
	require_once('../../core/dbconnect.php');
	require_once('../../config/settings.php');

}


if(isset($_POST['action'])){
	$action = $_POST['action'];
	// Ajax call check if the user is valid
	if($action == 'checkUserValid'){
		$username = $mysqli->real_escape_string($_POST['username']);
		echo checkUserNameValid($username,$mysqli,true);
	}
	//Ajax call check if the email is Valid
	if($action == 'checkEmailValid'){
		$email = $mysqli->real_escape_string($_POST['email']);
		echo checkEmailValid($email, $mysqli, true);
	}
	//Ajax call check if Password is Valid
	if($action == 'checkPasswordValid'){
		$password = $_POST['password'];
		echo checkPasswordValid($password, true);
	}
}
//min 5 Zeichen Lang
//es extiert kein Anderer
//keine sonderzeichen ( nur Groß & KLein, Zahlen unterschrich und punkt)
function checkUserNameValid($username, $mysqli, $ajaxcall=false){

	$all = true;
	$json = array();
	$json['length'] = true;
	$json['unique'] = true;
	$json['regex'] = true;

	//username needs to be >= USERNAMEMINLENGTH
	if(strlen($username) < USERNAMEMINLENGTH){
		$json['length'] = false;
		$all = false;
	}

	//username needs to be uniqe
	if(checkUserWithUserNameExist($username,$mysqli)){
		$json['unique'] = false;
		$all = false;
	}

	//keine Sonderzeichen
	if(!preg_match("/^[_a-zA-Z0-9]+$/",$username)){
		$json['regex'] = false;
		$all = false;
	}



	if($ajaxcall){
		return json_encode($json);
	}else{

		return $all;
	}

}

function checkEmailValid($email,$mysqli,$ajaxcall=false){

	$all = true;
	$json = array();
	$json['unique'] = true;
	$json['regex'] = true;

	//username needs to be uniqe
	if(checkUserWithEmailExist($email,$mysqli)){
		$json['unique'] = false;
		$all = false;
	}
	//keine Sonderzeichen
	if(!isValidEmail($email)){
		$json['regex'] = false;
		$all = false;
	}


	if($ajaxcall){
		return json_encode($json);
	}else{
		return $all;
	}
}

function checkPasswordValid($password,$ajaxcall=false){

	$all = true;
	$json = array();
	$json['length'] = true;
	$json['regex'] = true;

	if(strlen($password) < PASSWORDMINLENGTH){
		$json['length'] = false;
		$all = false;
	}
	//keine Sonderzeichen
	if(!isValidPassword($password)){
		$json['regex'] = false;
		$all = false;
	}


	if($ajaxcall){
		return json_encode($json);
	}else{
		return $all;
	}
}
//if we want to disable SpamforMail Hoster or 1CLickMail not Implemented
function isValidEmail($email){
	$all = true;
	if(!filter_var($email, FILTER_VALIDATE_EMAIL) ){
		$all = false;
	}

	return $all;
}
//if we want to disable SpamforMail Hoster or 1CLickMail not Implemented
function isValidPassword($password){
	$all = true;
	if(!preg_match("/^[_a-zA-Z0-9]+$/",$password)){

		$all = false;
	}

	return $all;
}

function checkUserWithUserNameExist($data,$mysqli){
	return checkUserExist('username',$data,$mysqli);
}

function checkUserWithEmailExist($data,$mysqli){
	return checkUserExist('email',$data,$mysqli);
}

function checkUserExist($type,$data, $mysqli){
	if($stmt = $mysqli->prepare("SELECT * FROM users WHERE ($type = ?)")){
		$stmt->bind_param('s', $data);
		if (! $stmt->execute()) {
            //Error
			echo "error";
		}

	}
	$stmt->store_result();
	if($stmt->num_rows == 0)
			//no user found with that email
		return false;
	else
			//found a user with that email
		return true;

}


