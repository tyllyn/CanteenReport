<div class="list-group" style="max-width: 320px; margin: 0 auto">

<?php 
	$currentUser = $user->getUser();
?>
    <!-- <a href="/admin/login" class="list-group-item">Sign In</a> -->
	<span class="list-group-item"><?php echo 'Welcome, ' . $currentUser->username . '<br/>'; ?></span>
    <a href="/admin/reportsearch" class="list-group-item">Search</a>
    <a href="/admin/summary" class="list-group-item">Summary</a>
    <a href="/admin/report" class="list-group-item">Report</a>
</div>