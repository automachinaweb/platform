const convertEmptyStringsToNull = (obj) => {
  for (const key in obj) {
    if (obj[key] === "") {
      obj[key] = null;
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      convertEmptyStringsToNull(obj[key]);
    }
  }
};

const emptyStringsToNull = (req, res, next) => {
  if (req.body) {
    convertEmptyStringsToNull(req.body);
  }
  next();
};

module.exports = emptyStringsToNull;
