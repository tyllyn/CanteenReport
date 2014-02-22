

<div id="container">
	<?php

	if ($query == null || sizeof($query) < 1) {
		print "NO DATA!";
	} else {
	
print "<table>";	

print "<tr>";
foreach ($query[0] as $key => $value) {
	print "<th>$key</th>";
}
print "</tr>";
foreach ($query as $key => $value) {


	print "<tr>";
	
	
	
	foreach ($value as $col => $val) {
	
		print "<td>$val</td>";
	
	}
	
	print "</tr>";

}
print "</table>";

}
		
		//print_r($query);
	?>
</div>
