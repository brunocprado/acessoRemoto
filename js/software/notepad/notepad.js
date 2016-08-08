$("#corpoNotepad").attr("id", programaAtual);
if(programaAtual != "novo"){
    executaComando('cat "' + programaAtual + '"',function(r){
        var txt = document.getElementById(programaAtual);
        txt.innerHTML = r; 
        var modo = verificaTipoTexto(programaAtual.toLowerCase());
        if(verificaTipoTexto(programaAtual) == "text") { criaEditorTxt(document.getElementById(programaAtual),modo); return false;}
        $.getScript("js/lib/codemirror/" + modo + ".js",function(){
            criaEditorTxt(document.getElementById(programaAtual),modo);
        });
    });
} else{
    criaEditorTxt(document.getElementById(programaAtual));
}
function criaEditorTxt(txt,modo){
    var editor = CodeMirror.fromTextArea(txt, {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        theme: "material",
        mode:  modo
    });
    $(txt).remove();
}
function verificaTipoTexto(nmTexto){
    if(nmTexto.endsWith(".js")){
        return "javascript";
    }
    if(nmTexto.endsWith(".php")){
        return "php";
    }
    if(nmTexto.endsWith(".sql")){
        return "sql";
    }
    if(nmTexto.endsWith(".r")){
        return "r";
    }
    return "text";
}