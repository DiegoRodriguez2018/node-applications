const { generateGetUrl, generatePutUrl } = require('./presignedURLGenerator');

async function initialize(){
  const get =  await generateGetUrl('tigre.jpeg');
  console.log('get',': ', get);
  
}

initialize();


