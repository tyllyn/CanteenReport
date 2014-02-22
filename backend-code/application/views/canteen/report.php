<html>

	<head>
		<style>
			label { font-weight: bold; }
		</style>
	</jead>

<body>


	<div>
		<label>Unit:</label> <?php echo $report['Unit'] ?>
	</div>
	
	<div>
		<h2>Items</h2>
		<table>
		
		<?php
		
		$this->load->view("database_output", $reportitems);

		?>
		
		</table>
	</div>


</body>

</html>