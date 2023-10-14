const { getProductByCode } = require("../db/product.db");

class ProductService {
    getProductByCode = async (product_code) => {
        try {
            return await getProductByCode(product_code);
        } catch (error) {
            
        }
    };
}

module.exports = new ProductService();