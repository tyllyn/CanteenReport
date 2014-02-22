<?php

class Canteenmodel extends CI_Model {

    var $unitNumber = "";
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
	
	var $remarks;
	
	
	

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

}

?>