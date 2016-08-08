carregaSite();
function carregaSite(){
	console.log("curl http://" + $(".navegador_url").val());
	//$("#navegacao").attr("src","http://" + $(".navegador_url").val());
    executaComando("curl http://" + $(".navegador_url").val(),function(r){
        console.log(r);
        //$("#navegacao").html(r);
        document.getElementById('navegacao').contentDocument.body.innerHTML = r;
    });
}