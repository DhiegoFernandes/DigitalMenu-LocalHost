import React, { useContext, useEffect, useState } from "react";
import './cardapio.css';
import './comanda.css';
import logoDM from '../../assets/image/logo_digitalmenu2.png';
import order from '../../assets/image/order.png';
import { MainContext } from "../../context/context";
import { Modal } from '@mui/material';
import Carrinho from "../../components/Carrinho/Carrinho";
import '../../components/Carrinho/Carrinho.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [atualizarPrecoPedido, setAtualizarPrecoPedido] = useState(false);
    const [enviarPedidoClicado, setEnviarPedidoClicado] = useState(false);

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
            if (atualizarPrecoPedido) {
                // Lógica para atualizar o preço quando atualizarPrecoPedido for true
                // Pode ser uma chamada para listarTotal ou qualquer lógica específica que você precise
                // ...

                // Após a atualização, marque como falso para evitar atualizações desnecessárias
                setAtualizarPrecoPedido(false);
            }

        });
        console.log("Chamou", listarTotal)
    }, [mostrarCarrinho, numeroPedido.idpedido, atualizarPrecoPedido]);


    useEffect(() => {
        const novoTotal = produtosNoCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        const numeroItens = produtosNoCarrinho.length;

        setTotal(novoTotal);
    }, [produtosNoCarrinho, enviarPedidoClicado]);

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
                    <img className='tamanho_imgPedido' src={order} alt="" />
                    <div className="header__informacoesPedido">
                        <div>
                            <p>Mesa   N°: {numeroMesa}</p>
                            <p>Pedido N°: {numeroPedido.idpedido}</p>
                        </div>

                    </div>

                    <button className="btn-EncerrarPedido" onClick={ () => {
                        
                        listarItens(numeroPedido.idpedido).then(resultado => {console.log("Ta printando esse:",resultado); setItensPedido(resultado)}).catch(erro => console.log(erro));
                        // setItensPedido(resultado); 
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
                            <p>Total R$ {totalPedido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',')}</p>
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
                            setAtualizarPrecoPedido={setAtualizarPrecoPedido}
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
                                    <p className="preco-produtoCardapio">R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',')}</p>
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
                        <div className='modal-ativar-comanda'>
                            <div className="comanda">
                                <h2 className="text-comanda">Comanda</h2>
                                <p>-----------------------------------------------------------------------------</p>
                                <p>Mesa   N°: {numeroMesa}</p>
                                <p>Pedido N°: {numeroPedido.idpedido}</p>
                                <p>-----------------------------------------------------------------------------</p>
                                <div className="comanda-cabecalho">
                                    <p className="cabecalho-nome">Nome</p>
                                    <p className="cabecalho-qntd">Qntd.</p>
                                    <p className="cabecalho-preco">Preço(uni.)</p>
                                    <p className="cabecalho-subtotal">Subtotal</p>
                                </div>
                                <p>-----------------------------------------------------------------------------</p>
                                <div className="itens-pedido">     
                                    
                                    {itensPedido.map((itens, index) => (
                                        <div className="comanda-tabela" key={index}>
                                            <p className="tabela-nome">{itens.nome}</p>
                                            <p className="tabela-qntd">{itens.QTDE}</p>
                                            <p className="tabela-preco">{itens.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',')}</p>
                                            <p className="tabela-subtotal">{itens.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',')} </p>
                                        </div>
                                    ))}

                                </div>
                                <p>-----------------------------------------------------------------------------</p>
                                <div className="comanda-total">Total: R${totalPedido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',')}</div>
                            </div>
                            <p className="pergunta-final">Encerrar conta?</p>
                            <div className='botoes-sim-nao marg-grande'>
                                <button className='btn-cancelar' onClick={() => CloseEncerrarPedido()}>Não</button>
                                <button className='btn-salvar' onClick={() => { CloseEncerrarPedido(); encerraPedido(numeroPedido.idpedido); }}>Sim</button>
                            </div>
                        </div>

                    </div>
                    <ToastContainer />
                </div>
            </Modal>
        </>
    );
}

export default Cardapio;
