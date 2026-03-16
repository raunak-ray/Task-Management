import express from "express";
import "dotenv/config";
import { connectToDb } from "./config/db";

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    return res.json({message: "Hello World"})
})

app.listen(PORT, () => {
    console.log(`Server started on Port: ${PORT}`)
    connectToDb();
})