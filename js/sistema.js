var desktop = {};
//=====| Variaveis de configuração|=====//
var localDesktop = "Desktop";
var tipoServidor = "php";
var localShell = "";
var sistema = "";
var usuario = "";
var comandos = "";
var maquinas = {};
//=====| Variaveis de operação |=======//
var programaAtual = "";
var logOperacoes = "";
var nOperacoes = 0;
var mid = null;
//=====================================//
//var client = new PHPRPC_Client('http://localhost:8080/index.aspx', ['add', 'sub']);  
//client.setKeyLength(256);  
//client.setEncryptMode(2);  
//client.add(1, 2, function (result, args, output, warning) {  
//    alert(result);  
//}); 
var horario = function() {
    var data = new Date();
    var hora = data.getHours();
    var min = data.getMinutes();
    if(hora < 10){hora = "0"+hora;}
    if(min < 10){min = "0"+min;}
    return hora + ':' + min;
}
var data = function(){
    var d = new Date();
    var dia = d.getDate();
    var mes = d.getMonth();
    var ano = (d.getYear()-100)+2000;
    if(dia < 10){dia = "0"+dia;}
    if(mes < 10){mes = "0"+mes;}
    return dia + "/"+ mes + "/" + ano;
}

$(function() {
    
    renderizaDesktop();
    
	$("#hora").html(horario());
	$("#data").html(data());

	setInterval(function() { $('#hora').html(horario()); }, 1000);	
    
    $.ajax({
        url: "configuracoes.json",
        async: false,
        dataType: "json",
        success: function(c){
            if(Object.keys(c).length > 1){
                //==| Exibe seleção máquina |==//
                for(var i=0;i<Object.keys(c).length;i++){
                    $(Mustache.render(
                        desktop.templates.maquina, {
                            ID:     Object.keys(c)[i],
                            sistema:    c[Object.keys(c)[i]].sistema.toUpperCase(),
                            nome: Object.keys(c)[i]
                        }
                    )).appendTo("#maquinas");
                }
                maquinas = c;
                $("#maquinasContainer").show();
            } else {
                carregaMaquina(c.local,c.usuario,c.sistema,c.tipo,c.senha);
            }  
        },
        error: function(){
            iniciaConf();
        }
    });
    
    //SELEÇÃO DE MAQUINA
    $(".maquinaVirtual").click(function(e){
        var temp = maquinas[$(this).attr("idMaquina")];
        carregaMaquina(temp.local,temp.usuario,temp.sistema,temp.tipo,temp.senha);
        $("#maquinasContainer").hide();
    });
    
    $("#adicionaMaquina").click(function(e){
        if($("#maquinasContainer").css("top") == "0px") {
            $("#maquinasContainer").animate({'top':"-200px",'bottom': "200px"});
        } else {
            $("#maquinasContainer").animate({'top':"0px",'bottom': "0px"});
        }
    });

//  Funções de drag and drop 
    $("#icones").selectable({
        distance: 30,
        filter: ".icone"
    });
    $("#icones").click(function(e){
        if(e.target == this || e.target.getAttribute("id") == "icones"){$(".icone").removeClass("ui-selected");}
        if($("#menuSistema").css("display") != "none"){
            $("#menuSistema").addClass("animated zoomOutDown");  
            setTimeout(function(){
                $("#menuSistema").hide();
                $("#menuSistema").rrenderizaDesktop();emoveClass("animated zoomOutDown"); 
            },500); 
        }
    });
    $("#icones").droppable({
        accept: ".icone",
        drop: function( event, ui ) {
            if($(ui.draggable).parent().attr("id") == "icones"){
                return false;
            } else{
                var pos = $(ui.draggable).parent().offset();                
                if((ui.position.top > pos.top && ui.position.top < (pos.top+$(ui.draggable).parent().height())) && (ui.position.left > pos.left && ui.position.left < (pos.left + $(ui.draggable).parent().width()))){
                    return false;
                } else{ 
                    $(ui.draggable).data("obj").pasta = "";
                    $(ui.draggable).detach().appendTo($(this)).css({left:0,top:0}); 
                } 
            }
        }
    });   
    
    iniciaMenus();
    
//  Menu Iniciar
    $("#menuIniciar").click(function(e){
        if($("#menuSistema").css("display") == "none"){
            $("#menuSistema").show() 
            $("#menuSistema").addClass("animated zoomInUp");  
            setTimeout(function(){
                $("#menuSistema").removeClass("animated zoomInUp"); 
            },600);
        } else {
            $("#menuSistema").addClass("animated zoomOutDown");  
            setTimeout(function(){
                $("#menuSistema").hide();
                $("#menuSistema").removeClass("animated zoomOutDown"); 
            },500);
        }
    });
    $("#_menuUpload").click(function(e){
      //
    });
    $("#_menuLog").click(function(e){
        alert(logOperacoes); 
    });
    $("#_menuSair").click(function(e){
       sair(); 
    });
      
    //EXTRA
    $("#overlay").click(function(e){
        if($(".janela[processo='inicio']").length != 0){
            return;
        }
        $("#infoSistema").removeClass("expandido");
        setTimeout(function(){
            $("#infoSistema").hide();
        },600);
        $(this).fadeOut(400);
    });
    
    
    document.getElementById('desktop').addEventListener('dragenter',mostraDrag,false);
    var drop = document.getElementById('drop-overlay');
    drop.addEventListener('dragover', mostraDrag, false);
    drop.addEventListener('drop', handleDrop, false);
    drop.addEventListener('dragleave', escondeDrag, false);    
});

