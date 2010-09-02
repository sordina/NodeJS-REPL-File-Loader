var repl = require("repl");

process.argv.shift();
process.argv.shift();
var location = process.argv.shift();

function globalize(obj) {
	for(var x in obj) {
		global[x] = obj[x]
	}
}

function req(f) {
	if(f.match(/^\//)) {
		require(f)
	}
	else {
		require(location + '/' + f)
	}
}

process.argv.forEach(function(e){
	if(e.match(/\//)) {
		globalize(req(e));
	}
	else {
		globalize(req("./" + e));
	}
})

repl.start("Node.js [" + process.argv.join(" ") + "] " + "> ");
