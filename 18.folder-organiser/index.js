#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');


const CURR_DIR = process.cwd();
//         fs.mkdirSync(`${CURR_DIR}/${projectName}`);

const folders = fs.readdirSync('../');

const data = [];

folders.map(folder => {
    if (folder !== '.git' && folder !== '.gitignore') {
        const folderPath = `../${folder}`;
        const stats = fs.statSync(folderPath);

        // console.log('stats',': ', stats);
        if (!stats.isFile()){
            
            const entry = { created: stats.birthtimeMs, name: folder };
            data.push(entry);
        }
    }
})



function compare(a, b) {
    if (a.created < b.created)
        return -1;
    if (a.created > b.created)
        return 1;
    return 0;
}

data.sort(compare);

// console.log('data', ': ', data);

data.forEach(entry=>{
    console.log('entry.name',': ', entry.name);
    
})