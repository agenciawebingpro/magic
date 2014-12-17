//Select box
	/*
	* ----------------------------------------------------------------------------
	* "THE BEER-WARE LICENSE" (Revision 42):
	* <gabriel@webingpro.com.br> wrote this file. As long as you retain this notice you
	* can do whatever you want with this stuff. If we meet some day, and you think
	* this stuff is worth it, you can buy me a beer in return Poul-Henning Kamp
	* ----------------------------------------------------------------------------
	*/

	/*
	* ----------------------------------------------Dependencias:-----------------
	* JQuery                                                                     |
	* ----------------------------------------------------------------------------
	Plugin para fazer select box customizado utilizando a seguinte marcaÃ§Ã£o:
	<div class="pergunta select">
		<div class="seta"></div>
		<label title='renda_pessoal'>Selecione Ã  renda da sua famÃ­lia</label>
		<div class="opcoes">
			<button>Nenhuma (Estudante / Desempregado)</button>
			<button>AtÃ© R$800</button>
			<button>De R$800 AtÃ© R$1200</button>
			<button>De R$1200 AtÃ© R$1600</button>
			<button>De R$1600 AtÃ© R$2500</button>
			<button>Maior que R$2500</button>
		</div>
		<input type='hidden' name='renda_pessoal' />
	</div>
	select = new selectBox('.pergunta.select');

	Suporte a navegaÃ§Ã£o por teclado.

	Exemplo de CSS:
	form .select {cursor: pointer; position: relative; width:300px;}
	form .select .seta {position: absolute; top:4px; right: 4px; width:30px; height: 30px; .border-radius(3px); background: #820; color:white; line-height: 30px; text-align: center;font-size:17px;}
	form .select .opcoes {position: absolute; top:100%; width:100%; background: #fff; left:0;border: 1px solid #e3e3e3; border-top:none; .box-shadow(0px 1px 6px rgba(0,0,0,0.11) inset); .border-radius(0 0 3px 3px)}
	form .select .opcoes button {width:100%; display: block; border:none; background: #fff; box-shadow: none; text-align: left;cursor:pointer; .border-radius(0); margin:0;}
	form .select .opcoes button:last-child {.border-radius(0 0 3px 3px); }
	form .select .opcoes button.on {color:#820;}
	form .select label {margin: 0; width:100%; cursor: pointer;}

	*/

	//--=-=-=-=-SELECT SINGLE //
	function selectBox(obj){
	//Construindo.
	var select = this;
	select.all = $(obj);
	select.label = $(obj).children("label");
	select.seta = $(obj).children(".seta");
	select.opcoes = $(obj).children(".opcoes");
	select.nomeCampo = this.seta.attr("title");
	select.input = $(obj).children("input");
	select.duracaoEfeito = 150;
	select.efeitoIn = "fade";
	select.efeitoOut = "fade";
	select.buttonAtivo = 0;
   	select.mouseMoving = true

	//Tratando div como input
	select.all.attr("tabindex",'0');

	//Definindo FunÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Âµes
    select.all.mousemove(function(){
    	select.mouseMoving = true
    });
	select.all.keydown(function(e){

	        if(e.which ==40){
	          e.preventDefault();
	          select.mouseMoving = false
	          select.mostraOpcoes();
	          elem = select.opcoes.find("button.on");
			  pos = elem.position().top;
	          if (select.buttonAtivo < $(this).find('button').size() - 1) {
		          select.buttonAtivo = select.buttonAtivo + 1;
		          $(this).find('button').removeClass("on");
		          $(this).find('button').eq(select.buttonAtivo).addClass("on");
		          heightOpcoes = select.opcoes.height();
		          myMarginTop = parseInt(select.opcoes.find("button.on").css("marginTop"));
		          buttonHeight = parseInt(select.opcoes.find("button.on").outerHeight(false));
		          if (pos + buttonHeight*2 + myMarginTop >= heightOpcoes ){		          
				  	select.opcoes.scrollTop(select.opcoes.scrollTop()+buttonHeight+myMarginTop);	
				  }
		      }
	        } else if(e.which == 38){
	          e.preventDefault();
	          select.mouseMoving = false
	          select.mostraOpcoes();
			  elem = select.opcoes.find("button.on");
			  pos = elem.position().top;
			  
	          if (select.buttonAtivo  > 0) {
		          select.buttonAtivo = select.buttonAtivo - 1;
		          $(this).find('button').removeClass("on");
		          $(this).find('button').eq(select.buttonAtivo).addClass("on");
		          heightOpcoes = select.opcoes.height();
		          myMarginTop = parseInt(select.opcoes.find("button.on").css("marginTop"));
		          buttonHeight = parseInt(select.opcoes.find("button.on").outerHeight(false));

				  if (pos <= 0 ){
				  	select.opcoes.scrollTop(pos + select.opcoes.scrollTop() - buttonHeight);	
				  }
		          
		      }
	        } else if(e.which == 13 || e.which == 32){
	          select.mostraOpcoes();
	          $(this).find('button').eq(select.buttonAtivo).click();
	        } 
	      });
	select.all.focus(function(){
	  // scroll = ($('body,html').scrollTop() > select.all.offset().top + select.all.height() + select.opcoes.height() - $('body').height() + 50 ) ? $('body,html').scrollTop() : select.all.offset().top + select.all.height() + select.opcoes.height() - $('body').height() + 50;
	  // $('body,html').scrollTop(scroll);
	});
	select.all.blur(function(){
	  select.buttonAtivo = 0;
	  $(this).find('button').removeClass("on");
	});

	select.all.find('button').mouseenter(function(){
	  if (select.mouseMoving) {

		  select.buttonAtivo = $(this).index();
		  select.all.find('button').removeClass("on");
          $(this).addClass("on");
          elem = select.opcoes.find("button.on");
		  pos = elem.position().top;
	  }
	});

	select.apagaOpcoes = function(){
	  select.all.removeClass("visible");
	  select.opcoes.scrollTop(0);
	 switch(select.efeitoOut){
	 case "fade": select.opcoes.fadeOut(select.duracaoEfeito); break;
	 case "slide": select.opcoes.slideUp(select.duracaoEfeito); break;
	 case "none": select.opcoes.hide(select.duracaoEfeito); break;
	 }
	}

	select.mostraOpcoes = function(){
	 
	 select.calculaScroll();
	 switch(select.efeitoIn){
	 case "fade": select.opcoes.fadeIn(select.duracaoEfeito); break;
	 case "slide": select.opcoes.slideDown(select.duracaoEfeito); break;
	 case "none": select.opcoes.show(select.duracaoEfeito); break;
	 }
	}
	select.calculaScroll = function(){
		
	}

	select.confEfeito = function(obj) {
	jQuery.extend(select, obj);
	}

	select.opcoes.fadeOut(0);


	//Configurando CSS's

	select.opcoes.css(
	 {
	 "position": "absolute",
	 "z-index" : "100"
	 });
	//Controladores de evento
	 select.seta.click(function(){
	 select.mostraOpcoes();


	 });
	 select.all.click(function(){
	 select.mostraOpcoes();

	 });
	 select.all.focus(function(event){
	  select.mostraOpcoes();
	 });
	 select.all.blur(function(){
	  select.apagaOpcoes();
	 });
	 select.opcoes.children("button").click(function(){
	   valor=$(this).attr("value");
	   html = $(this).html();
	   select.label.html(html);
	   select.input.val(valor).trigger('change');
	   select.onchange(valor);
	   select.apagaOpcoes();
	   return false;
	  });
	 select.onchange = function(valor){

	 }

	 select.all.mouseleave(function(){
	  select.apagaOpcoes();
	 });
	}

	/* Função para transformar todas as div.select em select box customizadas */
	function makeSelects(){
	  $('div.select').each(function(){
	    var selecta = new selectBox(this);
	       if($(this).hasClass("filtro")){  
	          selecta.onchange = function(valor){
	           location = valor;
	        }
	     }
	  });
	}
	/* Função para transformar select normal em customizado */
	function selectfy(selector){
		$(selector).each(function(){
			var old = $(this);
			var info = {}
			var classe = $(this).attr("class");
			if (typeof(classe) == "undefined") {
				classe = "";
			};
			info.name = old.attr("name");
			info.valorAtual = "";
			info.labelAtual = "";
			info.atributos = "";
			$.each(this.attributes, function() {
			    if(this.specified && this.name != "class" && this.name != "name") {
			      info.atributos += " "+this.name+"='"+this.value+"'";
			    }
			});
			info.html = "<div class='select "+classe+"' name='"+info.name+"' "+info.atributos+"> ";
			info.opcoesHtml = "";
			old.find("option").each(function(i){
				val = $(this).val();
				label = $(this).html();
				info.opcoesHtml += "<button value='"+val+"'>"+label+"</button>";
				if($(this).is(":selected")){
					info.labelAtual = label;
					info.valorAtual = val;
				}
			});
			info.html += "\
	<div class='seta'></div>\
	<label>"+info.labelAtual+"</label>";
			info.html += "<div class='opcoes'>"+info.opcoesHtml+"</div>";
			info.html += "<input name='"+info.name+"' value='"+info.valorAtual+"' type='hidden' /><div class='clear'></div>";

			old.before(info.html);
			old.remove();
	   		var select = new selectBox(".select[name='"+info.name+"']");	
		});	
	}



