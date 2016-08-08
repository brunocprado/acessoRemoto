'use strict';

desktop.templates = {

	icone:
	'<div class="icone" data-icon="{{ID}}" status="normal" local="{{parametro}}">'
		+ '<img src="img/ico/{{img}}.png" alt="" draggable="false" />'
		+ '<span>{{texto}}</span>'
		+ '<textarea></textarea>'
	+ '</div>',

	janela:
	'<div class="janela" processo="{{ID}}" status="selected" maximizado="">'
		+ '<div class="tituloJanela">'
			+ '<img src="img/ico/{{img}}.png" alt="" />'
			+ '<span>{{titulo}}</span>'
			+ '<div class="botoesJanela">'
				+ '<div class="uiMinimizar"></div>'
				+ '<div class="uiMaximizar"></div>'
				+ '<div class="uiFechar"></div>'
			+ '</div>'
		+ '</div>'
		+ '<div class="conteudo"></div>'
	+ '</div>',

	itemMenu:
	'<div class="itemMenu" processo="{{ID}}" status="normal">'
		+ '<img src="img/ico/{{img}}.png" alt="" />'
		+ '<span>{{titulo}}</span>'
	+ '</div>',

}