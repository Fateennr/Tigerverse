const express = require('express');
const cors = require('cors');
const app = express();
const playerRoutes = require('./routes/player.routes');
const squadRoutes = require('./routes/squad.routes');
const servicesRoutes = require('./routes/services.routes');
const matchesRoutes = require('./routes/matches.routes');

app.use(cors({
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

app.use(express.json());

app.use('/players', playerRoutes);
app.use('/squad', squadRoutes);
app.use('/services', servicesRoutes);
app.use('/matches', matchesRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
