// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Bakugan API',
    description: 'API documentation for Bakugan project',
  },
  host: 'bakugan-api.onrender.com', //will be render later
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
