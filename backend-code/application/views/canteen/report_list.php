<?php $this->load->view("header"); ?>

	<h1>Reports</h1>
<div id="container">
		<?php
		

	if ($query == null || sizeof($query) < 1) {
		print "NO DATA!";
	} else {
	
print "<table>";	

print "<tr>";
// foreach ($query[0] as $key => $value) {
	// print "<th>$key</th>";
// }

print "<th>ID</th><th>Unit</th><th>Location</th><th>Date</th>";

print "<th>&nbsp;</th>";
print "</tr>";

foreach ($query as $key => $value) {


	print "<tr>";
	
	$id = 0;
	print "<td>".$value->incident_unit_number."</td>";
	print "<td>".$value->incident_location."</td>";
	print "<td>".$value->incident_start."</td>";
	
	// foreach ($value as $col => $val) {
	
		// if ($col == "ID") {
			// $id = $val;
		// }
		// print "<td>$val</td>";
	
	// }
	print "<td><a href=\"/backend-code/index.php/canteen/viewreport/" . $id . "\">View</a></td>";
	
	print "</tr>";

}
print "</table>";

}
		
		//print_r($query);
	?>
</div>

		
	</div>

<?php $this->load->view("footer"); ?>