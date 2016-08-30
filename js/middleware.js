//importScripts("lib/rpc/phprpc_client.js","lib/rpc/xxtea.js","lib/rpc/bigint.js","lib/rpc/base64.js","lib/rpc/phpserializer.js");

//======| Dados |=======//
var maquinas = {};
//=====| RUNTIME |=====//
var pilha = [];
var estadoMaquinas = [];

function defineTarefa(maquina,tarefa){
    pilha.pop(tarefa);
    estadoMaquinas[maquina] = tarefa.tid;
    self.postMessage({"estado" : 1, "tid":tarefa.tid, "maquina": maquina});
    //ENVIA TAREFA PARA MAQUINA LIVRE
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            self.postMessage("Concluido | TID:" + tarefa.tid + " Tarefa: " + tarefa.conteudo + " | " + Object.keys(maquinas)[maquina]);
            self.postMessage({"estado":2,"tid":tarefa.tid,"maquina":maquina});
            estadoMaquinas[maquina] = 0;
            ///VERIFICA FILA e atribui nova tarefa <- TODO
            if(pilha.length > 0){
                defineTarefa(maquina,pilha[pilha.length -1]);
            }
        }
    };
    ajax.open("POST","../" + maquinas[Object.keys(maquinas)[maquina]].local + "rpc.php",true);
    ajax.send(tarefa.conteudo);
}

self.onmessage = function(e) {
    if(e.data['tid'] == -1) {       
        maquinas = e.data.maquinas;
        inicia();
        return;
    }
    pilha.push(e.data);
    for(var i=0;i<estadoMaquinas.length;i++){
        if(estadoMaquinas[i] == 0){
            defineTarefa(i,e.data);     
            break;
        }
    }
};

function inicia(){
    for(var i=0;i<Object.keys(maquinas).length;i++){
        estadoMaquinas.push(0);
    }
}