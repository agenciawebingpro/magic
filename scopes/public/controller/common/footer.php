<?php 
/**
* 
*/
class ControllerCommonFooter extends PublicController
{
	
	function index()
	{
		$this->set_template("common/footer");
        echo $this->get_content();
	}
}
?>