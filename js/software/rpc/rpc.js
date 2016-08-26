iniciaMid();
$("#btnAdicionaTarefa").click(function(e){
    adicionaTarefa("a");
});
function iniciaMid(){
    mid = new Worker("js/middleware.js");
    mid.postMessage({"tid": -1,"maquinas":maquinas});
    mid.onmessage = function(e) {
        console.log(e.data);
        if(e.data.estado == 1){
            $(".estadoMaquina[idMaquina=" + e.data.maquina + "] .estado").removeClass("inativo");
            $(".estadoMaquina[idMaquina=" + e.data.maquina + "] .estado").html(e.data.tid);
        } else if(e.data.estado == 2){
            $(".estadoMaquina[idMaquina=" + e.data.maquina + "] .estado").addClass("inativo");
            $(".estadoMaquina[idMaquina=" + e.data.maquina + "] .estado").html("Inativo");
        }
    };
    var estadoMaquina = '<div class="estadoMaquina" idMaquina="{{ID}}">'
        + '<img src="img/{{sistema}}.png">'
        + '<span class="nomeMaquina">{{nome}}</span>'
        + '<span class="estado inativo">Inativo</span>'
    + '</div>';
    
    for(var i=0;i<Object.keys(maquinas).length;i++){
        $(Mustache.render(
            estadoMaquina, {
                ID:     i,
                nome: Object.keys(maquinas)[i],
                sistema:    maquinas[Object.keys(maquinas)[i]].sistema.toUpperCase()                
            }
        )).appendTo("#rpcContainer");
    }
}
function adicionaTarefa(conteudo){
    mid.postMessage({"tid": Math.floor((Math.random()*99999)-1),"conteudo":conteudo});
}