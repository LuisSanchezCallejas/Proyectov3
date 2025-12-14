const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const asyncHandler = require('../utils/async.handler');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
/**
 * @swagger
 * /auth:
 *   get:
 *     summary:  list of auth
 *     responses:
 *       200:
 *         description: A list of auth.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auth'
 */
router.post('/login', asyncHandler(authController.login));

module.exports = router;
