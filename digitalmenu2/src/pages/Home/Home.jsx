import { useNavigate } from 'react-router-dom'
import './home.css';

import logoDM from '../../assets/image/logo_digitalmenu2.png';
import fotoApresentacao from '../../assets/image/fotoApresentacao.png';

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
                            <p className='home-descricao'>Facilite a visualização e gestão de pedidos no seu restaurante com o inovador sistema Digital Menu. Projetado para otimizar a eficiência operacional.</p>

                        </div>

                        <div className='home_opcoes'>
                            <p className='home-entrar-descricao'>Digital Menu, entre como administrador ou cliente:</p>
                            
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