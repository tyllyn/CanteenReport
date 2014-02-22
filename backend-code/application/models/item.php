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
			$end = $start;
			date_add($end, date_interval_create_from_date_string('1 month'));
			$month = $start->format("F");
			$data[$month + ' ' + $y] = $this->get_entries_items($itemId, $start, $end)[0][0];
			$m = $m - 1;
			if ($m == 0) {
				$m = 12;
				$y = $y - 1;
			}
		}
	
		return $data;
	}
	
	function get_entries_items($itemId, $start, $end) {
		$this->db->select("l.quantity");
		$this->db->from("LinkReportItem l");
		$this->db->join("Items i","i.id=l.ItemID","inner");
		$this->db->join("Reports r","r.id=l.ReportID","inner");
		$this->db->group_by("i.ID");
		if ($start != null) {
			$this->db->where('r.start >= ', $start);
		}
		if ($end != null) {
			$this->db->where('r.start < ', $end);
		}
		$this->db->where('i.ID = ', $itemId);
		return $this->db->get()->result();
		
	}
	
}

?>