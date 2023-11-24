import React, { useContext, useEffect, useState } from "react";
import './cardapio.css';
import logoDM from '../../assets/image/logo_digitalmenu2.png';
import { MainContext } from "../../context/context";
import { Modal } from '@mui/material';
import Carrinho from "../../components/Carrinho/Carrinho";
import '../../components/Carrinho/Carrinho.css';

function Cardapio(props) {
    const { listarProdutosComImagens, listarTotal, encerraPedido, listarItens } = useContext(MainContext);
    const [numeroMesa, setNumeroMesa] = useState("");
    const [numeroPedido, setNumeroPedido] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
    const [produtosNoCarrinho, setProdutosNoCarrinho] = useState(props.produtosNoCarrinho || []);
    const [totalPedido, setTotalPedido] = useState(0);
    const [total, setTotal] = useState(0);
    const [itensPedido, setItensPedido] = useState([]);

    const adicionarProdutoAoCarrinho = (produto) => {

        console.log("Produto adicionado ao carrinho:", produto);
        const novoCarrinho = [...produtosNoCarrinho];
        var produtoExistenteIndex = novoCarrinho.findIndex((item) => item.nome === produto.nome);

        //let produtoExistenteIndex = -1;

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

        const valorArmazenado = localStorage.getItem("numeroPedido");
        const numeroPedido = JSON.parse(valorArmazenado);
        console.log("numeroPedido: " + numeroPedido);
        if (numeroPedido) {
            setNumeroPedido(numeroPedido);
        }

        listarProdutosComImagens().then((data) => {
            setProdutos(data);
        });
    }, [listarProdutosComImagens]);

    useEffect(() => {
        listarTotal(numeroPedido.idpedido).then((data) => {
            console.log("Data de listarTotal:", data);
            setTotalPedido(data[0]?.TOTAL || 0);

        });
        console.log("Chamou", listarTotal)
    }, [mostrarCarrinho, numeroPedido.idpedido]);


    useEffect(() => {
        const novoTotal = produtosNoCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        const numeroItens = produtosNoCarrinho.length;

        setTotal(novoTotal);
    }, [produtosNoCarrinho]);

    const fecharCarrinho = () => {
        setMostrarCarrinho(false);
      };

    const [openEncerrarPedido, setOpenEncerrarPedido] = useState(false);
    const OpenEncerrarPedido = () => setOpenEncerrarPedido(true);
    const CloseEncerrarPedido = () => setOpenEncerrarPedido(false);

    return (
        <>
            <div className='header_cardapio'>
                <img className='tamanho_logoDM_Cardapio' src={logoDM} alt="" />
                <div className="header__informacoes">
                    
                    <div className="header__informacoesPedido">
                        <p>Mesa   N°: {numeroMesa}</p>
                        <p>Pedido N°: {numeroPedido.idpedido}</p>
                    </div>

                    <button className="btn-EncerrarPedido" onClick={async () => {
                        // const { data } = await listarItens(); 
                        // setItensPedido(data); 
                        OpenEncerrarPedido();
                    }}>
                        <i className="material-symbols-outlined size_IconCarrinho">point_of_sale</i>
                        <div>
                            <p>Encerrar pedido</p>
                        </div>
                    </button>

                    <button className="btn-Carrinho" onClick={toggleCarrinho}>
                        <i className="material-symbols-outlined size_IconCarrinho" id="icone-canto-tela">shopping_cart</i>
                        <div>
                            <p>Total R$ {totalPedido}</p>
                            <p>{produtosNoCarrinho.length} produto{produtosNoCarrinho.length !== 1 ? 's' : ''} no carrinho</p>
                        </div>

                    </button>

                    {mostrarCarrinho && (
                        <Carrinho
                            produtosNoCarrinho={produtosNoCarrinho}
                            total={total}
                            onRemoverProdutoDoCarrinho={onRemoverProdutoDoCarrinho}
                            setProdutosNoCarrinho={setProdutosNoCarrinho}
                            listarTotal={listarTotal}
                            fecharCarrinho={fecharCarrinho}
                        />
                    )}




                </div>
            </div>

            <div className='cardapio-global'>
                <div className="categorias-cardapio">
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
                            <div key={produto.id} className="cardapio-celula">
                                <div className="informacoes_produto">
                                 {/*    <p className="id_produtoCardapio">{produto.idproduto}</p> */}
                                    <p className="nome-produtoCardapio">{produto.nome}</p>
                                    <p className="preco-produtoCardapio">R$ {produto.preco}</p>
                                    <p className="descricao-produtoCardapio">{produto.descricao}</p>

                                    <div className="btn-AdicionarProdutoCarrinho marg-pequena">
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

            <Modal
                open={openEncerrarPedido}
                onClose={CloseEncerrarPedido}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal'>
                    <div className='btn-modal'>
                        <div className='modal-ativar'>
                            <p>Tem certeza que deseja encerrar o seu pedido?</p>
                            <p className="atencao">*ATENÇÃO: Ao pressionar o botão "Sim" sua conta será encerrada, se deseja apenas enviar o pedido para ser preparo, abra o carrinho e envie o pedido.</p>
                            <div className="itens-pedido">
                                {/* {console.log("Print do array dos itens: ",itensPedido)}
                                {itensPedido.map((itens) => (
                                    <div key={itens}>
                                        <p>Produto: {itens.nome} Quantidade: {itens.QNTD} Preço: {itens.preco} Subtotal: {itens.subtotal} </p>
                                    </div>
                                ))} */}
                            </div>
                            <div className='botoes-sim-nao marg-grande'>
                                <button className='btn-cancelar' onClick={() => CloseEncerrarPedido()}>Não</button>
                                <button className='btn-salvar' onClick={() => { CloseEncerrarPedido(); encerraPedido(numeroPedido.idpedido); }}>Sim</button>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Cardapio;
