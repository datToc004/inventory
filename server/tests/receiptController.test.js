const receiptController = require("../controllers/receiptController");
const receiptService = require("../services/receipt.service");
const productService = require("../services/product.service");
const detailReceiptService = require("../services/detail-receipt.service");

jest.mock("../services/receipt.service", () => ({
    getAllReceipts: jest.fn(),
    createReceipts: jest.fn(),
}));

jest.mock("../services/product.service", () => ({
    getProductByCode: jest.fn(),
}));

jest.mock("../services/detail-receipt.service", () => ({
    createReceipts: jest.fn(),
}));

const mockReq = {
    body: {
        product_code: "product_code",
        quantity: 2,
        quantity_commit: 1,
        employee_name: "John Doe",
        price: 10,
    },
};

const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
    send: jest.fn(),
};

describe("Receipt Controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should get all receipts successfully", async () => {
        const mockResults = [{ receipt: "receipt1" }, { receipt: "receipt2" }];
        receiptService.getAllReceipts.mockResolvedValueOnce(mockResults);

        await receiptController.getReceipts(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockResults);
        expect(receiptService.getAllReceipts).toHaveBeenCalled();
    });

    it("should create receipt and detail receipt successfully", async () => {
        const mockProduct = {
            product_id: 1,
        };
        const mockResult = {
            receipt_id: 1,
        };

        productService.getProductByCode.mockResolvedValueOnce(mockProduct);
        receiptService.createReceipts.mockResolvedValueOnce(mockResult);
        detailReceiptService.createReceipts.mockResolvedValueOnce({});

        await receiptController.createReceipts(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockResult);
        expect(productService.getProductByCode).toHaveBeenCalledWith(
            mockReq.body.product_code
        );
        expect(receiptService.createReceipts).toHaveBeenCalledWith(
            expect.objectContaining({
                receipt_date: expect.any(String),
                employee_name: mockReq.body.employee_name,
                total_amount: mockReq.body.price * mockReq.body.quantity,
            })
        );
        expect(detailReceiptService.createReceipts).toHaveBeenCalledWith(
            expect.objectContaining({
                receipt_id: mockResult.receipt_id,
                product_id: mockProduct.product_id,
                quantity: mockReq.body.quantity,
                subtotal: mockReq.body.quantity * mockReq.body.price,
                quantity_commit: mockReq.body.quantity_commit,
            })
        );
    });

    it("should handle errors when fetching receipts", async () => {
        const mockError = new Error("Database error");
        receiptService.getAllReceipts.mockRejectedValueOnce(mockError);

        await receiptController.getReceipts(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith(
            "Error fetching data from the database"
        );
        // expect(console.error).toHaveBeenCalledWith(mockError);
    });

    it("should handle errors when creating a new receipt record", async () => {
        const mockError = new Error("Database error");
        productService.getProductByCode.mockRejectedValueOnce(mockError);

        await receiptController.createReceipts(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith(
            "Error creating a new receipt record"
        );
        // expect(console.error).toHaveBeenCalledWith(mockError);
    });
});
