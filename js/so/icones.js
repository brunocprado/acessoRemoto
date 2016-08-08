//Construtores dos icones
'use strict';

var icone = function() {
	this.ID     = null
	this.img  = ''
	this.texto   = ''
	this.conteudo   = ''
	this.parametro = '',
    this.pasta = '',
	this.renomear = true
}

icone.prototype = {
	constructor: icone,
	set: function(data) {
		this.ID     = data.ID
		this.img    = data.img
		this.texto  = data.texto
		this.conteudo  = data.conteudo
		this.parametro  = data.parametro
		this.renomear = data.renomear
		return this
	},
	draggableOptions: {
		containment: 'window',
        helper: 'clone',
        appendTo: '#iconesTemp',
		start: function() {
            $(".ui-selected").not(this).removeClass("ui-selected");
			$(this).attr('status', 'dragging')
		},
		stop: function() {
			$(this).attr('status', 'selected')
		}
	},
	render: function(renderTarget) {
		var _this = this;
        var element = $(Mustache.render(
			desktop.templates.icone, {
				ID:    this.ID,
				img:   this.img,
				texto: this.texto,
                parametro: this.parametro
			}
		)) 
		.mousedown(function(e) {
			if (                                                                
				$(e.target).is('span') &&
				$(this).attr('status') === 'selected'
			) {
				if (!_this.renomear) { return }
                window.setTimeout(function(t) {
                    if ($(t).attr('status') !== 'selected') {
                        return
                    }
                    $(document).one('mousedown', function(e) {
                        if ($(e.target).is(t)) { return }
                        if($(t).find('textarea').val() == ""){
                            _this.text = $(t).find('textarea').attr("anterior");
                        } else {
                            _this.text = $(t).find('textarea').val();
                        }  
                        $(t).find('textarea').hide()
                        $(t).find('span')
                            .text(_this.text)
                            .show()
                    })
                    $(t).find('span').hide()
                    $(t).find('textarea')
                        .attr("anterior",$(t).find('span').text())
                        .text($(t).find('span').text())
                        .elastic()
                        .css({
                            'display': 'inline',
                            'margin': 0,
                            'height': '26px'
                        })
                        .keypress(function(e) {
                            if (e.which === 13) {
                                $(document).mousedown();
                                executaComando("rename '" + _this.parametro + "' '" + $(t).find('span').text() + "'",function(){});
                            }
                        })
                        .select()
                },50,this);
			}
			$('.icone').attr('status', 'normal');
			$(this).attr('status', 'selected'); 
		})
		.dblclick(function() {
            if(_this.pasta != '' && _this.conteudo == "##pasta##"){
                mudaPasta(_this.parametro,_this.pasta);
                return true;
            }
			if(_this.conteudo == "##download##"){ 
                fazDownload(_this.parametro,_this.img);   
				return false;
			}
			$('.icone').attr('status', 'normal')
			if ($('.janela[processo=' + _this.ID + ']').length) { //Se processo já existe
				$('.itemMenu[processo=' + _this.ID + ']').mousedown()
				return
			}
			var janela = new desktop.janela
			janela.set({
				ID:    _this.ID,
				img: _this.img,
				titulo: _this.texto,
				conteudo: _this.conteudo,
				parametro: _this.parametro
			}).render('#desktop')
            $(".icone.ui-selected").removeClass("ui-selected");
		})
        .click( function(e){
            $( ".icone" ).removeClass("ui-selected");
            $(this).addClass("ui-selected");
        })
		.appendTo(renderTarget)
        .draggable(this.draggableOptions)
        if($(renderTarget).hasClass("conteudoPasta")){
            this.pasta = $(renderTarget).parent().attr("id");
        }
        element.data("obj",this);
	}
}