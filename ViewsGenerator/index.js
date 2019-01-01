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

        if (fs.existsSync(`${CURR_DIR}/Views`) === false) {
            console.log("Creating Views Directory.")
            fs.mkdirSync(`${CURR_DIR}/Views`);
        }

        fs.mkdirSync(`${CURR_DIR}/Views/${modelName}`);

        createDirectoryContents(templatePath, modelName);

        console.log(`View files for ${modelName} generated. `)
    });

function createDirectoryContents(templatePath, modelName) {
    const filesToCreate = fs.readdirSync(templatePath);

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
}