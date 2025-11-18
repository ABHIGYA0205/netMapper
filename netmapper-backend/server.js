const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const scanRoutes = require("./routes/scanRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));

const allowedOrigins = [
  "http://localhost:3000",
  "https://net-mapper-kbeq.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/scans", scanRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("NetMapper API running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
