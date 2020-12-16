import Redux from 'redux'

const AuthService = (function() {
    var authed_ = true;

    return {
        isLoggedIn : function() {
            return authed_;
        },

        authorize : function() {

        },

        logOut : function() {

        }
    }
})()

export default AuthService;