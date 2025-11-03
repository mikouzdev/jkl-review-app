import express, { type Request, type Response } from "express";
import argon2 from "argon2"
import { generateToken } from "../utils/jwt.js"
import { userRepo } from "../repos/userRepo.js";

const router = express.Router();

interface User {
    username: string,
    email: string,
    password_hash: string,
    role: string,
    created_at: Date
}

// endpoint for registering
router.post("/register", async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) return res.status(400).send({ error: "missing details" });

    const password_hash = await argon2.hash(password)
    const role = "user"
    const created_at = new Date()

    const userData: User = { username, email, password_hash, role, created_at }
    const createdUser = await userRepo.createUser(userData)
    if (!createdUser) return res.status(500).send({ error: "could not create user" })
    console.log("Created user:", createdUser)

    const token = generateToken({ username, role })
    res.send({ token })
})

// endpoint for log in
router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ error: "missing details login" })

    const user = await userRepo.findUser({ email })
    if (!user) return res.status(401).send({ error: "user doesnt exist" });

    const username = user.username;
    const role = user.role;

    const passwordMatches = await argon2.verify(user.password_hash, password)
    if (!passwordMatches) return res.status(401).send({ error: "unauthorized" });

    const token = generateToken({ username, role })
    res.send({ token })
})

export default router;