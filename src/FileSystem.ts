import * as fs from 'fs'; 
import * as mkdirp from 'mkdirp';

export class FileSystem{
    constructor(){

    }

    createFolder(path:string,force:boolean = false){
        return new Promise((resolve,reject)=>{
            if (fs.existsSync(path)){
                if (!force){
                    reject(new Error('Folder already exists, use --force to overwrite the current folder.'));
                    return;
                }
                fs.stat(path,(err,stats)=>{
                    if (err){
                        reject(err);
                        return; 
                    }
                    if (stats.isDirectory()){
                        resolve();
                        return;
                    }
                    mkdirp(path,(err)=>{
                        if (err){
                            reject(err);
                            return; 
                        }
                        resolve(); 
                    });
                })
            }else {
                 mkdirp(path,(err)=>{
                    if (err){
                        reject(err);
                        return; 
                    }
                    resolve(); 
                });
            }
        });
    }
}