import React, { useEffect, useState } from "react";
import InventoryForm from "./pages/InventoryForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from '@mui/material';
import Receipts from "./pages/Receipts";

function App() {
    return (
        <BrowserRouter>
            <Container maxWidth="md">
                <Routes>
                    <Route path="/create" exact element={<InventoryForm />} />
                    <Route path="/" exact element={<Receipts />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
