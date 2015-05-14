<?php

// $report
// $reportmembers;
// $reportitems;
global $report, $reportmembers, $reportitems;

/**
 * Prints an item.
 * @param $report
 * @param null $key
 */
function p($key = null) {
    global $report;
    echo $report[0][$key];
}

function get($key) {
    global $report;
    return $report[0][$key];
}

function debug($title, $obj) {
    print "<b>$title:</b><textarea rows=\"5\" cols=\"80\">" . var_export($obj, true) . "</textarea><br/><br/>";
}

if (array_key_exists("debug", $_GET)) {


    debug("Report",$report);
    debug("Items",$reportitems);
    debug("Members",$reportmembers);

}

?>




<section>

    <div class="container-fluid">

        <div class="page-header page-header-canteen">
            <h1>Canteen Report</h1>
            <button class="btn btn-default btn-print glyphicon glyphicon-print">Print</button>
        </div>

        <div class="row">

            <div class="col-sm-4 col-md-3">
                <a href="/admin/reportsearch" class="btn btn-lg btn-primary btn-block">Find a Report</a>
                <a href="/admin/summary" class="btn btn-lg btn-primary btn-block">Create a Summary</a>
            </div>

            <div class="report-data-container col-sm-8 col-md-9">

                <div class="panel panel-default">

                    <div class="panel-heading">
                        <h3 class="panel-title">Incident</h3>
                    </div>

                    <ul class="list-group">
                        <li class="list-group-item"><strong>Report Status:</strong>
                            <?php

                                // label-default, label-success, label-primary, label-danger, label-info, label-warning
                                if (get('final') == 'true') {
                                    $statusCss = 'label-success';
                                    $status = 'Complete';
                                } else {
                                    $statusCss = 'label-danger';
                                    $status = 'Incomplete';
                                }

                            ?>
                            <span class="label <?php echo $statusCss; ?>"><?php echo $status; ?></span>
                        </li>
                        <li class="list-group-item"><strong>Report ID Number:</strong> <?php p('ID') ?></li>
                        <li class="list-group-item"><strong>Unit Number:</strong> <?php p('incident_unit_number') ?></li>
                        <li class="list-group-item"><strong>Dispatch:</strong> 01/01/2015, 9:00am</li>
                        <li class="list-group-item"><strong>In Route:</strong> 01/01/2015, 9:00am</li>
                        <li class="list-group-item"><strong>On the Scene:</strong> 01/01/2015, 9:00am</li>
                        <li class="list-group-item"><strong>Location of Incident:</strong> 123 Address Street, Pittsburgh, PA 15222</li>
                        <li class="list-group-item"><strong>Type of Call:</strong> Fire/ Alarm/ Companies, Hazmat</li>
                    </ul>

                </div>

                <div class="panel panel-default">

                    <div class="panel-heading">
                        <h3 class="panel-title">Team</h3>
                    </div>

					<ul class="list-group">
					<?php 
					foreach ($reportmembers as $member) {
						//var_export($member);
						print <<<EOD
                        <li class="list-group-item"><strong>Member:</strong> {$member->Name}</li>
EOD;
						
					}
					?>
					</ul>
					
                    

                </div>

				<div class="panel panel-default">
				
					<div class="panel-heading">
						<h3 class="panel-title">Items</h3>
					</div>
					
					<ul class="list-group">
					<?php
					foreach ($reportitems as $item) {
						print <<<EOD
						<li class="list-group-item">Item #{$item->ID} - {$item->Quantity} {$item->ServingSize}</li>
EOD;
					}
					?>
					</ul>
				
				</div>
				
                <div class="page-header page-header-canteen clearfix">
                    <button class="btn btn-default btn-print pull-right glyphicon glyphicon-print">Print</button>
                </div>

            </div>
        </div>

    </div>
</section>