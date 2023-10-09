import { createContext} from "react";
import { useNavigate } from "react-router-dom";

// Criação do contexto
export const MainContext = createContext({});

// Criação do provedor do contexto
function MainProvider({ children }) {
  
    const navigate = useNavigate();

    

    return (
        <MainContext.Provider
        value={{
            
        }}
        >
        {children}
        </MainContext.Provider>
    );
}

export default MainProvider;