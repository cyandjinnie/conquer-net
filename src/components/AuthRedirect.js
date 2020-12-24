import { Route, Redirect } from 'react-router-dom'
import APIClient from '../services/APIClient.js'

function AuthRedirect({ component: Component, ...rest}) {
    const isLoggedIn = APIClient.AuthService.isLoggedIn();

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