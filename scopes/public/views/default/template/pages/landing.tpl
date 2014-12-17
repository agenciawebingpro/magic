<div class="loading-holder">
	<div class="loading">
		Carregando
	</div>
</div>
<div class="lightbox">
	<div class="foto-holder">
		<div class="close">X</div>
		<img src="" alt="">

	</div>
</div>

<section class="landing-page">
	<div class="banner">
		<div class="fundo" style="background: url(<?php echo base_images?>/loja-virtual/fundo.jpg)"></div>
		<img src="<?php echo base_images ?>/loja-virtual/telas.png" alt="Banner Loja Virtual Responsiva">
	</div>
	<div class="container conteudo">
		<div class="vantagens-depoimentos">
			<h1 style="<?php echo (isset($styleTitulo)) ? $styleTitulo : ""?>"><?php echo $titulo ?></h1>
			<ul class="vantagens">
				<li>
					<div class="icone">
						<img src="<?php echo base_images ?>/browser.png" alt="Ícone Navegador">
					</div>
					<h2>_exclusiva para você</h2>
					<p>Sua loja vai ser desenhada e pensada exclusivamente de acordo com as suas necessidades!</p>
				</li>
				<li>
					<div class="icone">
						<img src="<?php echo base_images ?>/user.png" alt="Ícone Cliente">
					</div>
					<h2>_ganhe novos clientes</h2>
					<p>Expanda a sua marca, venda mais e conquiste novos clientes através da sua loja virtual.</p>
				</li>
				<li>
					<div class="icone">
						<img src="<?php echo base_images ?>/graph.png" alt="Ícone Gráfico">
					</div>
					<h2>_analise sua conversão</h2>
					<p>Acompanhe suas conversões, pedido a pedido e veja todas as estatísticas de venda da sua loja.</p>
				</li>
				<li>
					<div class="icone">
						<img src="<?php echo base_images ?>/mobile.png" alt="Ícone Mobile">
					</div>
					<h2>_sua loja mobile</h2>
					<p>Segundo a Datafolha 41 milhões de brasileiros acessam via mobile. Não perca a oportunidade de vender mais!</p>
				</li>
			</ul>
			<div class="clear"></div>
			<article class="depoimentos">
				<h2 style="font-size:40px"><?php echo $tituloDepoimentos ?></h2>
				<?php $d = 1; 
					while ($d <= count($depoimentos) and $d <= $qtnDepoimentos) {
						$dep = $depoimentos[$d-1];
						$avatar = (isset($dep['avatar']) and $dep['avatar']) ? $dep['avatar'] : false;
						?>
				<div class="cliente">
					<?php if ($avatar): ?>
						<img src="<?php echo base_images ?>/cliente.jpg" alt="Foto do Cliente" >
					<?php endif ?>
					<div class="info <?php echo (!$avatar) ? "sem-foto":"" ?>">
						<span class="nome"><?php echo $dep['nome'] ?></span>
						<span class="cargo"><?php echo $dep['cargo'] ?></span>
						<p class='depoimento'><?php echo $dep['depoimento'] ?></p>
					</div>
				</div>
				<div class="clear"></div>
						<?php
						$d++;	
					}
				?>
				<?php if (!isset($semFotos)): ?>
				<?php if (isset($tituloFotos)): ?>
					<h2 style="margin-top:20px; margin-bottom:0; float:left"><?php echo $tituloFotos ?></h2>
				<?php endif ?>
				<div class="imagens">
					<img class="foto" data-grande="<?php echo base_images ?>/loja-virtual/grande/home-aplicada.jpg" src="<?php echo base_images ?>/loja-virtual/home-aplicada.png" alt="Home Aplicada">
					<img class="foto" data-grande="<?php echo base_images ?>/loja-virtual/grande/home-mobile-aplicada.jpg" src="<?php echo base_images ?>/loja-virtual/home-mobile-aplicada.png" alt="Home Aplicada">
					<img class="foto" data-grande="<?php echo base_images ?>/loja-virtual/grande/home.jpg" src="<?php echo base_images ?>/loja-virtual/home.png" alt="Home">
					<img class="foto" data-grande="<?php echo base_images ?>/loja-virtual/grande/produto.jpg" src="<?php echo base_images ?>/loja-virtual/produto.png" alt="Página do Produto">
				</div>
				<?php endif ?>
			</article>
		</div>
		<div class="form">
			<h2><?php echo $tituloForm ?></h2>
			<p><?php echo $legendaForm ?></p>
			<form action="" id="formLanding">
				<input type="text" name="nome" placeholder="Seu nome">
				<input type="text" name="email" placeholder="Seu e-mail favorito">
				<input type="text" name="telefone" placeholder="E seu telefone">
				<textarea name="mensagem" id="" cols="30" rows="10" placeholder="Se tiver algo a acrescentar"></textarea>
				<button>
					<em><?php echo $botao ?></em><br />
					<span><?php echo $legendaBotao ?></span>
				</button>
			</form>
		</div>
		<div class="clear"></div>
	</div>
	<div class="clear"></div>
