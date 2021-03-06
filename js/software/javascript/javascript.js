$.getScript("js/lib/jquery.terminal.min.js",function(){
	$('#terminal').terminal(function(command, term) {
		if (command !== '') {
			try {
				var result = window.eval(command);
				if (result !== undefined) {
					term.echo(new String(result));
				}
			} catch(e) {
				term.error(new String(e));
			}
		} else {
		   term.echo('');
		}
	}, {
		greetings: 'Interpretador Javascript \n',
		name: 'js_demo',
		height: 200,
		prompt: 'js> '});
});