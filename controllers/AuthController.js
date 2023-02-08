let jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.header('authorization-token');

    if(!token){
        req.flash("error_msg", { text: "Access Denied! User must be logged in to gain access." });
        res.redirect("/login");
    }

    try {
        const userVerified = jwt.verify(token, process.env.SECRET);

        req.user = userVerified;

        console.log(userVerified)

        console.log(req.user)

        next();
    } catch (error) {
        res.status(401).send('Access Denied');
    }

}