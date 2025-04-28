// server/index.js
//require('dotenv').config()        // loads .env into process.env
const express       = require('express')
const cors          = require('cors')
const app           = express()

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

// Routes
app.use('/players', require('./routes/player.routes'))
app.use('/squads',  require('./routes/squad.routes'))
app.use('/gallery', require('./routes/gallery.routes'))

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 Unhandled error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

// Start server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
