<?php
    require_once(path_library."/phpMailer/class.phpmailer.php");
	class email extends PHPMailer{
		public function __construct(){
            parent::__construct();
            $this->isSMTP(); 
            $this->SMTPSecure = "ssl";
            $this->Host = 'mail.gabrielfelipe.com';  // Specify main and backup server
            $this->Port = 465;
            $this->SMTPAuth = true;                               // Enable SMTP authentication
            $this->Username = 'email@gabrielfelipe.com';    // SMTP username
            $this->Password = 'kma123';                   // SMTP password
            $this->isHTML(true);                                  // Set email format to HTML
            $this->From = 'email@gabrielfelipe.com';
            $this->FromName = 'Site Personal Evolution 2014';
        }
	}
?>