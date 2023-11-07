import React, { useContext, useEffect, useState } from "react";
import './cardapio.css'; 
import logoDM from '../../assets/image/logo_digitalmenu2.png';
import { MainContext } from "../../context/context";
import Carrinho from "../../components/Carrinho/Carrinho";
import '../../components/Carrinho/Carrinho.css'; 

function Cardapio(props) {
    const { listarProdutosComImagens } = useContext(MainContext);
    const [numeroMesa, setNumeroMesa] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
    const [produtosNoCarrinho, setProdutosNoCarrinho] = useState(props.produtosNoCarrinho || []);
    const [total, setTotal] = useState(0);

    const adicionarProdutoAoCarrinho = (produto) => {


        const novoCarrinho = [...produtosNoCarrinho];

      
        let produtoExistenteIndex = -1;
      
        novoCarrinho.forEach((item, index) => {
          if (saoIguais(item, produto.nome)) {
            produtoExistenteIndex = index;
          }
        });
      
        if (produtoExistenteIndex !== -1) {
          novoCarrinho[produtoExistenteIndex].quantidade++;
        } else {
          novoCarrinho.push({ ...produto, quantidade: 1 });
        }
      

      
        const novoTotal = novoCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

      
        setProdutosNoCarrinho(novoCarrinho);
        setTotal(novoTotal);
      };

      function saoIguais(produtoA, produtoB) {
        if (
          produtoA.id === produtoB.id &&
          produtoA.nome === produtoB.nome &&
          produtoA.preco === produtoB.preco &&

          true
        ) {
          return true; 
        }
        return false; 
      }
    
    const categorias = Array.from(new Set(produtos.map((produto) => produto.categoria)));

    const toggleCarrinho = () => {

        setMostrarCarrinho(!mostrarCarrinho);

    };

    const produtosFiltrados = categoriaSelecionada
        ? produtos.filter((produto) => produto.categoria === categoriaSelecionada)
        : produtos;

          const onRemoverProdutoDoCarrinho = (produtoNome) => {

            const novoCarrinho = produtosNoCarrinho.filter((produto) => produto.nome !== produtoNome);
            setProdutosNoCarrinho(novoCarrinho);
          };
          
          useEffect(() => {
            const numeroMesa = localStorage.getItem("numeroMesa");
            if (numeroMesa) {
                setNumeroMesa(numeroMesa);
            }
    
            listarProdutosComImagens().then((data) => {
                setProdutos(data);
            });
        }, [listarProdutosComImagens]);

        useEffect(() => {
            const novoTotal = produtosNoCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
            const numeroItens = produtosNoCarrinho.length;
        
            setTotal(novoTotal);
          }, [produtosNoCarrinho]);


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
                        <p>R$ {total}</p>
                        <p>{produtosNoCarrinho.length} item{produtosNoCarrinho.length !== 1 ? 's' : ''} no carrinho</p>
                    </div>
                </div>
            </div>

            <div className='cardapio-global'>
                <div className="categorias-cardapio">
                    <button onClick={toggleCarrinho}><i className="material-symbols-outlined" id="icone-canto-tela">shopping_cart</i></button>
                    {mostrarCarrinho && (
                        <Carrinho 
                        produtosNoCarrinho={produtosNoCarrinho} 
                        total={total} 
                        onRemoverProdutoDoCarrinho={onRemoverProdutoDoCarrinho} 
                        setProdutosNoCarrinho={setProdutosNoCarrinho}
                        />
                    )}
                    {categorias.map((categoria) => (
                        <button
                            key={categoria}
                            className={`botao-categoria ${categoriaSelecionada === categoria ? 'active' : ''}`}
                            onClick={() => {
                                if (categoriaSelecionada === categoria) {
                                    setCategoriaSelecionada(''); 
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
                                    <p className="preco-produtoCardapio">R$ {produto.preco}</p>
                                    <p className="descricao-produtoCardapio">{produto.descricao}</p>

                                    <div className="botoes-MaisMenos">
                                        <button onClick={() => adicionarProdutoAoCarrinho(produto)}>Adicionar ao Carrinho</button>
                                    </div>
                                </div>
                                <div className="areaImagem">
                                    <p>{produto.imagem ? <img className="imagemProduto" src={`http://localhost:3333/uploads/${produto.imagem}`} alt="Imagem" width="100%" height="auto" /> : 'Nenhuma imagem disponível'}</p>
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
