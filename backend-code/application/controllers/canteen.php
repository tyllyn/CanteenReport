<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Canteen extends CI_Controller {

	public function index() {
		$this->load->view('canteen/index');
	}
	
	public function add() {
		$res = $_POST; //json_decode($json);
		
		//$data = new array();
		$items = array();
		$itemSizes = array();
		$members = array();
		$data = array();
		$id = "";
		
		/*
		
			$data: Gets inserted into the Reports table
			$items: Quantity of items handed out (Item ID = key)
			$itemSizes: Size (cups, gallons...) used for an item entry (Item ID = key)
			
		*/
		
		foreach ($res as $key => $val) {
		
			// hard coding IDs because #yolo
			switch ($key) {
				case "team-drink-coffee-amount":
					$items[1] = $val;
					break;
				case "team-drink-coffee-unit":
					$itemSizes[1] = $val;
					break;
				case "team-drink-cocoa-amount":
					$items[2] = $val;
					break;
				case "team-drink-cocoa-unit":
					$itemSizes[2] = $val;
					break;
				case "team-drink-tea-amount":
					$items[3] = $val;
					break;
				case "team-drink-tea-unit":
					$itemSizes[3] = $val;
					break;
				case "team-cold-drinks-amount":
					$items[4] = $val;
					break;
				case "team-drink-cold-drinks-unit":
					$itemSizes[4] = $val;
					break;
				case "team-water-amount":
					$items[5] = $val;
					break;
				case "team-drink-water-unit":
					$itemSizes[5] = $val;
					break;
					
					
				case "team-food-donuts-amount":
					$items[6] = $val;
					break;
				case "team-food-donuts-unit":
					$itemSizes[6] = $val;
					break;
				case "team-food-cookies-amount":
					$items[7] = $val;
					break;
				case "team-food-cookies-unit":
					$itemSizes[7] = $val;
					break;
				case "team-food-sandwiches-amount":
					$items[8] = $val;
					break;
				case "team-food-sandwiches-unit":
					$itemSizes[8] = $val;
					break;
				case "team-food-hot-dogs-amount":
					$items[9] = $val;
					break;
				case "team-food-hot-dogs-unit":
					$itemSizes[9] = $val;
					break;
				case "team-snacks-amount":
					$items[12] = $val;
					break;
				case "team-food-snacks-unit":
					$itemSizes[12] = $val;
					break;
					
					
				case "team-clothing-gloves-amount":
					$items[10] = $val;
					break;
				case "team-clothing-blankets-amount":
					$items[11] = $val;
					break;
				case "team-clothing-amount":
					$items[13] = $val;
					break;
				case "team-clothing-hand-warmers--amount":
					$items[14] = $val;
					break;
					
				case "id":
					$id = $val;
					break;
					
				case "date":
					break;
					
				default:
					if (strpos($key,"team-member-") === 0) {
						$members[] = $val;
					} else {
						$data[str_replace ("-","_", $key)] = $val;
					}
			}
		}
		
		// make sure something exists in the array
		if (!array_key_exists('notes',$data)) {
			$data['notes'] = '';
		}
		
		$this->load->model('Report');
		$this->load->model('Item');
		$this->load->model('Member');
		
		if ($id == null || $id == 0 || !is_numeric($id)) {
			
			// add a new report
			$reportId = $this->Report->add($data);
			
		} else {
			
			// update an existing report
			$this->Report->update($id, $data);
			$reportId = $id;
			$this->Item->delete_report_links($reportId);
			$this->Member->delete_report_links($reportId);
			
		}
		
		if ($items != null) {
			foreach ($items as $key => $value) {
				if (is_numeric($value) && $value > 0) {
					$size = null;
					if (isset($itemSizes[$key])) {
						$size = $itemSizes[$key];
					}
					$this->Item->link_to_report($key, $reportId, $value, $size);
				}
			}
		}
		
		if ($members != null) {
			foreach ($members as $key => $value) {
				$this->Member->link_to_report($value, $reportId);
			}
		}
		
		print("success:" . $reportId);
	}
	
	public function viewitem($itemId) {
	
		$this->load->model('Item');
		$data["result"] = $this->Item->report_last_2y($itemId);
		//print_r($data);
		$this->load->view("item/details",$data);
		
	}
	
	public function viewitems() {
		$this->load->model('Item');
		$data["query"] = $this->Item->get_entries();
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
		$data['reportmembers'] = $this->Report->get_entry_members($id);
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