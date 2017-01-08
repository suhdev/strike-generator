#!/usr/bin/env node
"use strict";
const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");
const FileSystem_1 = require("./FileSystem");
const yargs = require("yargs");
const Templates = require("./Templates");
let log = console.log;
let fileSystem = new FileSystem_1.FileSystem();
function createFromTemplate(templatePath, ctx, dest, name, fileName) {
    let out = nunjucks.renderString(Templates[templatePath], ctx);
    return fileSystem.createFolder(path.resolve(dest, './' + name), ctx.cfg.force)
        .then(() => {
        fs.writeFileSync(path.resolve(dest, './' + name, fileName), out, { flag: 'w+' });
    });
}
function createController(cfg, dest) {
    return createFromTemplate('Controller', { cfg }, dest, cfg.name, cfg.name + 'Ctrl.tsx');
}
function createReducer(cfg, dest) {
    return createFromTemplate('Reducer', { cfg }, dest, cfg.name, 'Reducer.ts');
}
function createActions(cfg, dest) {
    return createFromTemplate('Actions', { cfg }, dest, cfg.name, 'Actions.ts');
}
function createStateAndProps(cfg, dest) {
    return createFromTemplate('StateAndProps', { cfg }, dest, cfg.name, 'StateAndProps.ts');
}
function create(cfg, dest) {
    return createController(cfg, dest)
        .then(() => {
        return createReducer(cfg, dest);
    })
        .then(() => {
        return createActions(cfg, dest);
    })
        .then(() => {
        return createStateAndProps(cfg, dest);
    }).catch((err) => {
        console.log('Oops, an error has occured: ' + err.message);
    });
}
function createComponent(cfg, dest) {
    return createFromTemplate('Component', { cfg }, dest, cfg.name, cfg.name + '.tsx');
}
if (!yargs.argv['dest']) {
    console.log('Please provide a destination through the "dest" param');
    process.exit();
}
if (yargs.argv['name']) {
    let cfg = {
        force: yargs.argv['force'] || false,
        name: yargs.argv['name'],
        type: yargs.argv['type'],
        dest: yargs.argv['dest'],
        key: yargs.argv['key'] || yargs.argv['name'].toLowerCase()
    };
    switch (cfg.type) {
        case 'controller':
            create(cfg, cfg.dest);
            break;
        case 'component':
            createComponent(cfg, cfg.dest);
            break;
        default:
            log(Templates.Help);
    }
}
