const express        = require('express');
const cors           = require('cors');
const playerRoutes   = require('./routes/player.routes');
const squadRoutes    = require('./routes/squad.routes');
const servicesRoutes = require('./routes/services.routes');
const galleryRoutes  = require('./routes/gallery.routes');
const h2hRoutes      = require('./routes/h2h.routes');  // ← make sure this line is here

const app = express();
app.use(cors({
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));
app.use(express.json());

app.use('/players',  playerRoutes);
app.use('/squad',    squadRoutes);
app.use('/services', servicesRoutes);
app.use('/gallery',  galleryRoutes);
app.use('/h2h',      h2hRoutes);   // ← and this

console.log('h2hRoutes is:', h2hRoutes);
// should print something like: [Function: router] { … }
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
