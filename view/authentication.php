<div class="login-wrapper form mouse-cursor-default">
	<div class="login-page">
		<img src="<?php echo SCRIPT_ROOT?>/theme/images/logo.png" class="img-responsive" alt="Logo">
		<div class="messages">
			<?php
			if ($alert != '') {
				echo '<div class="alert alert-danger" role="alert">' . $alert . '</div>';
			}
			if ($info != '') {
				echo '<div class="alert alert-success" role="alert">' . $info . '</div>';
			}
			?>
		</div>
		<div>
			<?php if(REGISTRATION_AVAILABLE){
			?>

			<form class="register-form" id="registrationForm" action="" method="post" autocomplete="off">
				<div class="reg-username-feedback-content"></div>
				<div class="input-group register reg-username">
					<input type="text" class="form-control" id="reg-username" placeholder="Username" name="username">
					<div class="input-group-addon">
						<span class="glyphicon glyphicon-remove reg-username-feedback"></span>
					</div>

				</div>
				<div class="reg-password-feedback-content"></div>
				<div class="input-group register reg-password">
					<input type="password" class="form-control" id="reg-password" placeholder="Password" name="password">
					<div class="input-group-addon">
						<span class="glyphicon glyphicon-remove reg-password-feedback"></span>
					</div>
				</div>
				<div class="reg-email-feedback-content"></div>
				<div class="input-group register reg-email">
					<input type="text" class="form-control" id="reg-email" placeholder="Email" name="email">
					<div class="input-group-addon">
						<span class="glyphicon glyphicon-remove reg-email-feedback"></span>
					</div>
				</div>
				<div class="reg-submit-feedback-content"></div>
				<button id="register-button" type="submit" class="btn btn-primary btn-register" name="register">
					Create
				</button>

				<p class="message">
					Bereits Registiert? <a href="#">Login</a>
				</p>

			</form>
			<?php } ?>
			<form class="login-form" action="" method="post">
				<div class="input-group login login-username">
					<input type="text" class="form-control" placeholder="Username" name="username">
				</div>

				<div class="input-group login login-password">
					<input type="password" class="form-control" placeholder="Password" name="password">
				</div>

				<button type="submit" name="login" class="btn btn-primary btn-login">
					Login
				</button>
				<?php if(REGISTRATION_AVAILABLE){
				?>
				<p class="message">
					Noch nicht registriert? <a href="#">Create an account</a>
				</p>
				<?php } ?>
			</form>
		</div>
	</div>
</div>