require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");

// Import route files
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const incomeRoutes = require("./routes/incomeRoutes"); // ✅ new route
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ Static folder for uploaded profile images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/income", incomeRoutes); // ✅ income routes added here

// ✅ Health check endpoint
app.get("/api/health", (req, res) => res.json({ success: true, ts: Date.now() }));

// ✅ Global Error Handler (must be last)
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
