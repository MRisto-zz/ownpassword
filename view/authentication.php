<div class="login-wrapper">
        <div class="login-page">
          <img src="<?php echo SCRIPT_ROOT?>/theme/images/logo.png" class="img-responsive" alt="Logo">
            <div class="messages">
        <?php
        if($alert != ''){
            echo '<div class="alert alert-danger" role="alert">'.$alert.'</div>';
        }
        if($info != ''){
            echo '<div class="alert alert-success" role="alert">'.$info.'</div>';
        }?>
            </div>
            <div class="form">
            	<?php if(REGISTRATION_AVAILABLE){?>
                <form class="register-form" id="registrationForm" action="" method="post">
                    <div class="input-group register register-username">
                        <input type="text" class="form-control" id="reg-username" placeholder="Username" name="username">
                        <span class="glyphicon glyphicon-remove input-group-addon reg-username" id="basic-addon" aria-hidden="true" data-toggle="popover" rel="popover1" data-placement="right" data-content=" " title=" "></span>

                    </div>

                    <div class="input-group register register-password">
                        <input type="password" class="form-control" id="reg-password" placeholder="Password" name="password">
                        <span class="glyphicon glyphicon-remove input-group-addon reg-password" id="basic-addon" aria-hidden="true" data-toggle="popover" rel="popover2" data-placement="right" data-content=" " title=" "></span>
                    </div>

                    <div class="input-group register register-password-repeat">
                        <input type="password" class="form-control" id="reg-password-repeat" placeholder="Repeat password" name="password2">
                        <span class="glyphicon glyphicon-remove input-group-addon reg-password-repeat" id="basic-addon" aria-hidden="true" data-toggle="popover" rel="popover3" data-placement="right" data-content=" " title=" "></span>
                    </div>

                    <div class="input-group register regiser-email">
                        <input type="text" class="form-control" id="reg-email" placeholder="Email" name="email">
                        <span class="glyphicon glyphicon-remove input-group-addon reg-email" id="basic-addon" aria-hidden="true" data-toggle="popover" rel="popover4" data-placement="right" data-content=" " title=" "></span>
                    </div>

                    <button id="register-button" disabled="true" type="submit" class="btn btn-primary btn-register" name="register">Create</button>

                    <p class="message">Bereits Registiert? <a href="#">Login</a></p>

                </form>
                <?php }?>
                <form class="login-form" action="" method="post">
                    <div class="input-group login login-username">
                        <input type="text" class="form-control" placeholder="Username" name="username">
                    </div>

                    <div class="input-group login login-password">
                        <input type="password" class="form-control" placeholder="Password" name="password">
                    </div>

                    <button type="submit" name="login" class="btn btn-primary btn-login">Login</button>
                    <?php if(REGISTRATION_AVAILABLE){?>
                    <p class="message">Noch nicht registriert? <a href="#">Create an account</a></p>
                    <?php }?>
                </form>
            </div>
    </div>
    </div>