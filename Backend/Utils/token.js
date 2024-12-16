import jwt from "jsonwebtoken";
import userSchemaModal from "../Models/userModel.js";

export const generateTokenAndSaveInCookies = async (userId, res) => {
    if (!process.env.JWT_SECRET_KEY) {
        console.error("JWT_SECRET_KEY is not defined!");
        throw new Error("Missing JWT_SECRET_KEY in environment variables");
    }

    try {
        console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: "10d",
            // expiresIn : new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)  //10days expiry date
        });

        console.log("Generated token:", token);
        res.cookie("jwt", token, {
            httpOnly: true,
            //   secure: false,
            //   secure: process.env.NODE_ENV === "production",
            secure: true,
            //   sameSite: "lax",
            sameSite: "None",
            path: "/",
        });

        await userSchemaModal.findByIdAndUpdate(userId, { token });
        console.log(token);
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};
