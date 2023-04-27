const jwt = require("jsonwebtoken");

const User = require("../model/userschema");

const authenticate = async (req, res, next) => {
  const token = req.query.token_;
  try {
    // console.log(token, " coo");
    let verifyToken;
    if (token !== "null") {
      // console.log("datattata");
      verifyToken = jwt.verify(token, process.env.SECRET_KEY);

      const rootUser = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });

      if (!rootUser) {
        throw new Error("User Not Found!");
      }

      req.token = token;
      req.rootUser = rootUser;
      req.userID = rootUser._id;
      // console.log(req.token, req.rootUser, req.userID, " hiii");
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    // console.log(error, " auth");
    return res.status(500).json({ message: "Something went wrong" });

    // res.status(404).send("Unauthorized: No token provided");
  }
};

module.exports = authenticate;
