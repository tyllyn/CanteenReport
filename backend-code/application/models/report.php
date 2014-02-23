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
	//2014-02-22 00:00:00
	function get_entries_items($start, $end) {
		$this->db->select("i.ID,i.name,sum(l.quantity)");
		$this->db->from("LinkReportItem l");
		$this->db->join("Items i","i.id=l.ItemID","inner");
		$this->db->join("Reports r","r.id=l.ReportID","inner");
		$this->db->group_by("i.ID");
		if ($start != null) {
			$this->db->where('r.incident_start >= ', $start);
		}
		if ($end != null) {
			$this->db->where('r.incident_start < ', $end);
		}
		return $this->db->get()->result();
		
	}
	
	function get_entry($id) {
		$this->db->where('id',$id);
		$q = $this->db->get('Reports');
		return $q->result_array()[0];
	}
	
	function get_entry_items($id) {
		//incident_unit_number
		$this->db->where('ReportID',$id);
		$q = $this->db->get('LinkReportItem');
		return $q->result();
	}
	function get_entry_members($id) {
		//incident_unit_number
		$this->db->where('ReportID',$id);
		$q = $this->db->get('ReportMembers');
		return $q->result();
	}
	function get_by_unit($id = null){
		if(isset($id)){
			$this->db->where('incident_unit_number', $id);
			$query = $this->db->get('Reports');
		}else{
			$query = $this->db->get('Reports');
		}

		return $q->result();
	}
	function get_item_by_date($start, $end){
		$this->db->where('incident_start', $start);
		$q = $this->db->get('Reports');

		return $q->result();
	}
	function add($data) {
		$this->db->trans_start();
		$this->db->insert('Reports',$data);
		$insert_id = $this->db->insert_id();
		$this->db->trans_complete();
		return $insert_id;
	}
	
	function update($id, $data) {
		$this->db->where('ID', $id);
		$this->db->update('Reports', $data); 
	}
	
}

/*

		}elseif($params['id'] == null && $params['month'] != null || $params['year'] != null || $params['day']){

			if(isset($params['month'])){
				$this->db->where('MONTH(incident_start)', $params['month']);
			}
			if(isset($params['year'])){
				$this->db->where('YEAR(incident_start)', $params['year']);
			}
			if(isset($params['day'])){
				$this->db->where('DAY(incident_start)', $params['day']);
			}

			$q = $this->db->get('Reports');
		}else{
			$q = $this->db->get('LinkReportItem');
		}
*/