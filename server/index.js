const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const receiptRoutes = require("./routes/receipt");


const app = express();
const port = 5000;
// Database setup


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API route to get all receipts
app.use("/api", receiptRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
