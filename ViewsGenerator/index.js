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

function createFolder(path){
    //This method will create a folder if it doesn't exist.
    if (fs.existsSync(path) === false) {
        fs.mkdirSync(path);
    }
}
function findAndReplace(originalContent, wordToSearch, wordToReplaceWith) {
    const regex = new RegExp(`${wordToSearch}`, 'g');
    const result = originalContent.replace(regex, wordToReplaceWith);
    return result;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function createViewsContent(templatePath, modelName) {
    const filesToCreate = fs.readdirSync(templatePath);
    // Creating Views/ folder
    createFolder(`${CURR_DIR}/Views`);
    // Creating Views/modelName folder
    createFolder(`${CURR_DIR}/Views/${capitalize(modelName)}`);

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            const templateContent = fs.readFileSync(origFilePath, 'utf8');
            // When we install globally, npm will convert all the .gitignore files to .npmignore, which is not good if we want to have .gitignore files in our templates. To fix this we rename it:
            // Renaming:
            if (file === '.npmignore') file = '.gitignore';
            const writePath = `${CURR_DIR}/Views/${capitalize(modelName)}/${file}`;
            const content = findAndReplace(templateContent, 'modelNamePlaceholder', modelName);
            fs.writeFileSync(writePath, content, 'utf8');
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${CURR_DIR}/Views/${modelName}/${file}`);
            // recursive call
            createDirectoryContents(`${templatePath}/${file}`, `${modelName}/${file}`);
        }
    });
    console.log(`View files for ${modelName} generated. `)
}

