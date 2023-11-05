import { useContext, useEffect, useState } from "react";
import './cardapio.css';
import logoDM from '../../assets/image/logo_digitalmenu2.png';
import { MainContext } from "../../context/context";

function Cardapio() {
    const { listarProdutosComImagens } = useContext(MainContext);
    const [numeroMesa, setNumeroMesa] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

    useEffect(() => {
        const numeroMesa = localStorage.getItem("numeroMesa");
        if (numeroMesa) {
            setNumeroMesa(numeroMesa);
        }

        listarProdutosComImagens().then((data) => {
            setProdutos(data);
        });
    }, [listarProdutosComImagens]);

    const handleCategoriaClick = (categoria) => {
        setCategoriaSelecionada(categoria);
    };

    const produtosFiltrados = categoriaSelecionada
        ? produtos.filter((produto) => produto.categoria === categoriaSelecionada)
        : produtos;

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

                {Array.from(new Set(produtos.map((produto) => produto.categoria))).map((categoria) => (
                    <button
                    key={categoria}
                    className={`botao-categoria ${categoriaSelecionada === categoria ? 'active' : ''}`}
                    onClick={() => {
                    if (categoriaSelecionada === categoria) {
                        setCategoriaSelecionada(''); // para tirar a categoria selecionada, ai ele vai listar todas categorias novamente
                    } else {
                        setCategoriaSelecionada(categoria);
                    }
                }}
                    >
                    {categoria}
                    </button>
                ))}

                </div>
                <div className='produtos-cardapio'>
                    <div className="cardapio-linha">
                        {produtosFiltrados.map((produto) => (
                            <div key={produto.idproduto} className="cardapio-celula">
                                <div className="informacoes_produto">
                                <p className="nome-produtoCardapio">{produto.nome}</p>
                                    <p className="preco-produtoCardapio">R${produto.preco}</p>
                                    <p className="descricao-produtoCardapio">{produto.descricao}</p>

                                    
                                    <div className="botoes-MaisMenos">
                                        <button>-</button>
                                        <button>+</button>
                                    </div>
                                </div>
                                <div className="areaImagem">
                                    <p>{produto.imagem ? <img className="imagemProduto"
                                    src={`http://localhost:3333/uploads/${produto.imagem}`} alt="Imagem" width="100%" height="auto" /> : 'Nenhuma imagem disponivel'}
                                    </p>
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
