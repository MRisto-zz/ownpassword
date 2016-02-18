<?php
/********************
 * Database Settings
 *******************/
define("DBHOST", "localhost");
define("DBUSER","root");
define("DBPASS","");
define("DBNAME","wpfmw");

//ScriptRoot Folder
define( 'SCRIPT_ROOT', 'http://localhost/ownpassword/' );

//Appsalt for better security -> dont change in production
define("APPSALT", "4b199cb2ced7abc4ecdfd55bc8aa769f");

//if the registration is available
define("REGISTRATION_AVAILABLE",true);

//User settings -> needed for the registration
define("USERNAMEMINLENGTH",4);
define("PASSWORDMINLENGTH",4);