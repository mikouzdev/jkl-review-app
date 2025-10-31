import express from "express";

const server = express();

server.get("/api", (_req, res) => {
    res.send("v1");
});

// serve frontend only in production builds
if (process.env.NODE_ENV === "production") {
    server.use(express.static("./frontend/dist"));

    server.get("/*splat", (_req, res) => {
        res.sendFile("index.html", { root: "./frontend/dist/" });
    });
}

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

