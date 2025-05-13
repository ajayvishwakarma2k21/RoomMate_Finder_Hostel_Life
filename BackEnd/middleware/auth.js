const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Get the Authorization header from the request

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: 'No token, authorization denied' }); // If no token or invalid format, deny access
    }

    const token = authHeader.split(" ")[1]; // Extract the token from the header
    console.log("Received Token:", token); // Debugging

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        console.log("Decoded User:", decoded); // Debugging
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Invalid token:", err); // Log the error for debugging
        res.status(401).json({ error: 'Invalid token' }); // If token is invalid, deny access
    }
};

module.exports = auth; // Export the middleware function
