const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config = new AWS.Config({accessKeyId :  process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: 'us-east-1'});

const s3 = new AWS.S3()

const url = s3.getSignedUrl('getObject', {
  Bucket: process.env.BUCKET,
  Key: 'test.json',
  Expires: 120
})

console.log(url);