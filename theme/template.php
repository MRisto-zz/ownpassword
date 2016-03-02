<!DOCTYPE html>

<!--[if lte IE 6]><html class="preIE7 preIE8 preIE9"><![endif]-->
<!--[if IE 7]><html class="preIE8 preIE9"><![endif]-->
<!--[if IE 8]><html class="preIE9"><![endif]-->
<!--[if gte IE 9]><!-->
<html>
	<!--<![endif]-->
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<title><?php
		//Outputs the right title
		print $title;
			?>
			- OwnPassword</title>
		<meta http-equiv="Cache-Control" content="max-age=3600, public">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name="Content-Language" content="de" />
		<meta name="language" content="Deutsch" />
		<meta name="publisher" content="ownpassword" />
		<meta name="description" content="Die Verwaltung von Passwörtern - Verfügbarkeit aller Passwürter zu jeder Zeit." />
		<meta name="author" content="ownpassword">
		<meta name="date" content="<?=date('c', getlastmod()) ?>">
		<meta name="keywords" content="passwort, passwort vergessen, passwort Programme, passwort speichern, passwort sammlung, online passwort manager, online passwort verwaltung">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="icon" href="<?php echo SCRIPT_ROOT?>theme/images/favicon.ico" type="image/vnd.microsoft.icon">
		<link rel="stylesheet" href="<?php echo SCRIPT_ROOT?>theme/css/style.min.css" type="text/css">
	</head>

	<body>
		<?php
		if ($user -> isLoggedIn()) {
			require ('theme/template-logged-in.php');
			//TODO:check the url -> if not something like /site/user then goto
		} else {
			//Includes the viewhandler if found
			if (file_exists('view/handler/' . $view)) {
				require ('view/handler/' . $view);

			}
			//Includes the view
			require ('view/' . $view);
		}
		?>

		<script src="<?php echo SCRIPT_ROOT?>bower_components/jquery/dist/jquery.min.js" type="text/javascript"></script>
		<script src="<?php echo SCRIPT_ROOT?>bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js" type="text/javascript"></script>
		<script src="<?php echo SCRIPT_ROOT?>bower_components/bootstrap-show-password/bootstrap-show-password.min.js" type="text/javascript"></script>
		<script src="<?php echo SCRIPT_ROOT?>bower_components/pwstrength-bootstrap/dist/pwstrength-bootstrap-1.2.8.min.js" type="text/javascript"></script>
		<script src="<?php echo SCRIPT_ROOT?>js/ownpasswordall.min.js" type="text/javascript"></script>
<!--
        <script src="<?php echo SCRIPT_ROOT?>js/password.js" type="text/javascript"></script>
        <script src="<?php echo SCRIPT_ROOT?>js/authentication.js" type="text/javascript"></script>
        <script src="<?php echo SCRIPT_ROOT?>js/ownpassword.js" type="text/javascript"></script>
-->

	</body>

</html>