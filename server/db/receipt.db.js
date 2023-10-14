const pool = require("../config");

const getAllReceiptDb = async () => {
    const { rows: receipts } =
        await pool.query(`select product_code,product_name,product_unit,quantity_commit,quantity,price,total_amount 
    from receipts as r 
    join detailReceipt as dr
    on r.receipt_id=dr.receipt_id
    join products as p
    on p.product_id= dr.product_id`);
    return receipts;
};
const createReceipts = async ({
    receipt_date,
    employee_name,
    total_amount,
}) => {
    const { rows } = await pool.query(
        "INSERT INTO receipts (receipt_date, employee_name, total_amount) VALUES ($1, $2, $3) RETURNING *",
        [receipt_date, employee_name, total_amount]
    );
    return rows[0];
};

module.exports = {
    getAllReceiptDb,
    createReceipts,
};
