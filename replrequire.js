(function(){

	var repl = require("repl");

	process.argv.shift();
	process.argv.shift();
	var location = process.argv.shift();

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
		if(e.match(/\//)) {
			globalize(req(e));
		}
		else {
			globalize(req("./" + e));
		}
	})

	repl.start("Node.js [" + process.argv.join(" ") + "] " + "> ");

})();
