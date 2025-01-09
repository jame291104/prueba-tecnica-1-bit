// EN ESTE ARCHIVO ESCRIBIMOS EL CÓDIGO PARA LA CONEXION CON LA BASE DE DATOS

import mongoose from "mongoose";

// 2. Creamos una funcion para conectar la base de datos

export async function connectionMongo() {
    console.log("DB_URL", process.env.DB_URL);
    

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Successful connection to DB");
        
    } catch (error) {
        console.error("Error de conexión: " + error)
    }
    
}