//Fazendo Checkbox's
	function updateCheckBox(){
		$(".checkbox").each(function(){
			var name =$(this).attr("name");
			var checked = "";
			if($(this).hasClass("on")){
				checked = "checked='checked'"
			}
			$(this).html("<input type='checkbox' name='"+name+"' "+checked+" />");
		});
		$(".checkbox").unbind("click");
		$(".checkbox").click(function(){
			var marcado = $(this).hasClass("on");
			if (marcado){
				$(this).removeClass("on");
				$(this).find("input").prop("checked",false);	
			} else {
				$(this).addClass("on");
				$(this).find("input").prop("checked",true);	
			}
			
		})	
	}
	$(document).on("click",".radiobutton",function(evt){
		evt.stopPropagation();
		evt.preventDefault();
			var name =$(this).attr("name");
			var marcado = $(this).hasClass("on");
			if (marcado){
				$(this).removeClass("on");
				$(this).find("input").attr("checked",false);	
			} else {
				radios = $(".radiobutton[name='"+name+"']");
				radios.removeClass("on");
				radios.find("input").attr("checked",false);
				$(this).addClass("on");
				$(this).find("input").attr("checked",true);	
			}
			$(this).find("input").trigger("change");
	})	
	function radiofy(selector){
		$(selector).each(function(){
			if ($(this).parent().hasClass("radiobutton") || $(this).parent().hasClass("corHolder")) {
				return;
			};
			var old = $(this);
			var info = {}
			var classe = $(this).attr("class");
			if (typeof(classe) == "undefined") {
				classe = "";
			};
			info.name = old.attr("name");
			info.checked = ($(this).is(":checked")) ? true : false;
			info.valorAtual = "";
			info.labelAtual = "";
			info.atributos = "";
			$.each(this.attributes, function() {
			    if(this.specified && this.name != "class" && this.name != "name") {
			      info.atributos += " "+this.name+"='"+this.value+"'";
			    }
			});
			if (info.checked) {
				classe += " on";
			};
			checked = (info.checked) ? "checked=checked" : "";
			info.html = "<div class='radiobutton "+classe+"' name='"+info.name+"'> ";
			info.html += "<input type='radio' name='"+info.name+"' "+checked+"  "+info.atributos+"/>";
			info.html += "</div>";

			old.before(info.html);
			old.remove();
		});	
	}
	$(document).ready(function(){
		radiofy("input[type='radio']");
		
	})
	updateCheckBox();

	//Mascaras
(function ( $ ) {
 
    $.fn.maskInput = function(callbackValue) {
    	var obj = $(this);
    	$(this).keyup(function(){
			var val = callbackValue(obj.val());
			$(this).val(val);
		})
        return this;
    };
}( jQuery ));
