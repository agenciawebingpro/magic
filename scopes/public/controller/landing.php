<?php 
/**
* 
*/
class ControllerLanding extends PublicController
{
	
	function index()
	{
		$this->html->add_js_linked("form.js",1,1); // Chama o javascript scopes/public/views/js/form.js
		$this->html->add_js_linked("validacao.js",1,1);	// Chama o javascript scopes/public/views/js/validacao.js
		$this->html->add_css_linked("style.css"); // Chama o javascript scopes/public/views/js/style.css

		/* Define uma série de variáveis estáticas para passar para a view pages/landing.tpl */
		$this->data = array(
			"titulo"=>"Precisa de uma loja virtual com a <br />cara da sua empresa?",
			"tituloForm" => "Entre em contato",
			"legendaForm" => "Ficou interessado? Quer vender online? Fala com a gente :)",
			"botao"=>"Quero Vender Online",
			"legendaBotao" => "Responderemos em até 24h",
			"tituloDepoimentos" => "Depoimento de quem já aumentou suas vendas",
			"qtnDepoimentos" => 1,
			"depoimentos" => array()
		);
		//Define que o template é pages/landing.tpl
		$this->set_template("pages/landing");
		/*Renderiza o template utilizando o método render da classe PublicControler, definida em
		scopes/public/publicController. Confere ali =)*/
		$this->render($this->get_content());
	}
	function send()
	{
		require_once(path_library."/email.class.php");
		$data = array();
		$context = "LP-Loja-Virtual";
		$scenarios = new scenarios($context);

		$data['nome'] = data::post("nome","special_chars","str",array(2,9999));;
		$data['email'] = data::post("email","email","email");
		$data['telefone'] = data::post("telefone","special_chars","str",array(2,9999));;
		$data['landing'] = "Loja Virtual";
		$data['cenario'] = $scenarios->getScenarioName();
		$data['mensagem'] = nl2br(data::post("mensagem","special_chars"));

		$email = new PHPMailer;
		$email->isSMTP(); 
        $email->SMTPSecure = "ssl";
        $email->Host = '[servidor-smtp-';  // Seu servidor smtp
        $email->Port = 465;
        $email->SMTPAuth = true;                               // Enable SMTP authentication
        $email->Username = '[username]';    // Seu usuário smtp
        $email->Password = '[senha]';                   // Senha smtp
        $email->isHTML(true);            // Queremos que o e-mail seja enviado em formato de html
        $email->SetFrom("[seu-email]","[seu-nome]");
		$address = "[email-de-quem-vai-receber]";
		$email->AddAddress($address);
		$email->Subject    = "Lead Landing Page";
		$email->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
		$body = "";
		foreach ($data as $key => $value) {
			$body .= "<strong>$key:</strong>$value <br />";
		}
		$email->Body = $body;
		if ($email->Send()) {
			$this->mp->register("Status","Sucesso");
			$this->mp->track("E-mail");
			echo $this->json->success("E-mail enviado com sucesso (:");
		} else {
			$this->mp->register("Status","Falha");
			$this->mp->track("E-mail");
			echo $this->json->fail("Erro ao enviar e-mail ".$email->ErrorInfo);
		}
	}
}
?>