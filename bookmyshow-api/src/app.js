const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/connection');
const theatreRoutes = require('./routes/theatreRoutes');
const movieRoutes = require('./routes/movieRoutes');
// const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.use('/theatres', theatreRoutes);
app.use('/movies', movieRoutes);
// app.use('/tickets', ticketRoutes);

// Syncronise models with database
sequelize.sync()
.then(()=>{
  console.log("Database synced");
})
.catch(err =>{
  console.error("Error syncing database",err);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});