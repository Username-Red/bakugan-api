const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// cors gave me problems last time, this time I'll make sure it works.
const cors = require('cors'); 
const bakuganRoutes = require('./routes/bakugan');
// adding swagger
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

//Middleware
app.use(cors()); 
app.use(express.json());
// swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//Routes
app.get('/', (req, res) => {
  res.send('Bakugan API is running!');
});

app.use('/bakugan', bakuganRoutes);

//Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server started on port ${process.env.PORT || 3000}`)
    );
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); 
  });
