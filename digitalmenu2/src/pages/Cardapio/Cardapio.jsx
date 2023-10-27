import './cardapio.css';
import logoDM from '../../assets/image/logo_digitalmenu2.png'

function Cardapio() {
    return (
        <>

            <div className='home_cabecalho'>
                <img className='home_dmLogo' src={logoDM} alt="" />
                <div className="header__informacoes">
                    <div className="header__informacoes__informacoesPedido">
                        <p>Numero Mesa</p>
                        <p>Numero Pedido</p>
                    </div>

                    <div className="header__informacoes__valores">
                        <p>R$ total</p>
                        <p>1 item total</p>
                    </div>
                </div>

            </div>

            <div className='cardapio-global'>
                <div className='produtos-cardapio'>
                    <tr className='cardapio-linha'>


                        <td className='cardapio-celula'>
                            <div className="informacoes__produto">
                                <div className="informacoes__produto__texto">
                                    <p>Nome do Produto</p>
                                    <p className="desc-produto-cardapio">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy</p>
                                </div>
                                <img className="imagemProduto" src="https://receitinhas.com.br/wp-content/uploads/2022/06/cachorro-quente-tradicional-730x365.jpg" />
                            </div>
                            <div className="informacoes__produto__valores">
                                <p className="valorProduto">Valor Produto</p>
                                <button className="botaoQuantidade">-</button>
                                <p className="quantidade">0</p>
                                <button className="botaoQuantidade">+</button>
                                <button className="botaoAdicionar">Adicionar R$ 0,00</button>
                            </div>
                        </td>

                        <td className='cardapio-celula'>
                            <div className="informacoes__produto">
                                <div className="informacoes__produto__texto">
                                    <p>Nome do Produto</p>
                                    <p className="desc-produto-cardapio"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy</p>
                                </div>
                                <img className="imagemProduto" src="https://receitinhas.com.br/wp-content/uploads/2022/06/cachorro-quente-tradicional-730x365.jpg" />
                            </div>
                            <div className="informacoes__produto__valores">
                                <p className="valorProduto">Valor Produto</p>
                                <button className="botaoQuantidade">-</button>
                                <p className="quantidade">0</p>
                                <button className="botaoQuantidade">+</button>
                                <button className="botaoAdicionar">Adicionar R$ 0,00</button>
                            </div>
                        </td>


                    </tr>
                </div>
            </div>
        </>
    );
}

export default Cardapio;