function mostraDrag(e) {
    e.stopPropagation();
    e.preventDefault();
    document.getElementById('drop-overlay').style.display = 'block';
    //document.getElementById('menuMapa').style.display = 'none';
    return false;
}

function escondeDrag(e) {
    document.getElementById('drop-overlay').style.display = 'none';
   // document.getElementById('menuMapa').style.display = 'block';
}

function handleDrop(e){
    
}

function carregaMaquina(local,usr,so,tipo,senha){
    localShell = local;
    usuario = usr;
    sistema = so;
    tipoServidor = tipo;
    if(tipo == "java"){ tipoServidor = "jsp"; }  
    $.post(localShell + "login." + tipoServidor,{"login" : usuario,"senha":senha});
    $.getJSON("comandos/" + sistema.toLowerCase() + ".json",function(r){
        comandos = r;
    });
    carregaDesktop();
    logOperacoes = "Iniciado em " + data() + " " + horario() + "\n" + "Conectado a: " + localShell + "\n";
    $("#imgSO").attr("src","img/" + sistema + ".png");
    $("#verSO").html(sistema.toUpperCase());
    $("#infoSO").show();
}    
function carregaInfo(){
    $.get(localShell + "shell." + tipoServidor,{cmd:"uname"},function(uname){
        uname = uname.replace(/(\r\n|\n|\r)/gm,"");
        if(uname == "Darwin") { sistema = "OSX" } ;
        if(uname == "Linux") sistema = "LINUX";
        if(uname == "BSD") sistema = "BSD";
        if(uname == "") sistema = "WIN";
        $("#imgSO").attr("src","img/" + sistema + ".png");
        $("#verSO").html(sistema);
        $.getJSON("comandos/" + sistema.toLowerCase() + ".json",function(c){
            comandos = c;
            $.post(localShell + "shell." + tipoServidor,{cmd:comandos['usuario']},function(usr){
                usuario = usr.split(' ')[0];
                carregaDesktop();
            });  
        });
        var temp = "who"; if(sistema == "WIN"){ temp= "echo %USERNAME%"; }
    });      
}
function verificaTipo(nmArq){
    if(nmArq.endsWith("/")) {return["pasta","pasta"]}
    var ext = nmArq.toLowerCase().substr(nmArq.lastIndexOf(".") + 1,(nmArq.length-nmArq.lastIndexOf(".")));
    //if(nmArq.indexOf(".") == -1) { return ["pasta","pasta"]; }
    if(ext == "lnk" || ext == "url" || ext == "db"){return false;}
    if(ext == "txt" || ext == "ini" || ext == "sql" || ext == "js" || ext == "php" || ext == "r"){
        if(ext == "txt" || ext == "ini"){ext="notepad";}
        return ["notepad","notepad"];
    }
    if(ext == "png" || ext == "jpg" || ext == "gif"){
        return ["paint","paint"];
    }
    if(ext == "zip" || ext == "rar"){
        return ["download","zip"];
    }
    if(ext == "pdf"){
        return ["pdf","pdf"];
    }
    if(ext == "exe" || ext == "msi"){
        return ["download","exe"];
    }
    if(ext == "xls" || ext == "csv" || ext == "xlsx"){
        return ["download","excel"];
    }
    if(ext == "doc" || ext == "docx" || ext == "odt"){
        return ["download","word"];
    }
    if(ext == "ppt"){
        return ["download","word"];
    }
    if(ext == "html" || ext == "php"){
        return ["edge","edge"];
    }
    return ["download","desconhecido"];
}
function carregaDesktop(){
    if(sistema == "LINUX" || sistema == "BSD") {localDesktop = "/home/" + usuario + "/a"; 
    } else if(sistema == "OSX") { localDesktop = "/Volumes/SEM TITULO"; 
    } else {
	   localDesktop = "C:/Users/" + usuario + "/Desktop";
    }
    executaComando("ls -F '" + localDesktop + "'",function(r){
        var temp = r.split("\n");
		for(i=0;i<temp.length-1;i++){
            desktop.icones[temp[i]] = new icone();
            var tipo = verificaTipo(temp[i]);
            if(!tipo){ continue; }
            desktop.icones[temp[i]].set({
                ID:   Math.floor((Math.random()*99999)-1),
                img:  tipo[1],
                texto:   temp[i].replace("/",""),
                conteudo: "##" + tipo[0] + "##",
                parametro: localDesktop + "/" + temp[i],
                renomear: true
            }).render('#icones');
        }
    });
}
function executaComando(c,f){
    $.post(localShell + "shell." + tipoServidor,{cmd:c},function(r){
        f(r);
        logOperacoes += (++nOperacoes) + ": " + c + "\n";
    });
}
function fazDownload(arquivo,img){
    var tmp = $("#downloads");
    tmp.children("img").attr("src","img/ico/" + img + ".png");
    tmp.children("label").html(arquivo);
    tmp.show();
    tmp.addClass('animated bounceInUp');
    $.fileDownload(localShell + "download." + tipoServidor, {
        httpMethod: "POST",
        data: {arq:arquivo}
    }); 
    setTimeout(function(){
            $("#downloads").removeClass("animated bounceInUp");
            $("#downloads").fadeOut(500);
    },2000)
}

