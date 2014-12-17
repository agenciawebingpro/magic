<?php 
/**
* 
*/
class ControllerCommonHeader extends PublicController
{
	
	function index()
	{

		$this->set_template("common/header");
        echo $this->get_content();
	}
}
?>