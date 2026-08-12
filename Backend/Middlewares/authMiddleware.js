import jwt from "jsonwebtoken";

export const protectAdmin = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.headers.token) {
      token = req.headers.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authorization token missing.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "MirjajAjijMilona@%384010947hgasybdjsh9724681");
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};
