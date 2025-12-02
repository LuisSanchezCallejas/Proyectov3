const Order = require('../../domain/entities/order.entity');

class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    
    async getAllOrders() {
        return this.orderRepository.getAll();
    }

    async getOrderById(id) {
        return this.orderRepository.getById(id);
    }

    async getOrdersByStatus(status) {
        return this.orderRepository.getByStatus(status);
    }

    async createOrder(orderData) {
        const orderEntity = new Order(
            null,
            orderData.product,
            orderData.description,
            orderData.quantity,
            orderData.price,
            orderData.discount || 0,
            null, // total se calculará automáticamente
            orderData.status || 'pending',
            orderData.orderDate
        );
        
        // Campos adicionales si se proporcionan
        if (orderData.customerName) orderEntity.customerName = orderData.customerName;
        if (orderData.customerEmail) orderEntity.customerEmail = orderData.customerEmail;
        
        return this.orderRepository.create(orderEntity);
    }

    async updateOrder(id, orderData) {
        const existingOrder = await this.orderRepository.getById(id);
        if (!existingOrder) return null;

        const orderEntity = new Order(
            id,
            orderData.product || existingOrder.product,
            orderData.description || existingOrder.description,
            orderData.quantity || existingOrder.quantity,
            orderData.price || existingOrder.price,
            orderData.discount || existingOrder.discount,
            null, // total se recalculará
            orderData.status || existingOrder.status,
            existingOrder.orderDate
        );

        // Mantener campos adicionales si existen
        if (existingOrder.customerName) orderEntity.customerName = existingOrder.customerName;
        if (existingOrder.customerEmail) orderEntity.customerEmail = existingOrder.customerEmail;

        return this.orderRepository.update(id, orderEntity);
    }

    async updateOrderStatus(id, status) {
        return this.orderRepository.updateStatus(id, status);
    }

    async deleteOrder(id) {
        return this.orderRepository.delete(id);
    }

    async calculateOrderStats() {
        const orders = await this.orderRepository.getAll();
        
        const stats = {
            totalOrders: orders.length,
            totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
            pending: orders.filter(o => o.status === 'pending').length,
            processing: orders.filter(o => o.status === 'processing').length,
            completed: orders.filter(o => o.status === 'completed').length,
            cancelled: orders.filter(o => o.status === 'cancelled').length
        };

        stats.averageOrderValue = stats.totalOrders > 0 
            ? stats.totalRevenue / stats.totalOrders 
            : 0;

        return stats;
    }
}

module.exports = OrderService;