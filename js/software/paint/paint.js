var pTmp = $("#corpoPaint");
var janelaTmp = pTmp.parent().parent();
pTmp.attr("src",localShell + "imagem_php.php?arq=" + programaAtual);
$("#corpoPaint").on("load",function(){
    $(this).attr("proporcao",$(this).width()/$(this).height());
    var janelaTmp = $(this).parent().parent().parent();     
    var largura = $(this).width();
    var altura = $(this).height();
    if(largura < 600){
        janelaTmp.css("min-width",largura + 8);
        janelaTmp.css("width",largura + 8);
        if(largura < 90){
            janelaTmp.css("min-width",100);
            janelaTmp.css("width",100);
        }
    }
    if(altura < 500){
        janelaTmp.css("min-height",altura + 26); 
        janelaTmp.css("height",altura + 26); 
        if(altura < 90){
            janelaTmp.css("min-height",110);
            janelaTmp.css("height",110);
        }
    }
    $(this).css("height","100%");
});
$(".imgPaint").on("resize",function(){
   $(this).css("width",$(this).attr("proporcao") * $(this).height()); 
});
pTmp.attr("id",""); pTmp = 0;
programaAtual = "";
