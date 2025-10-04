
function emptyStringsToNull(req, res, next) {
    if (req.body) {
        for (const key in req.body) {
            if (req.body[key] === '') {
                req.body[key] = null;
            }
        }
    }
    next();
}

module.exports = emptyStringsToNull;
