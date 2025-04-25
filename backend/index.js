const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.get("/ping", (req, res) => {
  res.send({ message: "pong" });
});

app.use("/guilds", require("./src/routes/guild"));
app.use("/channels", require("./src/routes/channel"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
