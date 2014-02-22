<?php $this->load->view("header"); ?>

	<h2>Report Details</h2>
	<div>
		<label>Unit:</label> <?php echo $report['Unit'] ?>
	</div>
	<div>
		<label>Date of Incident:</label> <?php echo $report["start"] ?>
	</div>
	
	<div>
		<h2>Items</h2>
		
		<?php
		$data["query"] = $reportitems;
		$this->load->view("database_output", $data);

		?>
		
	</div>

<?php $this->load->view("footer"); ?>