</section>
<div class="clear"></div>
<div class="modal">
	<div class="sucesso-form">
		<span class="titulo">Muito obrigado :)</span>
		<div class="conteudo">
			<p>Agradecemos seu contato, responderemos ele em breve com a esperança de trabalharmos juntos! Porém , o que você quer fazer agora?</p>
			<ul class='botoes'>
				<li>
					<a href="http://www.webingpro.com.br/?utm_source=lp-loja-virtual&utm_medium=landing-page&utm_campaign=loja-virtual">Conhecer melhor nosso trabalho </a>
					<a href="http://www.webingpro.com.br/blog?utm_source=lp-loja-virtual&utm_medium=landing-page&utm_campaign=loja-virtual">Ver um pouco do que a gente anda escrevendo </a>
					<button onclick="$('.modal').removeClass('visible');">Continuar vendo essa página </button>
				</li>
			</ul>
		</div>

	</div>
</div>
<script>
var loading = new function(){
	this.on = function(){
		$(".loading-holder").fadeIn();
	}
	this.off = function(){
		$(".loading-holder").fadeOut();
	}
}
$(document).ready(function(){
	$("#formLanding input[name='telefone']").maskInput(function(v){
      v = v.replace(/\D/g,"");
      if (v.length <= 6){
        v = v.replace(/([\d]{2})([\d]{1,4})/g,"($1) $2");
      } else {
      	v = v.replace(/([\d]{2})([\d]{4})?([\d]{1,6})?/g,"($1) $2-$3");
      }
      return v.substr(0,15);
    });
    var form = new validator("#formLanding");

    form.addValidation("nome","req");
    form.addValidation("email","email");
    form.addValidation("telefone","req");
    form.wrong = function(obj){
      $(obj).addClass("error");
      $(obj).removeClass("passed");
    }
    form.passed = function(obj){
      $(obj).addClass("passed");
      $(obj).removeClass("error");
    }
    form.callback = function(){
    	ga('send', 'event', 'formulario', 'enviado');

		var data = {};
		loading.on();
		data['nome'] = $("input[name='nome']").val();
		data['telefone'] = $("input[name='telefone']").val();
		data['email'] = $("input[name='email']").val();
		data['mensagem'] = $("textarea[name='mensagem']").val();
		var ajax = new majax;
		ajax.onComplete = function(){
			loading.off();
			ga('send', 'event', 'formulario', 'recebido');
		}
		ajax.onSuccess = function(){
			$(".modal").addClass("visible");
		}
		ajax.post("pages/lojavirtual/send",data);
		ga('send', 'event', 'formulario', 'recebido');
		return false;
	}
	form.callbackErro = function(){
		ga('send', 'event', 'formulario', 'clicado');	
	}
	var scrollAnterior = 0;
	var timeout = false;
	$(document).scroll(function(){
		timeout = window.setTimeout(function(){
			posForm();
		},600)
	})
	// function posForm(){
	// 	var scrolled = $(document).scrollTop();
	// 	var posIni = $(".conteudo").offset().top;
	// 	var height = $(".form").height();
	// 	var docHeight = $("#all-site").height() - 60;

	// 	if (scrolled > posIni) {
	// 		$(".form").addClass("fixed");
	// 	} else {
	// 		$(".form").removeClass("fixed");
	// 	}
	// }
	function posForm(){
		var scrolled = $(document).scrollTop();
		var posIni = $(".conteudo").offset().top;
		var height = $(".form").height();
		var docHeight = $("#all-site").height() - 60;
		var maxTop = docHeight - posIni - height;
		if (scrolled > posIni) {
			var topp = scrolled-posIni;
			if (topp > maxTop) {
				ga('send', 'event', 'rolou', 'tudo');
				topp = maxTop;
			}
			$(".form").css("top",(topp+"px"));
		} else {
			$(".form").css("top","0px");
		}
	}
	imgAtiva = 0;
	qtnFotos = $(".foto").size();
	maxHeight = parseInt($("body").height()) * 0.9 - 40;
	var imagesLoaded = Array();
	$(".foto-holder img").css({"max-height":maxHeight+"px"});
	$(".foto").click(function(){
		imgAtiva = $(this).index() + 1;
		var img = new Image;
		var src = $(this).attr("data-grande");
		if ($.inArray(src,imagesLoaded) === -1) {
			loading.on();
		};
		var legenda = $(this).attr("data-legenda");
		img.onload = function(){
			imagesLoaded.push(src);
			loading.off();
			$(".lightbox").fadeIn();
			$(".lightbox img").attr("src",src);
			$(".lightbox p.legenda").html(legenda);
		}
		img.src = $(this).attr("data-grande");
	});
	$(".lightbox").click(function(){
		imgAtiva = 0;
		$(this).fadeOut();
	})
	$(document).bind("keydown",function(evt){
		if (imgAtiva) {
			if (evt.which == 39) {
				imgAtiva = (imgAtiva < qtnFotos) ? imgAtiva + 1 : 1;
				$(".foto").eq(imgAtiva-1).click();
			};
			if (evt.which == 37) {
				imgAtiva = (imgAtiva > 1) ? imgAtiva - 1 : qtnFotos;
				$(".foto").eq(imgAtiva-1).click();
			};
		};
	})
});
</script>
