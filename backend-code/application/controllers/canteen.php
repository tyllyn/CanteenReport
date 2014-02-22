<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Canteen extends CI_Controller {

	public function index() {
		$this->load->view('canteen/index');
	}
	
	public function add($json) {
	$json='[{
    "name": "incident-start",
    "value": ""
}, {
    "name": "incident-location",
    "value": ""
}, {
    "name": "incident-route",
    "value": ""
}, {
    "name": "team-driver",
    "value": ""
}, {
    "name": "team-member-1",
    "value": ""
}, {
    "name": "team-member-2",
    "value": ""
}, {
    "name": "team-member-3",
    "value": ""
}, {
    "name": "team-refferal-name",
    "value": ""
}, {
    "name": "team-refferal-title",
    "value": ""
}, {
    "name": "team-drink-coffee-amount",
    "value": ""
}, {
    "name": "team-drink-cocoa-amount",
    "value": ""
}, {
    "name": "team-drink-tea-amount",
    "value": ""
}, {
    "name": "team-cold-drinks-amount",
    "value": ""
}, {
    "name": "team-water-amount",
    "value": ""
}, {
    "name": "team-food-donuts-amount",
    "value": ""
}, {
    "name": "team-food-cookies-amount",
    "value": ""
}, {
    "name": "team-food-sandwiches-amount",
    "value": ""
}, {
    "name": "team-food-hot-dogs-amount",
    "value": ""
}, {
    "name": "team-water-amount",
    "value": ""
}, {
    "name": "team-clothing-gloves-amount",
    "value": ""
}, {
    "name": "team-clothing-blankets-amount",
    "value": ""
}, {
    "name": "team-clothing-amount",
    "value": ""
}, {
    "name": "team-clothing-hand-warmers--amount",
    "value": ""
}, {
    "name": "services-counseling-administer",
    "value": ""
}, {
    "name": "services-counseling-individual",
    "value": ""
}, {
    "name": "services-counseling-reason",
    "value": ""
}, {
    "name": "services-counseling-phone-number",
    "value": ""
}, {
    "name": "end-time",
    "value": ""
}, {
    "name": "end-total-mileage",
    "value": ""
}, {
    "name": "end-route-time",
    "value": ""
}]"';
		$res = json_decode($json);
		print_r($res);
	}
	
	public function viewitems() {
		$this->load->model('Item');
		$data['query'] = $this->Item->get_entries();
		$this->load->view('database_output', $data);
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