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
		
			// hard coding IDs because #yolo
			switch ($value->name) {
				case "team-drink-coffee-amount":
					$items[1] => $value->value;
					break;
				case "team-drink-cocoa-amount":
					$items[2] => $value->value;
					break;
				case "team-drink-tea-amount":
					$items[3] => $value->value;
					break;
				case "team-cold-drinks-amount":
					$items[4] => $value->value;
					break;
				case "team-water-amount":
					$items[5] => $value->value;
					break;
					
					
				case "team-food-donuts-amount":
					$items[6] => $value->value;
					break;
				case "team-food-cookies-amount":
					$items[7] => $value->value;
					break;
				case "team-food-sandwiches-amount":
					$items[8] => $value->value;
					break;
				case "team-food-hot-dogs-amount":
					$items[9] => $value->value;
					break;
				case "team-food-snacks-amount":
					$items[12] => $value->value;
					break;
					
					
				case "team-clothing-gloves-amount":
					$items[10] => $value->value;
					break;
				case "team-clothing-blankets-amount":
					$items[11] => $value->value;
					break;
				case "team-clothing-amount":
					$items[13] => $value->value;
					break;
				case "team-clothing-hand-warmers--amount":
					$items[14] => $value->value;
					break;
					
					
				default:
					$data[str_replace ("-","_", $value->name)] = $value->value;
			}
		}
		
		$this->load->model('Report');
		$reportId = $this->Report->add($data);
		
		$this->load->model('Item');
		foreach ($item as $key => $value) {
			if (is_numeric($value) && $value > 0) {
				$this->Item->link_to_report($reportId, $key, $value);
			}
		}
		
		print("success:" . $reportId);
	}
	
	public function viewitem($itemId) {
	
		$this->load->model('Item');
		$data = $this->Item->report_last_2y($itemId);
		print_r($data);
		//$this->load->view("database_output",$data);
		
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