#!/usr/bin/env node
'use strict';

const minimist = require("minimist");
const vorpal = require("vorpal")();

let argv = process.argv.slice(0);
let args = minimist(argv.slice(2));
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

vorpal
    .command("XYZ", "some XYZ command")
    .action(function (args, cb) {
        Promise.resolve(require("./actions/command-xyz")(this, args)).then(repl ? cb : null);
    });

if (repl) {
    vorpal
        .delimiter("$app")
        .show();
} else {
    vorpal
        .on("client_command_executed", function () {
            process.exit(0)
        })
        .delimiter("$app")
        .parse(argv.slice(0));
}