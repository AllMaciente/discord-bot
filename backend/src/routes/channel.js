const express = require("express");
const controllerChannel = require("./../controllers/channel"); // Importa a instância
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Channel
 *     description: Rotas relacionadas aos canais
 */
/**
 * @swagger
 * /channel:
 *   get:
 *     tags:
 *      - Channel
 *     summary: Lista todos os canais
 *     description: Retorna uma lista de todos os canais cadastrados.
 *     responses:
 *       200:
 *         description: Lista de canais retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   guildId:
 *                     type: string
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", controllerChannel.getChannels);

/**
 * @swagger
 * /channel/{id}:
 *   get:
 *     tags:
 *      - Channel
 *     summary: Busca um canal pelo ID
 *     description: Retorna os detalhes de um canal específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do canal
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Canal encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 guildId:
 *                   type: string
 *       404:
 *         description: Canal não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id", controllerChannel.getChannelById);

/**
 * @swagger
 * /channel/guild/{id}:
 *   get:
 *     tags:
 *      - Channel
 *     summary: Lista os canais de uma guilda
 *     description: Retorna uma lista de canais associados a uma guilda específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da guilda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de canais retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   guildId:
 *                     type: string
 *       404:
 *         description: Guilda não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/guild/:id", controllerChannel.getChannelByGuildId);

/**
 * @swagger
 * /channel:
 *   post:
 *     tags:
 *      - Channel
 *     summary: Sincroniza um canal
 *     description: Adiciona ou atualiza informações de um canal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               guildId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Canal sincronizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 guildId:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", controllerChannel.syncChannel);

module.exports = router;
