import jwt from "jsonwebtoken";

<<<<<<< HEAD
export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET)
    res.cookie("jwt", token, {
=======
export const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET)
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000 * 24 * 30), // 30 days
>>>>>>> 167bea1a4056ec291ccdf95e8f168ccf0de8819c
        httpOnly: true,
        sameSite: "strict",
    });
}