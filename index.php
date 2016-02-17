<?php
//ERROR REPORTING
error_reporting(E_ALL & ~ E_NOTICE);
ini_set ('display_errors', 'On');
//Start php session before everything
session_start();

//CONFIG REQUIREMENTS
require('config/settings.php');
//Load db connection
require('core/dbconnect.php');

//LOAD the classes
require('core/classes/User.php');
require('core/classes/CipherSuite.php');
require('core/classes/PasswordManager.php');

$user = new User();
$cipherSuite = new CipherSuite();
$pwManager = new PasswordManager($mysqli, $cipherSuite);
/*
$pwManager ->createFolder( $pwManager->getUserToken(1),"Test #1");
$pwManager ->createFolder( $pwManager->getUserToken(1),"Test #2");
$pwManager ->createFolder( $pwManager->getUserToken(1),"Test #3");


$pwManager ->createPassword($pwManager->getUserToken(1), 1, "Amazon", "Test", "SicheresPasswort");
*/
 

//LOADING PAGE
require('theme/template-engine.php');
require('theme/template.php');