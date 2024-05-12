const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const PORT = 8080;
app.use(express.json()); 
app.use(cors());
app.use('/api/images', imageRoutes);

mongoose.connect('mongodb://localhost:27017/imageCarousel', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
