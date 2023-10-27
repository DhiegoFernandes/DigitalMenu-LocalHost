import { useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import { MainContext } from "../../context/context";
import './client.css';

import um from "../../assets/image/1.png";
import dois from "../../assets/image/2.png";
import tres from "../../assets/image/3.png";
import quatro from "../../assets/image/4.png";
import cinco from "../../assets/image/5.png";
import seis from "../../assets/image/6.png";
import sete from "../../assets/image/7.png";
import oito from "../../assets/image/8.png";
import logoDM from '../../assets/image/logo_digitalmenu2.png';

function Client() {

    const navigate = useNavigate();



    const { autenticacaoMesa } = useContext(MainContext);

    const [idMesa, setidMesa] = useState("");


    return (
        <>
            <div className='main-client'>

                <header>
                    <nav>
                        <div className='home_cabecalho'>
                            <button className='btn_logo_client' onClick={() => { navigate('/home') }}><img className='tam_logo_client' src={logoDM} alt="" /></button>
                            <button className="btn_home_client" onClick={() => navigate('/home')}><i className="material-symbols-outlined">
                                home
                            </i></button>

                        </div>
                    </nav>
                </header>

                <div className='client_principal'>
                    <div className="client_mensagem">
                        <h1>(RESTAURANTE)</h1>
                        <h2>Escolha sua mesa</h2>
                    </div>
                    <div className="div_principal_client">
                        <div className="Formato-mesa">
                            <div className="mesas">
                                <p>Mesa1</p>
                                <button className="btn-numero" type="submit" onClick={(e) => autenticacaoMesa(e, '1')}><img className="tamanho-img" src={um} /></button>
                            </div>
                            <div className="mesas">
                                <p>Mesa2</p>
                                <button className="btn-numero" type="submit" onClick={(e) => autenticacaoMesa(e, '2')}><img className="tamanho-img" src={dois} /></button>
                            </div>
                            <div className="mesas">
                                <p>Mesa3</p>
                                <button className="btn-numero" type="submit" onClick={(e) => autenticacaoMesa(e, '3')}><img className="tamanho-img" src={tres} /></button>
                            </div>
                            <div className="mesas">
                                <p>Mesa4</p>
                                <button className="btn-numero" type="submit" onClick={(e) => autenticacaoMesa(e, '4')}><img className="tamanho-img" src={quatro} /></button>
                            </div>
                        </div>
                        <div className="Formato-mesa">
                            <div className="mesas" >
                                <p>Mesa5</p>
                                <button className="btn-numero" type="submit" onClick={(e) => autenticacaoMesa(e, '5')}><img className="tamanho-img" src={cinco} /></button>
                            </div>
                            <div className="mesas">
                                <p>Mesa6</p>
                                <button className="btn-numero" type="submit" onClick={(e) => autenticacaoMesa(e, '6')}><img className="tamanho-img" src={seis} /></button>
                            </div>
                            <div className="mesas">
                                <p>Mesa7</p>
                                <button className="btn-numero" type="submit" onClick={(e) => autenticacaoMesa(e, '7')}><img className="tamanho-img" src={sete} /></button>
                            </div>
                            <div className="mesas">
                                <p>Mesa8</p>
                                <button className="btn-numero" type="submit" onClick={(e) => autenticacaoMesa(e, '8')}><img className="tamanho-img" src={oito} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Client