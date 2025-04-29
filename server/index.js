// index.js

const express        = require('express');
const cors           = require('cors');

// import your routers before you ever call app.use()
const playerRoutes   = require('./routes/player.routes');
const squadRoutes    = require('./routes/squad.routes');
const servicesRoutes = require('./routes/services.routes');
const galleryRoutes  = require('./routes/gallery.routes');

const app = express();
const mysquadRoutes = require('./routes/mysquad.routes');

// now you can safely mount them
app.use(cors({
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));
app.use(express.json());

app.use('/players',  playerRoutes);
app.use('/squad',    squadRoutes);
app.use('/services', servicesRoutes);
app.use('/gallery',  galleryRoutes);
app.use('/mysquad',mysquadRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
