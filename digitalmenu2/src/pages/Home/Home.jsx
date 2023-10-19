import { useNavigate } from 'react-router-dom'
import './home.css';

import logoDM from '../../assets/image/logo_digitalmenu2.png';
import fotoApresentacao from '../../assets/image/fotoApresentacao.jpg';

function Home() {

    const navigate = useNavigate();

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
                            <p className='home-descricao'>DIGITAL MENU é um sistema de gerenciamento de pedidos de restaurantes...</p>

                        </div>

                        <div className='home_opcoes'>
                            <img src="./images/foto.jpg" alt="" />
                            <p className='home-entrar-descricao'>DigitalMenu, entre como administrador ou cliente:</p>
                            
                            <button onClick={() => navigate('/system')}>Área do Sistema</button>
                            <button onClick={() => navigate('/client')}>Área do Cliente</button>

                        </div>
                    </div>
                </main>



            </div>
        </>
    );
}

export default Home