#!/usr/bin/env node

// This program generates the /Views/ folder if it doesnt exist, and then populates it with the view files for the model specified by the user. 

const inquirer = require('inquirer');
const fs = require('fs');

const QUESTIONS = [
    {
        name: 'model-name',
        type: 'input',
        message: 'Model name:',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    }
];

const CURR_DIR = process.cwd();

inquirer.prompt(QUESTIONS)
    .then(answers => {
        // const projectChoice = answers['project-choice'];
        const modelName = answers['model-name'];
        const templatePath = `${__dirname}/templates/modelName`;



        createViewsContent(templatePath, modelName);

    });

function createViewsContent(templatePath, modelName) {
    const filesToCreate = fs.readdirSync(templatePath);

    //Checking if Views/ folder exist, if not it will be created.
    if (fs.existsSync(`${CURR_DIR}/Views`) === false) {
        console.log("Creating Views Directory.")
        fs.mkdirSync(`${CURR_DIR}/Views`);
    }

    // Creating Views/modelName folder
    fs.mkdirSync(`${CURR_DIR}/Views/${modelName}`);


    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');

            // When we install globally, npm will convert all the .gitignore files to .npmignore, which is not good if we want to have .gitignore files in our templates. To fix this we rename it:
            // Renaming:
            if (file === '.npmignore') file = '.gitignore';

            const writePath = `${CURR_DIR}/Views/${modelName}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            
            fs.mkdirSync(`${CURR_DIR}/Views/${modelName}/${file}`);

            // recursive call
            createDirectoryContents(`${templatePath}/${file}`, `${modelName}/${file}`);
        }
    });


    console.log(`View files for ${modelName} generated. `)
}

function findAndReplace(filePath, wordToSearch, wordToReplaceWith){
    // const filePath =  __dirname + '/index.js'
    const content = fs.readFileSync(filePath, 'utf8');
    const result = content.replace(`/${wordToSearch}/g`,wordToReplaceWith);
    console.log('result',': ', result);
    
}