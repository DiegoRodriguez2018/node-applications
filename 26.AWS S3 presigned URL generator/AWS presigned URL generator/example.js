const { generateGetUrl, generatePutUrl } = require('./presignedURLGenerator');

async function initialize(){
  const getUrl =  await generateGetUrl('tigre.jpeg');
  console.log('getUrl',': ', getUrl);
  
  const Key =  'file-to-upload.jpeg';
  const ContentType = 'image/jpeg';
  const putUrl = await generatePutUrl(Key, ContentType);
  console.log('putUrl',': ', putUrl);
}

initialize();