import express from "express"
import dotenv from "dotenv";
import cors from 'cors'
import { connectionMongo } from "./src/config/dataBase.js";
import { userRouter } from "./src/routes/user.routes.js";
import loginRouter from './src/routes/login.routes.js';


const app = express();
dotenv.config();
connectionMongo();

const port = process.env.PORT;
console.log("PORT", port);

app.use(cors())

app.use(express.json());
app.use('/usuarios', userRouter);
app.use('/login', loginRouter);

app.listen(port, () => {console.log("We are conected", port)})