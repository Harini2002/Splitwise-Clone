import jwt from "jsonwebtoken";
import config from "../../config/auth.config";

const verifyToken = (req, res, next) => {
  let token = req.cookies.jwt || req.headers["x-access-token"];
  // console.log(req.cookies.jwt);

  if (!token) {
    return res.status(400).send({
      message: "No token is provided",
    });
  }
  try {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: "Unauthorized access",
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid token");
  }
};

export default verifyToken;