const express = require("express");
const ControllerGuild = require("./../controllers/guild");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Guild
 *     description: Rotas relacionadas as guildas
 */

/**
 * @swagger
 * /guild:
 *   get:
 *     tags:
 *      - Guild
 *     summary: Lista todas as guildas
 *     description: Retorna uma lista de todas as guildas cadastradas.
 *     responses:
 *       200:
 *         description: Lista de guildas retornada com sucesso
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
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", ControllerGuild.getGuilds);

/**
 * @swagger
 * /guild/{id}:
 *   get:
 *     tags:
 *        - Guild
 *     summary: Busca uma guilda pelo ID
 *     description: Retorna os detalhes de uma guilda específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da guilda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Guilda encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Guilda não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id", ControllerGuild.getGuildById);

/**
 * @swagger
 * /guild:
 *   post:
 *     tags:
 *       - Guild
 *     summary: Cria uma nova guilda
 *     description: Adiciona uma nova guilda ao sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Guilda criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", ControllerGuild.createGuild);

/**
 * @swagger
 * /guild/{id}:
 *   put:
 *     tags:
 *      - Guild
 *     summary: Atualiza uma guilda
 *     description: Atualiza os dados de uma guilda existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da guilda
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Guilda atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Guilda não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", ControllerGuild.updateGuild);

/**
 * @swagger
 * /guild/{id}:
 *   delete:
 *     tags:
 *      - Guild
 *     summary: Remove uma guilda
 *     description: Exclui uma guilda específica do sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da guilda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Guilda removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Guilda não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", ControllerGuild.deleteGuild);

/**
 * @swagger
 * /guild/config:
 *   get:
 *     tags:
 *      - Guild
 *     summary: Rotas de configuração da guilda
 *     description: Redireciona para as rotas de configuração da guilda.
 */
router.use("/config", require("./guildConfig"));

module.exports = router;
