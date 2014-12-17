<?php 
require_once("Mixpanel.php");
if(session_id() == '') {
    session_start();
}
if (isset($_GET['utm_source'])) {
	$_SESSION['utm_source'] = $_GET['utm_source'];
}
if (isset($_GET['utm_medium'])) {
	$_SESSION['utm_medium'] = $_GET['utm_medium'];
}
if (isset($_GET['utm_campaign'])) {
	$_SESSION['utm_campaign'] = $_GET['utm_campaign'];
}

class mixPanelStarter {
	static function getInstance($token){
		global $mobileDetect;
		$mixpanel =  Mixpanel::getInstance($token);
		if ( !isset( $_SESSION["origURL"] ) ){
			if (isset($_SERVER['HTTP_REFERER'])) {
				$_SESSION["origURL"] = $_SERVER["HTTP_REFERER"];
			} else {
				$_SESSION['origURL'] = "Direct";
			}
		}
		$mixpanel->register("origURL",$_SESSION['origURL']);
		$mixpanel->register("ip",$_SERVER['REMOTE_ADDR']);

		if (isset($_SESSION['utm_source'])) {
			$mixpanel->register("OrigemDaCampanha",$_SESSION['utm_source']);
		}
		if (isset($_SESSION['utm_medium'])) {
			$mixpanel->register("MidiaDaCampanha",$_SESSION['utm_medium']);
		}
		if (isset($_SESSION['utm_campaign'])) {
			$mixpanel->register("NomedaCampanha",$_SESSION['utm_campaign']);
		}
		return $mixpanel;
	}
}


?>