class Order {
    constructor(id, orderNumber, userId, creationDate, updateDate, status, totalAmount) {
        this.id = id;
		// Número único de la orden
        this.orderNumber = orderNumber;
		// Cliente asociado
        this.userId = userId;
		// Fecha en que se creó la orden
        this.creationDate = creationDate;
		// Fecha de última actualización
        this.updateDate = updateDate;
		// Estado de la orden (NEW, PAID, SHIPPED, CANCELLED)
        this.status = status;
		// Monto total de la orden
        this.totalAmount = totalAmount;
    }
}

module.exports = Order;