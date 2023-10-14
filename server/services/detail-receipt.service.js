const { createDetailReceipt } = require("../db/detail-receipt.db");

class detailReceiptService {
    
    createReceipts = async (detailReceipt) => {
        try {
            return await createDetailReceipt(detailReceipt);
        } catch (error) {
           
        }
    };
}

module.exports = new detailReceiptService();