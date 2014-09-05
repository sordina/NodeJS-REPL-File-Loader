(function(){

	var repl = require("repl");

	process.argv.shift();
	process.argv.shift();
	var location = process.argv.shift();
	var inline = false;

	var paths = [];
	function globalize(obj) {
		for(var x in obj) {
			global[x] = obj[x]
			console.log("Property: " + x)
		}
		if(typeof obj == 'function') {
			global[obj.name] = obj
			console.log("Function: " + obj.name)
		}
	}

	function req(f) {
		if(f.match(/^\//)) {
			return require(f)
		}
		else {
			return require(location + '/' + f)
		}
	}


	process.argv.forEach(function(e){
		console.log(e)
		if(e == "-inline") {
			inline = true;
		} else if(e.match(/\//)) {
		        paths.push("./" + e);
		} else {
		        paths.push(e);
		}
	})

	if(!inline){
		for(i=0;i<paths.length;i++){
			globalize(req(paths[i]));
		}
	}

	repl.start("Node.js [" + process.argv.join(" ") + "] " + "> "/*,putIn*/);

	if(inline){
		for(i=0;i<paths.length;i++){
			repl.repl.commands['.load'].action.call(repl.repl,(paths[i]));
		}
	}
})();
