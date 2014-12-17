/*
Classe para validar campos de formulários apartir de REGEX no lado cliente.
Requisitos: Jquery;

Idéia:
Vincular campos a uma regex, e validá-lo caso ele case com ela, com possibilidade de validar caso ele não case com ela.
Todos os campos que não estiverem vinculados a uma regex serão dados como opcionais.

Uso:

PASSO 1: Primeiro crie um objeto da classe para um form, passando o seletor css do mesmo.
-------
Ex: var form = new validator("form[name=form_teste]");
-------
-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=
PASSO 2: Vincule campos a regex usando a função addValidation.
-------
Ex: form.addValidation("teste","email"); //Verifica se o input teste tem formato de email
Ex: form.addValidation("teste","email","", false); //Verifica se o input teste não tem formato de email
-------
Sobre a função: form.addValidation(name,regexType,opt,check);
Name: Nome do input que será relacionado.
RegexType: O tipo de expressão regular que será utilizado.
Opt: Parâmetros opcionais para alguns tipos de regex
Check: Se ele deve casar(true). Ou deve NÃO casar com a regex(false). (Default = casar)
-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=
PASSO 3(Opcional): Customize o que acontece com os campos que passaram e os que não passaram na validação.
-------
Não Passaram(geral):
form.wrong = function(obj){
  your stuff here;
}
--------
Passaram(geral):
form.passed = function(obj){
  your stuff here;
}
--------
Callback Especifico para um Input:
form.customWrong("Name do Input",function(obj){
  $(obj).css("background","#000");
  }
);


-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=
Tipos de Regex Até Agora:
req: Input requerido com qualquer valor, casa com qualquer coisa diferente de ""
strmin: Input requerido com um mínimo de caracteres, o mínimo de caracteres deve ser passado no parâmetro opt.
strmax: Input requerido com um máximo de caracteres, o máximo de caracteres deve ser passado no parâmetro opt.
strexac: Input requerido com um número exato de caracteres, o número de caracteres deve ser passado no parâmetro opt.
int: Input somente números com qualquer número de caracteres.
intmin: análogo a strmin
intmax: análogo a strmax
intexac: análogo a strexac
email: casa com o formato de email
custom: casa com uma expressão regular passada no parâmetro opt.
-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=
Exemplo Completo:
$(document).ready(function(){
    var form = new validator("form[name=teste]");
    form.addValidation("oi",'email','',false);
    form.addValidation("b",'email','');
    form.wrong = function(obj){
      $(obj).css("background","#FF0");
    }
  });
</body>
*/

var validator = function(form,autosubmit){
    var formSeletor = form;
    var form = $(form);
    var f = this;
    f.allowDefault = false;
    f.validates = {};
    f.get_regex = function(type,opt){
      var regex;
      switch(type){
        case 'req': regex = /^.+$/; break;
        case 'strmin': regex = /^.{opt,}$/; break;
        case 'strmax': regex = /^.{1,opt}$/; break;
        case 'strexac': regex = /^.{opt}$/; break
        case 'int': regex = /^[0-9]+$/; break;
        case 'intmin': regex = /^[0-9]{opt,}$/; break;
        case 'intmax': regex = /^[0-9]{1,opt}$/; break;
        case 'intexac': regex = /^[0-9]{opt}$/; break;
        case 'email': regex = /^.+@.+\..+$/; break;
        case 'custom': regex = new RegExp(opt); break;
      }
      return regex;
    }

    f.addValidation = function(name,regextype,opt,check){
      
      if (form.find("input[name="+name+"],select[name="+name+"],textarea[name="+name+"]").size() == 0) {
        console.log("Campo "+name+" Não foi encontrado");
      } else {
        regex = f.get_regex(regextype,opt);
        if(typeof(check) == 'undefined'){
          check = true;
        }
        console.log(name+"-"+regex);

        f.validates[name] = 
        {
          'name': name,
          'regex': regex,
          'check': check
        }  
      }
    }

    f.check = function(val,regex){
      return (regex.test(val)) ? true : false;
    }
    f.wrong = function(obj){

      $(obj).css({'border-color': '#A30040', 'color':'#A30040'});
    }
    f.customWrong = function(input, callback){
      f.validates[input].wrong = callback;
    }
    f.customPassed = function(input, callback){
      f.validates[input].passed = callback;
    }
    f.passed = function(obj){
     $(obj).css({'border-color': '#00A340', 'color':'#00A340'});
    }


    f.validate = function(){
      countWrong = 0;
      f.wrongInputs = {};
      f.passedInputs = {};
      form.find("input,textarea,select").each(function(){
        name = $(this).attr("name");
        if(typeof(f.validates[name]) == 'undefined' && $(this).attr("type") != 'submit'){

          f.passedInputs[name] = {'name': name}
        }
      });
      for(i in f.validates){
        var input = f.validates[i];
        var inputObj = form.find("input[name="+input.name+"],select[name="+input.name+"],textarea[name="+input.name+"]");
        var pass = true;
        if(input.check){
          if(!f.check(inputObj.val(), input.regex)){
            pass = false;
          }
        }else{
          if(f.check(inputObj.val(), input.regex)){
            pass = false;
          }
        }

        if(!f.allowDefault){
          if(inputObj[0].value == inputObj[0].defaultValue){
            pass = false;
          }
        }
        if(!pass){
          countWrong++;
          f.wrongInputs[i] = input;
        } else {
          f.passedInputs[i] = input;
        }
        input['pass'] = pass;
      }
      if(countWrong==0){
        for(i in f.passedInputs){
          var input = f.passedInputs[i];
          if(typeof(f.validates[i]) == 'undefined' || typeof(f.validates[i].passed) == 'undefined'){
            f.passed(formSeletor+" *[name="+input.name+"]");
          } else {
            f.validates[i].passed(formSeletor+" *[name="+input.name+"]");
          }
        }
       return f.callback();
       
      } else {
        for(i in f.wrongInputs){
          var input = f.wrongInputs[i];       
          if(typeof(f.validates[i].wrong) == 'undefined'){
            f.wrong(formSeletor+" *[name="+input.name+"]");
          } else {
            f.validates[i].wrong(formSeletor+" *[name="+input.name+"]");
          }
        }
        for(i in f.passedInputs){
          var input = f.passedInputs[i];
          if(typeof(f.validates[i]) == 'undefined' || typeof(f.validates[i].passed) == 'undefined'){
            f.passed(formSeletor+" *[name="+input.name+"]");
          } else {
            f.validates[i].passed(formSeletor+" *[name="+input.name+"]");
          }
        }
        if (typeof(f.callbackErro) == "function") {
          f.callbackErro();
        };
        return false; 
      }
    };
    if (typeof(autosubmit) == "undefined" || autosubmit) {
      form.submit(function(){
        return f.validate();
      });
    };

  }