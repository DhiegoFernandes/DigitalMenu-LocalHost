import {BrowserRouter, Routes, Route} from 'react-router-dom'

import MainProvider from './context/context';

import Home from './pages/Home';
import System from './pages/System';
import Login from './pages/Login';
import Client from './pages/Client';

import Pedidos from './components/Pedidos';
import Produtos from './components/Produtos';
import Categorias from './components/Categorias';
import Relatorios from './components/Relatorios';
import Mesas from './components/Mesas';

function Router(){
    return(
        <BrowserRouter>
            <MainProvider>
                <Routes>
                    <Route 
                        path='/'
                        element={<Login />}
                    />
                    <Route 
                        path='/home'
                        element={<Home />}
                    />
                    <Route 
                        path='/system'
                        element={<System />}
                    >
                        <Route path='produtos' element={<Produtos />}/>
                        <Route path='pedidos' element={<Pedidos />}/>
                        <Route path='categorias' element={<Categorias />}/>
                        <Route path='relatorios' element={<Relatorios />}/>
                        <Route path='mesas' element={<Mesas />}/>
                    </Route>
                    <Route 
                        path='/client'
                        element={<Client />}
                    />
                </Routes>
            </MainProvider>
        </BrowserRouter>
    );
}

export default Router;