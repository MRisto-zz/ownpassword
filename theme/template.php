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
		<meta name="author" content="name">
		<meta name="description" content="description here">
		<meta name="keywords" content="keywords,here">
		<link rel="icon" href="<?php echo SCRIPT_ROOT?>theme/images/favicon.ico" type="image/vnd.microsoft.icon">
		<link rel="stylesheet" href="<?php echo SCRIPT_ROOT?>theme/css/style.css" type="text/css">
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

		<script src="<?php echo SCRIPT_ROOT?>bower_components/jquery/dist/jquery.js" type="text/javascript"></script>
		<script src="<?php echo SCRIPT_ROOT?>bower_components/bootstrap-sass/assets/javascripts/bootstrap.js" type="text/javascript"></script>
		<script src="<?php echo SCRIPT_ROOT?>js/ownpassword.js" type="text/javascript"></script>
		<script src="<?php echo SCRIPT_ROOT?>js/authentication.js" type="text/javascript"></script>
		<script src="<?php echo SCRIPT_ROOT?>js/passwordmanager.js" type="text/javascript"></script>
	</body>

</html>