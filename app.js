const fs = require("fs");
const express = require("express");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;

// ----------------------------------------------------
// **1. Define the allowed origins**
// Use an array to allow multiple specific domains
const allowedOrigins = [
  "http://localhost:3000", // <-- Local development React app
  "https://marwan-react-quiz.vercel.app", // <-- The one that needs access
  // Add other domains, like your future production URL, here if needed
];

// -----------------------------------------------------
// **2. Configure and use the CORS middleware**
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Define allowed HTTP methods
  credentials: true,
};

app.use(cors(corsOptions));
// ----------------------------------------------------

// Start server
app.listen(PORT);

// Read questions data
const questions = JSON.parse(
  fs.readFileSync(`${__dirname}/data/questions.json`, "utf-8")
);

// Get all questions
app.get("/api/v1/questions", (_, res) => {
  if (!questions || questions.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No questions found",
    });
  }

  res.status(200).json({
    status: "success",
    results: questions.length,
    data: {
      questions: questions.questions,
    },
  });
});
