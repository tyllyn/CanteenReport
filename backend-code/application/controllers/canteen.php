<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Canteen extends CI_Controller {

	public function index() {
		$this->load->view('welcome_message');
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
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */

?>