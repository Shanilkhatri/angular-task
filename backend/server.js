const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // allow requests from other origins like Angular frontend
app.use(bodyParser.json()); // parse JSON in request body

// API Routes
app.use("/api", userRoutes); // prefix every route with /api

// Start server and sync DB
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced!");
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
