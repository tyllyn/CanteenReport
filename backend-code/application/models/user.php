<?php

class User extends CI_Model {

	var $id;
	var $username;
	var $auth = false;

    function __construct() {
        // Call the Model constructor
        parent::__construct();
    }
    function doHash($pass) {
		return hash('sha512',$pass);
	}
	
    function authenticate($name, $password) {
		
		$hashed = $this->doHash($password);
		
		$this->startSession();
		$this->db->select('ID');
		$this->db->where('Username', $name);
		$this->db->where('Password', $hashed);
		$q = $this->db->get('Users');
		$data = $q->result_array();

		if (count($data) == 0) {
			$_SESSION['user'] = null;
			return false;
		}
		$this->id = $data[0]['ID'];
		$this->username = $name;
		$_SESSION['user'] = $this;
		return true;

	}

	function isAuthenticated() {
		$this->startSession();
		if ($this->getSessionValue('user') == null) {
			return false;
		}
		return true;
	}
	function logout() {
		$this->startSession();
		$_SESSION['user'] = null;
	}

	function getUser() {
		$this->startSession();
		if (!$this->isAuthenticated()) {
			throw new Exception('User not logged in.');
		}
		return $_SESSION['user'];
	}
	
	function getSessionValue($key) {
		$this->startSession();
		if (array_key_exists($key,$_SESSION) && $_SESSION[$key] !== null) {
			return $_SESSION[$key];
		}
		return null;
	}
	
	function startSession() {
		if(!isset($_SESSION)){
			session_start();
		}
	}
	
}

?>