<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require(APPPATH.'libraries/REST_Controller.php');

class Admin extends REST_Controller{
	function view_reports_get(){
		$this->load->model('Report');
		$data = $this->Report->get_entries();
		$this->response($data);
	}
}