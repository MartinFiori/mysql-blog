const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(morgan('dev'));
const db = require('./db.js')

app.get('/', (req, res) => {
  const q = 'SELECT * FROM users;'
  db.query(q, (err, data) => {
    if (err) return res.status(400).json({ error: err.message })
    res.json(data)
  })
})

const PORT = process.env.PORT || 8080;
app.listen(8080, () => console.log(`Listening on port ${PORT}`));
