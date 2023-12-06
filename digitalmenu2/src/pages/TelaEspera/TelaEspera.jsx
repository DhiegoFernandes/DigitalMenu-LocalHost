import { useNavigate } from 'react-router-dom'
import './telaespera.css';
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/context";
import logoDM from '../../assets/image/logo_digitalmenu.png';
import iniciarPedido from '../../assets/image/iniciarPedido.png';
import cardapio from '../../assets/image/cardapio.png';
import garcon from '../../assets/image/garcon.png';
import garconete from '../../assets/image/garconete.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function TelaEspera() {
    const [idMesa, setIdMesa] = useState("");
    const { abrirPedido } = useContext(MainContext);

    useEffect(() => {
        const numeroMesa = localStorage.getItem("numeroMesa");
        if (numeroMesa) {
            setIdMesa(numeroMesa);
        }
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <header>
                <nav>
                    <div className='telaEspera_cabecalho'>
                        <h1 className='txt-TelaEspera-Restaurante'>( Restaurante )</h1>
                    </div>
                </nav>
            </header>

            <div className='main_telaespera'>
                <div className='telaEspera_opcoes'>
                    <p className='texto_telaespera'> Inicie seu pedido ou veja nosso cardápio!</p>
                    <div className='telaEspera_areaLogo'>
                        <img className='telaEspera_logoDM' onClick={() => navigate('/TelaEspera')} src={logoDM} alt="" />
                    </div>
                    <div className='telaEspera_escolha'>

                        <div className='cards-TelaEspera'>


                            <div className='card ' onClick={() => { abrirPedido(idMesa) }}>
                                <div className='circle'>
                                    <img className="logo_opcao" src={iniciarPedido} alt="" />
                                </div>
                                <div className='content'>
                                    <h2>Criar um pedido!</h2>
                                    <p>Peça o seu pedido sem a ajuda de ninguém!
                                    </p>
                                </div>
                                <img className='product_img' src={garcon} alt="" />
                            </div>

                            <div className='card card2' onClick={() => navigate('/menu')}>
                                <div className='circle'>
                                    <img className="logo_opcao" src={cardapio} alt="" />
                                </div>
                                <div className='content'>
                                    <h2>Conferir cardápio!</h2>
                                    <p>Veja a variedade de produtos do nosso menu!
                                    </p>
                                </div>
                                <img className='product_img' src={garconete} alt="" />
                            </div>
                        </div>
                    </div>
        
                </div>
                <ToastContainer />
            </div>

        </>
    );
}
export default TelaEspera;