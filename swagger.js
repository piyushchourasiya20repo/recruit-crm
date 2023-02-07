const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output_new.json'
const endpointsFiles = ['./index.js'];
swaggerAutogen(outputFile, endpointsFiles);