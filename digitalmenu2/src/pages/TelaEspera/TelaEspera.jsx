import { useNavigate } from 'react-router-dom'
import './telaespera.css';

import logoDM from '../../assets/image/logo_digitalmenu2.png';
import iniciarPedido from '../../assets/image/iniciarPedido.png';
import cardapio from '../../assets/image/cardapio.png';
import garcon from '../../assets/image/garcon.png';
import garconete from '../../assets/image/garconete.png';
function TelaEspera() {

    const navigate = useNavigate();

    return (
        <>
            <header>
                <nav>
                    <div className='home_cabecalho'>
                        <img className='home_dmLogo' onClick={() => navigate('/home')} src={logoDM} alt="" />

      
                        <button className="btn_home_client" onClick={() => navigate('/home')}>
                            <i className="material-symbols-outlined">home</i>
                        </button>

                    </div>
                </nav>
            </header>

            <div className='main_telaespera'>
                <div className='telaEspera_opcoes'>
                    <p className='texto_telaespera'> Inicie seu pedido ou veja nosso cardápio!</p>
                    <div className='telaEspera_escolha'>


                        <div className='card' onClick={() => navigate('/cardapio')}>
                            <div className='circle'>
                                <img className="logo_opcao" src={iniciarPedido} alt="" />
                            </div>
                            <div className='content'>
                                <h2>Inicie seu pedido!</h2>
                                <p>Peça o seu pedido sem a ajuda de ninguém!
                                </p>
                            </div>
                            <img className='product_img' src={garcon} alt="" />
                        </div>


                        <div className='card' onClick={() => navigate('')}>
                            <div className='circle'>
                                <img className="logo_opcao" src={cardapio} alt="" />
                            </div>
                            <div className='content'>
                                <h2>Ver cardápio!</h2>
                                <p>Veja a variedade de produtos do nosso menu!
                                </p>
                            </div>
                            <img className='product_img' src={garconete} alt="" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default TelaEspera;