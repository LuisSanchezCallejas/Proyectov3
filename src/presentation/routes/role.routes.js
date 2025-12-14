const { Router } = require('express');
const RoleController = require('../controller/role.controller');
const RoleService = require('../../application/use-cases/role.service');
const RoleMongoRepository = require('../../infrastructure/repositories/database/mongo/role.mongo.repository');
const asyncHandler = require('../utils/async.handler');
/*ini*CAMBIOS PARA EL EJERCICIO 2: CONST AGREGADAS*/
const authenticateToken =require('../middlewares/auth.middleware')
const isAdmin = require ('../middlewares/admin.middleware')
/*fin*/
const roleRepository = new RoleMongoRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

const router = Router();
//rutas publicas

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Retrieve a list of Role
 *     responses:
 *       200:
 *         description: A list of Role.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.get('/', asyncHandler(roleController.getAll));
/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Retrieve a List Role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A List Role.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: User not found
 */
router.get('/:id', asyncHandler(roleController.getById));
/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Retrieve a single Role by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request
 *       409:
 *         description: User with this email already exists
 */
//CAMBIOS PARA EL EJERCICIO 2
//rutas protegidas con la autenticacion
router.post('/',[authenticateToken,isAdmin], asyncHandler(roleController.create));
/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Retrieve a single Role by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 */
router.put('/:id',[authenticateToken,isAdmin], asyncHandler(roleController.update));
/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: User not found
 */
router.delete('/:id',[authenticateToken,isAdmin], asyncHandler(roleController.delete));

module.exports = router;
