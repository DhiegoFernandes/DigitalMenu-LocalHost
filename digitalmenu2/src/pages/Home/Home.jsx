import { useNavigate } from 'react-router-dom'

function Home(){

    const navigate = useNavigate();

    return(
        <>
            <div>
                <h1>Home</h1>
                <button onClick={() => {
                    localStorage.removeItem("logado");
                    navigate('/')
                }}>Sair</button>
                <button onClick={()=>navigate('/system')}>Área do Sistema</button>
                <button onClick={()=>navigate('/client')}>Área do Cliente</button>
            </div>
        </>
    );
}

export default Home