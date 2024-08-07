const handle200 = (req, res, data, message) => {
  if (message === undefined || message === null) {
    message = "";
  }

  res.status(200).json({
    data: data,
    message: `success get ${message} data`,
  });
};

const handle201 = (req, res, data, message) => {
  if (message === undefined || message === null) {
    message = "";
  }

  res.status(201).json({
    data: data,
    message: `success post ${message} data`,
  });
};

const handle400 = (req, res, message) => {
  res.status(400).json({
    error: {
      message: message || "Bad Request",
    },
  });
};

const handle401 = (req, res, message) => {
  res.status(401).json({
    error: {
      message: message || "Unauthorized",
    },
  });
};

const handle500 = (req, res, error) => {
  console.error(error);
  res.status(500).json({
    message: "Internal Server Error",
    error: error.message,
  });
};

module.exports = { handle200, handle201, handle400, handle401, handle500 };
