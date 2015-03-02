<div class="container">

    <form class="form-signin" action="/Admin/login" method="post">

        <h2 class="form-signin-heading">Sign in</h2>

        <div class="form-group">
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" name="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
        </div>

        <div class="form-group">
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Password" required="">
        </div>

        <div class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>

<?php
	if ($failed) {
		echo '<div class="alert alert-danger" role="alert">Your email address or password was not correct.</div>';
	}
?>

        <div class="form-group">
            <button class="btn btn-lg btn-default" type="submit">Sign in</button>
        </div>

    </form>

</div>