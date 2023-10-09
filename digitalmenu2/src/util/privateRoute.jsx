import {Navigate} from 'react-router-dom'

function PrivateRoute({ children }){
    
    const user = localStorage.getItem("logado");

    return user != null ? children : <Navigate to='/'/> 

}

export default PrivateRoute