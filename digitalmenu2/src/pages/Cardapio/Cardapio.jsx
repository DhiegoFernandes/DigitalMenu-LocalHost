import { useContext, useEffect, useState } from "react";
import './cardapio.css';
import logoDM from '../../assets/image/logo_digitalmenu2.png'
import { MainContext } from "../../context/context";

function Cardapio() {

    const { listarProdutosComImagens } = useContext(MainContext);
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
                <div className="categorias-cardapio">
                    <button>Categoria1</button>
                    <button>Categoria2</button>
                    <button>Categoria3</button>
                </div>
                <div className='produtos-cardapio'>
                    <div className="cardapio-linha">

                        {produto.map((produtos, index) => (
                            <div key={produto.idproduto} className="cardapio-celula">

                                <div className="informacoes__produto">
                                    <p className="nome-produtoCardapio">{produtos.nome}</p>
                                    <p className="preco-produtoCardapio">{produtos.preco}R$</p>
                                    <p className="descricao-produtoCardapio">{produtos.descricao}</p>

                                    
                                    <div className="botoes-MaisMenos">
                                        <button>+</button>
                                        <button>-</button>
                                    </div>

                                </div>
                                <div className="areaImagem">
                                    <p> {produtos.imagem ? <img className="imagemProduto" src={`http://localhost:3333/uploads/${produtos.imagem}`} alt="Imagem" width="100%" height="auto" /> : 'Nenhuma imagem disponível'}</p>
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