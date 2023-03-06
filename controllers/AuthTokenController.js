let jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.session.token;

    if(!token){
        req.flash("error_msg", { text: "Access Denied! User must be logged in to gain access." });
        res.redirect("/login");
    }

    try {
        const userVerified = jwt.verify(token, process.env.SECRET);

        console.log(userVerified);

        next();
    } catch (error) {
        req.flash("error_msg", { text: "Access Denied! User must be logged in to gain access." });
        res.redirect("/login");
    }

}