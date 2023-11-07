import React, { useContext, useState, useEffect } from "react";
import "./Carrinho.css";
import { MainContext } from "../../context/context";

function Carrinho(props) {
  const [numeroPedido, setNumeroPedido] = useState("");
  const { inserirItemNoPedido, encerraPedido } = useContext(MainContext);
  const [observacoes, setObservacoes] = useState("");


  useEffect(() => {

    const valorArmazenado = localStorage.getItem("numeroPedido");
    const numeroPedido = JSON.parse(valorArmazenado);
    console.log("numeroPedido: " + numeroPedido.idpedido);
    if(numeroPedido) {
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
    );}
  return (
    <div className="carrinho-modal">
      <div className="carrinho-conteudo">
        <h2>Carrinho</h2>
        <ul>
          {props.produtosNoCarrinho.length === 0 ? (
            <li>Seu carrinho está vazio.</li>
          ) : (
            props.produtosNoCarrinho.map((produto) => (
              <li key={produto.id}>
                <div className="carrinho-item-info">
                  <h3>{produto.nome}</h3>
                  <p>Preço: R${produto.preco}</p>
                  <p>Quantidade:</p>
                  <div className="botoes-MaisMenos">
                    <button onClick={() => diminuirQuantidade(produto)}><i className="material-symbols-outlined">remove</i></button>
                    {produto.quantidade}
                    <button onClick={() => aumentarQuantidade(produto)}><i className="material-symbols-outlined">add </i></button>
                  </div>
                  {renderizarObservacao(produto)}
                </div>
                <button onClick={() => removerDoCarrinho(produto.nome)}>Remover</button>
              </li>
            ))
          )}
        </ul>
        <button onClick={enviarPedido}>Enviar pedido</button>
        
        <p>Total: R$ {calcularTotal()}</p>
      </div>
      <button onClick={() => encerraPedido( numeroPedido.idpedido)}>Encerrar pedido</button>
    </div>
  );
}

export default Carrinho;
