export const isAdmin = (req, res, next) => {
    // Assuming the role is stored in the token payload and attached to req.user by verifyToken middleware
    const { role } = req.user;

    if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }

    next(); // Proceed if the user is an admin
};
