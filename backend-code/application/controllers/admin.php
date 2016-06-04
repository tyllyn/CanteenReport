<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//require(APPPATH.'libraries/REST_Controller.php');

function redirect($path) {
	header("Location: $path");
	die();
}

class Admin extends CI_Controller {

	private function requireLogin() {
		$this->load->model('User');
		if (!$this->User->isAuthenticated()) {
			redirect('/Admin/login');
		}
	}

	public function index() {
		$this->requireLogin();
		$this->load->model('User');
		$data['user'] = $this->User;
		
		$this->view('index',$data);
	}
	public function login() {

		$this->load->model('User');
		$data['failed'] = false;
		if ($this->User->isAuthenticated()) {
			redirect('/Admin/index');
		}
		if (array_key_exists('inputEmail',$_POST) && array_key_exists('inputPassword',$_POST)) {
			$res = $this->User->authenticate($_POST['inputEmail'], $_POST['inputPassword']);
			if ($res) {
				redirect('/Admin/index');
			}
			$data['failed'] = true;
		}
		$data['user'] = $this->User;
		$this->view('login', $data);

	}
	public function logout() {
		$this->load->model('User');
		$this->User->logout();
		redirect('/Admin/index');
	}

	private function getParamFromRequestUrl($key) {

		$url = $_SERVER['REQUEST_URI'];
		$params = explode('?', $url);
		$params = $params[1];
		$params = explode('&', $params);

		foreach ($params as $p) {
			$p = explode('=', $p);
			if ($p[0] == $key) {
				return $p[1];
			}
		}
		return null;

	}

	public function report() {

		$id = $this->getParamFromRequestUrl('id');

		if ($id == null || !is_numeric($id)) {
			redirect('/Admin/reportsearch');
		}

		$this->load->model('Report');
		$data['report'] = $this->Report->get_entry($id);
		$data['reportitems'] = $this->Report->get_entry_items($id);
		$data['reportmembers'] = $this->Report->get_entry_members($id);

		$this->view('report', $data);

	}
	public function reportsearch() { 
	
		$this->load->model('Report');
		$data['params'] = $_POST;
		$data['reports'] = $this->Report->item_search($_POST); //$this->Report->get_entries();
	
		$this->view('reportsearch',$data); 
	}
	public function summary() { $this->view('summary'); }

	public function view($page = 'index', $data = array()) {

		if (!file_exists(APPPATH . '/views/admin/'.$page.'.php')) {
			show_404();
		}

		$data['title'] = ucfirst($page);

		$this->load->view('templates/header', $data);
		$this->load->view('admin/'.$page, $data);
		$this->load->view('templates/footerNoJs', $data);

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