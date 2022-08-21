const tokenService = require("../services/token.service");

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({message: "Unauthorized"});
            }
            const decoded = tokenService.validateAccess(token);
            if (decoded.role !== role) {
                return res.status(403).json({message: "Forbidden"});
            }
            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({message: "Unauthorized"});
        }
    }
}
