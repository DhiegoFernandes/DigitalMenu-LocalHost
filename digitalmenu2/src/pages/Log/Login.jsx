import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login(){

    const navigate = useNavigate();
    const user = localStorage.getItem("logado")

    useEffect(() => {
        user != null ? navigate('/home') : navigate('/')
    }, []);

    return(
        <>
            <div>
                <h1>Login</h1>
                <button onClick={() => navigate('/home')}>Home</button>
                <button onClick={() => localStorage.setItem("logado", "logado")}>Logar</button>
            </div>
        </>
    );
}

export default Login