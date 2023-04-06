const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        console.log(token +" nnnnn")
        if (token) {
            token = token.slice(7);
            // console.log(token +" token")
            verify(token, "secret_key", (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    })
                } else {
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Access Denied Unauthorized User"
            })
        }
    }
}