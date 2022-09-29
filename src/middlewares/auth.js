const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY;
const auth = (req, res, next) => {
    try {
        
        let token = req.cookies.token;
        console.log(token)
        if (token) {
            
            let user = jwt.verify(token, SECRECT_KEY);
            req.userId = user.id;
        } else {
            return res.status(401).json({ message: "Unauthorized User" })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized User" })
    }
}

module.exports = auth;