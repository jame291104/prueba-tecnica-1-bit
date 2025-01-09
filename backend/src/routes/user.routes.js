import { createUser, showUsers, deleteUser } from "../controllers/user.controller.js";
import express from "express";

export const userRouter = express.Router();

userRouter.post('/crear', createUser);
userRouter.get('/obtener', showUsers);
userRouter.delete('/eliminar/:id', deleteUser);