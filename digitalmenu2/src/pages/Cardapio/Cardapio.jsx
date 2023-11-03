import { useContext, useEffect, useState } from "react";
import './cardapio.css';
import logoDM from '../../assets/image/logo_digitalmenu2.png'
import { MainContext } from "../../context/context";

function Cardapio() {

    const { listarProdutosComImagens} = useContext(MainContext);
    const [numeroMesa, setNumeroMesa] = useState("");
    const [produto, setProduto] = useState([])

    useEffect(() => {
        const numeroMesa = localStorage.getItem("numeroMesa");
        if (numeroMesa) {
            setNumeroMesa(numeroMesa);
        }

        // Chame a função listarProdutos para obter os produtos
        listarProdutosComImagens().then((data) => {
            setProduto(data);
            console.log(data);
        });
    }, [listarProdutosComImagens]);
    return (
        <>

            <div className='home_cabecalho'>
                <img className='home_dmLogo' src={logoDM} alt="" />
                <div className="header__informacoes">
                    <div className="header__informacoes__informacoesPedido">
                        <p>Numero Mesa: {numeroMesa}</p>
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
                    <h2>Listando os pedidos</h2>
                    <div className="cardapio-linha">
                        {produto.map((produtos, index) => (
                            <div key={produto.idproduto} className="cardapio-celula">
                                <div className="informacoes__produto">
                                    <div className="produto-info">
                                        <p>Nome: {produtos.nome}</p>
                                        <p>Preço: {produtos.preco}</p>
                                        <p>Descrição: {produtos.descricao}</p>
                                    </div>
                                    <p className="imagem-produto"> {produtos.imagem ? <img src={`http://localhost:3333/uploads/${produtos.imagem}`} alt="Imagem" width="150" /> : 'Nenhuma imagem disponível'}</p>
                                    <hr />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cardapio;