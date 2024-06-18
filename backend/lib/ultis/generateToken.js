import jwt from "jsonwebtoken";

export const generateTokenAddSetCookie = (userId,res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    })

    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000, //MS
        httpOnly: true, //prevent XSS attacks
        sameSite: "strict", //CSRF attacks cross-site request attacks
        secure: process.env.NODE.ENV !== "development",
    })
}