class Order {
    constructor(id, product, description, quantity, price, discount, total, status, orderDate) {
        this.id = id;
        this.product = product;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
        this.total = total || this.calculateTotal();
        this.status = status || 'pending'; // pending, processing, completed, cancelled
        this.orderDate = orderDate || new Date();
        this.updatedAt = new Date();
    }

    calculateTotal() {
        const subtotal = this.quantity * this.price;
        const discountAmount = subtotal * (this.discount / 100);
        return subtotal - discountAmount;
    }

    updateStatus(newStatus) {
        const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
        if (validStatuses.includes(newStatus)) {
            this.status = newStatus;
            this.updatedAt = new Date();
            return true;
        }
        return false;
    }
}

module.exports = Order;