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

// Retrieving the bucket name from env variable
const Bucket = process.env.BUCKET;

// GET URL Generator
async function generateGetUrl(Key) {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      'getObject',
      {
        Bucket,
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
    // Note Bucket is retrieved from the env variable above.
    const params = {Bucket, Key, ContentType };
    s3.getSignedUrl('putObject', params, function(err, url) {
      if (err) {
        reject(err);
      }
      resolve(url);
    });
  });
}

module.exports = { generateGetUrl, generatePutUrl };
