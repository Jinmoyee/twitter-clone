import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET)
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000 * 24 * 30), // 30 days
        httpOnly: true,
        sameSite: "strict",
    });
}