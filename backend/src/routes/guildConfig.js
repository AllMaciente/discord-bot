const express = require("express");
const ControllerGuildConfig = require("./../controllers/guildConfig");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: GuildConfig
 *     description: Rotas relacionadas às configurações de guilda
 */
/**
 * @swagger
 * /guildConfig/{guildId}/{key}:
 *   get:
 *     tags:
 *      - GuildConfig
 *     summary: Obtém uma configuração específica de uma guilda
 *     description: Retorna a configuração de uma guilda com base no ID da guilda e na chave.
 *     parameters:
 *       - in: path
 *         name: guildId
 *         required: true
 *         description: ID da guilda
 *         schema:
 *           type: string
 *       - in: path
 *         name: key
 *         required: true
 *         description: Chave da configuração
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Configuração retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 key:
 *                   type: string
 *                 value:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:guildId/:key", ControllerGuildConfig.getGuildConfig);

/**
 * @swagger
 * /guildConfig/{guildId}:
 *   get:
 *     tags:
 *      - GuildConfig
 *     summary: Obtém todas as configurações de uma guilda
 *     description: Retorna todas as configurações de uma guilda com base no ID da guilda.
 *     parameters:
 *       - in: path
 *         name: guildId
 *         required: true
 *         description: ID da guilda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Configurações retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   key:
 *                     type: string
 *                   value:
 *                     type: string
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:guildId", ControllerGuildConfig.getGuildConfigs);

/**
 * @swagger
 * /guildConfig:
 *   post:
 *     tags:
 *      - GuildConfig
 *     summary: Cria ou atualiza uma configuração de guilda
 *     description: Adiciona ou atualiza uma configuração de guilda.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guildId:
 *                 type: string
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Configuração criada ou atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 guildId:
 *                   type: string
 *                 key:
 *                   type: string
 *                 value:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", ControllerGuildConfig.upsertGuildConfig);

/**
 * @swagger
 * /guildConfig/{guildId}/{key}:
 *   delete:
 *     tags:
 *      - GuildConfig
 *     summary: Remove uma configuração de guilda
 *     description: Exclui uma configuração específica de uma guilda.
 *     parameters:
 *       - in: path
 *         name: guildId
 *         required: true
 *         description: ID da guilda
 *         schema:
 *           type: string
 *       - in: path
 *         name: key
 *         required: true
 *         description: Chave da configuração
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Configuração removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:guildId/:key", ControllerGuildConfig.deleteGuildConfig);

module.exports = router;
