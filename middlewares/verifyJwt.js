const jwt = require("jsonwebtoken")

const verifyJWT = async (req, res, next) => { 
    const tokenLogin = req.cookies.token_login
    if(!tokenLogin) {
        return res.status(401).json({
            message: "Unauthorized!"
        })
    }
    jwt.verify(tokenLogin, "hendratoken", (err, decoded) => {
        if(err) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        req.userId = decoded.userInfo.id
        req.role = decoded.userInfo.role
        next()
    })
}


module.exports = verifyJWT