<?php

$db = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
 
//Check if the connection works
if ($db->connect_error) {
  trigger_error('ERROR:Database connection failed: '  . $db->connect_error, E_USER_ERROR);
}