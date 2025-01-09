import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model.js';
import { generateToken } from '../lib/jwt.js'; 

export const loginService = async (request, response) => {
    try {
        // Extracción de los datos de inicio de sesión
        const { emailLogin, passwordLogin } = request.body;

        // Validación de datos de entrada
        if (!emailLogin || !passwordLogin) {
            return response.status(400).json({
                mensaje: "Debe proporcionar correo y contraseña"
            });
        }


        let userFound = await UserModel.findOne({ email: emailLogin });


        // Si el correo no se encuentra en UserModel
        if (!userFound) {
            return response.status(404).json({
                mensaje: "Usuario no encontrado, por favor registrarse"
            });
        }

        // Validación de la contraseña ingresada
        const isValidPassword = await bcrypt.compare(passwordLogin, userFound.password);
        if (!isValidPassword) {
            return response.status(401).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        // Crear el payload para el token
        const payload = {
            id: userFound._id,
            name: userFound.username,
        };

        // Generación del token
        const token = await generateToken(payload);

        // Respuesta exitosa con el token generado
        return response.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token // Devuelve el token generado
        });

    } catch (error) {
        // Manejo de errores al iniciar sesión
        console.error("Error en el login:", error.message);
        return response.status(500).json({
            mensaje: "Error al iniciar sesión",
            error: error.message || error
        });
    }
};
