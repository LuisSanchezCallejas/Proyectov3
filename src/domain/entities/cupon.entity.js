class Cupon {
    constructor(id, code, description, discountPercentage, validFrom, validUntil) {
        this.id = id;
		// Código del cupón
        this.code = code;
		// Descripción del cupón
        this.description = description;
		// Descuento porcentual (ej: 10 = 10%)
        this.discountPercentage = discountPercentage;
		// Fecha de inicio de validez
        this.validFrom = validFrom;
		// Fecha fin de validez
        this.validUntil = validUntil;		
    }
}

module.exports = Cupon;