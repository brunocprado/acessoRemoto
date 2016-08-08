var pid = Math.floor((Math.random()*9999)-1);
$("#corpoPasta").attr("id",pid);
$(document.getElementById(pid)).children(".menuPasta").attr("pid",pid);
$(document.getElementById(pid)).children(".menuPasta").children(".txtLocal").val(programaAtual);
$(document.getElementById(pid)).children(".menuPasta").children(".txtLocal").keydown(function(e){
    if(e.which == 13){
        mudaPasta($(this).val(),$(this).parent().attr("pid"));
    } 
});
$(document.getElementById(pid)).children(".menuPasta").children(".acessarPasta").click(function(e){
    mudaPasta($(this).parent().children(".txtLocal").val(),$(this).parent().attr("pid")); 
});
$(document.getElementById(pid)).children(".menuPasta").children(".btnVoltar").click(function(e){
//    mudaPasta($(this).attr("anterior"),$(this).parent().attr("pid")); 
    var tmp = $(this).parent().children(".txtLocal").val();
    if(tmp == "/" || tmp == ""){return;}
    if(tmp.endsWith("/")){ tmp = tmp.substr(0,tmp.length-1);}   mudaPasta(tmp.substr(0,tmp.lastIndexOf("/")+1),$(this).parent().attr("pid")); 
});
$(document.getElementById(pid)).children(".menuPasta").children(".ativaMenu").click(function(e){
    mostraMenu($(this).parent());
    modoLista($(this).parent().parent().children(".conteudoPasta"));
});
$(document.getElementById(pid)).selectable({
    distance: 30,
    filter: ".icone"
});
$(document.getElementById(pid)).droppable({
    accept: ".icone", 
    drop: function( event, ui ) {
        if($(ui.draggable).data("obj").pasta == $(this).attr("id")){
            console.log("IGUAL");
            return true;
        } else{
            if($(ui.draggable).children("img").attr("src") == "img/ico/pasta.png"){
               $(ui.draggable).data("obj").pasta = $(this).attr("id");
            }
            $(ui.draggable).detach().appendTo($(this).children(".conteudoPasta")).css({left:0,top:0});     
        }
    }
});
mudaPasta(programaAtual,pid);
pid = 0;
function mudaPasta(local,pid){
    console.log($(document.getElementById(pid)).children(".menuPasta").children(".txtLocal"));
    document.getElementById(pid).childNodes[3].innerHTML = "";   //$(document.getElementById(pid)).children(".menuPasta").children(".btnVoltar").attr("anterior",$(document.getElementById(pid)).children(".menuPasta").children(".txtLocal").val());
    $(document.getElementById(pid)).children(".menuPasta").children(".txtLocal").val(local);
    executaComando('ls -F "' + local + '"',function(r){
        var iconesPasta = {};
        var temp = r.split("\n");
        for(i=0;i<temp.length-1;i++){
            iconesPasta[temp[i]] = new icone();
            var tipo = verificaTipo(temp[i]);
            if(!tipo){ continue; }
            var pasta = "";
            if(tipo[0] == "pasta"){pasta = pid;}
            var parametro = local + "/" + temp[i].replace("/","");
            if(local == "/") { parametro = "/" + temp[i].replace("/",""); }
            iconesPasta[temp[i]].set({
                ID:    "'" + temp[i] + "'",
                img:  tipo[1],
                texto:   temp[i].replace("/",""),
                conteudo: "##" + tipo[0] + "##",
                parametro: parametro,
                renomear: true
            }).render(document.getElementById(pid).childNodes[3]);
        }
    });
}
function mostraMenu(menu){
    if(menu.css("position") == "relative"){
        menu.css("position","absolute"); 
        menu.animate({top:'-35px'});
        menu.parent().children(".conteudoPasta").css("top","8px");
    } else {
        menu.css("position","relative"); 
        menu.animate({top:'0px'});
        menu.parent().children(".conteudoPasta").css("top","44px");
    }
}

function modoLista(elemento){
    //elemento.addClass("lista");
}