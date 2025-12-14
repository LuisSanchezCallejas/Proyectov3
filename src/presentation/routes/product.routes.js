const { Router } = require('express');
const ProductController = require('../controller/product.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');
const asyncHandler = require('../utils/async.handler');

// Esta es la "Inyección de Dependencias" manual
const ProductService = require('../../application/use-cases/product.service');

const ProductMongoRepository = require('../../infrastructure/repositories/database/mongo/product.mongo.repository');
const productRepository = new ProductMongoRepository();

const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = Router();
/**
 * @swagger
 * /product:
 *   get:
 *     summary: Retrieve a list of product
 *     responses:
 *       200:
 *         description: A list of product.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', asyncHandler(productController.getAll));
/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: User not found
 */
router.get('/:id', asyncHandler(productController.getById));
/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: The created Product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       409:
 *         description: Product with this email already exists
 */
router.post('/', [authenticateToken, isAdmin], asyncHandler(productController.create));
/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update a Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: The updated Product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.put('/:id', [authenticateToken, isAdmin], asyncHandler(productController.update));
/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete product
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
router.delete('/:id', [authenticateToken, isAdmin], asyncHandler(productController.delete));

module.exports = router;
