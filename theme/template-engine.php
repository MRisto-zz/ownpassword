<?php
//The title of the page
$title = null;
//Which view is included
$view = null;
$ending = ".php";

//which sites are available
$site = array();
$site['authentication'] = 'authentication';
$site['logout'] = 'logout';
$site['dashboard'] = 'dashboard';
$site['account'] = 'account';

if (isset($_GET['site']) && $site[$_GET['site']]) {
	$view = $site[$_GET['site']] . $ending;
	$title = $_GET['site'];
} else {
	if ($user -> isLoggedIn()) {
		$view = $site['dashboard'] . $ending;
		$title = 'dashboard';
	} else {
		$view = $site['authentication'] . $ending;
		$title = 'authentication';
	}

}
