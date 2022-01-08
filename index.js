const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("hello world");
});

// this is a git/ssh test

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
