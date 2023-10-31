import { useNavigate } from 'react-router-dom'
import './telaespera.css';

import logoDM from '../../assets/image/logo_digitalmenu2.png';
function TelaEspera() {

    const navigate = useNavigate();

    return (
        <>
            <header>
                <nav>
                    <div className='home_cabecalho'>
                        <img className='home_dmLogo' onClick={() => navigate('/home')} src={logoDM} alt="" />

                        <button className="btn_sair_home" onClick={() => {
                            localStorage.removeItem("token");
                            navigate('/')
                        }}><i className='material-symbols-outlined'>logout</i></button>

                    </div>
                </nav>
            </header>
            
            <div className='main_telaespera'>
                <div className='telaEsperaOpcoes'>
                    <p> iniciar pedido ou ver o cardapio</p>
                    <button onClick={() => navigate('/client')}>Iniciar Pedido</button>
                    <button onClick={() => navigate('')}>Cardapio</button>
                </div>
            </div>

        </>
    );
}
export default TelaEspera;