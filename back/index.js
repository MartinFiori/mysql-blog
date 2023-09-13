const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/auth", require("./routes/auth.routes.js"));

const PORT = process.env.PORT || 8080;
app.listen(8080, () => console.log(`Listening on port ${PORT}`));
