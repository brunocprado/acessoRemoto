importScripts("lib/rpc/phprpc_client.js","lib/rpc/xxtea.js","lib/rpc/bigint.js","lib/rpc/base64.js","lib/rpc/phpserializer.js");

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
//        if(e.data['tid'] == pilha[i].tid){
//            //CONCLUIU
//            pilha.pop(pilha[i]);
//            for(j=0;j<estadoMaquinas.length;j++){
//                if(estadoMaquinas[j] == e.data['tid']){
//                    estadoMaquinas[j] = 0;
//                }
//            }
//        }
    }
    pilha.push(e.data);
    for(var i=0;i<estadoMaquinas.length;i++){
        if(estadoMaquinas[i] == 0){
            estadoMaquinas[i] = e.data.tid;
            //ENVIA TAREFA PARA MAQUINA LIVRE
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    self.postMessage("Concluido | TID:" + e.data.tid + " Tarefa: " + e.data.conteudo + " | " + Object.keys(maquinas)[i]);
                    self.postMessage({"estado":2,"tid":e.data.tid,"maquina":i});
                    estadoMaquinas[i] = 0;
                    pilha.pop(e.data);
                    
                    ///VERIFICA FILA e atribui nova tarefa <- TODO
                }
            };
            ajax.open("POST","../" + maquinas[Object.keys(maquinas)[i]].local + "rpc.php",true);
            ajax.send(e.data.conteudo);
            
//            var rpc = new PHPRPC_Client("../" + maquinas[Object.keys(maquinas)[i]].local + "rpc.php", ['soma']);
//            rpc.setKeyLength(96);
//            rpc.setEncryptMode(3);
//            var func = null;
//            eval("func = rpc." + e.data.conteudo + '(2,function(r){self.postMessage("Concluido | TID:" + e.data.tid + " Tarefa: " + e.data.conteudo + " | " + Object.keys(maquinas)[i] + " " + r); estadoMaquinas[i] = 0; pilha.pop(e.data);});');
//            self.postMessage(func);
//            func(2,function(r){
//                self.postMessage("Concluido | TID:" + e.data.tid + " Tarefa: " + e.data.conteudo + " | " + Object.keys(maquinas)[i] + " " + r);
//                    estadoMaquinas[i] = 0;
//                    pilha.pop(e.data);
//            });
//           
            break;
        }
    }
	self.postMessage(pilha);
    self.postMessage(estadoMaquinas);
    self.postMessage({"estado" : 1, "tid":e.data.tid, "maquina": i});
};

function inicia(){
    for(var i=0;i<Object.keys(maquinas).length;i++){
        estadoMaquinas.push(0);
    }
}