<?php
//The title of the page
$title = null;
//Which view is included
$view = null;
$ending = ".php";

//which sites are available
$site = array();
$site['authentication']['url'] = 'authentication';
$site['authentication']['title'] = 'Authentication';
$site['authentication']['restricted'] = false;

//LOGIN
$site['logout']['url'] = 'logout';
$site['logout']['title'] = 'Logout';
$site['logout']['restricted'] = true;
//DASBOARD
$site['dashboard']['url'] = 'dashboard';
$site['dashboard']['title'] = 'Dashboard';
$site['dashboard']['restricted'] = true;

//ACCOUTN
$site['account']['url'] = 'account';
$site['account']['title'] = 'Account';
$site['account']['restricted'] = true;
//if the site exist and the user wants to acces the site
if (isset($_GET['site']) && $site[$_GET['site']]) {
	//check if user can acess the site
	if ($site[$_GET['site']]['restricted'] && $user -> isLoggedIn()) {
		//site is restricted and user isnt logged in
		$currentSite = $site[$_GET['site']];
		$view = $currentSite['url'] . $ending;
		$title = $currentSite['title'];
	} else {
		//site is restricted and user isnt logged in
		if ($site[$_GET['site']]['restricted'] && !$user -> isLoggedIn()) {
			//if not on the login site go to the login site
			//TODO: FEHLERMELDUNG
			header('location:' . SCRIPT_ROOT . 'site/' . $site['authentication']['url']);
		}
		//if logged in and u want to acces the authentication page
		if($_GET['site'] == 'authentication' && $user -> isLoggedIn()){
			header('location:' . SCRIPT_ROOT . 'site/' . $site['dashboard']['url']);
		}

		$currentSite = $site[$_GET['site']];
		$view = $currentSite['url'] . $ending;
		$title = $currentSite['title'];
	}

} else {
	//no site and logged in
	if ($user -> isLoggedIn()) {
		//redirect to dashboard
		header('location:' . SCRIPT_ROOT . 'site/' . $site['dashboard']['url']);
	} else {
		header('location:' . SCRIPT_ROOT . 'site/' . $site['authentication']['url']);
	}
}
