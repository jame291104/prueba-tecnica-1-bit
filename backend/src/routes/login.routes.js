import express from 'express';
import { loginService } from '../services/loginService.js';


const loginRouter = express.Router();

// Ruta para iniciar sesión
loginRouter.post('/', loginService);

export default loginRouter;
