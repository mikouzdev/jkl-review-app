import express from "express";
import userRouter from "./routes/userRouter.js";
import districtRouter from "./routes/districtRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import authRouter from "./routes/authRouter.js";
import { authenticate } from "./middleware/auth.js";

const server = express();

server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/districts", districtRouter);
server.use("/api/reviews", reviewRouter);
server.use("/api/auth", authRouter);

server.get("/api", (_req, res) => {
  res.send("working!");
});

server.get("/api/version", authenticate, (_req, res) => {
  res.send("v1");
});

// serve frontend only in production builds
if (process.env.NODE_ENV === "production") {
  server.use(express.static("./frontend/dist"));

  server.get("/*splat", (_req, res) => {
    res.sendFile("index.html", { root: "./frontend/dist/" });
  });
}

export default server;
