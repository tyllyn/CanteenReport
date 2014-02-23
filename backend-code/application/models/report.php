<?php

class Report extends CI_Model {

	var $id;
	var $unit;
	var $start;
	var $location;

    /*var $unitNumber = "";
	var $dateIncident;
	var $timeIncident
	var $timeInRoute;
	var $timeFinished;
	var $returnMileage;
	var $departMileage;
	var $totalMileage;
	
	var $fuelLevel;
	var $waterLevel;
	
	var $addressIncident;
	var $cityIncident;
	var $stateIncident;
	var $zipIncident;
	
	var $typeOfCall;
	
	var $counseling;
	var $occurrences;
	var $individualNumbers;
	
	var $remarks;*/
	
	
	

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    
    function get_last_ten_entries()
    {
        $query = $this->db->get('entries', 10);
        return $query->result();
    }

    function insert_entry() 
	{
        $this->title   = $_POST['title']; // please read the below note
        $this->content = $_POST['content'];
        $this->date    = time();

        $this->db->insert('entries', $this);
    }

    function update_entry()
    {
        $this->title   = $_POST['title'];
        $this->content = $_POST['content'];
        $this->date    = time();

        $this->db->update('entries', $this, array('id' => $_POST['id']));
    }

	
	function get_entries() {
		$query = $this->db->get('Reports');
		return $query->result();
	}
	
	function get_entries_items($start, $end) {
		$this->db->select("i.ID,i.name,sum(l.quantity)");
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
		return $this->db->get()->result();
		
	}
	
	function get_entry($id) {
		$this->db->where('id',$id);
		$q = $this->db->get('Reports');
		return $q->result_array()[0];
	}
	
	function get_entry_items($id) {
		$this->db->where('ReportID',$id);
		$q = $this->db->get('LinkReportItem');
		return $q->result();
	}
	
	function add($data) {
		$this->db->trans_start();
		$now = new DateTime();
		$data["LastUpdate"] = $now->format('Y-m-d H:i:s')
		$this->db->insert('Reports',$data);
		$insert_id = $this->db->insert_id();
		$this->db->trans_complete();
		return $insert_id;
	}
	
	function update($id, $data) {
		$this->db->where('ID', $id);
		$now = new DateTime();
		$data["LastUpdate"] = $now->format('Y-m-d H:i:s')
		$this->db->update('Reports', $data); 
	}
	
}

?>