import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const createReceipt = (newReceipt) => API.post("/api/receipt", newReceipt);
export const getReceipt = () => API.get("/api/receipts");