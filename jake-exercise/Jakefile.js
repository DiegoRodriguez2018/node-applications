


desc('This is the default task.');
task('default', function (params) {
    console.log('This is the default task.');
});


task('sayhi', function (params) {
    console.log('Hi mate!.');
});


task('create-index', function (params) {
    var appRoot = require('app-root-path');
    // appRoot will return an object, and appRoot.path will return a String.
    console.log('appRoot.path', ': ', appRoot.path);
    const fs = require('fs');
    const filePath = appRoot.path + '/index.js'
    console.log('filePath',': ', filePath);
    const content = ` 
    import React, { Component } from 'react';
    class App extends Component {
         render() {
            return (
                <div>
                </div>
            );
        }
    }
    export default App;`
    //writting the file:
    fs.writeFile(filePath, content, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
});


task('create-folder', function (modelName) {
    jake.mkdirP(`Views/${modelName}`);
})


task('create-views', function (modelName) {
    const appRoot = require('app-root-path');
    console.log('appRoot.path',': ', appRoot.path);
    const originPath = appRoot.path + '/templates'
    const destinationPath = appRoot.path + `/Views/${modelName}` 
    
    jake.cpR(originPath, destinationPath);

    // var appRoot = require('app-root-path');
    // // appRoot will return an object, and appRoot.path will return a String.
    // console.log('appRoot.path', ': ', appRoot.path);
    // const fs = require('fs');
    // const filePath = appRoot.path + `/Views/${modelName}/Index.js`
    // console.log('filePath',': ', filePath);
    // const content = `console.log(\`Index for ${modelName}\`)`
    // //writting the file:
    // fs.writeFile(filePath, content, function (err) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log("The file was saved!");
    // });
})



