<?php $this->load->view('header'); ?>

	<h1>Test Links</h1>

	<ul>
		<li><a href="/index.php/canteen/viewreports">View Reports</a></li>
		<li><a href="/index.php/canteen/viewreport/1">View A Report</a></li>
		<li><a href="/index.php/canteen/viewitems">View Items</a></li>
		<li><a href="/index.php/canteen/aggitems">All Items Aggregate</a></li>
		<li><a href="/index.php/canteen/aggitems/2014-02-01/2014-03-01/">Items Aggregate - Feb 2014</a></li>
		<li><a href="/index.php/canteen/viewitem/1">Example Item Overview</a></li>
	</ul>
	
<?php $this->load->view('footer'); ?>