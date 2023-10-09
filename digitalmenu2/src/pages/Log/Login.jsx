import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/context';

import './login.css'

import logoDM from '../../assets/image/logo_digitalmenu.png'
import olhoaberto from '../../assets/image/eyeopen.png'
import olhofechado from '../../assets/image/eyeclosed.png'

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
    const [tipoSenha, setTipoSenha] = useState("");

    return(
        <>
            <div>
                <h1>Login</h1>
                <img src={logoDM} alt="Logo Digital Menu" />
                <form>
                    <input 
                        type="text"
                        placeholder='Nome'
                        autoFocus
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input 
                        type={tipoSenha}
                        placeholder='Senha'
                        autoFocus
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    {tipoSenha === "password" ? (
                        <button className="senha" type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setTipoSenha("text")
                        }} ><img className="olhos" src={olhofechado} /></button>
                    ) : (
                        <button className="senha" type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setTipoSenha("password")
                        }}><img className="olhos" src={olhoaberto} /></button>)}
                        <button
                            type='submit'
                            onClick={(e) => autenticar(e, nome, senha)
                    }
                    >Logar</button>
                </form>
            </div>
        </>
    );
}

export default Login