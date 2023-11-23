import { createContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from '../api'
import { createNotification } from '../util/toastify'


// Criação do contexto
export const MainContext = createContext({});

// Criação do provedor do contexto
function MainProvider({ children }) {

    const navigate = useNavigate();

    // ==================== Autenticação ==================== //

    async function autenticar(e, nome, senha){
        e.preventDefault();
        nome = nome.trim();
        senha = senha.trim();

        try{
            const { data } = await api.post('/login', {nome, senha});
            localStorage.setItem("token", data.token);
            api.defaults.headers.Authorization = `Bearer ${data.token}`
            navigate('/home')
        } catch (e) {
            createNotification("Erro no login", 'error');
            console.log("Erro na autenticação" + e);
        }
    }

    //Login para as mesas
    async function autenticacaoMesa(e, idMesa) {
        e.preventDefault();

        if(typeof idMesa === "string"){
            idMesa = parseInt(idMesa,10)
        }

        if(isNaN(idMesa)){
            console.error("Numero nao valido");
            return
        }

        try {
            const { data } = await api.post("/mesa/check", { idMesa });
            localStorage.setItem('numeroMesa', idMesa);
            navigate("/TelaEspera");
        } catch (e) {
            console.log("Erro na autenticação" + e);
        }
    }

    
    //Configuração do Headers
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }
    

    // ==================== Relatórios ==================== //

    async function produtosMaisFaturados(mes, ano) {
        mes = mes.trim();
        ano = ano.trim();
      
        try {
          const { data } = await api.get(`/relatorios/produto/mais/faturado/${mes}/${ano}`);
          return data;
        } catch (e) {
          console.log("Erro ao listar produtos mais faturados", e);
        }
      }
      
      async function produtosMaisVendidos(mes, ano) {
        mes = mes.trim();
        ano = ano.trim();
      
        try {
          const { data } = await api.get(`/relatorios/produto/mais/vendidos/${mes}/${ano}`);
          return data;
        } catch (e) {
          console.log("Erro ao listar produtos mais vendidos", e);
        }
      }
      
      async function totalEmPedidos(ano, mes) {
        mes = mes.trim();
        ano = ano.trim();
      
        try {
          const { data } = await api.get(`/relatorios/produto/arrecadado/${ano}/${mes}`);
          return data;
        } catch (e) {
          console.log("Erro ao exibir arrecadação do mês", e);
        }
      }

    // ==================== Pedidos ==================== //

    async function listarPedidos(){
        
        const token = localStorage.getItem("token");

        try{
            const { data } = await api.get("/pedidos/all", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return data
        }catch(e){
            console.log(e)
        }
    }

    async function listarTotal(idPedido){

        try {
            const { data } = await api.get(`/pedidos/total/${idPedido}`);
            console.log("isisis pedido",idPedido)
            console.log("Sucesso ao listar total ", data);
            return data;
        } catch (error) {
            console.log('erro ao listar total', error);
        }
    }

    async function listarItens(idPedido){
        // e.preventDefault();
        
        try {
            const { data } = await api.get(`/itens/pedidos/${idPedido}`);
            console.log("Sucesso ao listar itens");
            return data;
        }catch (e){
            console.log("Erro ao listar itens" , e);
        }
    }

    async function editarQuantidade(e, iditem, qtde ){
        e.preventDefault();
        if(typeof qtde === "string"){
            qtde = parseInt(qtde,10)
        }

        if(isNaN(qtde)){
            console.error("Numero nao valido");
            return
        }

        try {
            const { data } = await api.put("/itens/pedidos/quantidades", {iditem, qtde})
            console.log("Quantidade editada com sucesso");
        } catch (e) {
            console.log("Erro ao editar quantidade" , e)            
        }
    }

    async function cancelarItem(e, iditem){
        e.preventDefault();

        try {
            const { data } = await api.put(`/itens/${iditem}`)
            console.log("Sucesso ao cancelar o item: ", iditem)
        } catch (e) {
            console.log("Erro ao cancelar item" , e)            
        }
    }

    async function abrirPedido(idMesa){


        try {
            console.log(idMesa);
            const {data} = await api.post(`/pedidos/${idMesa}`);
            console.log("Sucesso ao abrir pedido na mesa" + idMesa + " e numero do pedido: " , data);
            localStorage.setItem('numeroPedido', JSON.stringify(data));
            navigate('/cardapio')
            return data;
        } catch (error) {
            console.log("Erro ao abrir pedido com a  "+ idMesa)
        }
    }

    async function encerraPedido(idPedido){
        try {
            const {data} = await api.put(`/pedidos/encerra-pedido/${idPedido}`);
            console.log("Sucesso ao encerrar o pedido do numero ", idPedido);
            navigate('/TelaEspera');
        } catch (error) {
            console.log("Erro ao encerrar o pedido do numero ", idPedido)
        }
    }

    async function inserirItemNoPedido(id_pedido, id_produto,qtde,observacao){
        if (typeof observacao === 'string') {
            observacao = observacao.trim();
          }
        console.log("recebendo aqui no context assim", id_pedido, id_produto,qtde,observacao);
        try {
            const {data} = await api.post("/itens", { numeroPedido: id_pedido, itensDoCarrinho: [{ id_produto, qtde, observacao }] });
            return data;
        } catch (error) {
            console.log("Erro ao inserir item no pedido", error);
        }
    }

    async function encerrarPedido(id_pedido){
        try {
            const { data } = await api.put(`/pedidos/encerra-pedido/${id_pedido}`);
        } catch (e) {
            console.log("Erro ao cancelar pedido", e)
        }
    }

    // ==================== Produtos ==================== //

    async function listarProdutos(){
        
        const token = localStorage.getItem("token");
        
        try{
            const { data } = await api.get("/produto", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return data
        }catch(e){
            console.log(e)
        }
    }

    async function listarProdutosComImagens(){
        
        const token = localStorage.getItem("token");
        
        try{
            const { data } = await api.get("/produto/imagens", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return data
        }catch(e){
            console.log(e)
        }
    }

    async function cadastrarProduto(e, nome, preco, descricao, categoria, imagem){
        console.log("Imagem para envio:", imagem); // Adicione esta linha
        e.preventDefault();
        nome = nome.trim();
        preco = preco.trim();
        descricao = descricao.trim();
        categoria = categoria.trim();

        const formData = new FormData();

        formData.append('nome', nome);
        formData.append('preco', preco);
        formData.append('descricao', descricao);
        formData.append('categoria', categoria);
        formData.append('imagem', imagem)
    
        try{
            console.log('Entrou no try e esta assim: ', formData)
            const {data} = await api.post('/produto', formData)
            console.log('datatinha: '+imagem)
        }catch(e){
            console.log("Erro ao cadastrar produto", e)
        }
    }

    async function editaProduto(e, nome, preco, descricao, categoria, status, idproduto){
        e.preventDefault();
        nome = nome.trim();
        preco = preco.trim();
        descricao = descricao.trim();
        categoria = categoria.trim();
        status = status.trim();

        try {
            const { data } = await api.put("/produto", {nome, preco, descricao, categoria, status, idproduto});
            console.log("Sucesso ao alterar produto", idproduto)
        } catch (e) {
            console.log("Erro ao editar produto", e)
        }
    }

    async function desativarProduto(e, idproduto){
        e.preventDefault();

        try {
            const { data } = await api.delete(`/produto/${idproduto}`);
            console.log("Produto desativado:" + idproduto);
        } catch (e) {
            console.error("Erro ao desativar produto:", e);
        }
    }

    // ==================== Mesas ==================== //

    async function cadastrarMesa(e, idMesa) {
        e.preventDefault();
        // Verifica se numeroMesa é uma string e pode ser convertida em um número
        if (typeof idMesa === "string") {
            idMesa = parseInt(idMesa, 10);
    
            // Verifica se a conversão foi bem-sucedida
            if (isNaN(idMesa)) {
                console.error("Número inválido");
                return; // Retorna para evitar a chamada da API com um número inválido
            }
        } else {
            console.error("Número inválido");
            return; // Retorna para evitar a chamada da API com um número inválido
        }
    
        try {
            const { data } = await api.post("/mesa", { idMesa });
            // Realiza o redirecionamento após o sucesso da chamada da API
            console.log("Mesa criada com sucesso id da mesa:"+ idMesa);
        } catch (e) {
            console.error("Erro ao cadastrar mesa:", e);

        }
    }

    async function listarMesas(){
        
        const token = localStorage.getItem("token");
        
        try{
            const { data } =  await api.get("/mesa/todas-mesas", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return data
        }catch(e){
            console.log(e)
        }
    }

    async function listarMesasAtivas(){
        const token = localStorage.getItem("token");

        try {
            const { data } = await api.get("/mesas/todas-mesas/ativas");
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function desativarMesa(e, idMesa) {
        e.preventDefault();
    
        try {
            const { data } = await api.delete(`/mesa/${idMesa}`, config);
            console.log("Mesa deletada: " + idMesa);
        } catch (e) {
            console.error("Erro ao deletar mesa:", e);
        }
    }

    async function ativarMesa(e, idMesa) {
        e.preventDefault();

        try {
            const { data } = await api.put(`/mesa/${idMesa}`);
            console.log("Mesa ativada: " + idMesa);
        } catch (e) {
            console.error("Erro ao ativar mesa:", e);
        }
    }

    // ==================== Categorias ==================== //

    async function listarCategorias(){
        
        const token = localStorage.getItem("token");
        
        try{
            const { data } =  await api.get("/categorias/listar", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return data
        }catch(e){
            console.log(e)
        }
    }

    async function cadastrarCategoria(e, nome){
        e.preventDefault();
        nome = nome.trim();

        try{
            const { data } = await api.post("/categorias/criar", {nome});
            console.log("Categoria cadastrada com sucesso!")
        }catch(e){
            console.log("Erro ao cadastrar categoria: ", e)
        }
    }

    async function desativarCategoria(e, idCategoria) {
        e.preventDefault();
    
        try {
            const { data } = await api.delete(`/categorias/deletar/${idCategoria}`, config);
            console.log("Categoria deletada: " + idCategoria);
        } catch (e) {
            console.error("Erro ao deletar categoria:", e);
        }
    }

    async function ativarCategoria(e, idCategoria) {
        e.preventDefault();

        try {
            const { data } = await api.put(`/categorias/ativar/${idCategoria}`, config);
            console.log("Categoria ativada: " + idCategoria);
        } catch (e) {
            console.error("Erro ao ativar Categoria:" + idCategoria, e);
        }
    }


    // ==================== Token ==================== //

    function validaToken() {
        const token = (localStorage.getItem("token"));
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            api
                .post("/verifica-token")
                .then((response) => {
                    navigate("/home");
                })
                .catch((error) => {
                    api.defaults.headers.Authorization = undefined;
                    localStorage.removeItem("chave");
                });
        }
    }

    useEffect(() => {
        validaToken();
    }, []);


    //RETURN
    return (
        <MainContext.Provider

        value={{
            autenticar,
            listarCategorias,
            listarMesas,
            listarMesasAtivas,
            listarPedidos,
            abrirPedido,
            inserirItemNoPedido,
            encerraPedido,
            listarProdutos,
            listarProdutosComImagens,
            listarTotal,
            autenticacaoMesa,
            desativarMesa,
            ativarMesa,
            cadastrarMesa, 
            cadastrarCategoria,
            ativarCategoria,
            desativarCategoria,
            cadastrarProduto,
            editaProduto,
            desativarProduto,
            listarItens,
            editarQuantidade,
            cancelarItem,
            encerrarPedido,
            produtosMaisFaturados,
            produtosMaisVendidos,
            totalEmPedidos
        }}
        >
        {children}
        </MainContext.Provider>
    );
}

export default MainProvider;