const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authMiddleware = require("./middleware/authMiddleware.js");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get(
    "/api/protected",
    authMiddleware,
    (req, res) => {
        res.json({
            success: true,
            user: req.user,
        });
    }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});