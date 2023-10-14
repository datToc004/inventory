import React, { useState } from "react";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Grid,
    Typography,
} from "@mui/material";
import * as api from "../api/index.js";
import { useNavigate } from "react-router-dom";

const InventoryForm = () => {
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        product_name: "",
        product_code: "",
        product_unit: "",
        employee_name: "",
        quantity: 0,
        quantity_commit: 0,
        price: 0,
    });

    const handlePriceChange = (event) => {
        const newPrice = event.target.value;
        setPostData({ ...postData, price: newPrice });
    };

    const handleQuantityChange = (event) => {
        const newQuantity = event.target.value;
        setPostData({ ...postData, quantity: newQuantity });  
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Your submit logic here
        await api.createReceipt(postData);

        console.log("Total Amount:", postData);
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f9f9f9",
                padding: "20px",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: "100%" }}
                >
                    <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                        Inventory Form
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                label="Product Name"
                                variant="outlined"
                                value={postData.product_name}
                                onChange={(e) =>
                                    setPostData({
                                        ...postData,
                                        product_name: e.target.value,
                                    })
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Product Code"
                                variant="outlined"
                                value={postData.product_code}
                                onChange={(e) =>
                                    setPostData({
                                        ...postData,
                                        product_code: e.target.value,
                                    })
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Product Unit"
                                variant="outlined"
                                value={postData.product_unit}
                                onChange={(e) =>
                                    setPostData({
                                        ...postData,
                                        product_unit: e.target.value,
                                    })
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Quantity"
                                type="number"
                                variant="outlined"
                                value={postData.quantity}
                                onChange={handleQuantityChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Quantity Commit"
                                type="number"
                                variant="outlined"
                                value={postData.quantity_commit}
                                onChange={(e) =>
                                    setPostData({
                                        ...postData,
                                        quantity_commit: e.target.value,
                                    })
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Price"
                                type="number"
                                variant="outlined"
                                value={postData.price}
                                onChange={handlePriceChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Employee Name"
                                variant="outlined"
                                value={postData.employee_name}
                                onChange={(e) =>
                                    setPostData({
                                        ...postData,
                                        employee_name: e.target.value,
                                    })
                                }
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default InventoryForm;
