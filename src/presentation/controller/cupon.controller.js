class OrderController {
    constructor(cuponService) { // Depende del Caso de Uso|
        this.cuponService = cuponService;
    }
    
    getAll = async (req, res) => { // Usamos arrow fn para no perder el 'this'
        const cupon = await this.cuponService.getAllCupon();
        res.status(200).json(cupon);
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const cupon = await this.cuponService.getCuponById(id);
        res.status(200).json(cupon);
    }

    create = async (req, res) => {
        const cupon = await this.cuponService.createCupon(req.body);
        res.status(201).json(cupon); // 201 Created! 
    }

    update = async (req, res) => {
        const { id } = req.params;
        const cupon = await this.cuponService.updateCupon(id, req.body);
        res.status(200).json(cupon);
    }

    delete = async (req, res) => {
        const { id } = req.params;
        await this.cuponService.deleteCupon(id);
        res.status(204).send(); // 204 No Content
    }
}
module.exports = OrderController;

