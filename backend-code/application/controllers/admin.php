<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require(APPPATH.'libraries/REST_Controller.php');

class Admin extends REST_Controller{
	function view_reports_get(){
		$this->load->model('Report');
		$data = $this->Report->get_entries();
		$this->response($data);
	}

	function report_get(){
		$this->load->model('Report');
		$params = array(
			'id' => (isset($_GET['entry_id'])) ? $_GET['entry_id'] : null,
			'startdate' => (isset($_GET['date'])) ? $_GET['date'] : null,
			'month' => (isset($_GET['month'])) ? $_GET['month'] : null,
			'year' => (isset($_GET['year'])) ? $_GET['year'] : null
		);


		$data = $this->Report->get_entry_items($params);
		$this->response($data);
	}
}