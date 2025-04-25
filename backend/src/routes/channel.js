const express = require("express");
const controllerChannel = require("./../controllers/channel"); // Importa a instância
const router = express.Router();

router.get("/", controllerChannel.getChannels);
router.get("/:id", controllerChannel.getChannelById);
router.get("/guild/:id", controllerChannel.getChannelByGuildId);
router.post("/", controllerChannel.syncChannel);

module.exports = router;
