import jwt from "jsonwebtoken"
import userSchemaModal from "../Models/userModel.js"

export const generateTokenAndSaveInCookies = async(userId,res) => {
   const token =jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn : "10d"
        // expiresIn : new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)  //10days expiry date
   })

   res.cookie("jwt", token, {
        httpOnly : true,
        secure : false,
        sameSite : "lax",
        path : "/"
   })

   await userSchemaModal.findByIdAndUpdate(userId,{token})
   return token
}