const OrderRepository = require('../../../../domain/repositories/order.repository.interface');
const OrderModel = require('./models/order.model');
const Order = require('../../../../domain/entities/order.entity');

class OrderMongoRepository extends OrderRepository {
    async getAll() {
        const orders = await OrderModel.find();
        return orders.map(p => new Order(p._id.toString(), p.orderNumber, p.userId, p.creationDate, p.updateDate, p.status, p.totalAmount));
    }

    async getById(id) {
        const order = await OrderModel.findById(id);
        if (!order) return null;
        return new Order(order._id.toString(), order.orderNumber, order.userId, order.creationDate, order.updateDate, order.status, order.totalAmount);
    }

    async create(orderEntity) {
        const newOrder = new OrderModel({
            orderNumber: orderEntity.orderNumber,
            userId: orderEntity.userId,
            creationDate: orderEntity.creationDate,
            updateDate: orderEntity.updateDate,
            status: orderEntity.status,
            totalAmount: orderEntity.totalAmount
        });
        const savedOrder = await newOrder.save();
        return new Order(savedOrder._id.toString(), savedOrder.orderNumber, savedOrder.userId, savedOrder.creationDate, savedOrder.updateDate, savedOrder.status, savedOrder.totalAmount);
    }

    async update(id, orderEntity) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
            orderNumber: orderEntity.orderNumber,
            userId: orderEntity.userId,
            creationDate: orderEntity.creationDate,
            updateDate: orderEntity.updateDate,
            status: orderEntity.status,
            totalAmount: orderEntity.totalAmount
        }, { new: true });

        if (!updatedOrder) return null;
        return new Order(updatedOrder._id.toString(), updatedOrder.orderNumber, updatedOrder.userId, updatedOrder.creationDate, updatedOrder.updateDate, updatedOrder.status, updatedOrder.totalAmount);
    }

    async delete(id) {
        await OrderModel.findByIdAndDelete(id);
    }
}

module.exports = OrderMongoRepository;