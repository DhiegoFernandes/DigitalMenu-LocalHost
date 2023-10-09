import {Navigate} from 'react-router-dom'

function PrivateRoute({ children }){
    
    const user = localStorage.getItem("token");

    return user != null ? children : <Navigate to='/'/> 

}

export default PrivateRoute