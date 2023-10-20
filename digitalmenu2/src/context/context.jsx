import { createContext} from "react";
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
        try{
            const { data } = await api.get("/pedidos/all")
            return data
        }catch(e){
            console.log(e)
        }
    }

    // ==================== Produtos ==================== //

    async function listarProdutos(){
        try{
            const { data } = await api.get("/produto")
            return data
        }catch(e){
            console.log(e)
        }
    }

    // ==================== Mesas ==================== //

    async function listarMesas(){
        try{
            const { data } =  await api.get("/mesa/todas-mesas")
            return data
        }catch(e){
            console.log(e)
        }
    }

    // ==================== Categorias ==================== //

    async function listarCategorias(){
        try{
            const { data } =  await api.get("/categorias/listar")
            return data
        }catch(e){
            console.log(e)
        }
    }
    
    //RETURN
    return (
        <MainContext.Provider
        value={{
            autenticar,
            listarCategorias,
            listarMesas,
            listarPedidos,
            listarProdutos,
            gorjetas,
            totalPedidos,
            totalProdutosUni,
            produtosVendidos
        }}
        >
        {children}
        </MainContext.Provider>
    );
}

export default MainProvider;