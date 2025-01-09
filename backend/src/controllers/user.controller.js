import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcryptjs';

//Create User POST

export const createUser = async (req, res) => {
    try {
        //destructuramos el body del request
        const { username, email, password } = req.body;
        
        // Validar si el usuario ya existe
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                mensaje: "El correo electrónico ya está registrado.",
            });
        }

        // Encriptar la contraseña
        const codedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = await UserModel.create({
            username,
            email,
            password: codedPassword
        });

        return res.status(201).json({
            message: "Usuario creado correctamente",
            data: newUser
        });
    } catch {
        return res.status(400).json({
            message: "Ocurrió un error al crear el usuario",
            problem: error.message
        });
    }
}

// Mostrar todos los usuarios (GET)
export const showUsers = async (req, res) => {
    try {
        // Buscar todos los usuarios
        let users = await UserModel.find();

        // Validar si no se encuentran usuarios
        if (users.length === 0) {
            return res.status(200).json({
                message: "No hay usuarios almacenados"
            });
        }

        // Respuesta exitosa con los usuarios
        return res.status(200).json({
            message: "Se encontraron usuarios",
            usersLength: users.length,
            data: users
        });
    } catch (error) {
        return res.status(400).json({
            message: "Ocurrió un error al mostrar los usuarios",
            problem: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("USER ID", id);
        
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado con éxito' });

    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el user', error: error.message });
    }
}

