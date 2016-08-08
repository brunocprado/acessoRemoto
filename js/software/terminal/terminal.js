novaLinha();
function novaLinha(){
    var html = "<div class='linha'>";
	html += '<span>></span>';
	html += '<input a="s" /></div>';
	$("#cmd").append(html);
    $("#cmd [a=s]").focus();
    $("#cmd [a=s]").keydown(function(e){
        if(e.which == 38) {
            $(this).val($("#cmd [a=n]").last().val());
        }
        if(e.which == 13) {
           $(this).attr("readonly",true);
           $(this).attr("a","n");
           executaComando($(this).val(),function(r){
               $("#cmd").append("<div class='linha'><pre>"+ r + "</pre></div>");
              novaLinha();
           });
        } 
    });
}
