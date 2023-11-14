const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Intenal Server Error";
  console.log(err.message, "<<<<<<<<<< di error handler");
  if (err.name === "SequelizeValidationError") {
    code = 400;
    err.errors.map((el) => {
      message = el.message;
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = "Email Alredy Exists";
  } else if (err.name === "Name Is Required") {
    code = 400;
    message = err.message;
  } else if (err.name === "Email Is Required") {
    code = 400;
    message = err.message;
  } else if (err.name === "Password Is Required") {
    code = 400;
    message = err.message;
  } else if (err.name === "Address Is Required") {
    code = 400;
    message = err.message;
  } else if (err.name === "Phone Number Is Required") {
    code = 400;
    message = err.message;
  } else if (err.name === "Email Is Required") {
    code = 400;
    message = err.message;
  } else if (err.name === "Invalid Email") {
    code = 400;
    message = err.message;
  } else if (err.name === "Invalid Password") {
    code = 400;
    message = err.message;
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
