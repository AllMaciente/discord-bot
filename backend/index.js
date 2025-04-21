const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (req, res) => {
  res.send({ message: "pong" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
