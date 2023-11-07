import React, { useContext, useState } from "react";
import "./Carrinho.css";
import { MainContext } from "../../context/context";

function Carrinho(props) {

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
                    <button onClick={() => diminuirQuantidade(produto)}><i className="material-symbols-outlined">add </i></button>
                  </div>

                </div>
                <button onClick={() => removerDoCarrinho(produto.nome)}>Remover</button>
              </li>
            ))
          )}
        </ul>
        <p>Total: R$ {calcularTotal()}</p>
      </div>
    </div>
  );
}

export default Carrinho;
