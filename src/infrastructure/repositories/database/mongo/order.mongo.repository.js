const OrderRepository = require('../../../../domain/repositories/order.repository.interface')
const OrderModel = require('./models/order.model');
const Order = require('../../../../domain/entities/order.entity');

class OrderMongoRepository extends OrderRepository {
    async getAll() {
        const orders = await OrderModel.find().sort({ orderDate: -1 });
        return orders.map(order => this._toEntity(order));
    }

    async getById(id) {
        const order = await OrderModel.findById(id);
        if (!order) return null;
        return this._toEntity(order);
    }

    async create(orderEntity) {
        const newOrder = new OrderModel({
            product: orderEntity.product,
            description: orderEntity.description,
            quantity: orderEntity.quantity,
            price: orderEntity.price,
            discount: orderEntity.discount,
            total: orderEntity.total,
            status: orderEntity.status,
            orderDate: orderEntity.orderDate,
            customerName: orderEntity.customerName,
            customerEmail: orderEntity.customerEmail
        });
        
        const savedOrder = await newOrder.save();
        return this._toEntity(savedOrder);
    }

    async update(id, orderEntity) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
            product: orderEntity.product,
            description: orderEntity.description,
            quantity: orderEntity.quantity,
            price: orderEntity.price,
            discount: orderEntity.discount,
            status: orderEntity.status,
            customerName: orderEntity.customerName,
            customerEmail: orderEntity.customerEmail
        }, { new: true });

        if (!updatedOrder) return null;
        return this._toEntity(updatedOrder);
    }

    async delete(id) {
        await OrderModel.findByIdAndDelete(id);
    }

    async getByStatus(status) {
        const orders = await OrderModel.find({ status }).sort({ orderDate: -1 });
        return orders.map(order => this._toEntity(order));
    }

    async updateStatus(id, status) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );
        
        if (!updatedOrder) return null;
        return this._toEntity(updatedOrder);
    }

    _toEntity(orderDoc) {
        return new Order(
            orderDoc._id.toString(),
            orderDoc.product,
            orderDoc.description,
            orderDoc.quantity,
            orderDoc.price,
            orderDoc.discount,
            orderDoc.total,
            orderDoc.status,
            orderDoc.orderDate
        );
    }
}

module.exports = OrderMongoRepository;