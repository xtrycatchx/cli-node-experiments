const Path = require("path");

const Minimist = require("minimist");
const vorpal = require("vorpal")();

let argv = process.argv.slice(0);
let args = Minimist(argv.slice(2));
let repl = !(args._ && args._.length) && !(args.h || args.help);

if (args.h || args.help) {
    argv = [].concat.apply(argv.slice(0, 2).concat("help"), argv.slice(2).filter(i => i[0] !== "-"));
}

vorpal
    .catch("[words...]", "Catches wrong commands")
    .action(function (args, cb) {
        this.log((args.words ? args.words.join(" ") : "<unknown>") + " is not a valid command.");
        cb();
    });

