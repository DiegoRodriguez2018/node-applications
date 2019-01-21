const basePath = __dirname;
const fs = require('fs')
const parse = require('csv-parse')

async function getData(modelName) {
    const inputPath = `${basePath}/${modelName}.csv`
    console.log('inputPath',': ', inputPath);
    
    return new Promise((resolve, reject) => {
        fs.readFile(inputPath, function (err, fileData) {
            parse(fileData, { columns: false, trim: true }, function (err, data) {
                // Your CSV data is in an array of arrays passed to this callback as data.
                resolve(data);
            })
        })
    })
}

async function getFileData(data, schemaName, modelName) {
    return new Promise ((resolve,reject)=>{
        let fileData = ""
        fileData = fileData +`const mongoose = require('mongoose');\n
const ${schemaName} = new mongoose.Schema({ \n`;  

        //Note we start with index 1 so we skip the csv headers.
        for (let index = 1; index < data.length; index++) {
            const row = data[index];
            fileData +=  `${row[0]}:${row[1]},\n`            
        }
    
        fileData += `});\n\nmodule.exports = mongoose.model('${modelName}', ${schemaName});`
        // console.log('fileData',': ', fileData);
        
        resolve(fileData)
    })
}

async function generateSchema(schemaName,modelName) {
    const data = await getData(modelName);
    console.log('data', ': ', data);
    const fileData = await getFileData(data, schemaName, modelName);
    console.log('fileData',': ', fileData);
    fs.writeFile(`${basePath}/models/${modelName}.js`, fileData, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

generateSchema('userSchema','User');