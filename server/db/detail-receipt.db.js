const pool = require("../config");

const createDetailReceipt = async ({
    receipt_id,
    product_id,
    quantity,
    subtotal,
    quantity_commit,
}) => {
    const { rows } = await pool.query(
        "INSERT INTO detailReceipt (receipt_id, product_id, quantity, subtotal,quantity_commit) VALUES ($1, $2, $3, $4,$5) RETURNING *",
        [receipt_id, product_id, quantity, subtotal, quantity_commit]
    );
    return rows[0];
};

module.exports = {
    createDetailReceipt,
};
