<?php
class publicController extends Controller
{
	function render($data){
		/*Inclui o topo e o rodapé utilizando os controllers scopes/public/controllers/common/header.php
		 e scopes/public/controllers/common/footer.php */
		$this->children = array("common/header","common/footer");
		//Define a variável template como o conteúdo vindo em $data
		$this->data['template'] = $data;
		//Seta o tamplate para scopes/views/default/template/layout.tpl que imprimi o topo, o rodapé e o conteúdo.
		$this->set_template("layout");
		//Utiliza o método render do magicHtml para renderizar o layout.
		$this->html->render($this->get_content());
	}
}
?>
