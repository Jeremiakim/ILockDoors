const authentication = async (req, res, next) => {
  try {
    console.log(req.headers);
    const { authorization } = req.headers;
    if (!authorization) {
      throw {
        name: "Not Have Access Token",
      };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authentication;
