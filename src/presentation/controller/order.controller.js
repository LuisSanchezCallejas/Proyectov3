class OrderController {
    constructor(oderService) { // Depende del Caso de Uso|
        this.oderService = oderService;
    }
    
    getAll = async (req, res) => { // Usamos arrow fn para no perder el 'this'
        const order = await this.oderService.getAllOrder();
        res.status(200).json(order);
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const order = await this.oderService.getOrderById(id);
        res.status(200).json(order);
    }

    create = async (req, res) => {
        const order = await this.oderService.createOrder(req.body);
        res.status(201).json(order); // 201 Created! 
    }

    update = async (req, res) => {
        const { id } = req.params;
        const order = await this.oderService.updateOrder(id, req.body);
        res.status(200).json(order);
    }

    delete = async (req, res) => {
        const { id } = req.params;
        await this.oderService.deleteOrder(id);
        res.status(204).send(); // 204 No Content
    }
}
module.exports = OrderController;

