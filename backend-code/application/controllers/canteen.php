<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Canteen extends CI_Controller {

	public function index() {
		$this->load->view('welcome_message');
	}
	
	public function add($json) {
		var $res = json_decode($json);
		print_r($res);
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */