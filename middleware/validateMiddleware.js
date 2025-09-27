const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Map to a simple format
    const extracted = errors.array().map(err => ({ param: err.param, msg: err.msg }));
    return res.status(400).json({ success: false, errors: extracted });
  }
  next();
};

module.exports = validateRequest;
