import { Route, Redirect } from 'react-router-dom'
import AuthService from '../services/AuthService.js'

function AuthRedirect({ component: Component, ...rest}) {
    const isLoggedIn = AuthService.isLoggedIn();

    return (
        <Route 
            {...rest}
            render={(props) => isLoggedIn ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{ pathname: "/login" }}/> 
            )} >
        </Route>
    )
}

export default AuthRedirect;