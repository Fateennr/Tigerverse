const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");


const playerRoutes   = require('./routes/player.routes');
const squadRoutes    = require('./routes/squad.routes');
const servicesRoutes = require('./routes/services.routes');
const galleryRoutes  = require('./routes/gallery.routes');
const matchesRoutes  = require('./routes/matches.routes');
const mysquadRoutes  = require('./routes/mysquad.routes');
const h2hRoutes = require('./routes/h2h.routes');
const hallRoutes = require('./routes/hall.routes');

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ service: "player-service", status: "ok" });
});

app.use('/players',  playerRoutes);
app.use('/squad',    squadRoutes);
app.use('/services', servicesRoutes);
app.use('/gallery',  galleryRoutes);
app.use('/hall', hallRoutes);
app.use('/matches', matchesRoutes);
app.use('/mysquad', mysquadRoutes);
app.use('/h2h',      h2hRoutes); 


app.get("/profile", (req, res) => {
  res.json({ message: "player profile route working" });
});

module.exports = app;