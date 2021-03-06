<?php

function getNavClass($url) {

	$c = empty($_GET['c']) ? 'Admin' : $_GET['c'];
	$m = empty($_GET['m']) ? 'index' : $_GET['m'];


	$path = "/".$c."/".$m;
	$path = explode("?", $path, 1);
	$path = $path[0];
	$path = explode("#", $path, 1);
	$path = $path[0];
	$path = strtolower($path);
	if ($path == $url) {
		return "active";
	}
	return "";
}
?>

<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="format-detection" content="telephone=no">

	<!-- WARNING: for iOS 7, remove the width=device-width and height=device-height attributes. See https://issues.apache.org/jira/browse/CB-4323 -->
	<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi">

	<title>Emergency Disaster Services - Canteen Report</title>

	<link rel="stylesheet" href="/css/main.css">
	<link rel="stylesheet" href="/js/jquery-ui-1.11.4.custom/jquery-ui.min.css" />
	<script src="/js/jquery-ui-1.11.4.custom/external/jquery/jquery.js"></script>
	<script src="/js/jquery-ui-1.11.4.custom/jquery-ui.js"></script>
	<script>

		$(document).ready(function() {

			$( ".datepicker" ).datepicker({
			});

		});

	</script>
</head>

<body>
<nav class="navbar navbar-default navbar-canteen navbar-login">

	<div class="container-fluid">

		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">

			<a class="navbar-brand" href="/">
				<img src="/img/logo-emergency-disaster-services.gif" alt="Brand">
			</a>

		</div>
		<ul class="nav nav-pills nav-canteen navbar-right">
			<li role="presentation" class="<?php echo getNavClass('/admin/reportsearch'); ?>">
				<a href="/admin/reportsearch">Reports</a>
			</li>
			<li role="presentation" class="<?php echo getNavClass('/admin/summary'); ?>">
				<a href="/admin/summary">Summary</a>
			</li>
			<li role="presentation" class="<?php echo getNavClass('/admin/logout'); ?>">
				<a href="/admin/logout">Logout</a>
			</li>
		</ul>

	</div>

</nav>

