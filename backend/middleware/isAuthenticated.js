import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      if (decoded) {
        req.id = decoded.userId;  // Attach user ID if valid
      }
    }

    // Always call next, even if no token or invalid token
    next();
  } catch (err) {
    console.log("Auth error:", err.message);
    // Still proceed to next without blocking
    next();
  }
};
