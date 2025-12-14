const ProductRepository = require('../../../../domain/repositories/product.repository.interface');
const ProductModel = require('./models/product.model');
const Product = require('../../../../domain/entities/product.entity');

//AQUI SE AGREGA EL CAMPO DEL EJERCICIO 1
//Agregando el campo brand a todas las acciones establecidas
class ProductMongoRepository extends ProductRepository {
    async getAll() {
        const products = await ProductModel.find();
        //AQUI SE AGREGA EL CAMPO DEL EJERCICIO 1 p.brand
        return products.map(p => new Product(p._id.toString(), p.name, p.description, p.price, p.stock, p.category, p.imageUrl, p.brand));
    }

    //AQUI SE AGREGA EL CAMPO DEL EJERCICIO 1 product.brand
    async getById(id) {
        const product = await ProductModel.findById(id);
        if (!product) return null;
        return new Product(product._id.toString(), product.name, product.description, product.price, product.stock, product.category, product.imageUrl, product.brand);
    }

    //AQUI SE AGREGA EL CAMPO DEL EJERCICIO 1 brand: productEntity
    async create(productEntity) {
        const newProduct = new ProductModel({
            name: productEntity.name,
            description: productEntity.description,
            price: productEntity.price,
            stock: productEntity.stock,
            category: productEntity.category,
            imageUrl: productEntity.imageUrl,
            //product.brand
            brand: productEntity.brand
        });
        //AQUI SE AGREGA EL CAMPO DEL EJERCICIO 1. savedProduct.brand
        const savedProduct = await newProduct.save();
        return new Product(savedProduct._id.toString(), savedProduct.name, savedProduct.description, savedProduct.price, savedProduct.stock, savedProduct.category, savedProduct.imageUrl, savedProduct.brand);
    }

    //AQUI SE AGREGA EL CAMPO DEL EJERCICIO 1. brand: productEntity.brand
    async update(id, productEntity) {
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
            name: productEntity.name,
            description: productEntity.description,
            price: productEntity.price,
            stock: productEntity.stock,
            category: productEntity.category,
            imageUrl: productEntity.imageUrl,
            //brand: productEntity.brand
            brand: productEntity.brand
        }, { new: true });

        //AQUI SE AGREGA EL CAMPO DEL EJERCICIO 1. updatedProduct.brand
        if (!updatedProduct) return null;
        return new Product(updatedProduct._id.toString(), updatedProduct.name, updatedProduct.description, updatedProduct.price, updatedProduct.stock, updatedProduct.category, updatedProduct.imageUrl, updatedProduct.brand);
    }

    async delete(id) {
        await ProductModel.findByIdAndDelete(id);
    }
}

module.exports = ProductMongoRepository;