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
	
}

?>