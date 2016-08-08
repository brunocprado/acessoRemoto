var variaveis = ["Insira local do shell: (default = localhost)","Digite seu login:","Digite sua senha"];
var entradas = [];
$(function() {
    escreveMsg(variaveis[0]);
    nLinha();
});
function escreveMsg(msg){
	$("#cmd").append("<div class='linha'><pre>"+ msg +"</pre></div>");
}
function nLinha(){
	var html = "<div class='linha'>";
    var tipo = "text";
    if(entradas.length == 2){ tipo = "password"; }
	html += '<span>></span>';
	html += '<input type="' + tipo + '" /></div>';
	$("#cmd").append(html);
    $(".linha input").not($(".linha input").last()).attr("readonly","true");
    $(".linha input").last().focus();
    $(".linha input").last().keydown(function(e){
        if (e.which == 13) { // Esc
            entradas.push($(this).val());
            if(entradas.length == 3){
                var local = "http://";
                if(entradas[0] == ""){local += "localhost"; } else {
                    local += entradas[0];
                }
                local += "/linux/login.php";
                $.post(local,{'login':entradas[1],'senha':entradas[2]},function(r){      
                    if(r == "1") {
                        //alert("Autenticado");
                        localShell = entradas[0];
                        usuario = entradas[1];
                        
                        carregaInfo();
                        $('[processo="inicio"]').remove();
                        $("#overlay").hide();
                        $("#infoSO").show();
                    } else {
                        entradas.pop(entradas[2]);
                        entradas.pop(entradas[1]);
                        escreveMsg("Login inválido");
                        escreveMsg(variaveis[entradas.length]);
                        nLinha();
                    }
                });       
            } else {
                escreveMsg(variaveis[entradas.length]);
                nLinha();
            }
        }
    });
}





//function escreveMsg(msg){
//	$("#cmd").append("<div class='linha'><pre>"+ msg +"</pre></div>");
//}
//function adicionaConfiguracao(e){
//	if (e.which == 13) { // Esc
//		console.log($(e.originalTarget).attr("readonly",true));
//		localShell = $(e.originalTarget).val();
//		carregaInfo();
//		$('[processo="inicio"]').remove();
//		$('[processo="inicio"]').remove();
//        $("#overlay").hide();
//	}
//}
//function nLinha(){
//	var html = "<div class='linha'>";
//	html += '<span>></span>';
//	html += '<input onkeydown="adicionaConfiguracao(event);"/></div>';
//	$("#cmd").append(html);
//}