var pilha = [];
var estadoMaquinas = [];
var maquinas = {};

self.onmessage = function(e) {
    if(e.data['tid'] == -1) {       
        maquinas = e.data.maquinas;
        inicia();
        return;
    }
    for(var i=0;i<pilha.length;i++){
        if(e.data['tid'] == pilha[i].tid){
            //CONCLUIU
            pilha.pop(pilha[i]);
            for(j=0;j<estadoMaquinas.length;j++){
                if(estadoMaquinas[j] == e.data['tid']){
                    estadoMaquinas[j] = 0;
                }
            }
        }
    }
    pilha.push(e.data);
    for(var i=0;i<estadoMaquinas.length;i++){
        if(estadoMaquinas[i] == 0){
            estadoMaquinas[i] = e.data.tid;
            //ENVIA TAREFA PARA MAQUINA LIVRE
//            $.post(maquinas[i].local + "rpc.php",{"tarefa":e.data.conteudo},function(r){
//                
//            });
            break;
        }
    }
	self.postMessage(pilha);
    self.postMessage(estadoMaquinas);
};

function inicia(){
    for(var i=0;i<Object.keys(maquinas).length;i++){
        estadoMaquinas.push(0);
    }
}