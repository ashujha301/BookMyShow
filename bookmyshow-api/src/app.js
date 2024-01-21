const express = require('express');
const bodyParser = require('body-parser');
const theatreRoutes = require('./routes/theatreRoutes');
const movieRoutes = require('./routes/movieRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/theatres', theatreRoutes);
app.use('/movies', movieRoutes);
app.use('/tickets', ticketRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});