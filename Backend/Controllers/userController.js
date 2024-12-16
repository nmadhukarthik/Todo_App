import userSchemaModal from "../Models/userModel.js";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { generateTokenAndSaveInCookies } from "../Utils/token.js";

const userSchemaValidation = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z
        .string()
        .min(3, { message: "Username atleast 3 characters long" }),
    password: z
        .string()
        .min(6, { message: "Password atleast 6 characters long" }),
});

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const validate = userSchemaValidation.safeParse({
            username,
            email,
            password,
        });

        if (!validate.success) {
            const errorMessage = validate.error.errors.map(
                (error) => error.message
            );
            return res.status(400).json({ errors: errorMessage });
        }

        const user = await userSchemaModal.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already registered" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = new userSchemaModal({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        if (newUser) {
            const token = await generateTokenAndSaveInCookies(newUser._id, res);
            res.status(201).json({
                message: "User registered successfully",
                newUser,
                token: token,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error registering user" });
    }
};

export const login = async (req, res) => {
    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userSchemaModal
            .findOne({ email })
            .select("+password");
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res
                .status(400)
                .json({ message: "Incorrect username or password" });
        }
        console.log("Calling generateTokenAndSaveInCookies...");
        const token = await generateTokenAndSaveInCookies(user._id, res);
        res.status(200).json({
            message: "user logged in successfully",
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error in logging the user" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            path: "/",
        });
        res.status(200).json({ message: "user logged out successfully" });
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: "Error in logging out the user" });
    }
};
