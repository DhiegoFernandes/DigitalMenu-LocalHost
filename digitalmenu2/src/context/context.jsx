import { createContext} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
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
            const { data } = await api.post('/login', {nome, senha})
            localStorage.setItem("token", data.token)
            api.defaults.headers.Authorization = `Bearer ${data.token}`
            createNotification("Seja bem vindo!", 'success');
            navigate('/home')
        } catch (e) {
            createNotification("Erro no login", 'error');
            console.log("Erro na autenticação" + e);
        }
    }

    return (
        <MainContext.Provider
        value={{
            autenticar
        }}
        >
        {children}
        </MainContext.Provider>
    );
}

export default MainProvider;