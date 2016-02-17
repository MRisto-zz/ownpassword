<?php

//Isn't a secure solution but we can work with that from the start
//Just a prototype
//from http://www.tfonfara.de/php-encryptdecrypt-funktion-mit-base64-und-schlussel.xhtml
//for production there should be a better solution
class CipherSuite {

	//encrypts with the appsalt
	function encrypt($string, $userkey) {
		return $this -> encrypt_core($string, $userkey . APPSALT);
	}

	//the core encryption
	function encrypt_core($string, $key) {
		$result = '';

		for ($i = 0; $i < strlen($string); $i++) {
			$char = substr($string, $i, 1);
			$keychar = substr($key, ($i % strlen($key)) - 1, 1);
			$char = chr(ord($char) + ord($keychar));
			$result .= $char;
		}

		return base64_encode($result);
	}

	//decrypt with the appsalt
	function decrypt($string, $userkey) {
		return $this -> decrypt_core($string, $userkey . APPSALT);
	}

	//Core decrypt function
	function decrypt_core($string, $key) {
		$result = '';
		$string = base64_decode($string);

		for ($i = 0; $i < strlen($string); $i++) {
			$char = substr($string, $i, 1);
			$keychar = substr($key, ($i % strlen($key)) - 1, 1);
			$char = chr(ord($char) - ord($keychar));
			$result .= $char;
		}

		return $result;
	}

}
