import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import './login.css'
import { MainContext } from '../../context/context';

function Login(){

    const navigate = useNavigate();

    const { autenticar } = useContext(MainContext);
    
    // Redirecionamento se já estiver logado
    const user = localStorage.getItem("token")
    useEffect(() => {
        user != null ? navigate('/home') : navigate('/')
    }, []);

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    return(
        <>
            <div>
                <h1>Login</h1>
                <form>
                    <input 
                        type="text"
                        placeholder='Nome'
                        autoFocus
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder='Senha'
                        autoFocus
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button
                        onClick={(e) => autenticar(e, nome, senha)}
                    >Logar</button>
                </form>
            </div>
        </>
    );
}

export default Login