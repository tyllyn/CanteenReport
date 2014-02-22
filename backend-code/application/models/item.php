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
	
}

?>