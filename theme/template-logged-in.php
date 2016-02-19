<div class="userdata">
	<input id="user-token" type="hidden" value="<?php echo $_SESSION['user_token']; ?>">
	</input>
</div>
<div class="navbar navbar-inverse ">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="<?php echo SCRIPT_ROOT?>site/dashboard">
			<img src="<?php echo SCRIPT_ROOT?>/theme/images/logo-inverted.png" class="img-responsive logo-dashboard" alt="Logo">
			</a>
		</div>
		<div class="collapse navbar-collapse">
			<ul class="nav navbar-nav">
				<li>
					<a href="<?php echo SCRIPT_ROOT?>site/dashboard">Dashboard</a>
				</li>
				<li>
					<a href="<?php echo SCRIPT_ROOT?>site/account">Account</a>
				</li>
				<li>
					<a href="<?php echo SCRIPT_ROOT?>site/logout">Logout</a>
				</li>
			</ul>
		</div>
		<!--/.nav-collapse -->

	</div>
</div>
<div class ="container">

	<?php
//Includes the view
require ('view/'.$view)
	?>
</div>
<!-- /row -->
