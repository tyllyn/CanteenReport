<style>
    .todo {
        font-size: 0.9em;
        color: #000;
        background-color: #ffff00;
        border: 1px solid #202020;
        padding: 2px;
        margin: 2px;
    }
    .todo:before {
        content: "TODO: ";
        font-weight: bold;
    }
</style>


<?php

// making phpstorm aware
$report;
$reportmembers;
$reportitems;



class helper {
    public $report;

    function p($key) {
        echo $this->report[0][$key];
    }

    function get($key) {
        return $this->report[0][$key];
    }

    function date($dt) {
        $date = new DateTime($dt);
        return $date->format('Y-m-d, H:i:s');
    }

}

$h = new helper();
$h->report = $report;

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
                                if ($h->get('final') == 'true') {
                                    $statusCss = 'label-success';
                                    $status = 'Complete';
                                } else {
                                    $statusCss = 'label-danger';
                                    $status = 'Incomplete';
                                }

                            ?>
                            <span class="label <?php echo $statusCss; ?>"><?php echo $status; ?></span>
                        </li>
                        <li class="list-group-item"><strong>Report ID Number:</strong> <?php $h->p('ID') ?></li>
                        <li class="list-group-item"><strong>Unit Number:</strong> <?php $h->p('incident_unit_number') ?></li>
                        <li class="list-group-item"><strong>Dispatch:</strong> <?php $h->date($h->get('incident_start')); ?><span class="todo">format date (01/01/2015, 9:00am)</span></li>
                        <li class="list-group-item"><strong>In Route:</strong> <?php $h->p('incident_inroute'); ?><span class="todo">format date (01/01/2015, 9:00am)</span></li>
                        <li class="list-group-item"><strong>On the Scene:</strong> <?php $h->p('incident_onscene'); ?><span class="todo">format date (01/01/2015, 9:00am)</span></li>
                        <li class="list-group-item"><strong>Location of Incident:</strong>
                            <?php $h->p('incident_address'); ?>, <?php $h->p('incident_city'); ?>
                            <?php $h->p('incident_state'); ?> <?php $h->p('incident_zipcode'); ?>
                        </li>
                        <?php
                            $reportTypeAry = array();
                            if ($h->get('incident_type_fire') !== null) { $reportTypeAry[] = 'Fire'; }
                            if ($h->get('incident_type_flood') !== null) { $reportTypeAry[] = 'Flood'; }
                            if ($h->get('incident_type_hazmat') !== null) { $reportTypeAry[] = 'Hazmat'; }
                            if ($h->get('incident_type_special_event') !== null) { $reportTypeAry[] = 'Special Event'; }
                            if ($h->get('incident_type_maintenence') !== null) { $reportTypeAry[] = 'Maintenance'; }
                            if ($h->get('incident_type_other') == 'on') { $reportTypeAry[] = "Other: ".$h->get('incident_other'); }
                            if (count($reportTypeAry) == 0) {
                                $reportType = "Not Set";
                            } else {
                                $reportType = implode(", ", $reportTypeAry);
                            }
                        ?>
                        <li class="list-group-item"><strong>Type of Call:</strong> <?php echo $reportType; ?></li>
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
						<h3 class="panel-title">Items <span class="todo">Replace item number with the appropriate name.</span></h3>
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