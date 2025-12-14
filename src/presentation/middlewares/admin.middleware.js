function isAdmin(req, res, next) {
    //this middleware must run after authentication - este middleware debe correr despues de la autenticacion
    if(!req.user) {
        return res.status(401).json({message:"user not authenticated"});
    }

    // this middleware must run AFTER authenticateToken
    const { roles } = req.user;

    if (!roles ||!Array.isArray(roles) || !roles.includes('admin')) {
        return res.status(403).json({ 
            message: 'Access denied. Administrator role required.', 
            userRoles: roles
        });
    }

    next();
}

module.exports = isAdmin;
