const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const exerciseRoutes = require("./routes/exerciseRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// routes
app.use("/api/exercises", exerciseRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
