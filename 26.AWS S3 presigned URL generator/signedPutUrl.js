async function getSignedPutUrl(params) {
  return new Promise ((resolve, reject) => {
    const AWS = require('aws-sdk')
    
    AWS.config = new AWS.Config({accessKeyId :  process.env.S3_KEY,
      secretAccessKey: process.env.S3_SECRET,
      region: 'us-east-1'});
    
    const s3 = new AWS.S3()
    
    s3.getSignedUrl('putObject', params, function(err, url) { 
      if (err){
        console.log('err',': ', err);
        reject(err);
      }
      resolve(url);
    });
  })
}

module.exports = getSignedPutUrl;