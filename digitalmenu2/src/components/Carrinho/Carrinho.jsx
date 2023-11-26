import React, { useContext, useState, useEffect } from "react";
import "./Carrinho.css";
import { MainContext } from "../../context/context";
import botaoFechar from '../../assets/image/close.png';
import '../Modal/modal_componentes.css';
import { Modal } from '@mui/material';


function Carrinho(props) {
  const [numeroPedido, setNumeroPedido] = useState("");
  const { inserirItemNoPedido, encerraPedido } = useContext(MainContext);
  const [observacoes, setObservacoes] = useState("");


  useEffect(() => {

    const valorArmazenado = localStorage.getItem("numeroPedido");
    const numeroPedido = JSON.parse(valorArmazenado);
    console.log("numeroPedido: " + numeroPedido.idpedido);
    if (numeroPedido) {
      setNumeroPedido(numeroPedido);
    }
  }, []);

  const enviarPedido = () => {
    if (props.produtosNoCarrinho.length === 0) {
      alert("Seu carrinho está vazio. Adicione itens antes de enviar o pedido.");
      return;
    }

    if (!numeroPedido || !numeroPedido.idpedido) {
      console.log("Número de pedido inválido. Verifique se você tem um número de pedido válido.");
      return;
    }

    props.produtosNoCarrinho.forEach((produto) => {
      const { idproduto } = produto;
      const observacoesProduto = observacoes[produto.nome] || ""; // Obtenha a observação correta para o produto atual
      console.log(numeroPedido.idpedido, idproduto, produto.quantidade, observacoesProduto);
      inserirItemNoPedido(numeroPedido.idpedido, idproduto, produto.quantidade, observacoesProduto);
    });

    props.setProdutosNoCarrinho([]);
    setObservacoes("");
    
  };

  const calcularTotal = () => {
    let total = 0;
    props.produtosNoCarrinho.forEach((produto) => {

      total += produto.preco * produto.quantidade;
    });
    return total;
  };

  const removerDoCarrinho = (produtoNome) => {
    props.onRemoverProdutoDoCarrinho(produtoNome);
  };

  const aumentarQuantidade = (produto) => {
    const novoCarrinho = [...props.produtosNoCarrinho];
    const produtoIndex = novoCarrinho.findIndex((item) => item.nome === produto.nome);
    if (produtoIndex !== -1) {
      novoCarrinho[produtoIndex].quantidade++;
      props.setProdutosNoCarrinho(novoCarrinho);
    }
  };

  const diminuirQuantidade = (produto) => {
    const novoCarrinho = [...props.produtosNoCarrinho];
    const produtoIndex = novoCarrinho.findIndex((item) => item.nome === produto.nome);
    if (produtoIndex !== -1) {
      if (novoCarrinho[produtoIndex].quantidade > 1) {
        novoCarrinho[produtoIndex].quantidade--;
      }
      props.setProdutosNoCarrinho(novoCarrinho);
    }
  };
  function imprimirDetalhesDoProduto(produto) {
    console.log('Produto no carrinho:', produto);
  }

  function renderizarObservacao(produto) {
    const handleObservacaoChange = (e) => {
      setObservacoes({ ...observacoes, [produto.nome]: e.target.value });
    };
    return (
      <input
        type="text"
        value={observacoes[produto.nome] || ""}
        onChange={(e) => {
          setObservacoes({
            ...observacoes,
            [produto.nome]: e.target.value
          });
        }}
        placeholder="Observações"
      />
    );
  }

  const [openEnviarPedido, setOpenEnviarPedido] = useState(false);
  const OpenEnviarPedido = () => setOpenEnviarPedido(true);
  const CloseEnviarPedido = () => {
    setOpenEnviarPedido(false);
    setTimeout(() => {
      props.setAtualizarPrecoPedido(true);
    }, 1000);
  }

  return (
    <div className="carrinho-modal">

      <button className="btn-sairCardapio" onClick={props.fecharCarrinho}>
        <img className="img-sairCardapio" src={botaoFechar} alt="Fechar Carrinho"/>
      </button>

      <div className="carrinho-conteudo-superior">
        <p className="texto-carrinho">Carrinho</p>
        <ul className="ul-pedidosCarrinho">
          {props.produtosNoCarrinho.length === 0 ? (
            <li><p className="txt-carrinhoVazio">Seu carrinho está vazio.</p></li>
          ) : (
            props.produtosNoCarrinho.map((produto) => (
              <li key={produto.id}>
                <div className="info-produtosCarrinho">
                  <div className="info-ladoEsquerdoCarrinho">
                    <p className="txt-tituloProdutoCarrinho">{produto.quantidade}x{produto.nome}</p>
                    <p className="txt-precoCarrinho">R${produto.preco}</p>
                    <p className="txt-quantidadeCarrinho"> Quantidade</p>

                    <div className="btn-adicionarCarrinho">
                      <button className="btn-red" onClick={() => diminuirQuantidade(produto)}><i className="material-symbols-outlined">remove</i></button>
                      <p className="txt-qntdeCarrinho">{produto.quantidade}</p>
                      <button className="btn-green" onClick={() => aumentarQuantidade(produto)}><i className="material-symbols-outlined">add </i></button>
                    </div>

                    <div className="btnRemoverObservacoes">
                      <button className="btn-removerCarrinho" onClick={() => removerDoCarrinho(produto.nome)}>Remover</button>
                      <p className="txt-observacaoCarrinho">{renderizarObservacao(produto)}</p>
                    </div>
                  </div>

             {/*      FOTO DO LADO DIREITO
                  <div className="info-ladoDireitoCarrinho">
                    {<p >{produto.imagem ? <img className="imagemProduto-carrinho" src={`http://localhost:3333/uploads/${produto.imagem}`} alt="Imagem" width="100%" height="auto" /> : 'XXXX'}</p>}
                  </div>  */}

                </div>
              </li>
            ))
          )}
        </ul>

      </div>
      <div className="carrinho-conteudo-inferior">
        <p className="p-totalCarrinho">Total: R$ {calcularTotal()}</p>
        <button className="btn-carrinhoEnviarPedido" onClick={OpenEnviarPedido}>Enviar pedido</button>
        {/* <button className="btn-carrinhoEncerrarPedido" onClick={() => encerraPedido(numeroPedido.idpedido)}>Encerrar pedido</button> */}
      </div>

      <Modal
        open={openEnviarPedido}
        onClose={CloseEnviarPedido}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='modal'>
          <div className='btn-modal'>
            <div className='modal-ativar'>
              <p>Seu pedido será encaminhado para a cozinha. Está correto?</p>
              <p className="atencao">*Se possível confira o carrinho para evitar erros!</p>
              <div className='botoes-sim-nao marg-grande'>
                <button className='btn-cancelar' onClick={() => CloseEnviarPedido()}>Não</button>
                <button className='btn-salvar' onClick={() => { enviarPedido(); CloseEnviarPedido(); }}>Sim</button>
              </div>
            </div>

          </div>
        </div>
      </Modal>

    </div>


  );
}

export default Carrinho;
