import './relatorios.css'
import '../Modal/modal_componentes.css';
import { Modal } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { MainContext } from '../../context/context';

function Relatorios(){

    const { produtosMaisFaturados, produtosMaisVendidos, totalEmPedidos } = useContext(MainContext);

    // Variáveis
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [faturamento, setFaturamento] = useState(false);
    const [produto, setProduto] = useState(false);
    const [total, setTotal] = useState(false);
    const [dadosPesquisa, setDadosPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState([]);

    // Variáveis do Modal
    const [openMes, setOpenMes] = useState(false);
    const OpenMes = () => setOpenMes(true);
    const CloseMes = () => setOpenMes(false);

    const [openPesquisa, setOpenPesquisa] = useState(false);
    const OpenPesquisa = () => setOpenPesquisa(true);
    const ClosePesquisa = () => setOpenPesquisa(false);

    useEffect(() => {
        setFaturamento(false);
        setProduto(false);
        setTotal(false);
    }, []);
      
    return(
        <>
            <div className="container-relatorio">
                <div className='btn-relatorios'>
                    <button className='btn' onClick={() => {OpenMes(); setProduto(true);}}>Produtos + vendidos</button>
                    <button className='btn' onClick={() => {OpenMes(); setProduto(true); setFaturamento(true)}}>Produtos + faturados</button>
                    <button className='btn' onClick={() => {OpenMes(); setTotal(true)}}>Total (R$) por Pedido</button>

                    <div>
                    {/* MODAL PEDINDO O MÊS */}
                    <Modal
                        open={openMes}
                        onClose={CloseMes}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal-mes'>
                            {produto ? (
                                faturamento ? (
                                <h1>Produtos + faturados</h1>
                                ) : (
                                <h1>Produtos + vendidos</h1>
                                )
                            ) : (
                                <h1>Total em Pedidos</h1>
                            )}
                            <h2>Digite o mês a ser pesquisado: </h2>
                            <input 
                            type="text"
                            autoFocus
                            placeholder='mês'
                            value={mes}
                            onChange={(e) => setMes(e.target.value)}
                            />
                            <input 
                            type="text"
                            autoFocus
                            placeholder='ano'
                            value={ano}
                            onChange={(e) => setAno(e.target.value)}
                            />
                            <button onClick={() => {setFaturamento(false); setProduto(false); CloseMes();}}>Cancelar</button>
                            {produto ? (
                                faturamento ? (
                                <button onClick={(e) =>
                                    produtosMaisFaturados(e, mes, ano).then((resp) => {
                                        setDadosPesquisa(resp);
                                        OpenPesquisa();
                                    })
                                }>Pesquisar</button>
                                ) : (
                                <button onClick={(e) => {
                                    produtosMaisVendidos(e, mes, ano).then((resp) => {
                                        setDadosPesquisa(resp);
                                        OpenPesquisa();
                                    })
                                }}>Pesquisar</button>
                                )
                            ) : (
                                <button onClick={(e) => {
                                    totalEmPedidos(e, ano, mes).then((resp) => {
                                        setPesquisa(resp);
                                        OpenPesquisa();
                                    })
                                }}>Pesquisar</button>
                            )}
                            <p>DATA: {mes}/{ano}</p>
                        </div>
                    </Modal>

                    {/* MODAL DA PESQUISA */}
                    <Modal
                        open={openPesquisa}
                        onClose={ClosePesquisa}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal-pesquisa'>
                            <button onClick={() => ClosePesquisa()}><i className='material-symbols-outlined'>close</i></button>
                            
                            {console.log(pesquisa)}
                            {pesquisa && pesquisa.length > 0 ? 
                                total ? 
                                    <div>
                                        {pesquisa[0] && <p>Total arrecadado de pedidos: {pesquisa[0].total}</p>}
                                    </div>
                                    :
                                    pesquisa.map((dados, index) => (
                                        <div key={index}>
                                            <p>NOME: {dados.NomeDoProduto}</p>
                                            <p>{faturamento ? 'VALOR: R$' : 'QNTD: '} {dados.QuantidadeVendida}</p>
                                        </div>
                                    ))
                                :
                                <p>Sem dados para exibir</p>
                            }
                            
                            
                            {/* {total ? 
                                <div>
                                    <p>Total arrecadado de pedidos: {pesquisa[0].total}</p>
                                </div>
                                :
                                dadosPesquisa.map((dados) => (
                                    <div key={dados}>
                                        <p>NOME: {dados.NomeDoProduto}</p>
                                        <p>{faturamento ? 'VALOR: R$' : 'QNTD: '} {dados.QuantidadeVendida}</p>
                                    </div>
                                ))
                            } */}
                        </div>
                    </Modal>

                    <Modal
                        open={openPesquisa}
                        onClose={ClosePesquisa}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='modal-pesquisa'>
                            <button onClick={() => ClosePesquisa()}><i className='material-symbols-outlined'>close</i></button>
                            {total ? 
                                <div>
                                    <p>Total arrecadado de pedidos: {dadosPesquisa.total}</p>
                                </div>
                                :
                                dadosPesquisa.map((dados) => (
                                    <div key={dados}>
                                        <p>NOME: {dados.NomeDoProduto}</p>
                                        <p>{faturamento ? 'VALOR: R$' : 'QNTD: '} {dados.QuantidadeVendida}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </Modal>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Relatorios