class Product {
    constructor(id, name, description, price, stock, category, imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.imageUrl = imageUrl;
        //AQUI SE AGREGA EL CAMPO DEL EJERCICIO 1
        this.brand = brand; //nuevo campo "marca" agregado
    }
}

module.exports = Product;