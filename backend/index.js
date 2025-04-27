const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Especificando a versão da especificação OpenAPI
    info: {
      title: "API Example", // Título da API
      version: "1.0.0", // Versão da API
      description: "Uma API de exemplo usando Swagger com Express", // Descrição
    },
  },
  apis: ["./src/routes/*.js"], // Caminho para os arquivos de rota
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/ping", (req, res) => {
  res.send({ message: "pong" });
});

app.use("/guilds", require("./src/routes/guild"));
app.use("/channels", require("./src/routes/channel"));
app.use("/members", require("./src/routes/member"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
