const express = require("express");
const cors = require("cors");
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

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Fix manual CORS headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.sendStatus(200);

  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/scans", scanRoutes);   
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("NetMapper API running..."));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
