'use strict';
    
function renderizaDesktop(){
    desktop.icones = {}

    desktop.icones.terminal = new icone()
    desktop.icones.terminal.set({
        ID:     'terminal',
        img:    'terminal',
        texto:   'Terminal',
        conteudo:   '##terminal##',
        pasta: '',
        renomear: false
    }).render('#icones')

    desktop.icones.notepad = new icone()
    desktop.icones.notepad.set({
        ID:     'notepad',
        img:  'notepad',
        texto:   'Bloco de notas',
        conteudo: '##notepad##',
        parametro: 'novo',
        pasta: '',
        renomear: false
    }).render('#icones')

    desktop.icones.navegador = new icone()
    desktop.icones.navegador.set({
        ID:     'navegador',
        img:    'edge',
        texto:   'Navegador',
        conteudo:   '##navegador##',
        pasta: '',
        renomear: false
    }).render('#icones')

    desktop.icones.javascript = new icone()
    desktop.icones.javascript.set({
        ID:     'javascript',
        img:    'terminal',
        texto:   'Terminal javascript',
        conteudo:   '##javascript##',
            pasta: '',
        renomear: false
    }).render('#icones')

    desktop.icones.computador = new icone()
    desktop.icones.computador.set({
        ID:     'computador',
        img:    'pasta',
        texto:   'Explorar arquivos',
        conteudo:   '##pasta##',
        parametro:  '/',
        renomear: false,
            pasta: ''
    }).render('#icones')

//    desktop.icones.terminal.render('#icones');
//    desktop.icones.notepad.render('#icones');
//    desktop.icones.navegador.render('#icones');
//    desktop.icones.javascript.render('#icones');
//    desktop.icones.computador.render('#icones');
}
