module.exports = function (req, res, next) {

    const admin = req.session.user.admin;

    if(!admin){

        req.flash("error_msg", { text: "Access Denied! Only admins are allowed to access this section." });
        res.redirect("/login");

    }

    try {
        
        next();

    } catch (error) {
        req.flash("error_msg", { text: "Access Denied! Only admins are allowed to access this section." });
        res.redirect("/login");
    }

}