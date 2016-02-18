<?php
//Error reporting, Turn of in Production
error_reporting(E_ALL & ~ E_NOTICE);
ini_set ('display_errors', 'On');

//Start php session before everything
session_start();

//Load the settings
require('config/settings.php');
//Load db connection
require('core/dbconnect.php');

//Load the needed classes
require('core/classes/User.php');

$user = new User($db);
 

//oad the template-engine and the template
require('theme/template-engine.php');
require('theme/template.php');