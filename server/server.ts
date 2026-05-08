// Import Required Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load Environmental Variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// Enable CORS
const corsConfig = require("./config/cors.json");

// Initialize Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(cors(corsConfig));

// Routes
const todosRouter = require("./routes/todos");

app.use("/todos", todosRouter);

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(`Successfully connected to Mongodb`);

    app.listen(PORT, () => {
      console.log("server started");
    });
  })
  .catch((err: any) => console.log(err));