<?php

class Item extends CI_Model {

	var $name;
	
	

    function __construct() {
        // Call the Model constructor
        parent::__construct();
    }
    
    

	function get_entries() {
		$query = $this->db->get('Items');
		
		return $query->result();
	}
	
	function link_to_report($itemId, $reportId, $quantity) {
		$this->db->trans_start();
		$data = array(
			'ItemID' => $itemId,
			'ReportID' => $reportId,
			'Quantity' => $quantity
		);
		$this->db->insert('LinkReportItem',$data);
		$insert_id = $this->db->insert_id();
		$this->db->trans_complete();
		return $insert_id;
	}
	
	function report_last_2y($itemId) {
		date_default_timezone_set('America/New_York'); 
		$date = new DateTime();
		$m = $date->format("m");
		$y = $date->format("Y");
		
		
		for ($i = 0; $i < 24; $i++) {
			$start = new DateTime($y."-".$m."-1");
			$end = new DateTime($y."-".$m."-1");
			date_add($end, date_interval_create_from_date_string('1 month'));
			
			$res = $this->get_entries_items($itemId, $start->format("Y-m-d"), $end->format("Y-m-d"));
			if ($res == null) {
				$res = 0;
			} else {
				$res = $res[0]->q;
			}
			$data[$start->format('F') . ' ' . $y] = $res;
			$m = $m - 1;
			if ($m == 0) {
				$m = 12;
				$y = $y - 1;
			}
		}
	
		return array_reverse($data);
	}
	
	function get_entries_items($itemId, $start, $end) {
	//die($start . '---' . $end . '---' . $itemId);
		$this->db->select("sum(l.quantity) q");
		$this->db->from("LinkReportItem l");
		$this->db->join("Items i","i.ID=l.ItemID","inner");
		$this->db->join("Reports r","r.ID=l.ReportID","inner");
		$this->db->group_by("i.ID");
		$this->db->where('r.incident_start >= ', $start);
		$this->db->where('r.incident_start < ', $end);
		$this->db->where('i.ID', $itemId);
		return $this->db->get()->result();
		
	}
	
}

?>