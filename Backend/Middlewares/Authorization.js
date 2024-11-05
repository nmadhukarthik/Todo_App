import jwt from "jsonwebtoken"
import userSchemaModal from "../Models/userModel.js"

export const autenticate = async(req,res,next) => {
    const token = req.cookies.jwt
    //console.log(token)
    if(!token)
    { return res.status(401).json({ message: "Unauthorised"})}
    try {
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
     //console.log(decodedToken)
     req.user = await userSchemaModal.findById(decodedToken.userId)
    } catch (error) {
        return res.status(401).json({ message: " " + error.message})
    }
    next()
}