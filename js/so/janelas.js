'use strict';

desktop.janela = function() {
	this.ID     = null
	this.img    = ''
	this.titulo = ''
	this.conteudo = ''
	this.parametro = ''
}

desktop.janela.prototype = {
	constructor: desktop.janela,
	set: function(data) {
		this.ID    = data.ID
		this.img = data.img
		this.titulo = data.titulo
		this.conteudo = data.conteudo
		this.parametro = data.parametro
		return this
	},
	render: function(div) {
		var _this = this
		var position = [70,70]
		if ($('.janela').last().length) {
			position = [
				$('.janela').last().offset().left + 20,
				$('.janela').last().offset().top + 20
			]
		}
		var element = $(Mustache.render(
			desktop.templates.janela, {
				ID:     this.ID,
				img:    this.img,
				titulo: this.titulo,
				conteudo: this.conteudo,
			}
		))
		.appendTo(div)
		.draggable({
            containment: '#desktop',
            handle: '.tituloJanela'
        })
		.resizable()
		.resize(function() {
			var height = $(this).height()
			var width  = $(this).width()
		})
		.mousedown(function() {
			$('[processo]').attr('status', 'normal')
			$('.itemMenu').attr('status', 'normal')
			$(this).attr('status', 'selected')
			$('.itemMenu[processo=' + _this.ID + ']')
				.attr('status', 'selected')
		})
		.on('remove', function() {
			$('.itemMenu[processo=' + _this.ID + ']').remove()
		})
		.css({
			'position': 'absolute',
			'left': position[0],
			'top':  position[1]
		})
		.resize()
		.mousedown()
		var miniatura = new desktop.itemMenu()
		miniatura.set({
			ID:    this.ID,
			titulo: this.titulo,
			img: this.img
		}).render()
		this.postRender(element)
	},
	postRender: function(element) {
		//Carrega programa
		element[0].children[1].innerHTML = this.conteudo;
		if(element[0].children[1].innerHTML.startsWith("##")){ //Verifica se é um programa em html5
			var str = element[0].children[1].innerHTML;
			str = str.substring(2,(str.length-2));
			programaAtual = this.parametro;
			$.ajax({url:"js/software/" + str + "/" + str + ".html",type:'POST',dataType: 'text',success: function(r){
				element[0].children[1].innerHTML = r;	
				$.getScript("js/software/" + str + "/" + str + ".js");
			}});	
		}
			
		//Insere Funções da barra de titulo
        var tmp = $(element);
		tmp.find('.uiMinimizar').click(function() {
            if(tmp.attr("processo") == "inicio"){ return;}
            tmp.addClass('animated bounceOutDown');
            setTimeout(function(){
                tmp.hide()
                tmp.removeClass('animated bounceOutDown')
                $('.itemMenu[processo=' + tmp.attr('processo') + ']').attr('status', 'normal')
            },600);
		});
		tmp.find('.uiMaximizar').click(function() {
            if(tmp.attr("processo") == "inicio"){ return;}
			if(tmp.attr("maximizado") == ""){
				tmp.attr("l",tmp.width()+10);
				tmp.attr("a",tmp.height()+10);
				tmp.attr("y",tmp.css("top"));
				tmp.attr("x",tmp.css("left"));
                tmp.animate({
                    top: 0,
                    left: 0,
                    margin: 0,
                    width: $('body').width(),
                    height: $('body').height() - 46
                });
				tmp.attr("maximizado","1");
			} else {               
                tmp.animate({
                    top: tmp.attr("y"),
                    left: tmp.attr("x"),
                    margin: 0,
                    width: tmp.attr("l"),
                    height: tmp.attr("a")
                });
				tmp.attr("maximizado","");
			}	
		});
		var temp = this.ID;
		tmp.find('.uiFechar').click(function() {
            if(tmp.attr("processo") == "inicio"){ return;}
            tmp.addClass('animated zoomOutLeft');
            setTimeout(function(){
                tmp.remove();
                $('.itemMenu[processo="' + temp + '"]').remove();
            },800);	
		});
	}
}