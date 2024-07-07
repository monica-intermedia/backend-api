const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TRANSACTION_TOKEN, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.order_id = decoded.order_id;
    next();
  });
};

module.exports = { authorization };
