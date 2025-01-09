import { loginService } from "../services/loginService.js";


export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await loginService(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
