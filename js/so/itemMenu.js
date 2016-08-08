desktop.itemMenu = function() {
	this.ID    = null,
	this.img = null,
	this.titulo = null
}

desktop.itemMenu.prototype = {
	constructor: desktop.itemMenu,
	set: function(data) {
		this.ID     = data.ID
		this.img    = data.img
		this.titulo = data.titulo
		return this
	},
	render: function() {
		var _this = this
		var element = $(Mustache.render(
			desktop.templates.itemMenu, {
				ID:     this.ID,
				img:    this.img,
				titulo: this.titulo
			}
		))
		.mousedown(function(e) {
            if($(this).attr('status') == 'selected'){return false;}
			$('.itemMenu').attr('status', 'normal')
			$(this).attr('status', 'selected')
			$(".janela[processo=" + _this.ID + "]").show().mousedown()
		})
		.appendTo('#programas')
		.attr('status', 'selected')
		this.postRender(element)
	},
	postRender: function(element) {
	}
}