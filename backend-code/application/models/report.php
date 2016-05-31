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
		$this->db->select("i.ID,i.Name,sum(l.quantity) Quantity");
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
		return $q->result_array(); //[0];
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
        $this->db->where("ifnull(Name,'')<>''", null, false);
		$q = $this->db->get('ReportMembers');
		return $q->result();
	}
	
	
	function getUnitNumbers() {
		$this->db->select("incident_unit_number");
		$this->db->distinct();
		$this->db->order_by("incident_unit_number", "asc");
		return $this->db->get('Reports')->result();
	}
	
	function get_by_unit($id = null){
		if(isset($id)){
			$this->db->where('incident_unit_number', $id);
			$query = $this->db->get('Reports');
		}else{
			$query = $this->db->get('Reports');
		}

		return $query->result();
	}
	function get_item_by_date($start, $end){
		$this->db->where('incident_start', $start);
		$q = $this->db->get('Reports');

		return $q->result();
	}
	function item_search($params){

		//echo "<pre>".var_export($params, true)."</pre>";

		$paramsBool = array();
		foreach ($params as $k => $v) {
			if ($v == "on") {
				$paramsBool[$k] = "on";
			}
		}

		//echo "<pre>".var_export($paramsBool, true)."</pre>";


		$sql = "SELECT r.* FROM Reports r WHERE 1=1 ";
		$sqlParams = array();

		/*$this->db->select('r.*'); //, i.Name, i.Category, l.quantity
		$this->db->from("Reports r");*/
		
		/*if(isset($params['month']) && $params['month'] != ''){
			$this->db->where('MONTH(r.incident_start)', $params['month']);
		}
		if(isset($params['year']) && $params['year'] != ''){
			$this->db->where('YEAR(r.incident_start)', $params['year']);
		}
		if(isset($params['incident-unit-number']) && $params["incident-unit-number"] != '') {
			$this->db->where('incident_unit_number',$params['incident-unit-number']);
		}*/

		if (count($paramsBool) > 0) {
			$sql .= "AND (";
			foreach ($paramsBool as $k => $v) {
				$k = str_replace('-', '_', $k); // keys passed on form have dashes, DB has underscores

				$sql .= $this->db->escape_str($k) . " = ? OR ";
				$sqlParams[] = $v;

			}
			$sql .= "1=0) ";
		}

        //$this->db->order_by('incident_start desc');

		//$q = $this->db->get();

		echo "<pre>".var_export($sql, true)."</pre>";
		echo "<pre>".var_export($sqlParams, true)."</pre>";

		$q = $this->db->query($sql, $sqlParams);
		
		$this->load->model('Item');
		$results = $q->result();
		foreach ($results as $key => $value) {
			$results[$key]->items = $this->get_entry_items($value->ID);
			foreach ($results[$key]->items as $itemKey => $itemValue) {
				$results[$key]->items[$itemKey]->Details = $this->Item->get_entry($itemValue->ItemID);
			}
			$results[$key]->members = $this->get_entry_members($value->ID);
		}
		return $results;
		
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
