const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // get the token from header ; if no token send 401
    const token = req.header('x-auth-token')
    if (!token)
        res.status(401).send("no token found, authorization failed")

    // verify the token(if not valid send 401) ,decode it and set the request.user
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).send("token not valid, authorization failed")
    }
}