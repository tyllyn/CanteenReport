<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Canteen extends CI_Controller {

	public function index() {
		$this->load->view('canteen/index');
	}
	
	public function add($json) {
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
		$this->load->view('database_output', $data);
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