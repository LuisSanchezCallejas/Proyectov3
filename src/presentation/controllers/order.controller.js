class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    
    getAll = async (req, res) => {
        try {
            const orders = await this.orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const order = await this.orderService.getOrderById(id);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getByStatus = async (req, res) => {
        try {
            const { status } = req.params;
            const orders = await this.orderService.getOrdersByStatus(status);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const order = await this.orderService.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const order = await this.orderService.updateOrder(id, req.body);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    updateStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            
            if (!status) {
                return res.status(400).json({ message: 'Status is required' });
            }

            const order = await this.orderService.updateOrderStatus(id, status);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            await this.orderService.deleteOrder(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getStats = async (req, res) => {
        try {
            const stats = await this.orderService.calculateOrderStats();
            res.status(200).json(stats);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = OrderController;