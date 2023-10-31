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

    async function produtosVendidos(){
        try{
            const { data } = await api.get("/relatorio/itens/mais/vendidos")
            return data
        }catch(e){
            console.log(e)
        }
    }

    // async function produtosFaturados(){
    //     try{
    //         const { data } = await api.get("/pedidos/all")
    //         return data
    //     }catch(e){
    //         console.log(e)
    //     }
    // }

    async function totalProdutosUni(){
        try{
            const { data } = await api.get("/relatorio/qtde/vendido")
            return data
        }catch(e){
            console.log(e)
        }
    }

    async function totalPedidos(){
        try{
            const { data } = await api.get("/relatorio/total")
            return data
        }catch(e){
            console.log(e)
        }
    }

    async function gorjetas(){
        try{
            const { data } = await api.get("/relatorio/calcular/gorjeta")
            return data
        }catch(e){
            console.log(e)
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

    async function cadastrarProduto(e, nome, preco, descricao, categoria){
        e.preventDefault();
        nome = nome.trim();
        preco = preco.trim();
        descricao = descricao.trim();
        categoria = categoria.trim();

        try{
            const { data } = await api.post("/produto", {nome, preco, descricao, categoria});
            console.log("Produto cadastrado com sucesso:", nome)
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
            listarProdutos,
            gorjetas,
            totalPedidos,
            totalProdutosUni,
            produtosVendidos,
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
            cancelarItem
        }}
        >
        {children}
        </MainContext.Provider>
    );
}

export default MainProvider;