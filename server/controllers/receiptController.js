const receiptService = require("../services/receipt.service");
const productService = require("../services/product.service");
const detailReceiptService = require("../services/detail-receipt.service");

module.exports.getReceipts = async (req, res, next) => {
    try {
        
        const results = await receiptService.getAllReceipts();
        res.status(201).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from the database");
    }
};
module.exports.createReceipts = async (req, res, next) => {
    try {
        const {
            product_code,
            quantity,
            quantity_commit,
            employee_name,
            price,
        } = req.body;
        let total_amount = price * quantity;
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }

        const receipt_date = `${year}-${month}-${day}`;

        
        const product = await productService.getProductByCode(product_code);
        const product_id = product.product_id;
        
        const result = await receiptService.createReceipts({receipt_date, employee_name, total_amount});
        const receipt_id = result.receipt_id;
        let subtotal = quantity * price;

        const result1 = await detailReceiptService.createReceipts({receipt_id, product_id, quantity, subtotal, quantity_commit});


        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating a new receipt record");
    }
};
