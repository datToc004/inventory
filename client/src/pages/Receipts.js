import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
} from "@mui/material";
import * as api from "../api/index.js";
import { useNavigate } from "react-router-dom";


const Receipts = () => {
    const [receipts, setReceipts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            const receipt = await api.getReceipt();
            setReceipts(receipt.data);
        };
        getData();
    }, []);
    useEffect(() => {
        console.log(receipts);
    }, [receipts]);


    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate('/create');

    }
    return (
        <>
            <TableContainer component={Paper}>
                <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                    Inventory Table
                </Typography>
                <Table aria-label="receipts table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Code</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Quantity Commit</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {receipts &&
                            receipts.map((receipt, key) => (
                                <TableRow key={key}>
                                    <TableCell>
                                        {receipt.product_code}
                                    </TableCell>
                                    <TableCell>
                                        {receipt.product_name}
                                    </TableCell>
                                    <TableCell>
                                        {receipt.product_unit}
                                    </TableCell>
                                    <TableCell>
                                        {receipt.quantity_commit}
                                    </TableCell>
                                    <TableCell>{receipt.quantity}</TableCell>
                                    <TableCell>{receipt.price}</TableCell>
                                    <TableCell>
                                        {receipt.total_amount}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={handleSubmit} style={{ marginTop: "20px" }}>
                Create Receipt
            </Button>
        </>
    );
};

export default Receipts;
