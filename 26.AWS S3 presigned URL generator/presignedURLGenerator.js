require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config = new AWS.Config({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: 'us-east-1'
});

const s3 = new AWS.S3();


function generateGetUrl(Key) {
  s3.getSignedUrl(
    'getObject',
    {
      Bucket: process.env.BUCKET,
      Key,
      Expires: 120
    },
    (err, url) => {
      if (err){
        return err;
      } else {
        return url;
      }
    }
  );
}

async function generatePutUrl(params) {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, function(err, url) {
      if (err) {
        console.log('err', ': ', err);
        reject(err);
      }
      resolve(url);
    });
  });
}

module.exports = { generateGetUrl, generatePutUrl };
