<?php $this->load->view("header"); ?>

	<h2>Report Details</h2>
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

<?php $this->load->view("footer"); ?>