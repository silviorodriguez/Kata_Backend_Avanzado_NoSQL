const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/users.model");

const protect = asyncHandler(async (req, res, next) => {

  if (req.baseUrl === "/api/users"  && req.method === "post") {
    return next();
  }
  
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
      // obtenemos el token
      token = req.headers.authorization.split(" ")[1];
      //verificar Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // obtener los datos del usuarios del token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Acceso no Autorizado");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Acceso no Autorizado, No se proporciono el Token");
  }
});

module.exports = { protect };
