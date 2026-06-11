const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authMiddleware = require("./middleware/authMiddleware.js");
const adminMiddleware = require("./middleware/adminMiddleware.js");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("API Running...");
});

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

app.get(
    "/api/admin/test",
    authMiddleware,
    adminMiddleware,
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin",
            user: req.user,
        });
    }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
