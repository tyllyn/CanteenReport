<?php $this->load->view("header"); ?>

	<h1>Item Details</h1>
	
	<div>
		<label>Item: </label><?php print $Name; ?>
	</div>
	
	<div>
		<label>Category: </label><?php print $Category; ?>
	</div>
	
	<h2>Usage Over Past 2 Years</div>
	<div>
	
		<script>
			$(document).ready(function() {
			
var ctx = document.getElementById("myChart").getContext("2d");
var myNewChart = new Chart(ctx).Line(data,options);

var data = {
	labels : [<?php
	
// "January","February","March","April","May","June","July"
$output = "";
foreach ($result as $key => $value) {
	$output = "\"" . $key . "\",";
}
echo substr($output, 0, strlen($output)-1);
	
	?>],
	datasets : [
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : [<?php
			
//28,48,40,19,96,27,100
$output = "";
foreach ($result as $key => $value) {
	$output = "\"" . $value . "\",";
}
echo substr($output, 0, strlen($output)-1);

			
			?>]
		}
	]
}

			});
	
		<canvas id="myChart" width="400" height="400"></canvas>
		<h2>Items</h2>
		
		<?php
		$data["query"] = $reportitems;
		$this->load->view("database_output", $data);

		?>
		
	</div>

<?php $this->load->view("footer"); ?>