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
		/* Variável depoimentos estará acessivel em todos os scenários, visto que foi adicionada após a chamada dos dados do cenário.*/
		$this->data['depoimentos'] = array(
			array(
				"nome"=>"Aline Kafer Pinheiro",
				"cargo"=>"Gerente de Ecommerce - Loja Rede Social",
				"depoimento"=>"Nós da Loja Rede Social estamos muito contentes com o trabalho desenvolvido pela Webingpro, encontramos nela um parceiro disposto a analisar nossas necessidades e sugerir novidades aliado com um atendimento rápido, personalizado e eficiente.",
			),
			array(
				"nome"=>"Gracy Schmitt",
				"cargo"=>"Comercial - Personal Evolution",
				"depoimento"=>"Excelente! Acredito que a empresa oferece soluções adequadas para necessidade particular de cada cliente, a um preço justo e com serviço de ótima qualidade. Parabéns a equipe!",
			),
			array(
				"nome"=>"Lara Beatriz Fuck",
				"cargo"=>"Psicóloga / Proprietária  - Consultório Relações",
				"depoimento"=>"Trabalho competente, qualificado, personalizado e com certeza de resultados!!",
			),
			array(
				"nome"=>"Rogério Barlon",
				"cargo"=>"Sócio - Entelco Telecom",
				"depoimento"=>"Excelente contratação para aplicações, sistemas e Facebook Marketing.	",
			)
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
		$scenarios = new scenarios($context); //Instancia o scenários com o mesmo contexto
		$data['nome'] = data::post("nome","special_chars","str",array(2,9999));;
		$data['email'] = data::post("email","email","email");
		$data['telefone'] = data::post("telefone","special_chars","str",array(2,9999));;
		$data['landing'] = "Loja Virtual"; //Nome da Loja Virtual
		$data['cenario'] = $scenarios->getScenarioName(); //Pega o nome do cenário registrado para esse usuário.
		$data['mensagem'] = nl2br(data::post("mensagem","special_chars"));

		$email = new PHPMailer;
		$email->isSMTP(); 
        $email->SMTPSecure = "ssl";
        $email->Host = '[servidor-smtp]';  // Seu servidor smtp
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
			echo $this->json->success("E-mail enviado com sucesso (:");
		} else {
			echo $this->json->fail("Erro ao enviar e-mail ".$email->ErrorInfo);
		}
	}
}
?>