<?php $this->load->view("header"); ?>

	<h2>Report Details</h2>
	<div>
		<label>Unit:</label> <?php echo $report['incident_unit_number'] ?>
	</div>
	<div>
		<label>Date of Incident:</label> <?php echo $report["incident_start"] ?>
	</div>
	
	
	<div>
		<ul>
			<?php
				foreach ($report as $key => $value) {
					print "<li>$key = $value</li>";
				}
			?>
		</ul>
	</div>
	
	
	<div>
		<h2>Items</h2>
		
		<?php
		$data["query"] = $reportitems;
		$this->load->view("database_output", $data);

		?>
		
	</div>
	<div>
		<h2>Members</h2>
		
		<?php
		$data["query"] = $reportmembers;
		$this->load->view("database_output", $data);

		?>
		
	</div>

<?php $this->load->view("footer"); ?>