import { useNavigate } from 'react-router-dom'
import './home.css';

import logoDM from '../../assets/image/logo_digitalmenu2.png';
import fotoApresentacao from '../../assets/image/fotoApresentacao.png';

function Home() {

    const navigate = useNavigate();

    const userToken = localStorage.getItem("token");

   
    if (!userToken) {
        navigate('/');
        return null; 
    }

    return (
        <>
            <div>

                <header>
                    <nav>
                        <div className='home_cabecalho'>
                            <img className='home_dmLogo' src={logoDM} alt="" />

                            <button className="btn_sair_home" onClick={() => {
                                localStorage.removeItem("token");
                                navigate('/')
                            }}><i className='material-symbols-outlined'>logout</i></button>

                        </div>
                    </nav>
                </header>

                <main>
                    <div className='home_apresentacao'>
                        <div className='home_imagem'>
                            <img className='fotoApresentacao' src={fotoApresentacao} alt="" />


                        </div>

                        <div className='home_opcoes'>
                            <p className='home-entrar-DigitalMenu marg-grande'>Digital Menu</p>
                            <p className='home-entrar-descricao marg-media'>Facilite a visualização e gestão de pedidos no seu restaurante com o inovador sistema Digital Menu. Projetado para otimizar a eficiência operacional.</p>

                            <button className='btn_opcoes_home marg-grande' onClick={() => navigate('/client')}>Área do Cliente</button>
                            <button className='btn_opcoes_home' onClick={() => navigate('/system')}>Área do Sistema</button>

                        </div>
                    </div>
                </main>



            </div>
        </>
    );
}

export default Home