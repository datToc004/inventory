const {
    getReceipts,
    createReceipts,
} = require("../controllers/receiptController");

const router = require("express").Router();

router.get("/receipts", getReceipts);
router.post("/receipt", createReceipts);

module.exports = router;
