const ControllerMember = require("./../controllers/member");
const express = require("express");
const router = express.Router();

/** @swagger
 * tags:
 *   - name: Member
 *     description: Rotas relacionadas aos membros
 */

/**
 * @swagger
 * /members:
 *   get:
 *     tags:
 *         - Member
 *     summary: Lista todos os membros
 *     description: Retorna uma lista de todos os membros cadastrados.
 *
 */
router.get("/", ControllerMember.getMembers);

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     tags:
 *         - Member
 *     summary: Busca um membro pelo ID
 *     description: Retorna os detalhes de um membro específico.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do membro
 *         schema:
 *           type: string
 *
 */
router.get("/:id", ControllerMember.getMembersById);

/**
 * @swagger
 * /members:
 *   post:
 *     tags:
 *         - Member
 *     summary: Cria ou atualiza um membro
 *     description: Adiciona um novo membro ou atualiza um membro existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *
 */
router.post("/", ControllerMember.upsertMember);

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     tags:
 *        - Member
 *     summary: Remove um membro pelo ID
 *     description: Exclui um membro específico do sistema.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do membro
 *         schema:
 *           type: string
 *
 */
router.delete("/:id", ControllerMember.deleteMember);

module.exports = router;
