<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require(APPPATH.'libraries/REST_Controller.php');

class Admin extends REST_Controller{

	public function index() {
		$this->view('index');
	}

	public function view($page = 'index') {

		if (!file_exists(APPPATH . '/views/admin/'.$page.'.php')) {
			show_404();
		}

		$data['title'] = ucfirst($page);

		$this->load->view('templates/header', $data);
		$this->load->view('admin/'.$page, $data);
		$this->load->view('templates/footer', $data);

	}


	function view_reports_get(){
		$this->load->model('Report');
		$data = $this->Report->get_entries();
		$this->response($data);
	}

	function report_get(){
		$this->load->model('Report');
		$params = array(
			'id' => (isset($_GET['unit_id'])) ? $_GET['unit_id'] : null,
			'startdate' => (isset($_GET['date'])) ? $_GET['date'] : null,
			'month' => (isset($_GET['month'])) ? $_GET['month'] : null,
			'year' => (isset($_GET['year'])) ? $_GET['year'] : null
		);


		$data = $this->Report->item_search($params);

		if(count($data) > 0){
			$this->response($data);
		}else{
			$this->response(array('status'=>'No Results.'));
		}
	}
}