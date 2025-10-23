const fs = require("fs");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

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
      questions,
    },
  });
});
