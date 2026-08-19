const jwt = require("jsonwebtoken");

exports.verifyAdmin = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "Authentication failed: No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_TOKEN
        );

        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "Access denied: Admins only"
            });
        }

        req.user = decoded;
        next();

    } catch (error) {

        return res.status(403).json({
            message: "Authentication failed"
        });

    }

};

exports.verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token missing"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_TOKEN
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(403).json({
            message: "Authentication failed"
        });

    }

};