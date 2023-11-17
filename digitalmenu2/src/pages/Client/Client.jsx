// Client.js
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/context';
import './client.css';
import { useNavigate } from 'react-router-dom';

function Client() {
    const { listarMesasAtivas, autenticacaoMesa } = useContext(MainContext);
    const [mesas, setMesas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listarMesasAtivas()
            .then(data => {
                setMesas(data);
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className='main-client'>
                <header>
                    <nav>
                        <div className='home_cabecalho'>
                            <button className='btn_logo_client' onClick={() => { navigate('/home') }}>
                                {/* {<img className='tam_logo_client' src={logoDM} alt="" /> } */}
                            </button>
                            <button className="btn_home_client" onClick={() => navigate('/home')}>
                                <i className="material-symbols-outlined">home</i>
                            </button>
                        </div>
                    </nav>
                </header>

                <div className='client_principal'>
                    <div className="client_mensagem">
                        <h1 className='restaurante_nome'>( Restaurante )</h1>
                        <p className='restaurante_descricao'>Bem-vindo ao<span className='restaurante_descricao_destaque'>Restaurante</span></p>
                        <p></p>
                    </div>
                  
                    <div className="div_principal_client">
                    <h2 className='txt-escolhaMesa'>Escolha sua mesa</h2>
                        <div className="mesas-container">
                            {mesas.map((mesa) => (
                                <div
                                    className="mesas"
                                    key={mesa.idmesa}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const idMesa = parseInt(mesa.idmesa, 10);
                                        autenticacaoMesa(e, idMesa);
                                    }}
                                >
                                    <div className='mesas'>
                                        <p><i className="material-symbols-outlined icone-customizado">table_restaurant</i> {mesa.idmesa}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Client;
