<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Canteen extends CI_Controller {

	public function index() {
		$this->load->view('canteen/index');
	}
	
	public function add() {
	//$json=$_POST["data"];
	$json='[{
    "name": "incident-start",
    "value": "2014-02-22 15:35:00"
}, {
    "name": "incident-location",
    "value": "South Side"
}, {
    "name": "incident-route",
    "value": ""
}, {
    "name": "team-driver",
    "value": "Joshua Petry"
}, {
    "name": "team-member-1",
    "value": "Prince"
}, {
    "name": "team-member-2",
    "value": "Wyatt"
}, {
    "name": "team-member-3",
    "value": ""
}, {
    "name": "team-refferal-name",
    "value": ""
}, {
    "name": "team-refferal-title",
    "value": ""
}]"';
		$res = json_decode($json);
		//$data = new array();
		foreach ($res as $value) {
			$data[str_replace ("-","_", $value->name)] = $value->value;
		}
		
		$this->load->model('Report');
		$insertId = $this->Report->add($data);
		
		print("success:" . $insertId);
	}
	
	public function viewitems() {
		$this->load->model('Item');
		$data['query'] = $this->Item->get_entries();
		$this->load->view("header");
		$this->load->view('database_output', $data);
		$this->load->view("footer");
	}
	
	public function viewreports() {
		$this->load->model('Report');
		$data['query'] = $this->Report->get_entries();
		$this->load->view('canteen/report_list', $data);
	}
	
	public function viewreport($id) {
		$this->load->model('Report');
		$data['report'] = $this->Report->get_entry($id);
		$data['reportitems'] = $this->Report->get_entry_items($id);
		$this->load->view('canteen/report',$data);
	}
	
	public function aggitems($start = null, $end = null) {
		$this->load->model('Report');
		$data["query"] = $this->Report->get_entries_items($start, $end);
		$this->load->view("header");
		$this->load->view('database_output',$data);
		$this->load->view("footer");
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */

?>