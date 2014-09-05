(function(){

	var repl = require("repl");

	process.argv.shift();
	process.argv.shift();
	var location = process.argv.shift();
	var inline = false;
	var help = false;

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


	var count = 0;
	process.argv.forEach(function(e){
		console.log(e)
		if(e == "--help" || e == "-h"){
			help = true;
		} else if(e == "-i" || e == "--inline") {
			inline = true;
		} else if(e.match(/\//)) {
			count++;
			paths.push("./" + e);
		} else {
			count++;
			paths.push(e);
		}
	})
	if(count==0){
		help = true;
	}

	if(!inline){
		for(i=0;i<paths.length;i++){
			globalize(req(paths[i]));
		}
	}

	if(help){
		console.log("Usage: jsrepl [-i|--inline] [files ...]"); 
		console.log(""); 
		console.log("Available Options:"); 
		console.log("  -h,--help                Show this help text");
		console.log("  -i,--inline              Load scripts inline into repl");
	}else{
		repl.start("Node.js [" + process.argv.join(" ") + "] " + "> "/*,putIn*/);
	}

	if(inline){
		for(i=0;i<paths.length;i++){
			repl.repl.commands['.load'].action.call(repl.repl,(paths[i]));
		}
	}
})();
