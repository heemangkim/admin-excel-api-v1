const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const {fileTypeFromFile} = require("file-type");
const fs = require("fs");


const getFile = async function (key) {
    let params = {
        Bucket: 'bucket-name',
        Key: key,
    }

    let file = await s3.getObject(params);
    return file;
}

const uploadFileByStream = function (key) {
    let getParams = {
        Bucket: 'excel-file',
        Key: key,
    }

    const inputFilename = '/tmp/' + key;

    let putParams = {
        Body: fs.createReadStream(inputFilename),
        Bucket: "example-destination-bucket",
        Key: 'transfer-' + key
    }

    // writing and reading streams
    const writeStream = fs.createWriteStream(inputFilename);
    s3.getObject(getParams).createReadStream().pipe(writeStream);
    writeStream.on('finish', function() {

       s3.upload(putParams, function (err, data) {
            if(err) return {}
       })

    });
}