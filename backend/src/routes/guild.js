const express = require("express");
const ControllerGuild = require("../controllers/guild");

const router = express.Router();

router.get("/", ControllerGuild.getGuilds);
router.get("/:id", ControllerGuild.getGuildById);
router.post("/", ControllerGuild.createGuild);
router.put("/:id", ControllerGuild.updateGuild);
router.delete("/:id", ControllerGuild.deleteGuild);

module.exports = router;
