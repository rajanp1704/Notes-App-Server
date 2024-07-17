require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./helpers/db");
const routes = require("./routes/index.js");
const cors = require("cors");
const handleResponse = require("./helpers/handleResponse.js");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/", routes);

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  return handleResponse.errorMessage(res, error.message);
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
