const express = require('express');
const app = express();
const playerRoutes = require('./routes/player.routes');
const squadRoutes = require('./routes/squad.routes');

app.use(express.json());

app.use('/players', playerRoutes);
app.use('/squads', squadRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
