import express from "express";

const server = express();

server.get("/api", (req, res) => {
    res.send("333");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});