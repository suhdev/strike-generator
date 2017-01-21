#!/usr/bin/env node

import * as nunjucks from 'nunjucks'; 
import * as fs from 'fs'; 
import * as path from 'path'; 
import {FileSystem} from './FileSystem';
import * as yargs from 'yargs'; 
import * as mkdirp from 'mkdirp'; 
import * as Templates from './Templates'; 
let log = console.log; 
let fileSystem = new FileSystem(); 
interface AppConfig{
        key:string;
        force:boolean;
        name:string;
    }
function createFromTemplate(templatePath:string,ctx:any,dest:string,name:string,fileName:string){
        let out = nunjucks.renderString(Templates[templatePath],ctx);
        return fileSystem.createFolder(path.resolve(dest,'./'+name),ctx.cfg.force)
            .then(()=>{
                        fs.writeFileSync(path.resolve(dest,'./'+name,fileName),out,{flag:'w+'});
                    })
        }
function createController(cfg:AppConfig,dest:string){
        return createFromTemplate('Controller',
            {cfg},dest,cfg.name,cfg.name+'Ctrl.tsx');
        }
function createReducer(cfg:AppConfig,dest:string){
        return createFromTemplate('Reducer',{cfg},dest,cfg.name,'Reducer.ts');
    }
function createActions(cfg:AppConfig,dest:string){
        return createFromTemplate('Actions',{cfg},dest,cfg.name,'Actions.ts');
    }
function createStateAndProps(cfg:AppConfig,dest:string){
        return createFromTemplate('StateAndProps',{cfg},dest,cfg.name,'StateAndProps.ts');
    }
function create(cfg:AppConfig,dest:string){
        return createController(cfg,dest)
            .then(()=>{
                        return createReducer(cfg,dest);
                    })
                .then(()=>{
                        return createActions(cfg,dest); 
                    })
                .then(()=>{
                        return createStateAndProps(cfg,dest);
                    }).catch((err)=>{
                        console.log('Oops, an error has occured: '+err.message); 
                    });
        }
function createComponent(cfg:AppConfig,dest:string){
        return createFromTemplate('Component',{cfg},dest,cfg.name,cfg.name+'.tsx');
    }
if (!yargs.argv['dest']){
        console.log('Please provide a destination through the "dest" param'); 
        process.exit(); 
    }
if (yargs.argv['name']){
        let cfg = {
                force:yargs.argv['force'] || false,
                name:yargs.argv['name'],
                type:yargs.argv['type'], 
                dest:yargs.argv['dest'],
                key:yargs.argv['key'] || yargs.argv['name'].toLowerCase()
            };
        switch(cfg.type){
                case 'ctrl':
                case 'controller':
                    create(cfg,cfg.dest);
                    break;
                case 'c':
                case 'component':
                    createComponent(cfg,cfg.dest); 
                    break;
                case 'h':
                case 'help':
                default:
                log(Templates.Help);
            }
    }