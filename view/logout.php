<?php
session_destroy();   // function that Destroys Session 
header('location:'.SCRIPT_ROOT.'site/login');
?>