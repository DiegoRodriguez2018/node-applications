require('dotenv').config();
const AWS = require('aws-sdk');

// Configuring AWS
AWS.config = new AWS.Config({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: 'us-east-1'
});

// Creating a S3 instance
const s3 = new AWS.S3();

// GET URL Generator
async function generateGetUrl(Key) {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      'getObject',
      {
        Bucket: process.env.BUCKET,
        Key,
        Expires: 120
      },
      (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      }
    );
  });
}

// PUT URL Generator
async function generatePutUrl(Key, ContentType) {
  return new Promise((resolve, reject) => {
    const params = { Key, ContentType };
    s3.getSignedUrl('putObject', params, function(err, url) {
      if (err) {
        reject(err);
      }
      resolve(url);
    });
  });
}

module.exports = { generateGetUrl, generatePutUrl };
