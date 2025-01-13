import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { token } from "morgan";

const prisma = new PrismaClient();

export const signUp = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { name, email , password} = req.body;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "Email is already registered" });
            return;
          }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data : {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ 
            message: "Signup successfully", 
            id: newUser.id, 
            name: newUser.name, 
            email: newUser.email});
    } catch(error){
        res.status(500).json({ 
            message: "Signup failed" , error});
    }
};


export const signIn = async (
    req: Request,
    res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) { 
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ 
        message: 'Login successful', 
        token, 
        user : { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ 
        message: 'Error signing in', error });
  }
};

export const getUsers = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {
        const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true },
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ 
            message: "Error retriving users"});
    }
};
