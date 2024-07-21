const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  console.log(token);

  jwt.verify(token, process.env.KARYAWAN_PASSWORD, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403); // Forbidden
    }
    req.id = decoded.id;
    next();
  });
};

module.exports = { authorization };