function iniciaMenus(){
    $.contextMenu({
        selector: '.comMenu', 
        callback: function(op, options) {
            if(op == "novaP"){
                var temp = new icone();
                temp.set({
                    ID:   Math.floor((Math.random()*99999)-1),
                    img:  'pasta',
                    texto:   'Nova pasta',
                    conteudo: "##pasta##",
                    parametro: '', //// ============ EDITAR
                    renomear: true
                }).render(this);
                console.log($(this).children(".icone").last());
                setTimeout(function(){
                    $(this).children(".icone").last().dblclick();
                },200);
            } else if(op == "info"){
                var tmp = $("#infoSistema");
                console.log(tmp.css("display"));
                if(tmp.css("display") == "none"){
                    $("#overlay").fadeIn(600);
                    tmp.show();
                    setTimeout(function(){
                        tmp.addClass("expandido");
                    },5);
                    carregaInfoSistema();
                } else {  
                    tmp.removeClass("expandido");
                    setTimeout(function(){
                        tmp.hide();
                    },600);
                }
            } else {
                sair();
            }
        },
        items: {
            "novaP": {name: "Nova pasta", icon: "edit"},
            "info": {name: "Informações Sistema", icon: "cut"},
            "sair": {name: "Sair", icon: ''}
        }
    });  
    $.contextMenu({
        selector: '.icone', 
        callback: function(op, options) {
            switch(op){
                case "abrir":
                    $(this).dblclick();
                    break;
                case "renomear":
                    $(this).children("span").mousedown();
                    break;
                case "download":
                    fazDownload($(this).data("obj").parametro,$(this).data("obj").img);
                break;
                case "deletar":
                    if($(".icone.ui-selected").length == 1){
                        if(confirm("Deseja excluir o arquivo \n" + $(this).attr("local"))){
                            //executaComando('rm "' + $(this).attr("local") + '"',function(){});
                        }
                    } else {
                        var texto = "";
                        $(".icone.ui-selected").each(function(n,e){
                            texto += $(e).attr("local") + "\n";
                        });
                        if(confirm("Deseja excluir os arquivos : \n" + texto)){
                            $(".icone.ui-selected").each(function(n,e){
                                //executaComando('rm "' + $(e).attr("local") + '"',function(){});
                            }); 
                        }
                    }
                    break;
            }
        },
        items: {
            "abrir": {name: "Abrir", icon: ""},
            "renomear": {name: "Renomear", icon: ""},
            "download": {name: "Download", icon: ""},
            "deletar": {name: "Deletar", icon: "delete"}
        }
    });
}

function iniciaConf(){   
    $("#overlay").show();
	var janela = new desktop.janela;
	janela.set({
		ID:    "inicio",
		img: "iniciar",
		titulo: "Inicio",
		conteudo: '##configuracoes##'
	}).render('#desktop');
}

function gerenciaContas(){
	var janela = new desktop.janela;
	janela.set({
		ID:    "contas",
		img: "iniciar",
		titulo: "Inicio",
		conteudo: '##contas##',
		barraMenu: false
	}).render('#desktop');
}

function carregaInfoSistema(){
    $("#infoSistema").children("img").attr("src","img/" + sistema + ".png");
    $("#info_sistema").html(sistema);
    executaComando(comandos['infoSistema'],function(r){
       $("#info_sistemaE").html(r.replace("\n","<br>")); 
    });
}

function sair(){
    if(confirm("Deseja sair?")){
        $("#icones").html('');
        renderizaDesktop();
        if(Object.keys(maquinas).length > 1){
            $("#maquinasContainer").show();
        } else {
             $("#overlay").show();
            iniciaConf();
            $("#menuSistema").hide();
        }      
    }
}