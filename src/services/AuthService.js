import Redux from 'redux'

var AuthService = (function() {
    var authed_ = true;

    return {
        isLoggedIn : function() {
            return authed_;
        }
    }
})()

export default AuthService;