const { getAllReceiptDb, createReceipts } = require("../db/receipt.db");

class ReceiptService {
    getAllReceipts = async () => {
        try {
            return await getAllReceiptDb();
        } catch (error) {
            
        }
    };
    createReceipts = async (receipt) => {
        try {
            return await createReceipts(receipt);
        } catch (error) {
           
        }
    };
}

module.exports = new ReceiptService();
