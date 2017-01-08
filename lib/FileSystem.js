"use strict";
const fs = require("fs");
const mkdirp = require("mkdirp");
class FileSystem {
    constructor() {
    }
    createFolder(path, force = false) {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(path)) {
                if (!force) {
                    reject(new Error('Folder already exists, use --force to overwrite the current folder.'));
                    return;
                }
                fs.stat(path, (err, stats) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (stats.isDirectory()) {
                        resolve();
                        return;
                    }
                    mkdirp(path, (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                });
            }
            else {
                mkdirp(path, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            }
        });
    }
}
exports.FileSystem = FileSystem;
