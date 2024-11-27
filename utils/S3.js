const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({
  accessKeyId: 'ASIARGHC3XA4X45UR4BC',
  secretAccessKey: '7PdFtiCcLlzcHF0Q93+ADu2u7QY5YaFbfZdd4tHB',
  region: 'us-east-1',
  token: 'IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIHn5uEXVH/mBHZyeInNq+SKPkNgQHeAIiCsbZ3/nUez8AiBIWsdimmcMaEx87/ovErVExz+p2xOcTlb00cR9hfp80Cq5AgiB//////////8BEAAaDDA4MjA4MDE1MTYwOSIMgRGADjNB0xDzVTrAKo0C5sMdMfvrnkNthhTBUB6n1eBok4Yh4H5LxxCKuX7mRbKQTDTeEgXCZPcjOiQIUYmG2cWTbisb0RAPqwu6s39Ba+gmX1qjuStZkvmIVmPRLc3mcYlaoiORgRg0Knh8+7uDR/NTG7o+ZFGjSL6XX8JDOO7o/2PBubSDLM8U7fkG9Vds+SbzRLEWFc4GQ20DSiYtI9FUT98+I9m+aYB8a+yJjG2m5AZrkpFfUiu/NiMzgP1/s7pwjCS4RM3fWShDIykDJ09s8Ebwgy2xxfG3Os+esWPwovoNNVrQ5vQMWFv4pDEMwtbaWxMmYhgwgrtGbp9gYID7Qyg0NRqD8lhVLaytIAFoUFDgrqQp5CScaaUw4/7stwY6ngH4wWBaK2h5w3+ZJP5eGPR5ymwjEvAHkYNxOiOqQ1aT90jt3Y1ssA2FuSRv9trtZrEyJrM5MX/W5MQiKNaImpYYg6dX1+RG/wjapRR/La1pMhKlxwZKzFh0Fn7a+YuD2MRlFa9ISIGjKQjVZYoL1ZsTq4tJMPuC8kXH71Xh/aBku2ZKBTUW0TEpi/eofbWuuT28+/avWG86zlLm4NUGbQ==' 
});


const s3 = new AWS.S3();

function uploadPDFtoS3(pdfFilePath, bucketName) {
    console.log('Verificando existencia del archivo:', pdfFilePath);

    // Verifica si el archivo existe antes de intentar leerlo
    if (!fs.existsSync(pdfFilePath)) {
        console.error('Archivo no encontrado:', pdfFilePath);
        throw new Error('Archivo no encontrado');
    }

    console.log('El archivo existe y está listo para ser subido a S3.');
    const fileContent = fs.readFileSync(pdfFilePath);

    const params = {
        Bucket: bucketName,
        Key: path.basename(pdfFilePath), // Nombre del archivo para guardarlo en S3
        Body: fileContent,
        ContentType: 'application/pdf' // Corrige el ContentType a 'application/pdf'
    };

    console.log('Subiendo archivo a S3...');
    return s3.upload(params).promise();
}

module.exports = { uploadPDFtoS3 };