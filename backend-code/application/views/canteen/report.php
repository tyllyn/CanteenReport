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
		$data["query"] = $reportitems;
		$this->load->view("database_output", $data);

		?>
		
		</table>
	</div>


</body>

</html>