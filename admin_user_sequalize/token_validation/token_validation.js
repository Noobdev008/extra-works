const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        // console.log(token +" nnnnn")
        if (token) {
            token = token.slice(7);
            // console.log(token + " token")
            verify(token, "SECRET_KEY", (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    })
                } else {
                    // console.log(decoded.type);
                    res.locals.type = decoded.type;
                    // console.log(res.locals.type);
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Access Denied Unauthorized User"
            })
        }
    },

    isUser: (req, res, next) => {
        // console.log(res.locals.type);
        if (res.locals.type == 'user' || res.locals.type == undefined) {
            next();
        }
        else {
            res.send("You don't have the authorization");
        }
    },
    isAdmin: (req, res, next) => {
        // console.log(res.locals.type + " is admin");
        if (res.locals.type == 'admin' || res.locals.type == 'user' || res.locals.type == undefined) {
            next();
        }
        else {
            res.send("You don't have the authorization");
        }
    }, 
}

