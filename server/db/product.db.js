const pool = require("../config");

const getProductByCode = async (product_code) => {
    const { rows: product } = await pool.query(
        "SELECT * FROM products where product_code = $1 ",
        [product_code]
    );
    return product[0];
};

module.exports = {
    getProductByCode,
};
