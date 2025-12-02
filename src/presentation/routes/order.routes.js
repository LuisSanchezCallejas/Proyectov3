const { Router } = require('express');
const OrderController = require('../controllers/order.controller');
const OrderService = require('../../application/use-cases/order.service');
const OrderMongoRepository = require('../../infrastructure/repositories/database/mongo/order.mongo.repository');

const orderRepository = new OrderMongoRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

const router = Router();

// Rutas CRUD básicas
router.get('/', orderController.getAll);
router.get('/stats', orderController.getStats);
router.get('/status/:status', orderController.getByStatus);
router.get('/:id', orderController.getById);
router.post('/', orderController.create);
router.put('/:id', orderController.update);
router.patch('/:id/status', orderController.updateStatus);
router.delete('/:id', orderController.delete);

module.exports = router;