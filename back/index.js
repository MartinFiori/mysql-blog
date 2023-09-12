const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(morgan('dev'));



const PORT = process.env.PORT || 8080;
app.listen(8080, () => console.log(`Listening on port ${PORT}`));
