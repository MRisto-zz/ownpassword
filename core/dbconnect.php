<?php
//SQL CONNECTION CONFIG DONT CHANGE PLS
//DEFINED as constants, that a developer doesnt change them accidently
define("DBHOST", "localhost");
define("DBUSER","root");
define("DBPASS","");
define("DBNAME","wpfmw");


$mysqli = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
 
// check connection
if ($mysqli->connect_error) {
  trigger_error('ERROR:Database connection failed: '  . $mysqli->connect_error, E_USER_ERROR);
}