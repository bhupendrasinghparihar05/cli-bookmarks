
const args = require("minimist")(process.argv.slice(2),{string:"link"});
const fs = require('fs');
const open = require('open');
let linksMap;

function printHelp(){
	console.log("cli-bookmarks (c) Bhupendra Parihar");
	console.log("");
	console.log("usage:");
	console.log("--help 	print this help");
	console.log("--link 	open the associated {{URL}} with the app in browser");
	console.log("--print 	print the associated {{URL}} in the console");
	var data = fs.readFileSync('config.json','utf8');

	linksMap = JSON.parse(data);
	links = Object.keys(linksMap);
	if(links){
		console.log(links.join(', '));
	}else{
		console.log("No Links in config.json");
	}
}
if(args.add){
	if(!linksMap){
		let data = fs.readFileSync('config.json','utf8');
		linksMap = JSON.parse(data) || {};
	}

	if(linksMap[args.add]){
		console.log("URL already exist for '" + args.add + "'")
	}else{
		linksMap[args.add]  = args['_'][0];
		console.log(args.add + " : " +linksMap[args.add]);
		let json = JSON.stringify(linksMap);
		fs.writeFileSync('config.json', json, 'utf8');
	}
}

if(args.delete){
	if(!linksMap){
		let data = fs.readFileSync('config.json','utf8');
		linksMap = JSON.parse(data) || {};
	}

	if(linksMap[args.delete]){
		delete linksMap[args.delete];
	}
}

if(args.link){
	fs.readFile('config.json','utf8', function readFileCallBack(err, data){
		if(err){
			console.log(err);
		} else {
			obj = JSON.parse(data);
			var urlToOpen = obj[args.link];
			if(urlToOpen){
				open(urlToOpen);
			}else{
				console.log("No URL associated for '"+ args.link + "'");
			}
		}
	});
}

if(args.print){
	fs.readFile('config.json','utf8', function readFileCallBack(err, data){
		if(err){
			console.log(err);
		} else {
			obj = JSON.parse(data);
			var urlToOpen = obj[args.print];
			if(urlToOpen){
				console.log(urlToOpen);
			}else{
				console.log("No URL associated for '"+ args.link + "'");
			}
		}
	});
}

if(args.help || (!args.link && !args.print && !args.add  && !args.delete)){
	printHelp(); 
	process.exit(1);
}


