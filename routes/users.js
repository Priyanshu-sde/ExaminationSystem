import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = env("JWT_SECRET");

router.post("/signup", async (req, res) => {
    try {
        const { name, username, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            return res.json({
                message: "Username already taken",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                username,
                password: hashedPassword,
            },
        });

        res.json({ message: "You are signed up", user });
    } catch (e) {
        console.error(error);
        res.json({ message: "Server error" });
    }
});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {username},
    });

    if(!user){
        return res.json({message: "Username not found"});
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched){
        return res.json({message: "Invalid credentials"});
    }
});
export default router;
