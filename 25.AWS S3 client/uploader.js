const s3 = require('s3');
require('dotenv').config()

function uploader(filePath, remoteName){
  const client = s3.createClient({
    s3Options: {
      accessKeyId: process.env.S3_KEY,
      secretAccessKey: process.env.S3_SECRET,
    },
  });

  const params = {
    localFile: filePath,
    s3Params: {
      Bucket: "cubeta-test",
      Key: remoteName, // This is the name of the new remote file.
    },
  };

  const uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
              uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  });
}

module.exports = uploader;