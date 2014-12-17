<?php
class publicController extends Controller
{
	function basicLayoutTasks(){
		$this->html->add_css_linked("style.css");
		$this->children = array("common/header","common/footer");
	}
	function render($data){
		$this->basicLayoutTasks();
		$this->data['template'] = $data;
		$this->set_template("layout");
		$this->html->render($this->get_content());
	}
}
?>
